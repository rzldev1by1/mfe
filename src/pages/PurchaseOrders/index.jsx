/* eslint-disable consistent-return */
import React, { useState }  from 'react'
import Search from '../../Component/Search'
import Dropdown from '../../Component/Dropdown'
import Breadcrumb from '../../Component/Breadcrumb'
import TableMaster from '../../Component/TableMaster'
import { dummyData, schemaColumn } from './services'

const PurchaseOrders = () => {
  const [page, setPage] = useState({
    // filter
    site: null,
    client: null,
    orderType: null,
    task: null,
    // Paging
    notifPaging: false,
    pagination: { active: 1, show: 10, total: 0, lastPage: 1, from: 0, to: 0 },
    PagingPage: 1,
    paginationData: {}
  })

  const filterSite = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Site'
    />
  )
  const filterClient = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Client'
    />
  )
  const filterStatus = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Status'
    />
  )
  const filterOrderType = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Order Type'
    />
  )
  const filterTask = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Task'
    />
  )
  const height = (window.innerHeight - 257)
  const widht = window.innerWidth
    return(
      <div>
        <Breadcrumb breadcrumb={[
          { to: '/purchase-order', label: 'Purchase Order', active: true},
          ]}
        />
        <div>
          <Search
            filterSite={filterSite}
            filterClient={filterClient}
            filterStatus={filterStatus}
            filterOrderType={filterOrderType}
            filterTask={filterTask}
            placeholder='Enter SKU'
            filter
          />
        </div>
        <div>
          <TableMaster
            schemaColumn={schemaColumn}
            data={dummyData}
            style={{ minHeight: height, maxHeight: height, minWidht:widht, maxWidht:widht }}
            module='Purchase Orders'
            noDataText
            tableStatus
            pagination
            goto
            exportData
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    )
}

export default PurchaseOrders;