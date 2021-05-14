/* eslint-disable no-nested-ternary */
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
  printBtn
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
      />
      <CRow lg="12" className="mt-3 mb-2 w-100 pagination-custom justify-content-between">
        <Pagination
          pagination={pagination}
          module={module}
          data={data}
          goto={goto}
          schemaColumn={schemaColumn}
          isDisplay={isDisplay}
          props={props}
        />

        {pagination && pagination.total < 1 ? (
          ''
        // eslint-disable-next-line no-nested-ternary
        ) : exportBtn ? (
          <Export
            filename={filename}
            getExportData={async () => await getExportData()}
            exportApi={exportApi}
            schemaColumn={schemaColumn}
            exportPdf={exportPdf}
          />
        )
        : printBtn ? (
          <button
            type="button"
            className="btn btn-search mobile-search btn-primary float-right"
          >
            PRINT LABELS
          </button>
        ) : ''}
      </CRow>
    </div>
  );
};

export default TableMaster;
