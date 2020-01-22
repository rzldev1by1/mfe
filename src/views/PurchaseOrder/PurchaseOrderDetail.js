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
        let param = window.location.href.split("/").pop()
        axios.get('http://127.0.0.1:8000/purchaseOrder/' + param, {
          headers: headers
        })
          .then(res => {
            const result = res.data.data
            this.setState({ datahead:result })
            
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
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
                <div className='podheader fades'>                    
                    <div className='sub'>                        
                        <table style={{width:'60%'}}>
                            <tr>
                                <th>Site</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].site : null}</td>
                            </tr>
                            <tr>
                                <th>Client</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].client : null}</td>
                            </tr>
                            <tr>
                                <th>Order No</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].order_no : null}</td>
                            </tr>
                            <tr>
                                <th>OrderType</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].order_type : null}</td>
                            </tr>
                        </table>
                    </div>

                    <div className='sub' style={{width:'70%'}}>
                        <table className='tableborderss' style={{width:'80%'}}>
                            <tr>
                                <th>Supplier No</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].supplier : null}</td>
                            </tr>
                            <tr>
                                <th>Supplier Name</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].ship_to_name : null}</td>
                            </tr>
                            <tr>
                                <th>Customer Order Ref</th>
                                <td>Customer Order Ref</td>
                            </tr>
                            <tr>
                                <th>Vendor Order No</th>
                                <td>23435353454353</td>
                            </tr>
                        </table>
                    </div>

                    <div className='sub'>
                        <table className='tableborderss' style={{width:'80%'}}>
                            <tr>
                                <th>Status</th>
                                <td style={{color:'#7FC242'}}>{this.state.datahead.length ? this.state.datahead[0].status : null}</td>
                            </tr>
                            <tr>
                                <th>Date Due</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].date_due.substring(0, 11) : null}</td>
                            </tr>
                            <tr>
                                <th>Date Released</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].date_released.substring(0, 11) : null}</td>
                            </tr>
                            <tr>
                                <th>Date Completed</th>
                                <td>{this.state.datahead.length ? this.state.datahead[0].date_completed.substring(0, 11) : null}</td>
                            </tr>
                        </table>
                    </div>
                </div>                

                <div className={'tablecontent ' + ( this.state.complete ? 'fades ' : 'hidden')}>
                    <PODTable ref={this.potableref} className='animated fadeIn' style={{display:'none'}} loadCompleteHandler = {(v) =>  this.setState({complete: v})}/>
                </div>
                <div className={( this.state.complete ? 'hidden': 'spinner')}/>
            </div>
        )
    }
}