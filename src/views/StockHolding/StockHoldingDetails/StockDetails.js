import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../../AppComponent/Paging';
import SHExport from './SHExport';

class StockDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			setPagination: true,
            displayContent: "INIT",
            
			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,
			headersPdf: [],
			
            //header excel
            headerExcelColumn: [
                [{id:'site',text:'Site'},{id:'stock_on_hand',text:'Stock On Hand'}],
                [{id:'client',text:'Client'},{id:'available_qty',text:'Available Qty'}], 
                [{id:'product',text:'Product'},{id:'expected_in_qty',text:'Expected In Qty'}],
                [{id:'description',text:'Description'},{id:'expected_out_qty',text:'Expected Out Qty'}],  
                [{id:'uom',text:'UOM'},{id:'rotadate_type',text:'Rotadate Type'}]
            ]
        };
	}
    
	componentDidUpdate() {
		if (this.state.setPagination) {
            this.setPagination(this.props.stockDetails);
        }
	}

	setPagination = (result) => {
		let respondRes = result;
		let totalPage = 0;

		if (respondRes && respondRes.length > 0) {
			if (respondRes.length > this.state.displayPage) {
				totalPage = respondRes % this.state.displayPage;
				if (totalPage > 0 && totalPage < 50) {
					totalPage = parseInt(respondRes.length / this.state.displayPage) + 1;
				} else {
					totalPage = respondRes.length / this.state.displayPage;
				}
				this.setState({ maxPage: totalPage });
			} else {
				this.setState({ maxPage: 1 });
			}

			this.setState({ totalRows: respondRes.length,
							setPagination: false });
							
			this.numberEventClick(this.state.currentPage);
		}
	}

	activeTabIndex = (tabIndex) => {
		this.setState({ activeTabIndex: tabIndex });
	}

	showStockDetailsHeader = () => {
		return (
			
			<tr>
				{this.props.stockDetailsColumns.map((item, idx) => {
					if (item.isVisible) {
                        
                        return (
                            <th className="text-left" id={item.key} key={idx} onClick={() => this.props.arrowHandler("stockDetails", idx, item.key)}>
                                {item.tableHeaderText} <img key={idx} className="sort-icon" src={item.sort} />
                            </th>
                        );
                    }
                    return null;
				})}
			</tr>
			
		);
	}

	showStockDetailsHeaderExcel = () => {
		return (
			
			<tr>
				{this.props.stockDetailsColumns.map((item, idx) => {
					
					if (item.isVisible) {
                        
                        return (
                            <th key={idx}>
                                {item.tableHeaderText}
                            </th>
                        );
                    }
                    return null;
				})}
			</tr>
			
		);
	}

	showStockDetailsData = () => {
		return (
			
				
					this.props.stockDetails.map((item, idx) => (
						<tr key={idx}>
							{this.props.stockDetailsColumns.map((column, columnIdx) => {
								return (
									
									<td key={columnIdx} className="px-3 text-left" width={(column.width ? column.width : '')}>
										{column.id === "effective_date" ? formatDate(item[column.key]) : item[column.key]}
									</td>
								)
							})}
						</tr>
					))
							
			
		);
	}

	changeStartIndex = (currentPage) => {
		this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage });
	}

	changeLastIndex = (currentPage) => {
		this.setState({ lastIndex: parseInt(currentPage) * this.state.displayPage });
	}

	numberEventClick = (currentPage) => {
		let page = parseInt(currentPage);
		this.setState({ currentPage: page });
		this.changeStartIndex(page);
		this.changeLastIndex(page);
	}

    firstPageClick = () => {
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: 1 }, () => {
                this.changeStartIndex(1);
                this.changeLastIndex(1);
            });
        }
        return;
    }   

	nextPageClick = () => {
		if (this.state.currentPage < this.state.maxPage) {
			this.setState((prev) => { 
                currentPage: prev.currentPage++;
            }, () => {
				this.changeStartIndex(this.state.currentPage);
				this.changeLastIndex(this.state.currentPage);
			});
        }
        return;
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => { 
                currentPage: prev.currentPage--;
            }, () => {
				this.changeStartIndex(this.state.currentPage);
				this.changeLastIndex(this.state.currentPage);
			});
        }
        return;
	}

	ExportName = () => {
		let filename = ""
		let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let date = new Date();
		let date1 = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear(),
			Seconds = date.getSeconds(),
			Minutes = date.getMinutes(),
			Hours = date.getHours();
		 return filename=("Microlistics_StockHoldingDetails." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)  
	  }
	
	  ExportHeader = () =>{
		//let headers = ["Site","Client","Order No", "Order Type", "Customer"," Status", "Delivery Date", "Date Received", "Date Released", "Date Completed"]
	   // return headers 
	   let headers = [];
	   this.props.stockDetailsColumns.map((header, idx) => { 
			  headers.push(header.tableHeaderText); 
		});
		return headers
	  }
	
	  ExportFont = () => {
		let Font = "10";
		return Font;
	  };
	
	  ExportData = () => {
		let i = 1;
		let line_data = this.props.stockDetails.map(elt=> [  
		  elt.batch,  
		  elt.rotadate,  
		  elt.disposition,  
		  elt.ref3,  
		  elt.ref4,  
		  elt.qty,  
		  elt.weight,   
		  elt.pallet,   
		  elt.price 
		]);  
		
		 
		let header = this.props.stockholding[0]; 
		let header_data =  [
		  header.available_qty,
		  header.client,
		  header.description,
		  header.expected_in_qty,
		  header.expected_out_qty,
		  header.product,
		  header.rotadate_type,
		  header.site,
		  header.stock_on_hand,
		  header.uom 
		]; 
		this.state.headersPdf = header_data;

		return line_data; 
	}
	
	ExportPDFName = () =>{
		let name= ""
		return name=("Stock Details")
	}
	
    lastPageClick = () => {
        if (this.state.currentPage < this.state.maxPage) {
            let currentPage = parseInt(this.state.maxPage + 1 );
            this.setState({ currentPage: currentPage});
            this.changeStartIndex(currentPage);
            this.changeLastIndex(currentPage);
        }
        return;
	}
	
	

	render() {
		return (
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                <div className="tablePage tablePageSh tableContent table-responsive">
					{/* <Table className="table-condensed  table-striped clickable-row rounded-bottom-175 mb-0" size="md" width="100%"> */}
					<table className="defaultTable ">
                        <thead>
							{this.showStockDetailsHeader()}
						</thead> 
                        <tbody>
							{this.showStockDetailsData()}
						</tbody>
                    </table>
					{/* </Table> */}

					<table className="defaultTable d-none" id="excel" >
						<thead>{this.showStockDetailsHeaderExcel()}</thead>
						<tbody style={{ fontSize: '1rem' }}>{this.showStockDetailsData()}</tbody>
					</table>

{/* 					
                    <Table  style={{display: 'none'}} id="excel">
					
					{ this.state.headerExcelColumn.map((col,index) => { 
						return(
						<tr key={index}>
								<th colSpan='2' style={{textAlign:'left'}}>{(col.length) ? col[0].text : null}</th>
								<td colSpan='2'>
								{(this.props.stockholding.length && col.length) ? this.props.stockholding[0][col[0].id] : '-'}
								</td>
								<td colSpan='1'></td>
								<th colSpan='2' style={{textAlign:'left'}}>{(col.length) ? col[1].text : null}</th>
								<td colSpan='2'>
								{(this.props.stockholding.length && col.length) ? this.props.stockholding[0][col[1].id] : '-'}
								</td> 
						</tr> 
						)
					})
					}
					
					

					<tr><td colSpan="14"> </td></tr>
					
                       {this.showStockDetailsHeaderExcel()}
                       {this.showStockDetailsData()}
                    </Table> */}

					{/*  */}
                </div>
                <div className="fixed-bottom paginations">
                    <Paging firstPageClick={this.firstPageClick} backPageClick={this.backPageClick}
                            nextPageClick={this.nextPageClick} lastPageClick={this.lastPageClick}
                            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                            isActive={this.state.isActive}
                            numberEventClick={this.numberEventClick} />
							<SHExport ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
									ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont}/>
                </div>
			</div>
		);
	}
}

export default StockDetails;