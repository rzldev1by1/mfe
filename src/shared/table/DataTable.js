import React, { useState } from 'react'
import {
  CCard,
  // CCardHeader,
  CCardBody,
  CPagination,
  CDataTable,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import './DataTable.css'

const DataTable = (props) => {
  const [pagination, setPagination] = useState({
    activePage: 1,
    itemsPerPage: 5,
  })
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
      <CCard className={props.className}>
        <CDataTable
          items={props.data}
          fields={props.fields}
          // columnFilter
          tableFilter
          itemsPerPageSelect
          hover
          sorter
          // loading
          // footer
          itemsPerPage={pagination.itemsPerPage}
          activePage={pagination.activePage}
          // pagination={pagination}
          onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
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
        <CCol md="5" className="mb-0">
          <CCard>
            <CCardBody className="p-0">
              <CRow>
                <CCol md="6" className="page-1 text-center">
                  <CPagination
                    limit={3}
                    activePage={pagination.activePage}
                    pages={pages > 0 ? pages : 1}
                    onActivePageChange={(i) => setPagination({ ...pagination, activePage: i > 1 ? i : 1 })}
                  />
                </CCol>
                <CCol md="6" className="border-left page-2 d-flex flex-row">
                  <span className="text-muted mt-1 mr-1">Go to page</span>
                  <input type="number" className="form-control form-control-sm" onChange={gotoPage} min="1" />
                  <span className="text-muted mt-1 ml-3">Go ></span>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="7">
          <label className="page-3 text-muted">Showing <b>{startIndex + 1} to {endIndex} of {props.data.length}</b> entries</label>
          <CButton color="info" className="float-right"> Export </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  )
}

export default DataTable
