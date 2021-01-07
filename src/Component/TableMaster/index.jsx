/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import React from 'react';
import { CRow, CCol } from '@coreui/react';
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
        <CCol lg="5" className="px-0 export-ml" />
      </CRow>
    </div>
  );
};

export default TableMaster;
