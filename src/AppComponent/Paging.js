import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Paging.css';

class Paging extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: ""
        };
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
	}

	// createPageNumber = () => {
	// 	if (this.props.maxPage >1) {
	// 		let pageNumber = [];
	// 		let totalPage = this.props.maxPage;

	// 		for (let i = 0 ; i < totalPage; i++) {
	// 			pageNumber.push(
	// 				<li className={"btn btn1 btn-paging" + (this.props.currentPage ===  i + 1 ? "-active" : "")}
	// 					id={i} name="pageNumber" key={i}
	// 					onClick={this.numberClickEvent}>
	// 					{i+1}
	// 				</li>
	// 			);
	// 		}
	// 		return pageNumber;
    //     }
    // }
   
    createPageNumber = () => {
        let current = this.props.currentPage,
            totalPage = this.props.maxPage,
            delta = 1,
            left = current - delta - 1,
            right = current + delta + 0,
            range = [],
            pageNumber = [],
            l;
            
            if(current<2){
                right = current + delta + 1;
                left = current - delta - 1;
            }

        for (let i = 0; i <= totalPage; i++) {
            if (i == totalPage || i >= left && i < right) {
                range.push(i);
            }
        }
    
        for (let i of range) {
            pageNumber.push(
                <li className={"btn btn1 btn-paging" + (this.props.currentPage ===  i + 1 ? "-active" : "")}
                    id={i} name="pageNumber" key={i}
                    onClick={this.numberClickEvent}>
                    {i+1}
                </li>
            );
            
        }
        return pageNumber;
    }
   
    handleChangeSearch = (e) => {
        const value = (e.target.validity.valid) ? e.target.value : this.state.value;
        this.setState({ value: value });
    }
    
    handleSubmit = () => {
        if(this.state.value > Math.ceil(this.props.maxPage))
        {
            alert('max page is '+ Math.ceil(this.props.maxPage))
        }
        else{
            this.props.numberEventClick(this.state.value.trim())
        }
    }
    
    pageNumber = () => {
        if(this.props.maxPage > 1){
           return this.createPageNumber() 
        }
        else
        {
           return <li className={"btn btn1 btn-paging" + (this.props.currentPage + 1 ? "-active" : "") } >1</li>
        }
    }

    render = () => {
        return (
            // <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" : "d-none"}>
            //<div className={"text-left border-company border-top-0 pl-0 pr-0 bg-transparent"}>
            <div className="col-9 pl-0 pr-0">
                <div style={{display :"flex"}}>
                <InputGroup className="group1">
                    <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive ")} onClick={this.firstPageClick}>
                        <i className=" iconU-firstPage icon" aria-hidden="true" />
                    </button>
                    <button style={{outline:"solid #fff"}}  className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive ")} onClick={this.backPageClick}>
                        <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
                    </button>
                    
                        <span className={"number"} >{this.pageNumber()}</span>

                        <button style={{outline:"solid #fff" , marginLeft:"3px"}} className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive ")} onClick={this.nextPageClick}>
                            <i className="fa fa-angle-right fa-2x" aria-hidden="true" /> 
                        </button>
                        <button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive ")} onClick={this.lastPageClick}>
                        <i className=" iconU-lastPage icon" aria-hidden="true" />
                        </button>
                </InputGroup>
                <InputGroup className="group2">
                    <div className="text">
                        <span style={{color:'#B4B9BB'}} className="p-0">Go to page</span>
                        <form onSubmit={e => { e.preventDefault() ; this.handleSubmit() }}>
                        <input type="text" pattern="[0-9]*"  className="search_1" maxLength="4"  placeholder={Math.ceil(this.props.maxPage)} value={this.state.value} onChange={e => this.handleChangeSearch(e)} />
                        <button className="submit_1" style={{color:"#637175"}}>Go <i className="fa fa-angle-right fa-2x logo" /> </button>
                    </form>
                    </div>
                </InputGroup>
                    <span className="showing">
                        <a style={{color:"#B4B9BB" , marginRight:"2%"}}>Showing</a>
                        <a style={{marginRight:"2%"}}>{this.props.startIndex + 1}</a>
                        <a style={{marginRight:"2%"}}>to</a>
                        <a style={{marginRight:"2%"}}>{this.props.currentPage === Math.ceil(this.props.maxPage) ? this.props.totalRows : this.props.lastIndex}</a>
                        <a style={{marginRight:"2%"}}>of</a>
                        <a style={{marginRight:"2%"}}>{this.props.totalRows}</a>
                        <a style={{color:"#B4B9BB"}}> entries</a>
                    </span>
                </div>                
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

}

export default Paging;