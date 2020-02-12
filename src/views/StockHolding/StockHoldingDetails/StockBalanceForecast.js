import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../General/Paging';

class StockBalanceForecast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			setPagination: true,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
            maxPage: 0,
            
			foreshadowedColumn: [
				// { id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "id", checkboxLabelText: "Customer No.", tableHeaderText: "Customer No.", isVisible: true, key: "id" },
				{ id: "order_no", checkboxLabelText: "Order No", tableHeaderText: "Order No", isVisible: true, key: "order_no" },
				{ id: "sm_dtm", checkboxLabelText: "Order Date", tableHeaderText: "Order Date", isVisible: true, key: "" },
				{ id: "qty_rec", checkboxLabelText: "Expected In", tableHeaderText: "Expected In", isVisible: true, key: "" },
				{ id: "qty_send", checkboxLabelText: "Expected Out", tableHeaderText: "Expected Out", isVisible: true, key: "" },
				{ id: "balance", checkboxLabelText: "Balance", tableHeaderText: "Balance", isVisible: true, key: "" }
            ],
            
			balance: 0
		}
	}

	componentDidUpdate() {
		if (this.state.setPagination) {
			this.setPagination(this.props.stockBalanceForecast);
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

	changeStartIndex = (currentPage) => {
		this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage});
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

	showBalance = (idx) => {
		let accBalance = this.state.balance;
		let data = this.props.stockBalanceForecast.slice(this.state.startIndex, this.state.lastIndex);

		if (idx === 0) { 
			return accBalance = parseInt(data[0]["qty_rec"]) - parseInt(data[0]["qty_send"])
		};

		for (var i = 0 ; i <= idx ; i++) {
            accBalance += parseInt(data[i]["qty_rec"]) - parseInt(data[i]["qty_send"]);
        }
        
		return accBalance;
	}

	showForeshadowedHeader = () => {
		return (
			<tr>
				{this.state.foreshadowedColumn.map((item, idx) => {
					if (item.isVisible) {
                        if (item.id === "qty_rec" ||
                            item.id === "qty_send" ||
                            item.id === "balance") {
							return <th className="p-3 text-right" key={idx}>{item.tableHeaderText}</th>
						}
						return <th className="p-3 text-left" key={idx}>{item.tableHeaderText}</th>
					}
				})}
			</tr>
		);
	}

	showForeshadowedData = () => {
		return (
			this.props.stockBalanceForecast.slice(this.state.startIndex, this.state.lastIndex).map((item, idx) => (
				<tr key={idx}>
					{this.state.foreshadowedColumn.map((column, columnIdx) => {
						if (column.isVisible) {
                            if (column.id === "qty_rec" ||
                                column.id === "qty_send" ||
                                column.id === "balance") {
								return (
                                    <td key={columnIdx} className="px-3 text-right">
                                        {column.id === "balance" ? this.showBalance(idx) : item[column.id]}
                                    </td>
                                )
							}

							return (
								<td key={columnIdx} className="px-3 text-left">
									{column.id === "sm_dtm" ? formatDate(item[column.id]) : item[column.id]}
								</td>
							)
						}
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
                        <thead>{this.showForeshadowedHeader()}</thead>
                        <tbody>{this.showForeshadowedData()}</tbody>
                    </Table>
                </div>

                <div className="mt-2">
                    <Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                            isActive={this.state.isActive}
                            numberEventClick={this.numberEventClick} />
                </div>
			</div>
		);
	}
}

export default StockBalanceForecast;