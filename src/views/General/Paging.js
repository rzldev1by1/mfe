import React, { Component,Fragment } from 'react';
import './Paging.css';

class Paging extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            data: [this.maxPage],
			totalRows: props.totalRows,
            exportExpand: false ,
            value: null
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
	}

	createPageNumber = () => {
		if (this.props.maxPage >1) {
			let pageNumber = [];
			let totalPage = this.props.maxPage;

			for (let i = 0 ; i <=totalPage; i++) {
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

    handleChangeSearch(event) {
        this.setState({value: event.target.value});
        const value = event.target.value.replace(/\+|-/ig, '');
        this.setState({financialGoal: value});
      }
    handleSubmit = () => {
        this.props.numberEventClick(this.state.value.trim())
    }
     
    showPageNumber = () => {
        return (
            
                <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0" : "d-none"}>
                    <groupbox className="group">
                        <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.firstPageClick}>
                            <i className="fa fa-chevron-left" aria-hidden="true" /><i className="fa fa-chevron-left" aria-hidden="true" />
                        </button>
                        <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.backPageClick}>
                            <i className="fa fa-chevron-left" aria-hidden="true" />
                        </button>
                        
                         <span>{this.createPageNumber()}</span>

                         <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.nextPageClick}>
                             <i className="fa fa-chevron-right  text-center" aria-hidden="true" /> 
                         </button>
                         <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.lastPageClick}>
                            <i className="fa fa-chevron-right  text-center" aria-hidden="true" /><i className="fa fa-chevron-right  text-center" aria-hidden="true" /> 
                         </button>
                         <page className={"btn p-0 btn-pagingNav" , "-inactive"}>Go To Page</page>

                         <form onSubmit={this.handleSubmit} style={{ display: "contents" }}>
                            <input type="number" className=" search_1 btn p-0 "  maxLength="4" value={this.state.financialGoal} 
                                    style={{marginLeft:10}} onChange={this.handleChangeSearch} />
                            <button style={{marginLeft:10}}  className="submit_1">Go</button>
                        </form>
                    </groupbox>              
                 <span> Showing {this.props.currentPage} to {Math.round (this.props.maxPage +1)} of {this.props.totalRows} Entries </span>
                        
                 {/* <ul className={"select-export" + (this.state.exportExpand ? " expand-export" : "")} id="select">
                    <li className="expand-style-export">
                        <input className="select_close-export" type="radio" name="export" id="export-btn-close" value="" />
                        <span className="select_label-export select_label-placeholder-export">Export</span>
                    </li>
                
                    <li className="select_items-export">
                        <input className="select_expand-export" type="radio" name="export" id="export-btn-opener" />
                        <label className="select_closeLabel-export" htmlFor="export-btn-close" onClick={this.triggerExportExpand}></label>
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

    lastPageClick =() =>{
        this.props.lastPageClick();
    }

	nextPageClick = () => {
		this.props.nextPageClick();
	}

	backPageClick = () => {
		this.props.backPageClick();
    }
	render() {
        return this.showPageNumber();
    }
    
    


}

export default Paging;