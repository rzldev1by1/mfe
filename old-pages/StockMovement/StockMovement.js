import React, { Component } from 'react'
import './StockMovement.css'
import 'react-day-picker/lib/style.css'
import Movement from '../PurchaseOrder/Component/Movement'
import MovementSearch from './Component/MovementSearch'
import HeaderTitle from 'shared/HeaderTitle'

class StockMovement extends Component {
	constructor(props) {
		super(props)
		this.getStockMovement = React.createRef()
		this.setPagination = React.createRef()

		this.state = {
			data: [],
			isComplete: false
		}
	}
	render() {
		return (
			<React.Fragment>
				<HeaderTitle title="Stock Movement" />
				<div className='animated fadeIn app-container'>
					<div className="card w-100">
						<MovementSearch getStockMovement={this.getStockMovement} />
					</div>
					<div className={this.state.isComplete ? 'fades' : 'hidden'}>
						<Movement
							ref={this.getStockMovement}
							isComplete={(val) => this.setState({ isComplete: val })}
							data={(data) => this.setState({ data: data }, () => this.setPagination.current.getData(this.state.data))}
						/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default StockMovement
