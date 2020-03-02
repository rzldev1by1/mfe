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
				{this.props.foreshadowedColumns.map((item, idx) => {
					if (item.isVisible) {
                        // return <th className={"p-3 " + (item.type === "number" ? "text-right" : "text-left")} key={idx}>{item.tableHeaderText}</th>;
                        // return (
                        //     <th className="text-left" id={item.key} key={idx} onClick={() => this.props.arrowHandler("foreshadow",idx, item.key)}>
                        //         {item.tableHeaderText} <img key={idx} className="sort-icon" src={item.sort} />
                        //     </th>
                        // );
                        return <th className="text-left" key={idx}>{item.tableHeaderText}</th>;
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
					{this.props.foreshadowedColumns.map((column, columnIdx) => {
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
                <div className="tablePage tableContent">
                    <Table className="table-condensed table-striped clickable-row rounded-bottom-175 mb-0" size="md" width="100%">
                        <thead>{this.showForeshadowedHeader()}</thead>
                        <tbody>{this.showForeshadowedData()}</tbody>
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

export default StockBalanceForecast;