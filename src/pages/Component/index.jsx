import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import Dropdown from '../../Component/Dropdown'
import InputNumber from '../../Component/InputNumber'
import Breadcrumb from '../../Component/Breadcrumb'
import DetailHeader from '../../Component/DetailHeader'
import TableFixedColumn from '../../Component/TableFixedColumn'
import Table from '../../Component/Table'
import PopUpPages from '../../Component/Modal/PopUpPages'
import { showModal } from '../../Component/Modal/PopUpPages/service'
import Pagination from '../../Component/Pagination'
import { category, simpleSchema, simpleData } from './service'

const Component = () => {
  const [page, setPage] = useState({
    noticePaging: false,
    pagination: { active: 1, show: 10, total: 0, lastPage: 1, from: 0, to: 0 },
    PagingPage: 1,
    paginationData: {}
  })

  return (
    <div className="inventory-data component-page">
      <div>
        <div>
          <Breadcrumb breadcrumb={[
            { to: '/sales-order', label: 'Tes Component' },
            { to: '/purchase-order', label: 'wadidau', },
            { to: '', label: 20, active: true },
          ]}
          />
        </div>
        <div>
          {/* <Search
            filterSite
            filterClient
            filterStatus
            filterOrderType
            filterTask
            placeholder='Enter SKU'
            filter
          /> */}
        </div>
        <CRow className='pl-3'>
          <CCol lg={2} className="px-0 pb-3">
            <Dropdown
              showTitle={false}
              show
              options={category}
              placeholder='Tes Dropdown'
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={2}>
            <InputNumber
              name="qty"
              autoComplete="off"
              type="text"
              min="0"
              className="form-control c-150"
              placeholder="Qty"
              maxLength="11"
            />
          </CCol>
          <CCol lg={2}>
            <button className="btn btn-search btn-primary" onClick={() => showModal({ page, setPage })} type="button">Pop Up</button>
            <PopUpPages
              page={page}
              setPage={setPage}
            />
          </CCol>
        </CRow>
        <CRow className='pl-3 pr-3 pt-3'>
          <CCol lg={12} className="px-0">
            <DetailHeader
              // titleRight
              titleRight
              titleRightOne="site"
              titleRightTwo="site"
              titleRightThree="site"
              titleRightFour="site"
              titleRightFive="site"
              titleRightSix="site"
              titleRightSeven="site"
              titleRightEight="site"
              titleRightNine="site"
              titleRightTen="site"
              // titleRight
              valeuRightOne="site"
              valeuRightTwo="site"
              valeuRightThree="site"
              valeuRightFour="site"
              valeuRightFive="site"
              valeuRightSix="site"
              valeuRightSeven="site"
              valeuRightEight="site"
              valeuRightNine="site"
              valeuRightTen="site"
              // titleCenter
              titleCenter
              titleCenterOne="site"
              titleCenterTwo="site"
              titleCenterThree="site"
              titleCenterFour="site"
              titleCenterFive="site"
              titleCenterSix="site"
              titleCenterSeven="site"
              titleCenterEight="site"
              titleCenterNine="site"
              titleCenterTen="site"
              // titleCenter
              valeuCenterOne="site"
              valeuCenterTwo="site"
              valeuCenterThree="site"
              valeuCenterFour="site"
              valeuCenterFive="site"
              valeuCenterSix="site"
              valeuCenterSeven="site"
              valeuCenterEight="site"
              valeuCenterNine="site"
              valeuCenterTen=""
              // titleLeft
              titleLeft
              titleLeftOne="site"
              titleLeftTwo="site"
              titleLeftThree="site"
              titleLeftFour="site"
              titleLeftFive="site"
              titleLeftSix="site"
              titleLeftSeven="site"
              titleLeftEight="site"
              titleLeftNine="site"
              titleLeftTen="site"
              // titleLeft
              valeuLeftOne="site"
              valeuLeftTwo="site"
              valeuLeftThree="site"
              valeuLeftFour="site"
              valeuLeftFive="site"
              valeuLeftSix="site"
              valeuLeftSeven="site"
              valeuLeftEight="site"
              valeuLeftNine="site"
              valeuLeftTen=""
            />
          </CCol>
        </CRow>
        <CRow className='pl-3 pr-3 pt-3'>
          <CCol lg={12} className="px-0">
            <Pagination
              page={page}
              setPage={setPage}
            />
          </CCol>
        </CRow>

        {/* React Table */}
        <h3 className="pt-3">Simple React Table + Reorder Column Header</h3>
        <CRow className='pl-3 pr-3  '>
          <CCol lg={12} className="px-0">
            <Table
              schemaColumn={simpleSchema}
              data={simpleData}
              style={{ height: '200px' }}
              module="component" // e.g purchaseOrders, salesOrders
            />
          </CCol>
        </CRow>
        {/* END React Table */}

        {/* React Table Fixed Column */}
        <h3 className="pt-3">Simple  Fixed Column Table</h3>
        <CRow className='pl-3 pr-3  '>
          <CCol lg={12} className="px-0">
            <TableFixedColumn
              schemaColumn={simpleSchema}
              data={simpleData}
              style={{ height: '200px' }}
            />
          </CCol>
        </CRow>
        {/* END React Table Fixed Column */}
      </div>
    </div>
  )
}

export default Component;