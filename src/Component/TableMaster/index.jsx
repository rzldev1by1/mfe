/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-await */
import React from 'react';
import { CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react';
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
  printBtn,
  editOrderQty,
  editCarton
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
          <CDropdown className="btn-group print-lables">
            <CDropdownToggle color="primary"> 
              PRINT LABELS
            </CDropdownToggle>
            <CDropdownMenu className="mb-2 shadow-none border">
              <CDropdownItem>PAGE BREAK</CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem>ONE PAGE</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        ) : ''}
      </CRow>
    </div>
  );
};

export default TableMaster;
