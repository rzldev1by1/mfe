import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css' 
import './StockMovementTable.css'
import CustomPagination from 'shared/table/CustomPagination'
import moment from 'moment';
import loading from "assets/icons/loading/LOADING-MLS-GRAY.gif"

// import mid from 'assets/img/field-idle.png'
// import down from 'assets/img/field-bot.png'
// import up from 'assets/img/field-top.png'

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import { CRow, CCol} from "@coreui/react";
import "react-table-hoc-fixed-columns/lib/styles.css";
import Export from "../../../shared/table/Export"
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

  getExportData = async () => {  
      console.log("Not Paginate API")
      return 0 
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
  ExportName = () => {
    let filename = ""
    let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let date1 = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      Seconds = date.getSeconds(),
      Minutes = date.getMinutes(),
      Hours = date.getHours();
    return filename = ("Microlistics_StockMovement." + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
  }

  ExportHeader = () => {
    let headers = ""
    return headers
  }
  ExportFont = () => {
    let Font = "";
    return Font;
  };

  ExportData = () => {
    let data = ""
    return data
  }

  ExportPDFName = () => {
    let name = ""
    return name 
  }

  formatDate = (date) => {
    let dates = moment(date).format('DD MMMM YYYY') 
    if (this.props.filterType === 'day') {
        dates = moment(date).format('DD MMMM YYYY')
    }
    else if (this.props.filterType === 'week') {
        let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
        dates = moment(date).format('DD MMMM YYYY')
        dates = dates + ' - ' + dates2
    }
    else if (this.props.filterType === 'month') {
        dates = moment(date).format('MMMM YYYY')
    } 
    return dates
}
  
    waitingStatus = () => {
      return (
        <div className='caution-caution' > <div>No Data Available</div> </div>
      )
    }

    noDataStatus = () => {
      return( 
        <div> <img src={loading} width='45' height='45'/> </div>
      )
    }

  render() {
    const { page, editColumnTemp } = this.state
    let { title, data, fields, onClick, pageSize = 50, height, pagination,dataExport,date_array, tableStatus  } = this.props
    const headerIcon = this.headerIcon(fields, editColumnTemp)
     

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
          noDataText={tableStatus=="noData"?this.waitingStatus():this.noDataStatus()} 
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
        <CRow className="mt-3 pagination-custom">
              <CCol lg="7" className="px-0 margin-mr">
              <CustomPagination data={data}
                        pagination={pagination}
                        goto={this.props.goto}
                        export={this.props.export} />
              </CCol>
              <CCol lg="5" className="px-0 export-ml">
                <Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
                    ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont} 
                    pdf={this.props.pdf}
                    excel={this.props.excel}
                    getExportData={() => this.getExportData()}
                />
            </CCol>
          </CRow>

          <table id="excel" style={{display: 'none'}}>
                    <thead>
                        <tr  className="border-bottom border-right text-center">
                            <th>Site </th>
                            <th>Client </th>
                            <th>Product </th>
                            <th>Description </th>
                            <th>UOM </th>
                            {date_array.map((date, index) =>
                                <th key={index} className="movement-header text-center border-right">
                                    <table>
                                        <tr>
                                            <th colSpan="4">{this.formatDate(date)}</th>
                                        </tr>
                                        <tr>
                                            <th width="25%">SA+</th>
                                            <th width="25%">SA-</th>
                                            <th width="25%">Rec</th>
                                            <th width="25%">Send</th>
                                        </tr>
                                    </table>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>  
                        {dataExport.map((data, index) =>
                            <tr ref={"row"+index} key={index}>
                                <td style={{textAlign: 'left'}}>{data.site}</td>
                                <td style={{textAlign: 'left'}}>{data.client}</td>
                                <td style={{textAlign: 'left'}}>{data.product}</td>
                                <td style={{textAlign: 'left'}} className="text-left">{data.product_name}</td>
                                <td style={{textAlign: 'left'}}>{data.packdesc}</td>
                                {data.detail.map(detail => 
                                <td>
                                <table>
                                    <td style={{textAlign: "right"}}> {detail.sa_plus ? detail.sa_plus : '-'}</td>
                                    <td style={{textAlign: "right"}}>{detail.sa_minus ? detail.sa_minus : '-'}</td>
                                    <td style={{textAlign: "right"}}>{detail.recv_weight ? detail.recv_weight : '-'}</td>
                                    <td style={{textAlign: "right"}}>{detail.send_weight ? detail.send_weight : '-'}</td>
                                </table>
                                </td>
                                )}
                            </tr>  
                        )}
                    </tbody>
                </table>

        </div>
      </React.Fragment>
    )
  }
}

export default StockMovementTable