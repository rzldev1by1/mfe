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
			endIndex:0,
			isComplete:false
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
				<div className={this.state.isComplete ? 'fades' : 'hidden'}>
				<Movement isComplete={(val) => this.setState({isComplete:val})} ref={this.getStockMovement} data={(data) => this.setState({data:data},() => this.setPagiantion.current.getData(this.state.data))}/>
				</div>
				<div className={this.state.isComplete ? 'hidden' : 'spinner'}/>
					
					<div className={this.state.isComplete ? 'fades' : 'hidden'}>
						<Pagination sliceValue={(startIndex, endIndex) => this.getStockMovement.current.setSliceValue(startIndex, endIndex)} 
												ref={this.setPagiantion} data={this.state.data} 
												rows={4}/> 
					</div>						 
			</div>
		)
	}
}

export default StockMovement
