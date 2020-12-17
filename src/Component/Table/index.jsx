// import library
import React from 'react'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import ReactTable from 'react-table-v6'
import withDraggableColumns from 'react-table-hoc-draggable-columns';

// import style
import loading from "assets/icons/loading/LOADING-MLS-GRAY.gif"
import { setDraggableColumn, saveSchemaToLocal, renewColumn } from "./service"
import 'react-table-v6/react-table.css'
import 'react-table-hoc-draggable-columns/dist/styles.css'
import "./style.scss";

const Table = ({
    headerColumn,
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
        <img src={loading} width='45' height='45' alt='' />
      </div>
    )
    const icon = (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
      </svg>
    )

    // List Header: to enable function draggable
    const draggableColumn = setDraggableColumn({ headerColumn })

    // renew Schema column, to get old order column or additional logic
    const newSchema = renewColumn({ headerColumn, module, userId })

    return (
      <div className="Table">
        <ReactTableDraggableColumns
          draggableColumns={{
                mode: 'reorder',
                draggable: draggableColumn,
                onDropSuccess: (draggedColumn, targetColumn, oldIndex, newIndex, oldOffset, newOffset) => saveSchemaToLocal({ userId, headerColumn, module, draggedColumn, targetColumn, oldIndex, newIndex })
            }}
          columns={newSchema}
          data={data}
          showPagination={false}
          style={style}
          noDataText={tableStatus === "noData" ? noDataMessage : loadingMessage}
          minRows='1'
          getTdProps={(state, rowInfo, column, instance) => {
                return {
                    style: { textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' }
                }
            }}
        />
      </div>
    )
}


Table.propTypes = {
    headerColumn: PropTypes.objectOf(PropTypes.object).isRequired,
    module: PropTypes.string.isRequired,
}

export default Table

