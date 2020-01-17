import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../General/Paging';

import './StockHoldingDetails.css';

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
            
            columns: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "batch" },
				{ id: "effective_date", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: true, key: "" },
				{ id: "receipt_disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: true, key: "" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: true, key: "" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: true, key: "" },
				{ id: "weight", checkboxLabelText: "Quantity", tableHeaderText: "Quantity", isVisible: true, key: "" }
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

	nextPageClick = () => {
		if (this.state.currentPage < this.state.maxPage) {
			this.setState((prev) => {
				currentPage: prev.currentPage++;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
		}
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => {
				currentPage: prev.currentPage--;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
		}
	}

	showStockDetailsHeader = () => {
		return (
			<tr>
				{this.state.columns.map((item, idx) => {
					if (item.isVisible) {
						// if (item.id === "qty" ||
						// 	item.id === "weight" ||
						// 	item.id === "volume") {
						// 	return <th className="p-3 text-right" key={idx} width="17%">{item.tableHeaderText}</th>
						// }
						return <th className="p-3 text-left" key={idx} width="17%">{item.tableHeaderText}</th>
					}
				})}
			</tr>
		);
	}

	showStockDetailsData = () => {
		return (
			this.props.stockDetails.map((item, idx) => (
				<tr key={idx}>
					{this.state.columns.map((column, columnIdx) => {
						// if (column.id === "qty" ||
						// 	column.id === "weight" ||
						// 	column.id === "volume") {
						// 	return <td key={columnIdx} className="px-3 text-right" width="17%">{item[column.id]}</td>
						// }
						return (
							<td key={columnIdx} className="px-3 text-left" width="17%">
								{column.id === "effective_date" ? formatDate(item[column.id]) : item[column.id]}
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
				<Table className="table-condensed table-responsive table-striped rounded-bottom-175 mb-0" size="md" width="100%">
					<thead>{this.showStockDetailsHeader()}</thead>
					<tbody>{this.showStockDetailsData()}</tbody>
				</Table>

                <Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                        totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                        currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                        isActive={this.state.isActive}
                        numberEventClick={this.numberEventClick} />
			</div>
		);
	}
}

export default StockDetails;