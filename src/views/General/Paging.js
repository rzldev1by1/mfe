import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap';
import './Paging.css';

class Paging extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: null
        };
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
	}

	createPageNumber = () => {
		if (this.props.maxPage >1) {
			let pageNumber = [];
			let totalPage = this.props.maxPage;

			for (let i = 0 ; i <= totalPage; i++) {
				pageNumber.push(
					<li className={"btn btn-paging" + (this.props.currentPage ===  i + 1 ? "-active" : "")}
						id={i} name="pageNumber" key={i}
						onClick={this.numberClickEvent}>
						{i+1}
					</li>
				);
			}
			return pageNumber;
        }
    }

    handleChangeSearch = (e) => {
        const value = e.target.value.replace(/\+|-/ig, '');
        this.setState({ value: value });
    }

    handleSubmit = () => {
        this.props.numberEventClick(this.state.value.trim())
    }
     
    showPageNumber = () => {
        return (
            <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" : "d-none"}>
                <InputGroup className="group">
                    <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.firstPageClick}>
                        <i className="fa fa-angle-double-left fa-2x" aria-hidden="true" />
                    </button>
                    <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.backPageClick}>
                        <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
                    </button>
                    
                        <span>{this.createPageNumber()}</span>

                        <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.nextPageClick}>
                            <i className="fa fa-angle-right fa-2x" aria-hidden="true" /> 
                        </button>
                        <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.lastPageClick}>
                        <i className="fa fa-angle-double-right fa-2x" aria-hidden="true" />
                        </button>

                        <span className="p-0">Go To Page</span>

                        <form onSubmit={e => { e.preventDefault() ; this.handleSubmit() }}>
                        <input type="number" className="search_1" maxLength="4" value={this.state.value} onChange={e => this.handleChangeSearch(e)} />
                        <button className="submit_1">Go</button>
                    </form>

                    <span>Showing {this.props.startIndex + 1} to {this.props.currentPage === parseInt(this.props.maxPage + 1) ? this.props.totalRows : this.props.lastIndex} of {this.props.totalRows} Entries</span>
                </InputGroup>              
                        
                 {/* <ul className={"select-export" + (this.state.exportExpand ? " expand-export" : "")} id="select">
                    <li className="expand-style-export">
                        <input className="select_close-export" type="radio" name="export" id="export-btn-close" value="" />
                        <span className="select_label-export select_label-placeholder-export">Export</span>
                    </li>
                
                    <li className="select_items-export">
                        <input className="select_expand-export" type="radio" name="export" id="export-btn-opener" />
                        <label className="select_closeLabel-export" htmlFor="export-btn-close" onClick={this.triggerExportExpand} />
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
                        </ul>
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
	
    firstPageClick =() =>{
        this.props.firstPageClick();
    }

	nextPageClick = () => {
		this.props.nextPageClick();
	}

	backPageClick = () => {
		this.props.backPageClick();
    }

    lastPageClick =() =>{
        this.props.lastPageClick();
    }

	render() {
        return this.showPageNumber();
    }
    
}

export default Paging;