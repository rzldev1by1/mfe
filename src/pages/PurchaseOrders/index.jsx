import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react'
import Search from '../../Component/Search'
import Breadcrumb from '../../Component/Breadcrumb'
import Table from '../../Component/Table'

const headerColumn = [
  {
    accessor: 'site',
    placeholder: 'Site',
    Header: 'Site',
    width: 80,
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'client',
    placeholder: 'Client',
    Header: 'Client',
    width: 140,
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'order_no',
    placeholder: 'Order No',
    Header: 'Order No',
    width: 160,
    Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false,
    sortType: "name"
  },
  {
    accessor: 'order_type',
    placeholder: 'Order Type',
    Header: 'Order Type',
    width: 120,
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'isis_task',
    placeholder: 'Task',
    Header: 'Task',
    width: 100,
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'supplier_no',
    placeholder: 'Supplier No',
    Header: 'Supplier No',
    width: 120,
    sortable: true,
    style: { textAlign: 'left' },
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'supplier_name',
    placeholder: 'Supplier Name',
    Header: 'Supplier Name',
    width: 290,
    Cell: props => <span>{props.value ? props.value : '-'}</span>
  },
  {
    accessor: 'status', placeholder: 'Status', Header: 'Status', width: 140,
    Cell: row => {
      switch (row.original.status) {
        case '0: Unavailable':
          return <a className="status-Unavailable">UNAVAILABLE</a>
        case '1: Available':
          return <a className="status-available">AVAILABLE</a>
        case '2: Released':
          return <a className="status-Release">RELEASED</a>
        case '3: Part Released':
          return <a className="status-partRelease">PART RELEASED</a>
        case '4: Completed':
          return <a className="status-complete">COMPLETED</a>
        case 'All Open':
          return <a className="status-ok">ALL OPEN</a>
        default:
          break;
      }
    }
  },
  {
    accessor: 'delivery_date', placeholder: 'Order Date', Header: 'Order Date', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false,
    sortType: "date"
  },
  {
    accessor: 'date_received', placeholder: 'Date Received', Header: 'Date Received', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false,
    sortType: "date"
  },
  {
    accessor: 'date_released', placeholder: 'Date Released', Header: 'Date Released', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false,
    sortType: "date"
  },
  {
    accessor: 'date_completed', placeholder: 'Date Completed', Header: 'Date Completed', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false,
    sortType: "date"
  }
]

const PurchaseOrders = () => {

    return(
      <div className='purchase-orders'>
        <Breadcrumb
          breadcrumb={[
            { to: '/purchase-order', label: 'Purchase Order', active: true}
          ]}
          button={
            (
              <CButton className="btn btn-primary btn-create float-right">
                CREATE PURCHASE ORDER
              </CButton>
            )
          }
        />
        <div>
          <Search
            placeholder='Enter an Order No'
            filter
          />
        </div>
        <div>
          <CRow className='pl-3 pr-3  '>
            <CCol lg={12} className="px-0">
              <Table
                header={headerColumn}
                style={{ height: '200px' }}
                module="purchase-orders" // e.g purchaseOrders, salesOrders
              />
            </CCol>
          </CRow>
        </div>
      </div>
    )
}

export default PurchaseOrders;