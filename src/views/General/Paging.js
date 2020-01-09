import React, { Component } from 'react';
import './Paging.css';

class Paging extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalRows: props.totalRows,
			exportExpand: false 
		};
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
	}

	createPageNumber = () => {
		if (this.props.maxPage > 1) {
			let pageNumber = [];
			let totalPage = this.props.maxPage;

			for (let i = 0 ; i < totalPage ; i++) {
				pageNumber.push(
					<li className={"btn btn-paging" + (this.props.currentPage === i + 1 ? "-active" : "")}
						id={i} name="pageNumber" key={i}
						onClick={this.numberClickEvent}>
						{i+1}
					</li>
				);
			}
			return pageNumber;
		}
    }
    
    showPageNumber = () => {
        return (
            <div>
                <span>{this.createPageNumber()} (Total {this.props.totalRows}) </span>

                <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.backPageClick}>
                    <i className="fa fa-chevron-left" aria-hidden="true" /> Back
                </button>

                <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.nextPageClick}>
                    Next <i className="fa fa-chevron-right text-center" aria-hidden="true" />
                </button>

                {/* // <ul className={"select-export" + (this.state.exportExpand ? " expand-export" : "")} id="select">
                    <li className="expand-style-export">
                        <input className="select_close-export" type="radio" name="export" id="export-btn-close" value="" />
                        <span className="select_label-export select_label-placeholder-export">Export</span>
                    </li>
                
                    <li className="select_items-export">
                        <input className="select_expand-export" type="radio" name="export" id="export-btn-opener" />
                        <label className="select_closeLabel-export" htmlFor="export-btn-close" onClick={this.triggerExportExpand}></label
                        <ul className="select_options-export">
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export" htmlFor="Export to PDF">
                                    <span className="pdf-icon">Export to PDF</span>
                                </label>
                            </li>
                            <li className="select_option-export">
                                <input className="select_input-export" type="radio" name="export" />
                                <label className="select_label-export option_radius-export" htmlFor="Export to XLS">
                                    <span className="excel-icon">Export to XLS</span>
                                </label>
                            </li>
                        </ul
                        <label className="select_expandLabel-export" htmlFor="export-btn-opener" onClick={this.triggerExportExpand} />
                    </li>
                    </ul> */}
            </div>
        );
    }

	triggerExportExpand = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { exportExpand: !prevState.exportExpand };
		});
	}
	

	nextPageClick = () => {
		this.props.nextPageClick();
	}

	backPageClick = () => {
		this.props.backPageClick();
	}

	render() {
        return this.props.maxPage > 1 ? this.showPageNumber() : null;
	}
}

export default Paging;