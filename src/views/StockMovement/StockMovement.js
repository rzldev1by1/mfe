import React, { Component } from 'react';
import { Button} from 'reactstrap';
import axios from 'axios';
import AppComponent from '../../AppComponent';
import Authentication from '../../Auth/Authentication';
import './StockMovement.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Movement from '../PurchaseOrder/Component/Movement';
import MovementSearch from './Component/MovementSearch'

class StockMovement extends Component {
	constructor(props) {
		super(props)
		this.getStockMovement = React.createRef()		
	}

	getStockMovements = (dateFrom, dateTo, period) => {
		this.getStockMovement.current.getData(dateFrom, dateTo, period)
		this.getStockMovement.current.pushTable(dateFrom,dateTo, period)
	}

	render() {
		return (
			<div className='animated fadeIn'>
				<div className='movementHeader'>
					<h2>Stock Movement</h2>
				</div>

				<div className='movementSearch'>
					<MovementSearch getStockMovement = {(dateFrom, dateTo, period) => this.getStockMovements(dateFrom, dateTo, period)}/>
				</div>

					<Movement ref={this.getStockMovement}/>
			</div>
		)
	}
}

export default StockMovement
