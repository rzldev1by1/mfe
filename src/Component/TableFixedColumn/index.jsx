/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// import library
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table-v6';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { CRow, CCol } from '@coreui/react';
import Export from '../Export';
import Pagination from '../Pagination/PagingMove';

// import style
import 'react-table-v6/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import loading from 'assets/icons/loading/LOADING-MLS-GRAY.gif';
import './style.scss';

const TableFixedColumn = ({ schemaColumn, data, style, tableStatus, pagination, filename, customExportPdf }) => {
  const ReactTableFixedColumns = withFixedColumns(ReactTable);
  const [dataPaging, setDataPaging] = useState()
  const [activePage, setActivePage] = useState(1)
  const noDataMessage = (
    <div className="caution-caution">
      <div>No Data Available</div>
    </div>
  );
  const loadingMessage = (
    <div>
      <img src={loading} width="45" height="45" />
    </div>
  );
  const icon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
    </svg>
  );

  const total = data?.length;
  const show = 50;

  // pagination
  const startIndexVormula = (activePage - 1) * (total < show ? total : show);
  const endIndexVormula = startIndexVormula + (total < show ? total : show);
  const startIndex = data?.length > 0 && startIndexVormula < 1 ? 1 : startIndexVormula;
  const endIndex = endIndexVormula > total ? total : endIndexVormula

  const dataAll = data?.slice(startIndex, endIndex)

  return (
    <div className="fixedColumnTable">
      <ReactTableFixedColumns
        columns={schemaColumn}
        data={dataAll}
        showPagination={false}
        defaultPageSize={50}
        style={style}
        noDataText={tableStatus === 'noData' ? noDataMessage : loadingMessage}
        minRows="0"
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            style: { textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' },
          };
        }}
      />

      <CRow lg="12" className="mt-3 w-100 pagination-custom">
        <CCol lg="7" className="px-0 w-100 margin-mr">
          <Pagination  startIndex={startIndex} endIndex={endIndex} total={total} activePage={activePage} setActivePage={setActivePage} show={show}/>
        </CCol>
        <CCol lg="5" md="1" className="px-0 w-100 export-ml">
          {data?.length < 1 ? null : (
            <Export filename={filename} customExportXls customExportPdf={customExportPdf} module={module} />
          )}
        </CCol>
      </CRow>
    </div>
  );
};

export default TableFixedColumn;
