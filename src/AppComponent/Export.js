import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Export.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportExl from 'react-html-table-to-excel'

class Export extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: "",
            people: [
                { name: "Keanu Reeves", profession: "Actor" },
                { name: "Lionel Messi", profession: "Football Player" },
                { name: "Cristiano Ronaldo", profession: "Football Player" },
                { name: "Jack Nicklaus", profession: "Golf Player" },
              ]
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
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title =   this.props.ExportPDFName()+ " Data Microlistics  " + this.Date();
        const headers = [this.props.ExportHeader()];
    
        const data = this.props.ExportData()
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(this.props.ExportName())
      }
    
    render = () => {
        return (
            // <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" : "d-none"}>
            <div className={"card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent"} style={{marginTop:"-20px"}}>               
                 <ul className={"select-export" + (this.state.exportExpand ? " expand-export" : "")} id="select">
                    <li className="expand-style-export">
                        <input className="select_close-export" type="radio" name="export" id="export-btn-close" value="" />
                        <span className="select_label-export1 select_label-placeholder-export">Export</span>
                    </li>
                
                    <li className="select_items-export">
                        <input className="select_expand-export" type="radio" name="export" id="export-btn-opener" />
                        <label className="select_closeLabel-export" htmlFor="export-btn-close" onClick={this.triggerExportExpand} />
                        <ul className="select_options-export">
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export" htmlFor="Export to PDF">
                                    <span className="pdf-icon"onClick={() => this.exportPDF()} >Export to PDF</span>
                                </label>
                            </li>
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export option_radius-export" htmlFor="Export to XLS">
                                    <span className="excel-icon" >
                                        <ExportExl  className="btn excel" 
                                                    table="excel" 
                                                    filename={this.props.ExportName()} 
                                                    sheet="sheet 1"
                                                    buttonText="Export to XLS"/>
                                    </span>
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

export default Export;