// import library
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTable from 'react-table-v6';
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import EditRenameColumn from './EditRenameColumn';

// import style
import loading from '../../assets/icons/loading/LOADING-MLS-GRAY.gif';
import { setDraggableColumn, saveSchemaToLocal, renewColumn } from './service';
import 'react-table-v6/react-table.css';
import 'react-table-hoc-draggable-columns/dist/styles.css';
import './style.scss';

import endpoints from '../../helpers/endpoints';

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
  splitModule,
  editColumn,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const [showMod, setShowMod] = useState(false);
  const [editColumnTemp, setEditColumnTemp] = useState({});
  const tableStatus = useSelector((state) => state.tableStatus);
  const [fields, setFields] = useState(schemaColumn);
  const [newSchema, setNewSchema] = useState(schemaColumn);
  const markedRow = useSelector((state) => state.markedRow);
  const ReactTableDraggableColumns = withDraggableColumns(ReactTable);
  const noDataMessage = (
    <div className="caution-caution">
      <div>No Data Available</div>
    </div>
  );
  const loadingMessage = (
    <div style={{ background: 'transparent' }}>
      <img src={loading} alt="" width="45" height="45" />
    </div>
  );
  const showModal = (show) => {
    setShowMod(show);
  };

  // List Header: to enable function draggable
  const draggableColumn = setDraggableColumn({ fields });

  // renew Schema column, to get old order column or additional logic
  useEffect(() => {
    renewColumn({
      setNewSchema,
      data,
      fields,
      module,
      userId,
      editColumnTemp,
      showModal,
      columnHidden,
      editColumn,
      dispatch,
    });
  }, [data, fields, columnHidden]);
  return (
    <div
      className={`${className} ${editColumn === 'false' ? '' : 'show-edit-icon'} ${(data && data < 1) || data === undefined ? 'TableDownHover' : 'Table'
        }`}
    >
      <ReactTableDraggableColumns
        draggableColumns={{
          mode: 'reorder',
          draggable: draggableColumn,
          onDropSuccess: (draggedColumn, targetColumn, oldIndex, newIndex) => {
            saveSchemaToLocal({ setNewSchema, userId, schemaColumn: fields, module, draggedColumn, targetColumn, oldIndex, newIndex, dispatch });
            renewColumn({ setNewSchema, data, fields, module, userId, editColumnTemp, showModal, columnHidden, dispatch });
          },
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
            onClick: (e) => { onClick(rowInfo.original, state, column, e, instance); },
            style: {
              // textAlign: rowInfo?.original[column.id] ? 'left' : 'right',
              height: '3rem',
              backgroundColor: markedRow.includes(rowInfo?.index) ? 'aliceblue' : false,
            },
          };
        }}
        defaultSortMethod={(a, b) => {
          let type = 'string';
          a = a !== '-' ? a : '';
          b = b !== '-' ? b : '';
          a = a ? a.replaceAll(',', '') : '';
          b = b ? b.replaceAll(',', '') : '';

          // check format if date
          const formateMonths = endpoints.env.REACT_APP_API_URL_FORMATE_MONTHS;
          if (a && a.includes('/')) {
            const str = a.split('/');
            const date = formateMonths ? `${str[0]}-${str[1]}-${str[2]}` : `${str[1]}-${str[0]}-${str[2]}`;
            const tmp = new Date(date).getTime();
            if (!Number.isNaN(tmp)) {
              a = tmp;
              type = 'date';
            }
          }
          if (b && b.includes('/')) {
            const str = b.split('/');
            const date = formateMonths ? `${str[0]}-${str[1]}-${str[2]}` : `${str[1]}-${str[0]}-${str[2]}`;
            const tmp = new Date(date).getTime();
            if (!Number.isNaN(tmp)) {
              b = tmp;
              type = 'date';
            }
          }
          // end date

          // check format if number
          const regex = /^\d*(\.\d+)?$/;
          let typeA = 'string';
          let typeB = 'string';
          if (type === 'string' && a.match(regex)) {
            const tmp = parseFloat(a);
            if (!Number.isNaN(tmp)) {
              a = tmp;
              typeA = 'number';
            }
          } else if (type === 'string') {
            a = a.toLowerCase();
          }
          if (type === 'string' && b.match(regex)) {
            const tmp = parseFloat(b);
            if (!Number.isNaN(tmp)) {
              b = tmp;
              typeB = 'number';
            }
          } else if (type === 'string') {
            b = b.toLowerCase();
          }
          type = typeA === 'number' && typeB === 'number' ? 'number' : 'string';
          // end check number

          // force null and undefined to the bottom
          a = a ?? (type === 'string' ? '' : -999999999999);
          b = b ?? (type === 'string' ? '' : -999999999999);

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

      {editColumn === 'false' ? null : (
        <EditRenameColumn
          showModal={showMod}
          setShowMod={setShowMod}
          setEditColumnTemp={setEditColumnTemp}
          editColumnTemp={editColumnTemp}
          user={user}
          title={title}
          fields={fields}
          setFields={setFields}
          columnHidden={columnHidden}
          splitModule={splitModule}
          module={module}
          data={data}
        />
      )}
    </div>
  );
};

export default Table;
