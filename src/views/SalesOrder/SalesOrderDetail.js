import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './SalesOrder.css';
import Header_Left from './Components/Details/Header_Left'
import Header_Middle from './Components/Details/Header_Middle'
import Header_Right from './Components/Details/Header_Right'

class SalesOrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(<div>
      <div className="row mt-3">
          <h2 onClick={() => { this.props.history.push('/sales-orders'); }} className='mr-3 mt-1' style={{cursor:"pointer"}}> Sales Order Detail</h2>
          <h2 className='pt-2 mr-3 iconU-rightArrow' style={{fontSize:20}}/>
          <h2 className='mt-1 breadcrumb-active'>{this.props.match.params.id}</h2>
      </div>
      <div>
          <Card>
            <CardBody>
              <div className="d-flex">
                <Header_Left />
                <Header_Middle />
                <Header_Right />
              </div>
            </CardBody>
          </Card>
      </div>

    </div>)
  }

}

export default SalesOrderDetail;
