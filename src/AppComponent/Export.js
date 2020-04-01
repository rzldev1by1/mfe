import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Export.css';
import ExportExl from 'react-html-table-to-excel'

class Export extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: ""
        };
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
                                    <span className="pdf-icon"onClick={this.ExportPDF} >Export to PDF</span>
                                </label>
                            </li>
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export option_radius-export" htmlFor="Export to XLS">
                                    <span className="excel-icon" >
                                        <ExportExl className="btn excel" table="excel" filename="Report" sheet="sheet 4"buttonText="Export to XLS"/>
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