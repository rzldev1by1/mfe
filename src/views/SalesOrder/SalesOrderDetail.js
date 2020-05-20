import React, { Component } from 'react'
import './SalesOrder.css';
import './SalesOrderDetail.css'
import SODTable from './Components/SODTable'
import axios from 'axios'
import { endpoint, headers, } from '../../AppComponent/ConfigEndpoint'
import Authentication from '../../Auth/Authentication'
import client from '../UserManagement/Component/Client'
import EditColumn from '../../AppComponent/EditColumn'

class SalesOrderDetail extends Component {
    constructor(props) {
        super(props);

        this.sotableref = React.createRef()
        this.state = {
            complete: false,
            head: [],
            line: [], 
            tableheader: [],
            showEditColumn: false
        }
        
        this.client = Authentication.getClient()
    }

    componentDidMount() {
        this.getHeaderDetail()
        this.getProductDetail()
    }

    getProductDetail = () => {
        this.setState({ complete: false })
        let param = window.location.href.split("/")
        let index = param.length

        let client = param[index - 3]
        let site = param[index - 2]
        let orderNo = param[index - 1]

        param= '?client=' + client

        axios.get(endpoint.salesOrder +'/' + orderNo + param,{
            headers:headers
        })
        .then(res => {
            const result = res.data.data
            this.setState({line:result})
            this.sotableref.current.setPagination(res)
        })

    }

    getHeaderDetail = () => {
        this.setState({ complete: false })
        let param = window.location.href.split("/")
        let index = param.length

        let client = param[index - 3]
        let site = param[index - 2]
        let orderNo = param[index - 1]
        param = '?searchParam=' + orderNo + '&&client=' + client + '&&site=' + site
        axios.get(endpoint.salesOrder + param, {

            headers: headers
        })
            .then(res => {
                const result = res.data.data
                this.setState({ head: result })
            })
            .catch(error => {
                
            })
    }

    modifiedCustomerData = (code,name) => {
        if(code && name) return code+' ( '+name+' )'
        if(!code && name) return name
        if(!code && !name) return '-'
        if(code && !name) return code
      }

