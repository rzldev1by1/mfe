import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../../AppComponent/Paging';

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

  componentDidMount(){

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

		let accBalance = this.props.openingBalance;
		let data = this.props.stockBalanceForecast.slice(this.state.startIndex, this.state.lastIndex);
		for (var i = 0 ; i <= idx ; i++) {
				accBalance += parseInt(data[idx]["qtyexpected"]) - parseInt(data[idx]["qtycommitted"]);
		}

		return accBalance;
	}

	showForeshadowedHeader = () => {
		return (
			<tr>
				{this.props.foreshadowedColumns.map((item, idx) => {
					if (item.isVisible) {

                        return <th className="text-left" key={idx}>{item.tableHeaderText}</th>;
                    }
                    return null;
				})}
			</tr>
		);
	}

	checkValue = (column, itemObject) => {
		let result = "";
		if(typeof column !== 'string')
		  return;

		if(!itemObject)
		 	return;

		if(column.toLowerCase() === 'type'){
				result = (itemObject.toLowerCase() === 's')?'Sales Order':'Purchase Order';
		}else{
			result = itemObject;
		}

		return result;
	}

	showForeshadowedData = () => {
		let balance = this.props.openingBalance;
		return (
			this.props.stockBalanceForecast.slice(this.state.startIndex, this.state.lastIndex).map((item, idx) => (
				<tr key={idx}>
					{this.props.foreshadowedColumns.map((column, columnIdx) => {
						if (column.isVisible) {
                if (column.id === "balance") {
										balance += parseInt(item["qtyexpected"]) - parseInt(item["qtycommitted"])
                    return (
                        <td key={columnIdx} className="px-3 text-left">{item['balance']}</td>
                    );
                }

							return (
								<td key={columnIdx} className="px-3 text-left">
									{column.id === "effectivedate" ? formatDate(item[column.key]) : this.checkValue(column.id,item[column.key])}
								</td>
							);
                        }
                        return null;
					})}
				</tr>
			))
		);
	}

	openingRecord = () => {
		return (
			<tr>
					{this.props.foreshadowedColumns.map((column, columnIdx) => {
						if (column.isVisible) {
								if (column.id === "balance") {
										return (
												<td key={columnIdx} className="px-3 text-left">{this.props.openingBalance}</td>
										);
								}

								if (column.id === "type") {
										return (
												<td key={columnIdx} className="px-3 text-left">Opening Balance</td>
										);
								}

								return (
									<td key={columnIdx} className="px-3 text-left">
										{column.id === "effectivedate" ? formatDate(this.props.openingDate) : ''}
									</td>
								);
						 }
								return null;
					})}
			</tr>
		)
	}

	closingRecord = () => {
		return (
			<tr>
					{this.props.foreshadowedColumns.map((column, columnIdx) => {
						if (column.isVisible) {
								if (column.id === "balance") {
										return (
												<td key={columnIdx} className="px-3 text-left">{this.props.closingBalance}</td>
										);
								}

								if (column.id === "type") {
										return (
												<td key={columnIdx} className="px-3 text-left">Closing Balance</td>
										);
								}

								return (
									<td key={columnIdx} className="px-3 text-left">
										{column.id === "effectivedate" ? formatDate(this.props.closingDate) : ''}
									</td>
								);
						 }
								return null;
					})}
			</tr>
		)
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
                <div className={"tablePage tableContent"+(this.props.stockBalanceForecast.length)?" ":" d-none"}>
                    <Table className="table-condensed table-striped clickable-row rounded-bottom-175 mb-0" size="md" width="100%">
                        <thead>{this.showForeshadowedHeader()}</thead>
                        <tbody>
												{this.openingRecord()}
												{this.showForeshadowedData()}
												{this.closingRecord()}
												</tbody>
                    </Table>
                </div>
                <div className="paginations">
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
