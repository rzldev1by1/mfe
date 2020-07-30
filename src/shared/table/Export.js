import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Export.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportExl from 'react-html-table-to-excel'
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';

class Export extends Component {
	constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
		this.state = { 
            exportExpand: false,
            value: "",
            dropdownOpen: new Array(19).fill(false),
            exportPdf: this.props.pdf || true,
            exportExcel: this.props.excel || true,
        };
      }
      toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
          dropdownOpen: newArray,
        });
      }

    Date = () => {
        let dateNow= ""
        let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let date1 = date.getDate(),
              month = date.getMonth(),
              year = date.getFullYear();
         return dateNow=(date1 +"-"+ arrmonth[month] +"-"+ year)  
      }
    exportPDF = () => {
        const marginLeft = 40;

        const doc = this.examples();
        const data = this.props.ExportData()
    
        doc.save(this.props.ExportName()+".pdf")
      }

      examples = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);

        // From HTML
        doc.autoTable({ html: '.table' })
      
        // From Javascript
        var finalY = doc.previousAutoTable.finalY || 10
        doc.text( this.props.ExportPDFName + " Data Microlistics  " + this.Date() , 14, finalY + 15)
        doc.autoTable({
          startY: finalY + 20,
          head: [this.props.ExportHeader()],
          body: this.props.ExportData(),
          styles: { cellPadding: 0.5, fontSize: this.props.ExportFont },
        })
      
        finalY = doc.previousAutoTable.finalY
        doc.autoTable({
          startY: finalY + 20,
          html: '.table',
          useCss: true,
        })
      
        return doc
      }
      
   
    
    render = () => {
        const {exportPdf, exportExcel} = this.state
        return (            
            <div className="">
                <ButtonDropdown direction="up" className=" d-flex float-right align-items-center" isOpen={this.state.dropdownOpen[13]} toggle={() => { this.toggle(13); }}>
                  <DropdownToggle  className="Dropdown-toggel" >
                      <span className='export-export' style={{paddingRight:"6px"}}/>
                        <div style={{paddingTop:"7px",fontSize:"18px"}} >EXPORT</div>
                  </DropdownToggle>
                    <DropdownMenu className={" "+((exportPdf == 'false' || exportExcel == 'false')?' dropdown-single ':' Dropdown-menu ')} >
                      {(exportPdf == 'false')?'':
                        <DropdownItem className="export-pdf"> 
                            <span className="pdf-icon"onClick={() => this.exportPDF()} >EXPORT TO PDF</span> 
                        </DropdownItem>
                      }
                       {(exportExcel == 'false')?'':
                       <DropdownItem className="export-excel" >
                       <span className="excel-icon" >
                          <ExportExl  className="Excel-bottom" 
                                      table="excel" 
                                      filename={this.props.ExportName()} 
                                      sheet="sheet 1"
                                      buttonText="EXPORT TO XLS"/>
                        </span>
                       </DropdownItem>
                       }
                        
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
    
	triggerExportExpand = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { exportExpand: !prevState.exportExpand };
		});
    }
}

export default Export;