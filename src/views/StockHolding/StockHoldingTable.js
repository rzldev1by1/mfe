import React from 'react';
import { Table } from 'reactstrap';

import Paging from '../General/Paging';

const componentTable = (props) => {
	function showHeader() {
		return (
			<tr>
				{props.columns.map((item, idx) => {
					if (item.isVisible) {
						return <th className={"p-3 " + (item.type === "number" ? "text-right" : "text-left")} key={idx} width="10%">{item.tableHeaderText}</th>;
                    }
                    return null;
				})}
				<th className="p-3 text-left">
					<button type="button" className="editColumnBtn" onClick={props.toggleDisplayMoreColumn}>
						{/* <span className="glyphicon glyphicon-pencil editColumnLogo" /> */}
                        <i className="editColumnLogo iconU-edit" />
					</button>
				</th>
			</tr>
		);
	}

	function showData() {
		return (
			props.masterResource.slice(props.startIndex, props.lastIndex).map((item, idx) => (
				<tr key={idx} onClick={() => rowClicked(item["product"], item["site"])}>
					{props.columns.map((column, columnIdx) => {
						if (column.isVisible) {
							return <td key={columnIdx} className={"px-3 " + (column.type === "number" ? "text-right" : "text-left")}>{item[column.key]}</td>;
                        }
                        return null;
					})}
					<td className="px-3 text-left">
						{/* <a href="#" className="dots"> */}
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						{/* </a> */}
					</td>
				</tr>
			))
		);
    }
    
	function rowClicked(productCode, site) {
		props.history.push("/stock/stockholding/" + encodeURIComponent(productCode));
	}

    return (
        <div className="col-12 p-0">
            <div className={props.isSearch ? "spinner" : "d-none"} />
            <div className={props.isSearch ? "d-none" : "tablePage tableContent"}>
                <Table className="table-condensed table-responsive table-striped clickable-row mb-0" size="sm">
                    <thead>{showHeader()}</thead>
                    <tbody>{showData()}</tbody>
                </Table>
            </div>
            <div className="mt-2">
                <Paging backPageClick={props.backPageClick} nextPageClick={props.nextPageClick}
                        totalRows={props.totalRows} displayPage={props.displayPage}
                        currentPage={props.currentPage} maxPage={props.maxPage}
                        isActive={props.isActive}
                        numberEventClick={props.numberEventClick} />
            </div>
        </div>
    );
};

export default componentTable;