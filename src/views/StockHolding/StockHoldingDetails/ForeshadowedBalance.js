import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../General/Paging';

// import './ForeshadowedBalance.css';

class ForeshadowedBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,
			foreshadowedColumn: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "id", checkboxLabelText: "Customer ID", tableHeaderText: "Customer ID", isVisible: true, key: "id" },
				{ id: "order_no", checkboxLabelText: "Order No", tableHeaderText: "Order No", isVisible: true, key: "order_no" },
				{ id: "sm_dtm", checkboxLabelText: "Order Date", tableHeaderText: "Order Date", isVisible: true, key: "" },
				{ id: "qty_rec", checkboxLabelText: "In", tableHeaderText: "In", isVisible: true, key: "" },
				{ id: "qty_send", checkboxLabelText: "Out", tableHeaderText: "Out", isVisible: true, key: "" },
				{ id: "balance", checkboxLabelText: "Balance", tableHeaderText: "Balance", isVisible: true, key: "" }
			],
			balance: 0
		}
	}
	
	componentDidMount() {
		this.setState({ balance: 0 });
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

	showBalance = (idx) => {
		// let finalBalance = this.props.foreshadowedBalance.reduce((acc, cur) => { return parseInt(cur["qty_rec"] - cur["qty_send"] + acc) }, 0);
		
		let accBalance = 0;
		let data = this.props.foreshadowedBalance;

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
						if (item.id === "qty" ||
							item.id === "weight" ||
							item.id === "volume") {
							return <th className="p-3 text-right" key={idx} width="17%">{item.tableHeaderText}</th>
						}
						return <th className="p-3 text-left" key={idx} width="17%">{item.tableHeaderText}</th>
					}
				})}
			</tr>
		);
	}

	showForeshadowedData = () => {
		return (
			this.props.foreshadowedBalance.map((item, idx) => (
				<tr key={idx}>
					{this.state.foreshadowedColumn.map((column, columnIdx) => {
						if (column.isVisible) {
							if (column.id === "qty" ||
								column.id === "weight" ||
								column.id === "volume") {
								return <td key={columnIdx} className="px-3 text-right" width="17%">{item[column.id]}</td>
							}

							if (column.id === "balance") {
								return <td key={columnIdx} className="px-3 text-right" width="17%">{this.showBalance(idx)}</td>
							}

							return (
								<td key={columnIdx} className="px-3 text-left" width="17%">
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
				<Table className="table-condensed table-responsive table-striped rounded-bottom-175 mb-0" size="xl" width="100%">
					<thead>{this.showForeshadowedHeader()}</thead>
					<tbody>{this.showForeshadowedData()}</tbody>
				</Table>

				<div className="bg-transparent card-footer text-center border-company border-top-0">
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

export default ForeshadowedBalance;