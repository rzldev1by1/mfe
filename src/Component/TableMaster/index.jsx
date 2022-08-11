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
  noDataText,
  pagination,
  goto,
  filename,
  getExportData,
  exportApi,
  isDisplay,
  classNameTable,
  user,
  title,
  columnHidden,
  exportPdf,
  editColumn,
  splitModule,
  props,
  exportBtn,
  editOrderQty,
  editCarton,
  exportTable,
}) => {
  return (
    <div>
      <Table
        onClick={onClick}
        schemaColumn={schemaColumn}
        data={data}
        style={style}
        module={module}
        noDataText={noDataText}
        className={classNameTable}
        user={user}
        title={title}
        columnHidden={columnHidden}
        editColumn={editColumn}
        splitModule={splitModule}
        editOrderQty={editOrderQty}
        editCarton={editCarton}
      />
      <CRow lg="12" className="mt-3 mb-2 w-100 pagination-custom justify-content-between">
        <CCol className="pl-0">
          <Pagination
            pagination={pagination}
            module={module}
            data={data}
            goto={goto}
            schemaColumn={schemaColumn}
            isDisplay={isDisplay}
            props={props}
          />
        </CCol>
        <CCol className="pr-0">
          {pagination && pagination.total < 1
            ? '' : exportBtn && (
              <Export
                exportTable={exportTable}
                filename={filename}
                getExportData={getExportData}
                exportApi={exportApi}
                schemaColumn={schemaColumn}
                exportPdf={exportPdf}
              />
            )}
        </CCol>
      </CRow>
    </div>
  );
};

export default TableMaster;
