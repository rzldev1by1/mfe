/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import React from 'react';
import { CRow, CCol } from '@coreui/react';
import Pagination from '../Pagination';
import Table from '../Table';
import Export from '../Export';

const TableMaster = ({
  schemaColumn,
  onClick,
  data,
  style,
  module,
  page,
  setPage,
  noDataText,
  tableStatus,
  pagination,
  goto,
  exportColumns,
  exportApi,
  getExportData,
  filename,
}) => {
  return (
    <div>
      <Table
        schemaColumn={schemaColumn}
        data={data}
        style={style}
        module={module}
        onClick={onClick}
        page={page}
        setPage={setPage}
        noDataText={noDataText}
        tableStatus={tableStatus}
      />
      <CRow lg="12" className="mt-3 pagination-custom">
        <CCol lg="7" className="px-0 margin-mr">
          <Pagination
            pagination={pagination}
            data={data}
            page={page}
            setPage={setPage}
            goto={goto}
            schemaColumn={schemaColumn}
          />
        </CCol>
        <CCol lg="5" className="px-0 export-ml">
          <Export
            filename={filename}
            getExportData={async () => await getExportData()}
            module={module}
            exportApi={exportApi}
            schemaColumn={exportColumns}
          />
        </CCol>
      </CRow>
    </div>
  );
};

export default TableMaster;
