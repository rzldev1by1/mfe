// import library
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTable from 'react-table-v6';
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import EditRenameColumn from './EditRenameColumn'

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
  user,
  title,
  columnHidden,
  UrlHeader,
  editColumn,
}) => {
  const userId = useSelector((state) => state.user.userId);
  const [showMod, setShowMod] = useState(false)
  const [editColumnTemp, setEditColumnTemp] = useState({})
  const tableStatus = useSelector((state) => state.tableStatus);
  const ReactTableDraggableColumns = withDraggableColumns(ReactTable);
  const noDataMessage = (
    <div className="caution-caution">
      <div>No Data Available</div>
    </div>
  );
  const loadingMessage = (
    <div>
      <img src={loading} alt='' width="45" height="45" />
    </div>
  );
  const showModal = (show) => {
    setShowMod(show)
  }
  
  // List Header: to enable function draggable
  const draggableColumn = setDraggableColumn({ schemaColumn });

  // renew Schema column, to get old order column or additional logic
  const newSchema = renewColumn({ data, schemaColumn, module, userId, editColumnTemp, showModal, columnHidden , editColumn});
  
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
            onClick: (e) => {
              !!onClick && onClick(rowInfo.original, state, column, e, instance);
            },
            // eslint-disable-next-line no-restricted-globals
            style: {
              textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right',
              height: '3rem',
            },
          };
        }}
        defaultSortMethod={(a, b) => {
          let type = 'string';

          // check format if date
          if (a && a.includes('/')) {
            const str = a.split('/');
            const date = `${str[1]}-${str[0]}-${str[2]}`;
            a = new Date(date).getTime();
            type = 'date';
          }
          if (b && b.includes('/')) {
            const str = b.split('/');
            const date = `${str[1]}-${str[0]}-${str[2]}`;
            b = new Date(date).getTime();
            type = 'date';
          }

          // force null and undefined to the bottom
          a = a === null || a === undefined ? (type === 'string' ? '' : -999999999999) : a;
          b = b === null || b === undefined ? (type === 'string' ? '' : -999999999999) : b;

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
      <EditRenameColumn 
        showModal={showMod}
        setShowMod={setShowMod}
        setEditColumnTemp={setEditColumnTemp}
        editColumnTemp={editColumnTemp}
        user={user}
        title={title}
        fields={schemaColumn}
        columnHidden={columnHidden}
        UrlHeader={UrlHeader}
      />
    </div>
  )
}

export default Table
