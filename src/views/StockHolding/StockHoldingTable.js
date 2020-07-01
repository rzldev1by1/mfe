import React, { Component } from 'react';
import { Table } from 'reactstrap';


class componentTable extends Component {

	

	showHeader = () => {
		return (
			<tr>
				{this.props.columns.map((item, idx) => {
					console.log(item);
					if (item.isVisible) {						
						return (
							<th className={`${item.alignText === 'text-left'}`?"text-left":"text-center"} style={{ width: `${item.width}` }} id={item.key} key={idx} onClick={() => this.props.arrowHandler(idx, item.key)}>
								{item.tableHeaderText} <img key={idx} className="sort-icon" src={item.sort} />
							</th>
						);
					}
					return null;
				})}
				<th className="text-left" style={{width: '1%'}}>
					<button type="button" className="editColumnBtn" onClick={this.props.toggleDisplayMoreColumn}>
						<i className="editColumnLogo iconU-edit" />
					</button>
				</th>
			</tr>
		);
	}
	showHeaderExport = () => {
		return (
			<tr>
				{this.props.columns.map((item, idx) => {
					if (item.isVisible) {

						return (
							<th className="text-left" id={item.key} key={idx} onClick={() => this.props.arrowHandler(idx, item.key)}>
								{item.tableHeaderText}
							</th>
						);
					}
					return null;
				})}
			</tr>
		);
	}

	showData = () => {
		const {masterResource} = this.props
		return (
			masterResource.map((item, idx) => (
				<tr className='tr1' key={idx} onClick={() => this.rowClicked(item["product"], item["client"], item["site"])}>
					{this.props.columns.map((column, columnIdx) => {
						
						if (column.isVisible) {

							if (column.id === "status") {
								return <td key={columnIdx} className={"pl-3 pr-0 " + (`${column.alignText}`)}>{(item["on_hand_qty"] + item["expected_in_qty"]) >= item["expected_out_qty"] ? "Ok" : "Shortage"}</td>
							}
							return <td key={columnIdx} className={"pl-3 pr-0 " + (`${column.alignText}`)}>{item[column.key]}</td>;
						}
						return null;
					})}
					<td className="pl-3 pr-0 text-left">

					</td>
				</tr>
			))
		);
	}

	showDataExcel = () => {
		const {masterResource} = this.props
		return (
			masterResource.map((item, idx) => (
				<tr className='tr1' key={idx} onClick={() => this.rowClicked(item["product"], item["client"], item["site"])}>
					{this.props.columns.map((column, columnIdx) => {
						if (column.isVisible) {

							if (column.id === "status") {
								return <td key={columnIdx} className="pl-2 text-left">{(item["on_hand_qty"] + item["expected_in_qty"]) >= item["expected_out_qty"] ? "Ok" : "Shortage"}</td>
							}
							return <td key={columnIdx} className="pl-2 text-left">{item[column.key]}</td>;
						}
						return null;
					})}
					<td className="pl-2 text-left">

					</td>
				</tr>
			))
		);
	}

	rowClicked = (productCode, client, site) => {

		this.props.history.push(`/stock/stockholding/${productCode}/${client}/${site}`);
	}

	render() {
		return (
			<div className="col-12 p-0  tablecontent mt-0">
				<div className={this.props.isSearch ? "spinner" : "d-none"} />
				<div className={this.props.isSearch ? "d-none" : "table-responsive tablePage tablePageSH tableContent"}>
					{/* <Table className="table-condensed table-striped clickable-row mb-0" size="md">
                        <thead >{this.showHeader()}</thead>
                        <tbody style={{fontSize:'1rem'}}>{this.showData()}</tbody> 
                    </Table> */}

					<table className="defaultTable stockholding-summary" >
						{/* <thead >{this.showHeader()}</thead> */}
						<thead>
							<tr>
								{this.props.columns.map((item, idx) => {
									
									if (item.isVisible) {
										return (
											<th className={`${item.alignText === 'text-left'?" text-left ":" text-center "}`} style={item.style} id={item.key} key={idx} onClick={() => this.props.arrowHandler(idx, item.key)}>
												{item.tableHeaderText} <img key={idx} className="sort-icon" src={item.sort} />
											</th>
										);
									}
									return null;
								})}
								<th className="text-left" style={{width: '1%'}}>
									<button type="button" className="editColumnBtn" onClick={this.props.toggleDisplayMoreColumn}>
										<i className="editColumnLogo iconU-edit" />
									</button>
								</th>
							</tr>
						</thead>
						<tbody style={{ fontSize: '1rem', backgroundColor: 'white' }}>{this.showData()}</tbody>
					</table>
					<table className="defaultTable d-none" id="excel" >
						<thead >{this.showHeaderExport()}</thead>
						<tbody style={{ fontSize: '1rem' }}>{this.showDataExcel()}</tbody>
					</table>
				</div>
			</div>
		);
	}
};

export default componentTable;