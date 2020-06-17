import React, { Component, Fragment } from 'react';
import { InputGroup,  Modal, ModalBody, ModalHeader } from 'reactstrap'
import './Paging.css';
import logo_confirm from '../assets/img/brand/LOGO5@2x.png'

class Paging extends Component {
	constructor(props) {
        super(props);

		this.state = { 
            exportExpand: false,
            value: "",
            notifPaging: false
        };
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
    }
    
    createPageNumber = (currentPage,lastPage, toClickedPage) => {
        let current = currentPage,
            totalPage = lastPage,
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

        for (let i = 0; i < totalPage; i++) {
            if (i == totalPage || i >= left && i < right) {
                range.push(i);
            }
        }
         
        for (let i of range) {
            pageNumber.push(
                <li className={"btn btn1 btn-paging" + (currentPage ===  i + 1 ? "-active" : "")}
                    id={i} name="pageNumber" key={i}
                    onClick={() => toClickedPage(i + 1)}>
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

    closeConfirmDialog = () => {
       this.setState({ notifPaging: false });
    }
    
    handleSubmit = (lastPage, toSpecificPage) => {
        if(this.state.value > Math.ceil(lastPage))
        {
            this.setState({
                notifPaging:true
            })
        }
        else{
            toSpecificPage(this.state.value.trim())
        }
    }
    
    pageNumber = (currentPage,lastPage, toClickedPage) => {
        if(lastPage > 1){
           return this.createPageNumber(currentPage,lastPage, toClickedPage) 
        }
        else
        {
           return <li className={"btn btn1 btn-paging" + (currentPage ? "-active" : "") } >1</li>
        }
    }

    render = () => {
        const {totalRows,from,to,firstPage,lastPage,currentPage, nextPage, prevPage, toFirstPage, toLastPage, toClickedPage,toSpecificPage} = this.props
        return (
            // <div className={this.props.maxPage > 1 ? "card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" : "d-none"}>
            //<div className={"text-left border-company border-top-0 pl-0 pr-0 bg-transparent"}>
            <div className="col-9 pl-0 pr-0">
                <div style={{display :"flex"}}>
                <InputGroup className="group1">

                    {/* {arrow to first} */}
                    <button className={"btn p-0 btn-pagingNav" + (currentPage > 1 ? "" : "-inactive ")} onClick={() => toFirstPage(1)}>
                        <i className=" iconU-firstPage icon" aria-hidden="true" />
                    </button>

                    {/* {back 1 step} */}
                    <button style={{outline:"solid #fff"}}  className={"btn p-0 btn-pagingNav" + (currentPage > 1 ? "" : "-inactive ")} onClick={()=> prevPage(currentPage-1)}>
                        <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
                    </button>
                    
                    <span className={"number"} >{this.pageNumber(currentPage, lastPage, toClickedPage)}</span>

                    <button style={{outline:"solid #fff" , marginLeft:"3px"}} className={"btn p-0 btn-pagingNav" + (currentPage < lastPage ? "" : "-inactive ")} onClick={() => nextPage(currentPage+1)}>
                        <i className="fa fa-angle-right fa-2x" aria-hidden="true" /> 
                    </button>
                    <button className={"btn p-0 btn-pagingNav" + (currentPage < lastPage ? "" : "-inactive ")} onClick={() => toLastPage(lastPage)}>
                    <i className=" iconU-lastPage icon" aria-hidden="true" />
                    </button>
                </InputGroup>
                <InputGroup className="group2">
                    <div className="text">
                        <span style={{color:'#B4B9BB'}} className="p-0">Go to page</span>
                        <form onSubmit={e => { e.preventDefault() ; this.handleSubmit(lastPage,toSpecificPage) }}>
                        <input required type="text" pattern="[0-9]*"  className="search_1" maxLength="4"  placeholder={lastPage} value={this.state.value} onChange={e => this.handleChangeSearch(e)} />
                        <button className="submit_1" style={{color:"#637175"}}>Go <i className="fa fa-angle-right fa-2x logo" /> </button>
                    </form>
                    </div>
                </InputGroup>
                    <span className="showing">
                        <a style={{color:"#B4B9BB" , marginRight:"2%"}}>Showing</a>
                        <a style={{marginRight:"2%"}}>{from}</a>
                        <a style={{marginRight:"2%"}}>to</a>
                        <a style={{marginRight:"2%"}}>{to}</a>
                        <a style={{marginRight:"2%"}}>of</a>
                        <a style={{marginRight:"2%"}}>{totalRows}</a>
                        <a style={{color:"#B4B9BB"}}> entries</a>
                    </span>
                </div>      
            <Modal isOpen={this.state.notifPaging} centered={true}  
             onOpened={() => this.state.notifPaging ? setTimeout(() => { this.closeConfirmDialog() }, 3000) : {}}
                contentClassName="modal-content-paging"
                >
                <ModalBody >
                <div className="d-flex d-inline-flex">
                    <img src={logo_confirm} alt="logo" style={{ width: "20%", height: "20%" }} />
                    <label className="pl-3 font">
                    Only {Math.ceil(this.props.maxPage)} page are available on this screen, please try again. <br />
                    
                    </label>
                </div>
                </ModalBody> 
            </Modal>
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