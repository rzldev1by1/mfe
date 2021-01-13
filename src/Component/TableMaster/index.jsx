/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import React from 'react';
import { CRow, CCol } from '@coreui/react';
import Export from '../Export';
import Pagination from '../Pagination';
import Table from '../Table';

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
  filename,
  getExportData,
  exportApi,
  classNamePaging,
  classNameTable,
  exportData,
}) => {
  return (
    <div>
      <Table
        onClick={onClick}
        schemaColumn={schemaColumn}
        data={data}
        style={style}
        module={module}
        page={page}
        setPage={setPage}
        noDataText={noDataText}
        tableStatus={tableStatus}
        className={classNameTable}
      />
      <CRow lg="12" className="mt-3 w-100 pagination-custom">
        <CCol lg="10" className="px-0 w-100 margin-mr">
          <Pagination
            pagination={pagination}
            data={data}
            page={page}
            setPage={setPage}
            goto={goto}
            schemaColumn={schemaColumn}
            className={classNamePaging}
          />
        </CCol>
        <CCol lg="2" md="1" className="px-0 w-100 export-ml">
          <Export
            filename={filename}
            getExportData={async () => await getExportData()}
            module={module}
            exportApi={exportApi}
            schemaColumn={schemaColumn}
          />
        </CCol>
      </CRow>
    </div>
  );
};

export default TableMaster;
