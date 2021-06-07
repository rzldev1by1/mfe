/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-await */
import React from 'react';
import { CRow } from '@coreui/react';
import Export from '../../../Component/Export';
import PrintLabel from '../../../Component/PrintLabel';
import Pagination from '../../../Component/Pagination';
import Table from './Table';
import { renewColumn } from '../../../Component/Table/service';

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
  editCarton,
  onChange,
  getPrintLabelData
}) => {

  const tableRef = React.useRef({})
console.log(tableRef.current);
    // renew Schema column, to get old order column or additional logic
    // useEffect(() => {
    //   renewColumn({ setNewSchema:tableRef.current.setNewSchema, data, fields:tableRef.current.state.fields, module, userId:tableRef.current.props.userId, editColumnTemp:tableRef.current.state.editColumnTemp, showModal:tableRef.current.state.showModal, columnHidden, editColumn});
    // }, [data, tableRef.current.state.fields, columnHidden]); 
  
  return (
    <div>
      <Table
        ref={tableRef}
        onClick={onClick}
        onChange={onChange}
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
          <PrintLabel 
            filename={filename}
            getPrintLabelData={async () => await getPrintLabelData()}
            
          />
        ) : ''}
      </CRow>
    </div>
  );
};

export default TableMaster;
