/* eslint-disable no-return-await */
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
  user,
  title,
  columnHidden,
  UrlHeader,
  exportPdf,
  editColumn,
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
        user={user}
        title={title}
        columnHidden={columnHidden}
        UrlHeader={UrlHeader}
        editColumn={editColumn}
      />
      <CRow lg="12" className="mt-3 w-100 pagination-custom">
        <CCol lg="7" className="px-0 w-100 margin-mr">
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
        <CCol lg="5" md="1" className="px-0 w-100 export-ml">
          <Export
            filename={filename}
            getExportData={async () => await getExportData()}
            module={module}
            exportApi={exportApi}
            schemaColumn={schemaColumn}
            exportPdf={exportPdf}
          />
        </CCol>
      </CRow>
    </div>
  );
};

export default TableMaster;
