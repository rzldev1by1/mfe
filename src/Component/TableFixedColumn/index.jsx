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

// import style
import 'react-table-v6/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import loading from 'assets/icons/loading/LOADING-MLS-GRAY.gif';
import './style.scss';

const TableFixedColumn = ({
  schemaColumn,
  data,
  style,
  page,
  pageSize,
  noDataText,
  tableStatus,
  groupHeader = false,
}) => {
  const ReactTableFixedColumns = withFixedColumns(ReactTable);
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
    </div>
  );
};

export default TableFixedColumn;
