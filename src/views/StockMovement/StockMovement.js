import React, { Component } from 'react'
import './StockMovement.css'
import 'react-day-picker/lib/style.css'
import Movement from '../PurchaseOrder/Component/Movement'
import MovementSearch from './Component/MovementSearch'
import Pagination from '../../AppComponent/Pagination'
import Export from '../../AppComponent/Export'

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
	ExportName = () => {
		let filename = ""
		let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let date = new Date();
		let date1 = date.getDate(),
			  month = date.getMonth(),
			  year = date.getFullYear(),
			  Seconds = date.getSeconds(),
			  Minutes = date.getMinutes(),
			  Hours = date.getHours();
		 return filename=("Microlistics_SalesOrder." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)  
	  }

	  ExportPDFName = () =>{
		let name= ""
		return name=("Stock Movement")
	  }
	
	  ExportHeader = () =>{
		let header =  ["Site","Product","Product Name", "packdesc", "Client"," Detail"]
		return header
	  }
	
	  ExportData = () => {
		let data = this.state.data.map(elt=> [elt.site, elt.product, elt.product_name, elt.packdesc, elt.client, elt.detail.length]);
		return data
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
												rows={50}/> 
						<Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
								ExportHeader={this.ExportHeader} ExportData={this.ExportData}/>
					</div>						 
			</div>
		)
	}
}

export default StockMovement
