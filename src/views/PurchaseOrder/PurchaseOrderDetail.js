import React,{Component,Fragment} from 'react'
import './PurchaseOrder.css'
import './PurchaseOrderDetail.css'
import PODTable from './Component/PODComponents/PODTable'
import axios from 'axios'
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'

export default class PurchaseOrderDetail extends Component {
    constructor(props){
        super(props)

        this.potableref = React.createRef()
        this.state = {
            complete:false,
            datahead:[],
            datadetail:[]
        }
    }

    componentDidMount(){
        this.getheader()
    }

    getheader = () => {
        this.setState({complete:false})
        let param = window.location.href.split("/").pop()
        axios.get(endpoint.purchaseOrder + '/' +param, {
          headers: headers
        })
          .then(res => {
            const result = res.data.data
            this.setState({ datahead:result})
            
            
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
    }

    header = () => {
        let site = this.state.datahead.length ? this.state.datahead[0].site : null
        let client = this.state.datahead.length ? this.state.datahead[0].client : null
        let orderNo = this.state.datahead.length ? this.state.datahead[0].order_no : null
        let orderType = this.state.datahead.length ? this.state.datahead[0].order_type : null
        let supplierNo = this.state.datahead.length ? this.state.datahead[0].supplier : null
        let supplierName = this.state.datahead.length ? this.state.datahead[0].ship_to_name : null
        let customerOrderRef = this.state.datahead.length ? this.state.datahead[0].customer_po_no : null
        let vendorOrderNo = this.state.datahead.length ? this.state.datahead[0].vendor_ord_no : null
        let status = this.state.datahead.length ? this.state.datahead[0].status : null
        let dateDue = this.state.datahead.length ? this.state.datahead[0].date_due : null
        let dateReleased = this.state.datahead.length ? this.state.datahead[0].date_released : null
        let dateCompleted = this.state.datahead.length ? this.state.datahead[0].date_completed : null

        return(
            <div className='podheader fades'>                    
            <div className='sub'>                        
                <table style={{width:'60%'}}>
                    <tr>
                        <th>Site</th>
                        <td>{site ? site : '-'}</td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>{client ? client : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order No</th>
                        <td>{orderNo ? orderNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>OrderType</th>
                        <td>{orderType ? orderType : '-'}</td>
                    </tr>
                </table>
            </div>

            <div className='sub' style={{width:'70%'}}>
                <table className='tableborderss' style={{width:'80%'}}>
                    <tr>
                        <th>Supplier No</th>
                        <td>{supplierNo ? supplierNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>Supplier Name</th>
                        <td>{supplierName ? supplierName : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer Order Ref</th>
                        <td>{customerOrderRef ? customerOrderRef : '-'}</td>
                    </tr>
                    <tr>
                        <th>Vendor Order No</th>
                        <td>{vendorOrderNo ? vendorOrderNo : '-'}</td>
                    </tr>
                </table>
            </div>

            <div className='sub'>
                <table className='tableborderss' style={{width:'80%'}}>
                    <tr>
                        <th>Status</th>
                        <td style={{color:'#7FC242'}}>{status ? status : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Due</th>
                        <td>{dateDue ? dateDue.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Released</th>
                        <td>{dateReleased ? dateReleased.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Completed</th>
                        <td>{dateCompleted ? dateCompleted.substring(0, 11) : '-'}</td>
                    </tr>
                </table>
            </div>
        </div>
        )
    }


    render(){

        return(
            <div className='animated fadeIn pobody'>
                <div className='header headerss'>
                    <div className='podbreadcrumb'>
                        <h2 onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder')} className='podtitle'>Purchase Order</h2>
                        <h2 className='podtitle iconU-rightArrow' style={{fontSize:20}}/>
                        <h2 className='podetails'>{window.location.href.split("/").pop()}</h2>
                    </div>
                </div>
                
                {
                    this.state.datahead.length ? this.header() : null
                }

                <div className={'tablecontent ' + ( this.state.datahead.length ? 'fades ' : 'hidden')}>
                    <PODTable ref={this.potableref} className='animated fadeIn' style={{display:'none'}} datahead = {this.state.datahead}/>
                </div>
                <div className={( this.state.datahead.length ? 'hidden': 'spinner')}/>
            </div>
        )
    }
}