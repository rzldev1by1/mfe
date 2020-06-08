import React,{Component,Fragment} from 'react'
import './PurchaseOrder.css'
import './PurchaseOrderDetail.css'
import PODTable from './Component/PODComponents/PODTable'
import axios from 'axios'
import {endpoint, headers, POheaders} from 'shared/ConfigEndpoint'
import moment from 'moment';
import EditColumn from 'shared/EditColumn'

export default class PurchaseOrderDetail extends Component {
    constructor(props){
        super(props)

        this.potableref = React.createRef()
        this.state = {
            complete:false,
            datahead:[],
            datadetail:[],
            showEditColumn: false,
            tableheader: [],
        }
    }

    componentDidMount(){
        this.getheader()
    }

    getheader = () => {
        this.setState({complete:false})
        let param     = window.location.href.split("/")
        let client_   = param[5]
        let order_no_ = param[6]
        
        console.log(param)
        axios.get(endpoint.purchaseOrder + '/' +client_ +'/' +order_no_, {
          headers: POheaders
        })
          .then(res => {
            console.log(res);
            const result = res.data.data
            this.setState({ datahead:result}) 
            this.potableref.current.setPagination(res)
            
          })
          .catch(error => {
            
          })
    }
    
    getState = (statex) => {
        console.log(this.state.site);
        return this.state[statex];
    }
    
    header = () => {
        let site = this.state.datahead.length ? this.state.datahead[0].site : null
        let client = this.state.datahead.length ? this.state.datahead[0].client : null
        let client_name = this.state.datahead.length ? this.state.datahead[0].client_name : null
        let orderNo = this.state.datahead.length ? this.state.datahead[0].order_no : null
        let orderType = this.state.datahead.length ? this.state.datahead[0].order_type : null
        let supplierNo = this.state.datahead.length ? this.state.datahead[0].supplier_id : null
        let supplierName = this.state.datahead.length ? this.state.datahead[0].supplier_name : null
        let customerOrderRef = this.state.datahead.length ? this.state.datahead[0].customer_order_ref : null
        let vendorOrderNo = this.state.datahead.length ? this.state.datahead[0].vendor_ord_ref : null
        let status = this.state.datahead.length ? this.state.datahead[0].status : null
        let statusDesc = this.state.datahead.length ? this.state.datahead[0].status_description : null
        let dateDue = this.state.datahead.length ? this.state.datahead[0].delivery_date : null
        let dateReleased = this.state.datahead.length ? this.state.datahead[0].date_released : null
        let dateCompleted = this.state.datahead.length ? this.state.datahead[0].date_completed : null
        let dateReceived = this.state.datahead.length ? this.state.datahead[0].date_received : null

        return(
            <div className='podheader fades'>                    
            <div className='sub'>                        
                <table style={{width:'90%'}}>
                    <tr>
                        <th>Site</th>
                        <td>{site ? site : '-'}</td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>{client ? client+": "+client_name : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order No</th>
                        <td>{orderNo ? orderNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order Type</th>
                        <td>{orderType ? orderType : '-'}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td >{status ? status+ ': ' +statusDesc.substring(3)  : '-'}</td>
                    </tr>
                </table>
            </div>

            <div className='sub' style={{width:'70%'}}>
                <table className='tableborderss' style={{width:'90%'}}>
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
                        <th>Vendor Order Ref</th>
                        <td>{vendorOrderNo ? vendorOrderNo : '-'}</td>
                    </tr>
                    
                </table>
            </div>

            <div className='sub'  style={{width:'65%'}}>
                <table className='tableborderss' style={{width:'90%'}}>
                <tr>
                        <th>Date Received</th>
                        <td>{dateReceived ? moment(dateReceived.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Due</th>
                        <td>{dateDue ? moment(dateDue.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Released</th>
                        <td>{dateReleased ? moment(dateReleased.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Completed</th>
                        <td>{dateCompleted ? moment(dateCompleted.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td>
                    </tr>
                </table>
            </div>

            {/* Header for pdf */} 
            <table id="headerPdf" style={{display: 'none'}}>
            <tr> 
                    <th>Site</th>
                    <td>{site ? site : '-'}</td>
                    <td></td>
                    <th>Supplier No</th>
                    <td>{supplierNo ? supplierNo : '-'}</td>
                    <td></td>
                    <th>Date Received</th>
                    <td>{dateReceived ? moment(dateReceived.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td> 
            </tr> 
            <tr> 
                    <th>Client</th>
                    <td>{client ? client+": "+client_name : '-'}</td>
                    <td></td>
                    <th>Supplier Name</th>
                    <td>{supplierName ? supplierName : '-'}</td>
                    <td></td>
                    <th>Date Due</th>
                    <td>{dateDue ? moment(dateDue.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td> 
            </tr>
            <tr> 
                    <th>Order No</th>
                    <td>{orderNo ? orderNo : '-'}</td>
                    <td></td>
                    <th>Customer Order Ref</th>
                    <td>{customerOrderRef ? customerOrderRef : '-'}</td>
                    <td></td>
                    <th>Date Released</th>
                    <td>{dateReleased ? moment(dateReleased.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td> 
            </tr>
            <tr> 
                    <th>Order Type</th>
                    <td>{orderType ? orderType : '-'}</td>
                    <td></td>
                    <th>Vendor Order Ref</th>
                    <td>{vendorOrderNo ? vendorOrderNo : '-'}</td>
                    <td></td>
                    <th>Date Completed</th>
                    <td>{dateCompleted ? moment(dateCompleted.substring(0, 11)).format("DD/MM/YYYY") : '-'}</td>
            </tr>
            <tr> 
                        <th>Status</th>
                        <td >{status ? status+ ': ' +statusDesc.substring(3)  : '-'}</td>
            </tr>
            </table>

        </div>
        )
    }


    render(){

        return(
            <div className='animated fadeIn pobody'>
                <div className='header headerss'>
                    <div className='podbreadcrumb'>
                        <h2 onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder')} className='podtitle'>Purchase Orders</h2>
                        <h2 className='podtitle iconU-rightArrow' style={{fontSize:20}}/>
                        <h2 className='podetails'>{window.location.href.split("/").pop()}</h2>
                    </div>
                </div>
                
                {
                    this.state.datahead.length ? this.header() : null
                }

                <div className={'tablePage tablecontent ' + ( this.state.datahead.length ? 'fades ' : 'hidden')}>
                    <PODTable ref={this.potableref} 
                            className='animated fadeIn' 
                            style={{display:'none',marginRight: "0px"}} 
                            datahead = {this.state.datahead}
                            showEditColumn = {() => this.setState({ showEditColumn: true })}
                            getTableHeader = {(e) => this.setState({ tableheader: e })}
                            getState = {this.getState}
                    />
                </div>
                <div className={( this.state.datahead.length ? 'hidden': 'spinner')}/>
                <EditColumn isOpen={this.state.showEditColumn} 
                            toggle={() => this.setState({ showEditColumn: false })}
                            fields={this.state.tableheader}
                            updateTableColumn={(e) => this.setState({ tableheader: e })}
                            modulName="Purchase Order Detail"
                />

             
            </div> 
        )
    }
}