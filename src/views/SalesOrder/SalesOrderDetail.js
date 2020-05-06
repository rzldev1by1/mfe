import React, { Component } from 'react'
import './SalesOrder.css';
import './SalesOrderDetail.css'
import SODTable from './Components/SODTable'
import axios from 'axios'
import { endpoint, headers, } from '../../AppComponent/ConfigEndpoint'
import Authentication from '../../Auth/Authentication'
import client from '../UserManagement/Component/Client';

class SalesOrderDetail extends Component {
    constructor(props) {
        super(props);

        this.potableref = React.createRef()
        this.state = {
            complete: false,
            head: [],
            line: []
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

    head = () => {
        let site = this.state.head.length ? this.state.head[0].site : null
        let client = this.state.head.length ? this.state.head[0].client : null
        let orderNo = this.state.head.length ? this.state.head[0].order_no : null
        let orderType = this.state.head.length ? this.state.head[0].order_type : null
        let consignmentNumber = this.state.head.length ? this.state.head[0].consignment_number : null
        let freightCharge = this.state.head.length ? this.state.head[0].freight_charge : null
        let custOrderNumber = this.state.head.length ? this.state.head[0].cust_order_number : null
        let customerPoNo = this.state.head.length ? this.state.head[0].customer_po_no : null
        let dateReceived = this.state.head.length ? this.state.head[0].date_received : null
        let dateReleased = this.state.head.length ? this.state.head[0].date_released : null
        let dateCompleted = this.state.head.length ? this.state.head[0].date_completed : null
        let customerName = this.state.head.length ? this.state.head[0].customer_name : null
        let status = this.state.head.length ? this.state.head[0].status : null
        let vendorOrderNo = this.state.head.length ? this.state.head[0].vendor_order_no : null
        let loadNumber = this.state.head.length ? this.state.head[0].load_number : null
        let loadoutStart = this.state.head.length ? this.state.head[0].loadout_start : null
        let loadoutFinish = this.state.head.length ? this.state.head[0].loadout_finish : null
        let Address1 = this.state.head.length ? this.state.head[0].address_1 : null
        let Address2 = this.state.head.length ? this.state.head[0].address_2 : null
        let Address3 = this.state.head.length ? this.state.head[0].address_3 : null
        let Address4 = this.state.head.length ? this.state.head[0].address_4 : null
        let Address5 = this.state.head.length ? this.state.head[0].address_5 : null
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
                            <td>{customerName ? customerName : '-'}</td>
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
                    <SODTable ref={this.potableref} className='animated fadeIn' style={{ display: 'none' }} head={this.state.line}><tr></tr></SODTable>
                </div>
                <div className={(this.state.head.length ? 'hidden' : 'spinner')} />

            </div>
        )
    }

}

export default SalesOrderDetail;
