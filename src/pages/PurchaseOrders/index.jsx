/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import React, { useEffect, useState }  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Search from 'Component/Search'
import Breadcrumb from 'Component/Breadcrumb'
import TableMaster from 'Component/TableMaster'
import {
  schemaColumn, 
  searchPurchaseOrder } from './services'

const PurchaseOrders = () => {
  const dispatch = useDispatch()
  const poSummaryData = useSelector(state => state.poSummaryData)
  const pagination = useSelector(state => state.pagination)

  const [page, setPage] = useState({
    // Paging
    notifPaging: false,
    pagination: { active: 1, show: 10, total: 0, last_page: 1, from: 0, to: 0 },
    PagingPage: 1,
    // table
    data: [],
    tableStatus: 'waiting',
    status: null,
    search: '',
  })

  const height = (window.innerHeight - 257)
  const widht = window.innerWidth
  useEffect(async() => {
    await searchPurchaseOrder({ page, setPage, dispatch })
}, [])
    return(
      <div>
        <Breadcrumb breadcrumb={[
          { to: '/purchase-order', label: 'Purchase Order', active: true},
          ]}
        />
        <div>
          <Search
            filterSite
            filterClient
            filterStatus
            filterOrderType
            filterTask
            placeholder='Enter SKU'
            filter
          />
        </div>
        <div>
          <TableMaster
            schemaColumn={schemaColumn}
            data={poSummaryData}
            style={{ minHeight: height, maxHeight: height, minWidht:widht, maxWidht:widht }}
            module='Purchase Orders'
            noDataText
            tableStatus
            pagination={pagination}
            goto={(active) => {
              dispatch({type:'PAGING', data:{ ...pagination, active }} )
              searchPurchaseOrder({ page, setPage, dispatch })
            }}
            exportData
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    )
}

export default PurchaseOrders;