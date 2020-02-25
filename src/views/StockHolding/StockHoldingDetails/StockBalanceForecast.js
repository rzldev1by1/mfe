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
				{ id: "id", checkboxLabelText: "Customer No.", tableHeaderText: "Customer No.", isVisible: true, key: "id", type: "string" },
				{ id: "order_no", checkboxLabelText: "Order No", tableHeaderText: "Order No", isVisible: true, key: "order_no", type: "string" },
				{ id: "sm_dtm", checkboxLabelText: "Order Date", tableHeaderText: "Order Date", isVisible: true, key: "sm_dtm", type: "date" },
				{ id: "qty_rec", checkboxLabelText: "Expected In", tableHeaderText: "Expected In", isVisible: true, key: "qty_rec", type: "number" },
				{ id: "qty_send", checkboxLabelText: "Expected Out", tableHeaderText: "Expected Out", isVisible: true, key: "qty_send", type: "number" },
				{ id: "balance", checkboxLabelText: "Balance", tableHeaderText: "Balance", isVisible: true, key: "balance", type: "number" }
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
                        // return <th className={"p-3 " + (item.type === "number" ? "text-right" : "text-left")} key={idx}>{item.tableHeaderText}</th>;
                        return <th className="p-3 text-left" key={idx}>{item.tableHeaderText}</th>;
                    }
                    return null;
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
                            // if (column.type === "number") {
							// 	return (
                            //         <td key={columnIdx} className="px-3 text-right">
                            //             {column.id === "balance" ? this.showBalance(idx) : item[column.key]}
                            //         </td>
                            //     );
							// }

                            if (column.id === "balance") {
                                return (
                                    <td key={columnIdx} className="px-3 text-left">{this.showBalance(idx)}</td>
                                );
                            }

							return (
								<td key={columnIdx} className="px-3 text-left">
									{column.id === "sm_dtm" ? formatDate(item[column.key]) : item[column.key]}
								</td>
							);
                        }
                        return null;
					})}
				</tr>
			))
		);
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
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                        <div className="tablePage tableContent">
                            <Table className="table-condensed table-striped rounded-bottom-175 mb-0" size="md" width="100%">
                                <thead>{this.showForeshadowedHeader()}</thead>
                                <tbody>{this.showForeshadowedData()}</tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                        <Paging firstPageClick={this.firstPageClick} backPageClick={this.backPageClick}
                                nextPageClick={this.nextPageClick} lastPageClick={this.lastPageClick}
                                totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                                currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                                startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                                isActive={this.state.isActive}
                                numberEventClick={this.numberEventClick} />
                    </div>
                </div>
            </div>
		);
	}
}

export default StockBalanceForecast;