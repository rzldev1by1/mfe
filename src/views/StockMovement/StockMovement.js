import React, { Component } from 'react'
import './StockMovement.css'
import 'react-day-picker/lib/style.css'
import Movement from '../PurchaseOrder/Component/Movement'
import MovementSearch from './Component/MovementSearch'
import Pagination from '../../AppComponent/Pagination'

class StockMovement extends Component {
	constructor(props) {
		super(props)
		this.getStockMovement = React.createRef()	
		this.setPagiantion = React.createRef()
		
		this.state = {
			data:[],
			startIndex:0,
			endIndex:0
		}
	}

	getStockMovements = (dateFrom, dateTo, period) => {
		this.getStockMovement.current.getData(dateFrom, dateTo, period)
		this.getStockMovement.current.pushTable(dateFrom,dateTo, period)
	}

	render() {
		return (
			<div className='animated fadeIn stockMovementParent'>
				<div className='movementHeader'>
					<h2>Stock Movement</h2>
				</div>

				<div className='movementSearch'>
					<MovementSearch getStockMovement = {(dateFrom, dateTo, period) => this.getStockMovements(dateFrom, dateTo, period)}/>
				</div>
					<Movement ref={this.getStockMovement} data={(data) => this.setState({data:data},() => this.setPagiantion.current.getData(this.state.data))}/>
					<div className={this.state.data.length > 0 ? 'fades' : 'hidden'}>
						<Pagination sliceValue={(startIndex, endIndex) => this.getStockMovement.current.setSliceValue(startIndex, endIndex)} 
												ref={this.setPagiantion} data={this.state.data} 
												rows={3}/> 
					</div>						 
			</div>
		)
	}
}

export default StockMovement
