import React, { Component } from 'react';

class Paging extends Component {
	constructor(props) {
		super(props);
		this.state = { totalRows: props.totalRows };
	}

	numberClickEvent = (e) => {
		this.props.numberEventClick(e.currentTarget.textContent.trim());
	}

	createPageNumber = () => {
		if (this.props.maxPage > 1) {
			let pageNumber = [];
			let totalPage = this.props.maxPage;

			for (let i = 0 ; i < totalPage ; i++) {
				pageNumber.push(
					<li className={"btn btn-paging" + (this.props.currentPage === i + 1 ? "-active" : "")}
						id={i} name="pageNumber" key={i}
						onClick={this.numberClickEvent}>
						{i+1}
					</li>
				);
			}
			return pageNumber;
		}
	}

	nextPageClick = () => {
		this.props.nextPageClick();
	}

	backPageClick = () => {
		this.props.backPageClick();
	}

	pageStartIndexOf = () => {
		return ((this.props.currentPage * this.props.dsiplayPage) - this.props.dsiplayPage) + 1;
	}

	pageLastIndexOf = () => {
		if (this.props.totalRows < this.props.dsiplayPage) {
			// return ((this.props.currentPage * this.props.dsiplayPage) - this.props.dsiplayPage) + 1;
			this.pageStartIndexOf();
		} else {
			return this.props.currentPage * this.props.dsiplayPage;
		}
	}

	render() {
		return (
			<div>
				<button className={"btn p-0 btn-pagingNav" + (this.props.currentPage > 1 ? "" : "-inactive")} onClick={this.backPageClick}>
					<i className="fa fa-chevron-left" aria-hidden="true" />
				</button>

				<span>{this.createPageNumber()}</span>

				<button className={"btn p-0 btn-pagingNav" + (this.props.currentPage < this.props.maxPage ? "" : "-inactive")} onClick={this.nextPageClick}>
					<i className="fa fa-chevron-right text-center" aria-hidden="true" />
				</button>
			</div>
		);
	}
}

export default Paging;