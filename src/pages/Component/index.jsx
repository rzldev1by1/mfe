/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import Dropdown from 'Component/Dropdown'
import InputNumber from 'Component/InputNumber'
import Breadcrumb from 'Component/Breadcrumb'
import Search from 'Component/Search'
import DetailHeader from 'Component/DetailHeader'
import TableFixedColumn from 'Component/TableFixedColumn'
import Table from 'Component/Table'
import { category, simpleSchema, simpleData } from './service'
import PopUpPages from 'Component/Modal/PopUpPages'
import { showModal } from 'Component/Modal/PopUpPages/service'
import Pagination from 'Component/Pagination/Pagination'

const Component = () => {
  const filterSite = (
    <Dropdown
      showTitle={false}
      show
      options={category}
      placeholder='site'
    />
  )
  const filterClient = (
    <Dropdown
      showTitle={false}
      show
      options={category}
      placeholder='Client'
    />
  )
  const filterStatus = (
    <Dropdown
      showTitle={false}
      show
      options={category}
      placeholder='Status'
    />
  )
  const filterOrderType = (
    <Dropdown
      showTitle={false}
      show
      options={category}
      placeholder='Order Type'
    />
  )
  const filterTask = (
    <Dropdown
      showTitle={false}
      show
      options={category}
      placeholder='Task'
    />
  )

  const [page, setPage] = useState({
    notifPaging: false,
    pagination: { active: 1, show: 10, total: 0, last_page: 1, from: 0, to: 0 },
    PagingPage: 1,
    paginationData: {}
  })

  return (
    <div className="inventory-data component-page">
      <div>
        <div>
          <Breadcrumb breadcrumb={[
            { to: '/sales-orders', label: 'Tes Component' },
            { to: '/purchase-order', label: 'wadidau', },
            { to: '', label: 20, active: true },
          ]} />
        </div>
        <div >
          <Search
            filterSite={filterSite}
            filterClient={filterClient}
            filterStatus={filterStatus}
            filterOrderType={filterOrderType}
            filterTask={filterTask}
            placeholder={'Enter SKU'}
            filter={true}
          />
        </div>
        <CRow className='pl-3'>
          <CCol lg={2} className="px-0 pb-3">
            <Dropdown
              showTitle={false}
              show={true}
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
          <CCol lg={2} >
            <button className="btn btn-search btn-primary" onClick={() => showModal({ page, setPage })}  >Pop Up</button>
            <PopUpPages
              page={page}
              setPage={setPage}
            />
          </CCol>
        </CRow>
        <CRow className='pl-3 pr-3 pt-3'>
          <CCol lg={12} className="px-0">
            <DetailHeader
              //titleRight
              titleRight={true}
              titleRightOne={'site'} titleRightTwo={'site'} titleRightThree={'site'} titleRightFour={'site'} titleRightFive={'site'}
              titleRightSix={'site'} titleRightSeven={'site'} titleRightEight={'site'} titleRightNine={'site'} titleRightTen={'site'}
              //titleRight
              valeuRightOne={'site'} valeuRightTwo={'site'} valeuRightThree={'site'} valeuRightFour={'site'} valeuRightFive={'site'}
              valeuRightSix={'site'} valeuRightSeven={'site'} valeuRightEight={'site'} valeuRightNine={'site'} valeuRightTen={'site'}
              //titleCenter
              titleCenter={true}
              titleCenterOne={'site'} titleCenterTwo={'site'} titleCenterThree={'site'} titleCenterFour={'site'} titleCenterFive={'site'}
              titleCenterSix={'site'} titleCenterSeven={'site'} titleCenterEight={'site'} titleCenterNine={'site'} titleCenterTen={'site'}
              //titleCenter
              valeuCenterOne={'site'} valeuCenterTwo={'site'} valeuCenterThree={'site'} valeuCenterFour={'site'} valeuCenterFive={'site'}
              valeuCenterSix={'site'} valeuCenterSeven={'site'} valeuCenterEight={'site'} valeuCenterNine={'site'} valeuCenterTen={''}
              //titleLeft
              titleLeft={true}
              titleLeftOne={'site'} titleLeftTwo={'site'} titleLeftThree={'site'} titleLeftFour={'site'} titleLeftFive={'site'}
              titleLeftSix={'site'} titleLeftSeven={'site'} titleLeftEight={'site'} titleLeftNine={'site'} titleLeftTen={'site'}
              //titleLeft
              valeuLeftOne={'site'} valeuLeftTwo={'site'} valeuLeftThree={'site'} valeuLeftFour={'site'} valeuLeftFive={'site'}
              valeuLeftSix={'site'} valeuLeftSeven={'site'} valeuLeftEight={'site'} valeuLeftNine={'site'} valeuLeftTen={''} />
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
              module="component" //e.g purchaseOrders, salesOrders
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
    </div >
  )
}

export default Component;