    head = () => {
        let site = this.state.head.length ? this.state.head[0].site : null
        let client = this.state.head.length ? this.state.head[0].client : null
        let orderNo = this.state.head.length ? this.state.head[0].orderno : null
        let orderType = this.state.head.length ? this.state.head[0].ordertype : null
        let consignmentNumber = this.state.head.length ? this.state.head[0].consignmentnumber : null
        let freightCharge = this.state.head.length ? this.state.head[0].freightcharge : null
        let custOrderNumber = this.state.head.length ? this.state.head[0].custordernumber : null
        let customerPoNo = this.state.head.length ? this.state.head[0].customerpono : null
        let dateReceived = this.state.head.length ? this.state.head[0].datereceived : null
        let dateReleased = this.state.head.length ? this.state.head[0].datereleased : null
        let dateCompleted = this.state.head.length ? this.state.head[0].datecompleted : null
        let customer = this.state.head.length ? this.state.head[0].customer : null
        let customerName = this.state.head.length ? this.state.head[0].customername : null
        let status = this.state.head.length ? this.state.head[0].status : null
        let vendorOrderNo = this.state.head.length ? this.state.head[0].vendororderno : null
        let loadNumber = this.state.head.length ? this.state.head[0].loadnumber : null
        let loadoutStart = this.state.head.length ? this.state.head[0].loadoutstart : null
        let loadoutFinish = this.state.head.length ? this.state.head[0].loadoutfinish : null
        let Address1 = this.state.head.length ? this.state.head[0].address1 : null
        let Address2 = this.state.head.length ? this.state.head[0].address2 : null
        let Address3 = this.state.head.length ? this.state.head[0].address3 : null
        let Address4 = this.state.head.length ? this.state.head[0].address4 : null
        let Address5 = this.state.head.length ? this.state.head[0].address5 : null
        let postCode = this.state.head.length ? this.state.head[0].postcode : null
        let country = this.state.head.length ? this.state.head[0].country : null
        let state = this.state.head.length ? this.state.head[0].state : null
        let city = this.state.head.length ? this.state.head[0].city : null
        let statusDesc = this.state.head.length ? this.state.head[0].status_desc : null
        return (
            <div className='podheader fades'>
                <div className='sub'>
                    <table style={{ width: '100%' }}>
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
                            <th>Order Type</th>
                            <td>{orderType ? orderType : '-'}</td>
                        </tr>
                        <tr>
                            <th>Customer </th>
                            <td>{this.modifiedCustomerData(customer, customerName)}</td>
                        </tr>
                        <tr>
                            <th>Customer Order Ref</th>
                            <td>{customerPoNo ? customerPoNo : '-'}</td>
                        </tr>
                        <tr>
                            <th>Vendor Order Ref</th>
                            <td>{custOrderNumber ? custOrderNumber : '-'}</td>
                        </tr>
                    </table>
                </div>

                <div className='sub' style={{ width: '64%' }}>

                    <table className='tableborderss' style={{ width: '100%' }}>
                        <tr>
                            <th>Address 1</th>
                            <td>{Address1 ? Address1 : '-'}</td>
                        </tr>
                        <tr>
                            <th>Address 2</th>
                            <td>{Address2 ? Address2 : '-'}</td>
                        </tr>
                        <tr>
                            <th>Address 3</th>
                            <td>{Address3 ? Address3 : '-'}</td>
                        </tr>
                        <tr>
                            <th>Address 4</th>
                            <td>{Address4 ? Address4 : '-'}</td>
                        </tr>
                        <tr>
                            <th>Address 5</th>
                            <td>{Address5 ? Address5 : '-'}</td>
                        </tr>
                        <tr>
                            <th>Suburb</th>
                            <td>{city ? city : '-'}</td>
                        </tr>
                        <tr>
                            <th>Postcode</th>
                            <td>{postCode ? postCode : '-'}</td>
                        </tr>
                        <tr>
                            <th>State</th>
                            <td>{state ? state : '-'}</td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td>{country ? country : '-'}</td>
                        </tr>
                    </table>
                    <div className='hori' />
                </div>
                <div className='sub' style={{ width: '65%' }}>
                    <table className='tableborderss' style={{ width: '90%' }}>
                        <tr>
                            <th>Status</th>
                            <td >{status ? status : '-'}</td>
                        </tr>
                        <tr>
                            <th>Delivery Date</th>
                            <td>{dateReceived ? dateReceived.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Date Received</th>
                            <td>{dateReceived ? dateReceived.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Date Released</th>
                            <td>{dateReleased ? dateReleased.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Date Completed</th>
                            <td>{dateCompleted ? dateCompleted.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Load Number</th>
                            <td>{loadNumber ? loadNumber : '-'}</td>
                        </tr>
                        <tr>
                            <th>Loadout Start</th>
                            <td>{loadoutStart ? loadoutStart.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Loadout Finish</th>
                            <td>{loadoutFinish ? loadoutFinish.substring(0, 11) : '-'}</td>
                        </tr>
                        <tr>
                            <th>Consignment No</th>
                            <td>{consignmentNumber ? consignmentNumber : '-'}</td>
                        </tr>
                        <tr>
                            <th>Freight Charge</th>
                            <td>{freightCharge ? freightCharge : '-'}</td>
                        </tr>
                    </table>

                    <table id="headerPdf" style={{display: 'none'}}>
                    <tr> 
                    <th>Site</th>
                            <td>{site ? site : '-'}</td>
                            <td></td>
                            <th>Address 1</th>
                            <td>{Address1 ? Address1 : '-'}</td>
                            <td></td>
                            <th>Status</th>
                            <td >{status ? status : '-'}</td>
                    </tr> 
                    <tr> 
                            <th>Client</th>
                            <td>{client ? client : '-'}</td>
                            <td></td>
                            <th>Address 2</th>
                            <td>{Address2 ? Address2 : '-'}</td>
                            <td></td>
                            <th>Delivery Date</th>
                            <td>{dateReceived ? dateReceived.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th>Order No</th>
                            <td>{orderNo ? orderNo : '-'}</td>
                            <td></td>
                            <th>Address 3</th>
                            <td>{Address3 ? Address3 : '-'}</td>
                            <td></td>
                            <th>Date Received</th>
                            <td>{dateReceived ? dateReceived.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th>Order Type</th>
                            <td>{orderType ? orderType : '-'}</td>
                            <td></td>
                            <th>Address 4</th>
                            <td>{Address4 ? Address4 : '-'}</td>
                            <td></td>
                            <th>Date Released</th>
                            <td>{dateReleased ? dateReleased.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th>Customer </th>
                            <td>{this.modifiedCustomerData(customer, customerName)}</td>
                            <td></td>
                            <th>Address 5</th>
                            <td>{Address5 ? Address5 : '-'}</td>
                            <td></td>
                            <th>Date Completed</th>
                            <td>{dateCompleted ? dateCompleted.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th>Customer Order Ref</th>
                            <td>{customerPoNo ? customerPoNo : '-'}</td>
                            <td></td>
                            <th>Suburb</th>
                            <td>{city ? city : '-'}</td>
                            <td></td>
                            <th>Load Number</th>
                            <td>{loadNumber ? loadNumber : '-'}</td>
                    </tr>
                    <tr> 
                            <th>Vendor Order Ref</th>
                            <td>{custOrderNumber ? custOrderNumber : '-'}</td>
                            <td></td>
                            <th>Postcode</th>
                            <td>{postCode ? postCode : '-'}</td>
                            <td></td>
                            <th>Loadout Start</th>
                            <td>{loadoutStart ? loadoutStart.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th></th>
                            <td></td>
                            <td></td>
                            <th>State</th>
                            <td>{state ? state : '-'}</td>
                            <td></td>
                            <th>Loadout Finish</th>
                            <td>{loadoutFinish ? loadoutFinish.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr> 
                            <th></th>
                            <td></td>
                            <td></td>
                            <th>Country</th>
                            <td>{country ? country : '-'}</td>
                            <td></td>
                            <th>Consignment No</th>
                            <td>{consignmentNumber ? consignmentNumber : '-'}</td>
                    </tr>
                    <tr> 
                            <th></th>
                            <td></td>
                            <td></td>
                            <th></th>
                            <td></td>
                            <td></td>
                            <th>Freight Charge</th>
                            <td>{freightCharge ? freightCharge : '-'}</td>
                    </tr>
            </table>
                </div>

            </div>
        )
    }

    render() {
        return (
            <div className='animated fadeIn pobody'>
                <div className='header headerss'>
                    <div className='podbreadcrumb'>
                        <h2 onClick={() => window.location.replace(window.location.origin + '/#/sales-orders')} className='podtitle'>Sales Order</h2>
                        <h2 className='podtitle iconU-rightArrow' style={{ fontSize: 20 }} />
                        <h2 className='podetails'>{window.location.href.split("/").pop()}</h2>
                    </div>
                </div>

                {
                    this.state.head.length ? this.head() : null
                }
                <div className={'tablecontent ' + (this.state.head.length ? 'fades ' : 'hidden')}>
                    <SODTable ref={this.sotableref} 
                    className='animated fadeIn' 
                    style={{ display: 'none' }} 
                    head={this.state.line} 
                    header={this.state.head} 
                    showEditColumn = {() => this.setState({ showEditColumn: true })}
                    getTableHeader = {(e) => this.setState({ tableheader: e })}/>
                </div>
                <div className={(this.state.head.length ? 'hidden' : 'spinner')} />

                {this.state.showEditColumn ? <EditColumn isOpen={this.state.showEditColumn} 
                            toggle={() => this.setState({ showEditColumn: false })}
                            fields={this.state.tableheader}
                            updateTableColumn={(e) => this.setState({ tableheader: e })}
                            modulName="Sales Order Detail" 
                /> : null}
            </div>
        )
    }

}

export default SalesOrderDetail;
