/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// import library
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table-v6';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { CRow, CCol } from '@coreui/react';
import Export from '../Export';
import Pagination from '../Pagination';

// import style
import 'react-table-v6/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import loading from 'assets/icons/loading/LOADING-MLS-GRAY.gif';
import './style.scss';

const TableFixedColumn = ({ schemaColumn, data, style, tableStatus, pagination, filename, customExportPdf }) => {
  const ReactTableFixedColumns = withFixedColumns(ReactTable);
  const noDataMessage = (
    <div className="icon-alert-triangle">
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
  const [editColumnTemp, setEditColumnTemp] = useState(null);
  return (
    <div className="fixedColumnTable">
      <ReactTableFixedColumns
        columns={schemaColumn}
        data={data}
        showPagination={false}
        style={style}
        noDataText={tableStatus === 'noData' ? noDataMessage : loadingMessage}
        minRows="0"
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            style: { textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' },
          };
        }}
      />

      <CRow lg="12" className="mt-3 w-100 pagination-custom align-items-center d-flex  line-paging">
        <CCol lg="5" className="px-0 w-100 margin-mr py-1">
          <Pagination pagination={pagination} data={[]} page={1} setPage={0} />
        </CCol>
        <CCol lg="3">
          <div style={{ paddingLeft: "13%" }}>
            Copyright &#169; 2021 Microlistics
          </div>
        </CCol>
        <CCol lg="4" md="1" className="px-0 w-100 export-ml">
          {data?.length < 1 ? null : (
            <div className="pr-2">
              <Export filename={filename} customExportXls customExportPdf={customExportPdf} module={module} />
            </div>
          )}
        </CCol>
      </CRow>
    </div>
  );
};

export default TableFixedColumn;
