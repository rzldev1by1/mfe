/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-await */
import React from 'react';
import { CRow } from '@coreui/react';
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
  const checkItsClear = data?.filter((data, idx) => {
    setTimeout(() => {
      const elementEditCarton = document.getElementById(`edit_carton_${idx}`)?.value;// id for column element Edit Carton Qty
      const elementEditQty = document.getElementById(`edit_qty_${idx}`)?.value;// id for column element input Edit Qty
    }, 10000);

  })

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
      <CRow lg="12" className="mt-3 mb-2 w-100 pagination-custom justify-content-between align-items-center d-flex line-paging">
        <div className="py-1">
          <Pagination
            pagination={pagination}
            module={module}
            data={data}
            goto={goto}
            schemaColumn={schemaColumn}
            isDisplay={isDisplay}
            props={props}
          />
        </div>

        <div style={{ paddingRight: "22%", color: "#525563" }}>
          Copyright &#169; 2021 Microlistics
        </div>
        {pagination && pagination.total < 1 ? (
          <div style={{ color: "transparent" }}>
            Transparent
          </div>
          // eslint-disable-next-line no-nested-ternary
        ) : exportBtn ? (
          <div className="pr-2">
            <Export
              filename={filename}
              getExportData={async () => await getExportData()}
              exportApi={exportApi}
              schemaColumn={schemaColumn}
              exportPdf={exportPdf}
            />
          </div>
        )
          : (
            <div style={{ color: "transparent" }}>
              Transparent
            </div>
          )}
      </CRow>
    </div>
  );
};

export default TableMaster;
