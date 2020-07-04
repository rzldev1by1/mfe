import React, { Component } from 'react'
import './StockMovement.css'
import 'react-day-picker/lib/style.css'
import Movement from '../PurchaseOrder/Component/Movement'
import MovementSearch from './Component/MovementSearch'
import HeaderTitle from '../../AppComponent/HeaderTitle'
import Axios from 'axios'
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint'


class StockMovement extends Component {
	constructor(props) {
		super(props)
		this.getStockMovement = React.createRef()
		this.setPagination = React.createRef()

		this.state = {
			data: [],
            isComplete: false,
            minDate: null,
            maxDate: null
        }
	}
        
    componentDidMount = () => {
        this.getStockDate();
    }

    getStockDate = () => {
        Axios.get(endpoint.getStockDateRange, {
            headers: headers
        })
        .then((res) => {
            let maxDate = res.data.data[0].max_date;
            this.setState({ minDate: res.data.data[0].min_date, maxDate: res.data.data[0].max_date})
            console.log(res.data.data[0].min_date + "|" + res.data.data[0].max_date)
        })
    }
	render() {
		return (
			<React.Fragment>
				<HeaderTitle title="Stock Movement" />
				<div className='animated fadeIn app-container'>
					<div className="card w-100">
						<MovementSearch getStockMovement={this.getStockMovement} fromMonth={this.state.minDate} toMonth={this.state.maxDate} />
					</div>
					<div className={this.state.isComplete ? 'fades' : 'hidden'}>
						<Movement
							history = {this.props.history}
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
