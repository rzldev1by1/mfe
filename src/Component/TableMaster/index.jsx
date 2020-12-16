import React from 'react'
import Table from 'reactstrap/lib/Table'
import { CRow, CCol } from "@coreui/react";
import Pagination from '../Pagination/Pagination'
// import Table from '../../Component/Table'

const TableMaster = ({
    schemaColumn,
    data,
    style,
    module,
    page,
    pageSize,
    noDataText,
    tableStatus,
    pagination,
    goto,
    exportData
}) => {
    return(
      <div>
        <Table
          schemaColumn={schemaColumn}
          data={data}
          style={style}
          module={module}
          page={page}
          pageSize={pageSize}
          noDataText={noDataText}
          tableStatus={tableStatus}
        />
        <CRow lg="12" className="mt-3 pagination-custom">
          <CCol lg="7" className="px-0 margin-mr">
            <Pagination
              data={data}
              pagination={pagination}
              goto={goto}
              export={exportData}
              schemaColumn={schemaColumn}
              page={page}
              pageSize={pageSize}
            />
          </CCol>
          <CCol lg="5" className="px-0 export-ml" />
        </CRow>
      </div>
    )
}

export default TableMaster;