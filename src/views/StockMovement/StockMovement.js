import React, { Component } from 'react'
import './StockMovement.css'
import 'react-day-picker/lib/style.css'
import Movement from '../PurchaseOrder/Component/Movement'
import MovementSearch from './Component/MovementSearch'
import Pagination from '../../AppComponent/Pagination'
import Export from '../../AppComponent/Export'
import ExportExcel from '../../AppComponent/ExportExcel'
import moment from 'moment';

class StockMovement extends Component {
	constructor(props) {
		super(props)
		this.getStockMovement = React.createRef()	
		this.setPagiantion = React.createRef()
		
		this.state = {
			data:[],
			startDate:moment().subtract(27, 'days').format('YYYY-MM-DD'),
            endDate:moment().format('YYYY-MM-DD'),
			startIndex:0,
			endIndex:0,
			isComplete:false
		}
	}

	headersExport = () =>{
        return(
            <div>
                <tr>
                                <th key="1" onClick={(e) => this.arrowHandler(e)} id='site' rowspan="2">Site </th>
                                <th key="2" onClick={(e) => this.arrowHandler(e)} id='client' rowspan="2">Client </th>
                                <th key="3" onClick={(e) => this.arrowHandler(e)} id='product' rowspan="2">Product </th>
                                <th key="4" onClick={(e) => this.arrowHandler(e)} id='productName' rowspan="2">Description</th>
                                <th key="5" onClick={(e) => this.arrowHandler(e)} id='uom' rowspan="2">UOM</th>
                                {/* <td>{this.productHeader()}</td> */}
                                { 
                                    this.state.dateArray.map(date =>
                                        {
                                            let dates = moment(date).format('DD MMMM YYYY')
                                            if(this.state.complete)
                                            {
                                                if(this.state.filterType == 'day')
                                                {
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                }
                                                else if(this.state.filterType == 'week')
                                                {
                                                    let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                    dates = dates + ' - ' + dates2
                                                }
                                                else if(this.state.filterType == 'month')
                                                {
                                                    dates = moment(date).format('MMMM YYYY')
                                                }
                                            }
                                            return(
                                            <div>
                                                <th colSpan="4" key="6" style={{textAlign:"center"}}>{dates}</th>
                                                
                                            </div>
                                            )
                                        }
                                            )
                                }
                            </tr>
                            <tr>
                                {this.state.dateArray.map((date, idx) => {
                                        return(
                                                <div style={{display:'flex',  borderBottom:'1px solid #d5d8da', color:'#3366FF'}}>
                                                    <th key="6" className='tet' xs='2'>SA+</th>
                                                    <th key="7" className='tet' xs='2'>SA-</th>
                                                    <th key="8" className='tet' xs='2'>Rec</th>
                                                    <th key="9" className='tet' xs='3'>Send</th>
                                                </div>
                                        )
                                     }) 
                                }
                            </tr>
                        </div>
                            
        )
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
		 return filename=("Stock_Movement." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)  
	  }

	  ExportPDFName = () =>{
		let name= ""
		return name=("Stock Movement")
	  }
	
	  ExportHeader = () =>{
		let header = ["Site","Client","Product", "Description", "UOM",]
		return header
	  }
	
	  ExportData = () => {
		let data = this.state.data.map(elt=> [elt.site, elt.client, elt.product, elt.product_name, elt.packdesc, elt.detail.length]);
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
					
					<div className={this.state.isComplete ?  'hidden' /* 'fades' */ : 'hidden'}>
						<Pagination sliceValue={(startIndex, endIndex) => this.getStockMovement.current.setSliceValue(startIndex, endIndex)} 
												ref={this.setPagiantion} data={this.state.data} 
												rows={50}/> 
						{/* <Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
								ExportHeader={this.ExportHeader} ExportData={this.ExportData}/> */}
						<ExportExcel ExportName={this.ExportName}/>
					</div>						 
			</div>
		)
	}
}

export default StockMovement
