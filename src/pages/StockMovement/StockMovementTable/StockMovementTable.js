import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css' 
import './StockMovementTable.css'
import CustomPagination from 'shared/table/CustomPagination'

// import mid from 'assets/img/field-idle.png'
// import down from 'assets/img/field-bot.png'
// import up from 'assets/img/field-top.png'

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

class StockMovementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      showModal: false,
      editColumn: {},
      editColumnTemp: {}
    }
  }

  showModal = (show) => {
    this.setState({ showModal: show })
  }

  closeModal = (close, editColumnTemp) => {
    this.setState({ showModal: close, editColumn: editColumnTemp })
  }

  showColumn = (header, index, length) => {
    const { editColumn } = this.state
    let max = (length - Object.keys(editColumn).length) > 1
    let hide = editColumn[index] === undefined

    if (hide && max) {
      // hide column
      let obj = {
        [index]: header
      }

      let addColumn = {
        ...editColumn,
        ...obj
      }
      this.setState({ editColumn: addColumn })
    } else if ((!hide && max) || (!max && !hide)) {
      // show column
      let deleteColumn = {
        ...editColumn
      }
      delete deleteColumn[index]

      this.setState({ editColumn: deleteColumn })
    } else {
      return
    }
  }

  saveEdit = (editColumn) => {
    this.setState({ editColumnTemp: editColumn, showModal: false })
  }

  headerIcon = (header, editColumn) => {
    let listHeader = []
    header && header.map((data, i) => {
      let listColumn = []
      if (editColumn[i] === undefined) {
        data.columns.map((datax, index) => {
          let withIcon = <span className={i === 0 ? "text-light-gray" : 'blueColor'}>
            {datax.Header}
            {datax.sortable ?
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
              </svg> : null
            }
          </span>

          let obj = {
            "Header": withIcon,
            "accessor": datax.accessor,
            'sortable': datax.sortable || false,
            'resizable': datax.resizable || false,
            'style': datax.style || null,
            'className': datax.className || null,
            'headerClassName': datax.headerClassName || null,
            'headerStyle': datax.headerStyle || null,
            'width': datax.width || undefined,
            'Cell': datax.Cell,
          }
          listColumn = [...listColumn, obj]
        })

        let new_header = <span className="text-light-gray">
          {data.Header}
        </span>
        let obj = {
          "Header": new_header,
          'columns': listColumn,
          "fixed": data.fixed || null,
          'headerClassName': data.headerClassName || null,
          'headerStyle': data.headerStyle || null,
          'width': data.width || undefined,
        }
        return listHeader = [...listHeader, obj]

      } else {
        return listHeader = [...listHeader]
      }
    })
    return listHeader
  }

  render() {
    const { page, editColumnTemp } = this.state
    let { title, data, fields, onClick, pageSize = 50, height, pagination } = this.props
    const headerIcon = this.headerIcon(fields, editColumnTemp)
    console.log(pagination)
    return (
      <React.Fragment>
        <div className="stockMovement">
        <ReactTableFixedColumns
          columns={headerIcon}
          data={data}
          showPagination={false}
          page={page}
          defaultPageSize={pageSize}
          style={{ height }} 
          minRows='0'
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                !!onClick && onClick(rowInfo.original, state, column, e, instance)
              },
              style: { cursor: !!onClick && 'pointer', textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' }
            }
          }}
          {...this.props}
        />
        <CustomPagination
          data={data}
          pagination={pagination}
          goto={this.props.goto}
          export={this.props.export}
        />
        </div>
      </React.Fragment>
    )
  }
}

export default StockMovementTable