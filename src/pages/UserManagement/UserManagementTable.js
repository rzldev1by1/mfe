import React from 'react'
import ReactTable from 'react-table-v6'
import CustomPagination from 'shared/table/CustomPagination'
import { IoIosArrowDown } from 'react-icons/io'
import { CRow, CCol} from "@coreui/react";
import Export from "../../shared/table/Export"
import loading from "../../assets/icons/loading/LOADING-MLS-GRAY.gif"

class UMCustomTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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
  
    headerIcon = (data, header, editColumn) => {
     const {dimension} = this.props;

      let listHeader = []
      header && header.map((h, index) => {
        
        if (!editColumn[index]) {
          let withIcon = <span className="text-light-gray">
            {h.Header} {h.sortable === false ?
              null : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
              </svg>
            }
          </span>
          let obj = {
            Header: withIcon,
            Cell: h.Cell,
            accessor: h.accessor,
            sortable: h.sortable === false ? false : true,
            resizable: h.resizable || false,
            width: h.width,
            className: 'text-row-centre'
            
          }
         
          return listHeader = [...listHeader, obj]
        } else {
          return listHeader = [...listHeader]
        }
      })
  
      
      listHeader = [...listHeader]
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
      return filename = ("Microlistics_PurchaseOrder." + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
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
  
  
    render() {
      const { showModal, editColumn, editColumnTemp } = this.state    
      let { title, data, fields, onClick, height, pagination } = this.props
      const headerIcon = this.headerIcon(data, fields, editColumnTemp)      
      return (
        <React.Fragment>
          <ReactTable
            columns={headerIcon}
            data={data}
            defaultPageSize={50}
            showPagination={false}
            noDataText={<div><img src={loading} width='45' height='45'/></div>}
            // noDataText={"Please Wait..."}
            style={{ height }}
            minRows='0'
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  !!onClick && onClick(rowInfo.original, state, column, e, instance)
                },
                style: {
                  cursor: !!onClick && 'pointer',
                  textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right'
                }
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
                    ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont} />
            </CCol>
          </CRow>
         
        </React.Fragment>
      )
    }
  }
  
  export default UMCustomTable