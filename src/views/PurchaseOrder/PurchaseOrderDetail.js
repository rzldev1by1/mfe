import React,{Component,Fragment} from 'react'
import './PurchaseOrder.css'
import './PurchaseOrderDetail.css'
import PODTable from './Component/PODComponents/PODTable'
import {Card, CardBody} from 'reactstrap';

export default class PurchaseOrderDetail extends Component {
    constructor(props){
        super(props)

        this.potableref = React.createRef()
        this.state = {
            complete:false
        }
    }


    render(){
        return(
            <div className='animated fadeIn pobody'>
                <div className='header headerss'>
                    <div className='podbreadcrumb'>
                        <h2 onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder')} className='podtitle'>Purchase Order</h2>
                        <h2 className='podtitle iconU-rightArrow' style={{fontSize:20}}/>
                        <h2 className='podetails'>PO-001</h2>
                    </div>
                </div>

                <div className='podheader'>
                    <div className='sub'>
                    <table style={{width:'60%'}}>
                        <tr>
                            <th>Site</th>
                            <td>A</td>
                        </tr>
                        <tr>
                            <th>Client</th>
                            <td>Josaphat</td>
                        </tr>
                        <tr>
                            <th>Order No</th>
                            <td>PO-001</td>
                        </tr>
                        <tr>
                            <th>OrderType</th>
                            <td>Order a</td>
                        </tr>
                    </table>
                    </div>

                    <div className='sub' style={{width:'70%'}}>
                    <table className='tableborderss' style={{width:'80%'}}>
                        <tr>
                            <th>Supplier No</th>
                            <td>3405834535</td>
                        </tr>
                        <tr>
                            <th>Supplier Name</th>
                            <td>Swann-wq12</td>
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
                            <td style={{color:'#7FC242'}}>2</td>
                        </tr>
                        <tr>
                            <th>Date Due</th>
                            <td>27/01/2019</td>
                        </tr>
                        <tr>
                            <th>Date Released</th>
                            <td>30/01/2019</td>
                        </tr>
                        <tr>
                            <th>Date Completed</th>
                            <td>02/02/2019</td>
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