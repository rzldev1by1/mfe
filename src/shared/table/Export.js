import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Export.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportExl from 'react-html-table-to-excel'
import loading from "assets/icons/loading/LOADING-MLS.gif"
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
            exportStatus: 'ready'
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
    exportPDF = async () => {
        this.changeExportStatus('wait');
        await this.props.getExportData()  
        const marginLeft = 40;
        
        const doc = this.examples();
        // const data = this.props.ExportData()
    
        doc.save(this.props.ExportName()+".pdf")
        this.changeExportStatus('ready')
      }
      exportXLS = async () => {
          this.changeExportStatus('wait');
          await this.props.getExportData()  
          document.getElementById("button-download-as-xls").click();
          this.changeExportStatus('ready')
        }

      examples = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);
 
      
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
      
      changeExportStatus = (status) => {
          this.setState({
            exportStatus: status
          })
      }
    
    render = () => {
        const {exportPdf, exportExcel, exportStatus} = this.state
        let styleButton = {}
        if(exportStatus=='wait'){
          styleButton = {pointerEvents:'none'}
        }
        return (            
            <div className="">
                <ButtonDropdown direction="up" style={styleButton} className=" d-flex float-right align-items-center" isOpen={this.state.dropdownOpen[13]} toggle={() => { this.toggle(13); }}>
                  <DropdownToggle  className="Dropdown-toggel btn-primary align-items-center" >
                      {/* <span className='export-export' style={{paddingRight:"6px"}}/> */}
                        <div style={{fontSize:"0.875rem", letterSpacing:"1px"}} >
                            {exportStatus=='ready'?'EXPORT':<img src={loading} className='mt-min-5' width='45' height='45'/>}
                        </div>
                  </DropdownToggle>
                    <DropdownMenu className={"no-shadow "+((exportPdf == 'false' || exportExcel == 'false')?' dropdown-single ':' Dropdown-menu ')} >
                      {(exportPdf == 'false')?'':
                        <DropdownItem className="export-pdf" onClick={() => this.exportPDF()}> 
                            <span className="icon-PDF" />EXPORT TO PDF
                        </DropdownItem>
                      }
                       {(exportExcel == 'false')?'':
                       <div>
                          <DropdownItem className="export-excel" onClick={() => this.exportXLS()} >
                          <span className="icon-XLS" /> EXPORT TO XLS   
                          </DropdownItem>
                          <div style={{display: 'none'}}> 
                            <ExportExl  className="Excel-bottom" 
                            table={this.props.secondTable=='true'?"excel2":"excel"} 
                            filename={this.props.ExportName()} 
                            sheet="sheet 1"
                            buttonText="EXPORT TO XLS" />
                          </div>
                       </div>
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