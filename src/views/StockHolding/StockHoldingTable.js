import React, { Component } from 'react';
import { Table } from 'reactstrap';


class componentTable extends Component {		
	showHeader = () => {
		return (
			<tr>
				{this.props.columns.map((item, idx) => {
					if (item.isVisible) {
                        // return <th className={"p-3 " + (item.type === "number" ? "text-right" : "text-left")} key={idx}>{item.tableHeaderText}</th>;
                        return (
                            <th className="text-left" id={item.key} key={idx} onClick={() => this.props.arrowHandler(idx, item.key)}>
                                {item.tableHeaderText} <img key={idx} className="sort-icon" src={item.sort} />
                            </th>
                        );
                    }
                    return null;
				})}
				<th className="text-left">
					<button type="button" className="editColumnBtn" onClick={this.props.toggleDisplayMoreColumn}>
						{/* <span className="glyphicon glyphicon-pencil editColumnLogo" /> */}
                        <i className="editColumnLogo iconU-edit" />
					</button>
				</th>
			</tr>
		);
	}

	showData = () => {
		return (
			this.props.masterResource.slice(this.props.startIndex, this.props.lastIndex).map((item, idx) => (
				<tr className='tr1' key={idx} onClick={() => this.rowClicked(item["product"], item["client"], item["site"])}>
					{this.props.columns.map((column, columnIdx) => {
						if (column.isVisible) {
                            // return <td key={columnIdx} className={"px-3 " + (column.type === "number" ? "text-right" : "text-left")}>{item[column.key]}</td>;
                            return <td key={columnIdx} className="px-3 text-left">{item[column.key]}</td>;
                        }
                        return null;
					})}
				  	<td className="px-3 text-left">
						{/* <a href="#" className="dots">
							<div className="dot" />
							<div className="dot" />
							<div className="dot" />
						</a> */}
					</td>
				</tr>
			))
		);
    }
    
	rowClicked = (productCode, client, site) => {
        // this.props.history.push("/stock/stockholding/" + encodeURIComponent(productCode) + "?client=" + encodeURIComponent(client) + "&site=" + encodeURIComponent(site));
        this.props.history.push(`/stock/stockholding/${productCode}/${client}/${site}`);
	}

    render() {
        return (
            <div className="col-12 p-0">
                <div className={this.props.isSearch ? "spinner" : "d-none"} />
                <div className={this.props.isSearch ? "d-none" : "tablePage1 tableContent"}>					
                    {/* <Table className="table-condensed table-striped clickable-row mb-0" size="md">
                        <thead >{this.showHeader()}</thead>
                        <tbody style={{fontSize:'1rem'}}>{this.showData()}</tbody> 
                    </Table> */}

					<table className="shtable" id="excel" >
                        <thead >{this.showHeader()}</thead>
                        <tbody style={{fontSize:'1rem'}}>{this.showData()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default componentTable;