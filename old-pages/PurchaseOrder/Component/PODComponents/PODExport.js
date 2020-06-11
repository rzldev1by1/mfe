import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import '../../../../AppComponent/Export.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportExl from 'react-html-table-to-excel'

class PODExport extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: "",
        };
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
        //title
        var finalY = doc.previousAutoTable.finalY || 20
        doc.text( this.props.ExportPDFName()+ " Data Microlistics  " + this.Date() , 14, finalY + 15)

        //header table
        doc.autoTable({ html: '#headerPdf',
        startY: finalY + 35,
        styles: {
            fillColor: [255, 255, 255]
        },
        columnStyles: {
            0: {cellWidth: 90,fillColor:'#2980ba',textColor:'#ffffff',fontStyle:'bold'},
            1: {cellWidth: 140},
            2: {cellWidth: 20,fillColor:'#ffffff'},
            3: {cellWidth: 120,fillColor:'#2980ba',textColor:'#ffffff',fontStyle:'bold'},
            4: {cellWidth: 'auto'},
            5: {cellWidth: 20,fillColor:'#ffffff'},
            6: {cellWidth: 100,fillColor:'#2980ba',textColor:'#ffffff',fontStyle:'bold'},
            7: {cellWidth: 120}
        }
        })        

        // From Javascript
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + 10,
          head: [this.props.ExportHeader()],
          body: this.props.ExportData(),
          styles: { cellPadding: 0.5, fontSize: this.props.ExportFont() },
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
        return (
            // <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" : "d-none"}>
            // <div className={"card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent"} style={{marginTop:"-20px"}}>               
            <div className="col-3 pl-0 pr-0" style={{paddingTop:"7px"}}>
                 <ul className={"select-export" + (this.state.exportExpand ? "" : "")} id="select" style={{marginTop:"-2px"}}>
                    <li className="expand-style-export" >
                        <input className="select_close-export" type="radio" name="export" id="export-btn-close" value="" />
                        <span className="select_label-export1 select_label-placeholder-export">Export</span>
                    </li>
                
                    <li className="select_items-export">
                        <input className="select_expand-export" type="radio" name="export" id="export-btn-opener" />
                        <label className="select_closeLabel-export" htmlFor="export-btn-close" onClick={this.triggerExportExpand} />
                        <ul className="select_options-export">
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export option-radius-export-pdf" htmlFor="Export to PDF">
                                    <label className="border-pdf">
                                      <span className="pdf-icon"onClick={() => this.exportPDF()} >Export to PDF</span>
                                    </label>
                                </label>
                            </li>
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export option_radius-export" htmlFor="Export to XLS">
                                    <label className="border-xcl">
                                        <span className="excel-icon" >
                                            <ExportExl  className="btn excel" 
                                                        table="excel" 
                                                        filename={this.props.ExportName()} 
                                                        sheet="sheet 1"
                                                        buttonText="Export to XLS"/>
                                        </span>
                                    </label>
                                </label>
                            </li>
                        </ul>
                        <label className="select_expandLabel-export" htmlFor="export-btn-opener" onClick={this.triggerExportExpand} />
                    </li>
                </ul>
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

export default PODExport;