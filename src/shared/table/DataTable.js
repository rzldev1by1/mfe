import React, { useState, useEffect, useRef } from 'react'
import {
  CCard,
  // CCardHeader,
  CCardBody,
  CCardGroup,
  CPagination,
  CDataTable,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import './DataTable.css'

const DataTable = (props) => {
  const [pagination, setPagination] = useState({
    activePage: 1,
    itemsPerPage: props.pagination ? props.pagination.itemsPerPage : 50,
  })
  const refTable = useRef();
  useEffect(() => {
    // <button className="btn btn-sm float-right"><CIcon name="cil-applications-settings" alt="CoreUI Icons Settings" /></button>
    // const rightEl = refTable.current.children[0].children[1].children[0]
  }, []);
  const gotoPage = (e) => {
    if (e.target.value) {
      setPagination({ ...pagination, activePage: parseInt(e.target.value) })
    }
  }
  const startIndex = (pagination.activePage - 1) * pagination.itemsPerPage
  const endIndex = startIndex + pagination.itemsPerPage
  const pages = parseInt(props.data.length / pagination.itemsPerPage)
  return (
    <React.Fragment>
      <CCard className={'datatables ' + props.className} >
        {/* <div className="row my-2 mx-0">
          <div className="col form-inline p-0">
            <label className="mr-2">Filter:</label><input className="form-control" type="text" placeholder="type string..." value="" />
          </div>
          <div className="col p-0">
            <div className="form-inline justify-content-sm-end">
              <label>Items per page:</label>
              <select className="form-control mx-2 mr-4">
                <option value="" disabled="" hidden="">5</option>
                <option val="5">5</option>
                <option val="10">10</option>
                <option val="20">20</option>
                <option val="50">50</option>
              </select>
              <button className="btn btn-sm float-right"><CIcon name="cil-applications-settings" alt="CoreUI Icons Settings" /></button>
            </div>
          </div>
        </div> */}

        <CDataTable
          innerRef={refTable}
          items={props.data}
          fields={props.fields}
          hover
          sorter
          columnFilter={props.columnFilter}
          tableFilter={props.tableFilter}
          itemsPerPageSelect={props.itemsPerPageSelect}
          // loading
          // footer
          // pagination
          itemsPerPage={pagination.itemsPerPage}
          activePage={pagination.activePage}
          onRowClick={props.onClick}
          // onPageChange={(val) => console.log('new page:', val)}
          // onPagesChange={(val) => console.log('new pages:', val)}
          onPaginationChange={(val) => setPagination({ ...pagination, itemsPerPage: val })}
          // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          // onSorterValueChange={(val) => console.log('new sorter value:', val)}
          // onTableFilterChange={(val) => console.log('new table filter:', val)}
          // onColumnFilterChange={(val) => console.log('new column filter:', val)}
          scopedSlots={props.customFields}
        />
      </CCard>

      <CRow>
        <CCol lg="6" xl="6" >
          <CCardGroup>
            <CCard>
              <CPagination
                limit={3}
                activePage={pagination.activePage}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={(i) => setPagination({ ...pagination, activePage: i > 1 ? i : 1 })}
              />
            </CCard>
            <CCard>
              <div className="page-2 d-flex justify-content-center">
                <span className="text-muted mt-1 mr-3">Go to page</span>
                <input type="number" className="form-control form-control-sm" onChange={gotoPage} min="1" />
                <span className="text-muted mt-1 ml-3">Go ></span>
              </div>
            </CCard>
          </CCardGroup>
          <div className="page-3 pl-3 text-muted float-left">Showing <b>{startIndex + 1} to {endIndex} of {props.data.length}</b> entries</div>
        </CCol>
        <CCol lg="6" xl="6">
          <CButton color="primary" size="lg" className="float-right"> Export </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  )
}

export default DataTable
