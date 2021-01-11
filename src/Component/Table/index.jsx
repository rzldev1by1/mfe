// import library
import React from 'react';
import { useSelector } from 'react-redux';
import ReactTable from 'react-table-v6';
import withDraggableColumns from 'react-table-hoc-draggable-columns';

// import style
import loading from '../../assets/icons/loading/LOADING-MLS-GRAY.gif';
import { setDraggableColumn, saveSchemaToLocal, renewColumn } from './service';
import 'react-table-v6/react-table.css';
import 'react-table-hoc-draggable-columns/dist/styles.css';
import './style.scss';

const Table = ({
  schemaColumn,
  onClick,
  data,
  style,
  module,
  className,
  page,
  setPage,
  noDataText,
  tableStatus,
  groupHeader = false,
}) => {
  const userId = useSelector((state) => state.user.userId);
  const ReactTableDraggableColumns = withDraggableColumns(ReactTable);
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

  // List Header: to enable function draggable
  const draggableColumn = setDraggableColumn({ schemaColumn });

  // renew Schema column, to get old order column or additional logic
  const newSchema = renewColumn({ schemaColumn, module, userId });

  return (
    <div className={`${className} ${(data && data < 1) || data === undefined ? 'TableDownHover' : 'Table'}`}>
      <ReactTableDraggableColumns
        draggableColumns={{
          mode: 'reorder',
          draggable: draggableColumn,
          onDropSuccess: (draggedColumn, targetColumn, oldIndex, newIndex) =>
            saveSchemaToLocal({ userId, schemaColumn, module, draggedColumn, targetColumn, oldIndex, newIndex }),
        }}
        columns={newSchema}
        data={data}
        showPagination={false}
        defaultPageSize={50}
        style={style}
        noDataText={tableStatus === 'noData' ? noDataMessage : loadingMessage}
        minRows="1"
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              !!onClick && onClick(rowInfo.original, state, column, e, instance);
            },
            // eslint-disable-next-line no-restricted-globals
            style: {
              textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right',
              height: '3rem',
            },
          };
        }}
        defaultSortMethod={(a, b, desc) => {
          let type = 'string';

          //check format if date
          if (a && a.includes('/')) {
            let str = a.split('/');
            let date = `${str[1]}-${str[0]}-${str[2]}`;
            a = new Date(date).getTime();
            type = 'date';
          }
          if (b && b.includes('/')) {
            let str = b.split('/');
            let date = `${str[1]}-${str[0]}-${str[2]}`;
            b = new Date(date).getTime();
            type = 'date';
          }

          // force null and undefined to the bottom
          a = a === null || a === undefined ? (type == 'string' ? '' : -999999999999) : a;
          b = b === null || b === undefined ? (type == 'string' ? '' : -999999999999) : b;

          // force any string values to lowercase
          a = typeof a === 'string' ? a.toLowerCase() : a;
          b = typeof b === 'string' ? b.toLowerCase() : b;
          // Return either 1 or -1 to indicate a sort priority
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // returning 0, undefined or any falsey value will use subsequent sorts or
          // the index as a tiebreaker
          return 0;
        }}
      />
    </div>
  );
};

export default Table;
