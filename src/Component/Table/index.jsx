/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// import library
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactTable from 'react-table-v6'
import withDraggableColumns from 'react-table-hoc-draggable-columns';

// import style
import loading from "assets/icons/loading/LOADING-MLS-GRAY.gif"
import { setDraggableColumn, saveSchemaToLocal, renewColumn } from "./service"
import 'react-table-v6/react-table.css'
import 'react-table-hoc-draggable-columns/dist/styles.css'
import "./style.scss";

const Table = ({
    schemaColumn,
    data,
    style,
    module,
    page,
    pageSize,
    noDataText,
    tableStatus,
    groupHeader = false
}) => {
    const userId = useSelector(state => state.user.userId)
    const ReactTableDraggableColumns = withDraggableColumns(ReactTable);
    const noDataMessage = (
      <div className='caution-caution'> 
        <div>No Data Available</div>
      </div>
)
    const loadingMessage = (
      <div> 
        <img src={loading} width='45' height='45' />
      </div>
)
    const icon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" /></svg>

    // List Header: to enable function draggable
    const draggableColumn = setDraggableColumn({ schemaColumn })

    // renew Schema column, to get old order column or additional logic
    const newSchema = renewColumn({ schemaColumn, module, userId })

    return (
      <div className="Table">
        <ReactTableDraggableColumns
          draggableColumns={{
                    mode: 'reorder',
                    draggable: draggableColumn,
                    onDropSuccess: (draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset) => saveSchemaToLocal({ userId, schemaColumn, module, draggedColumn, targetColumn, oldIndex, newIndex })
                }}
          columns={newSchema}
          data={data}
          showPagination={false}
          style={style}
          noDataText={tableStatus === "noData" ? noDataMessage : loadingMessage}
          minRows='1'
          getTdProps={(state, rowInfo, column,  instance) => {
                    return {
                        // eslint-disable-next-line no-restricted-globals
                        style: { textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' }
                    }
                }}
        />

      </div>
    )
}

export default Table