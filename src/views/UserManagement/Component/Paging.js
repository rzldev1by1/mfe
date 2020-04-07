import React, { Component } from 'react'
import { InputGroup } from 'reactstrap'
import './Paging.css'

const Paging  = (props) => {
  const {totalPage, displayRows,startIndex, lastIndex} = props;

  function displayPage() {
    var arrayNumber = [];
      for (var i = 0; i < totalPage; i++) {
        arrayNumber.push(<li className={"btn btn-paging"+ (((i+1)=== parseInt(lastIndex/displayRows))?'-active':'')}
        id={i} name="pageNumber" key={i}>{i+1}</li>);
      }
      return arrayNumber;
  }
  return (
    <div className={"card-footer text-left border-company border-top-0 pl-0 pr-0 bg-transparent" }>
        <div style={{display :"flex"}}>
        <InputGroup className="group1">
            <button className={"btn p-0 btn-pagingNav"} >
                <i className=" iconU-firstPage icon" aria-hidden="true" />
            </button>
            <button className={"btn p-0 btn-pagingNav"}>
                <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
            </button>

                <span>{displayPage()}</span>

                <button className={"btn p-0 btn-pagingNav"} >
                    <i className="fa fa-angle-right fa-2x" aria-hidden="true" />
                </button>
                <button className={"btn p-0 btn-pagingNav"} >
                    <i className=" iconU-lastPage icon" aria-hidden="true" />
                </button>
        </InputGroup>
        <InputGroup className="group2">
            <div className="text">
                <span style={{color:'#B4B9BB'}} className="p-0">Go to page</span>
                <form >
                <input type="text" className="search_1" maxLength="4" defaultValue=""/>
                <button className="submit_1" style={{color:"#637175"}}>Go <i className="fa fa-angle-right fa-2x logo" /> </button>
            </form>
            </div>
        </InputGroup>
            <span className="show">
                <a style={{color:"#B4B9BB" , marginRight:"2%"}}>Showing</a>
                <a style={{marginRight:"2%"}}> 1</a>
                <a style={{marginRight:"2%"}}>to</a>
                <a style={{marginRight:"2%"}}>100</a>
                <a style={{marginRight:"2%"}}>of</a>
                <a style={{marginRight:"2%"}}>10</a>
                <a style={{color:"#B4B9BB"}}> Entries</a>
            </span>
        </div>
    </div>
  )
}

export default Paging;
