import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../General/Paging';

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
			displayPage: 5,
			totalRows: 0,
			maxPage: 0,
            
            columns: [
				{ id: "rotadate", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: true, key: "rotadate", type: "string" },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "batch", type: "string" },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: true, key: "disposition", type: "string" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: true, key: "ref3", type: "string" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: true, key: "ref4", type: "string" },
				{ id: "qty", checkboxLabelText: "Qty", tableHeaderText: "Qty", isVisible: true, key: "qty", type: "number" }
			]
		}
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
				prev.currentPage++;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => {
				prev.currentPage--;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
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

	showStockDetailsHeader = () => {
		return (
			<tr>
				{this.state.columns.map((item, idx) => {
					if (item.isVisible) {
                        // return <th className={"p-3 " + (item.type === "number" ? "text-right" : "text-left")} key={idx}>{item.tableHeaderText}</th>;
                        return <th className="p-3 text-left" key={idx}>{item.tableHeaderText}</th>;
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
					{this.state.columns.map((column, columnIdx) => {
						return (
							// <td key={columnIdx} className={"px-3 " + (column.type === "number" ? "text-right" : "text-left")}>
                            <td key={columnIdx} className="px-3 text-left">
                                {column.id === "effective_date" ? formatDate(item[column.key]) : item[column.key]}
							</td>
						)
					})}
				</tr>
			))
		);
	}

	render() {
		return (
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                <div className="tablePage tableContent">
                    <Table className="table-condensed table-striped rounded-bottom-175 mb-0" size="md" width="100%">
                        <thead>{this.showStockDetailsHeader()}</thead>
                        <tbody>{this.showStockDetailsData()}</tbody>
                    </Table>
                </div>
                <div className="mt-2">
                    <Paging firstPageClick={this.firstPageClick} backPageClick={this.backPageClick}
                            nextPageClick={this.nextPageClick} lastPageClick={this.lastPageClick}
                            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                            isActive={this.state.isActive}
                            numberEventClick={this.numberEventClick} />
                </div>
			</div>
		);
	}
}

export default StockDetails;