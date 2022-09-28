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
}) => {

  const footer = () => {
    if (pagination && pagination.total < 1) {
      return <div style={{ color: 'transparent' }}>Transparent</div>
    } if (exportBtn) {
      return (
        <div>
          <Export
            filename={filename}
            getExportData={() => getExportData()}
            exportApi={exportApi}
            schemaColumn={schemaColumn}
            exportPdf={exportPdf}
          />
        </div>
      )
    } return <div style={{ color: 'transparent' }}> Transparent</div>
  }

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
      <CRow className='m-0 mt-3'>
        <CCol lg={12} className="pagination-custom line-paging">
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
          <div style={{ paddingRight: '22%', color: '#525563' }}>Copyright &#169; 2022 Microlistics</div>
          {footer()}
        </CCol>
      </CRow>
    </div>
  );
};

export default TableMaster;
