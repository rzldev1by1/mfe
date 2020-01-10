import React, {Component} from 'react'
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'
import axios from 'axios'

class StockMovement extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[]
		}
	}

	componentDidMount(){
		this.loadPurchaseOrder()
	}

	loadPurchaseOrder = () => {
		axios.get('http://127.0.0.1:8000/stockmovement?startDate=2019-08-05&endDate=2019-08-07&filterType=day', {
		  headers: headers
		})
		  .then(res => {
			const result = res.data.data
			this.setState({ data:result })
			console.log(result[0])
		  })
		  .catch(error => {
		  })
	  }

	render(){
		return(
			<div>
				{this.state.data.map((data,i) => 
				console.log(data)
				)}
				asd
			</div>
		)
	}
}

export default StockMovement
