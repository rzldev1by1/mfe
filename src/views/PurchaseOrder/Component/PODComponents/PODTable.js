import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../../src/AppComponent'
import mid from '../../../../../src/assets/img/brand/field-idle.png'
import down from '../../../../assets/img/brand/field-bot.png'
import up from '../../../../assets/img/brand/field-top.png'
import ok from '../../../../assets/img/brand/ok.jpg'
import minus from '../../../../assets/img/brand/minus.png'

import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:this.props.datahead,
      tableheader : ['Line No','Product','Product Description','Qty','UOM','Qty Processed','Weigh','Weigh Processed','Completed','Ref '],
      activearrow:mid,
      sortparameter:'order_no',
      sort:true
    }
  }

  arrowHandler = (e) => {
    let id = e.currentTarget.id
    let activearrow = this.state
    if(this.state.activearrow == mid)
      {
        this.setState({activearrow:up})
        this.sortby(id)
      }

      if(this.state.activearrow == up)
      {
        this.setState({activearrow:down})
        this.sortby(id)
      }

      if(this.state.activearrow == down)
      {
        this.setState({activearrow:up})
        this.sortby(id)
      }
  }

  sortby = (id) => {
    if(id == 'Product')
    {
      this.setState({sort:!this.state.sort, sortparameter:'product'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Status Description')
    {
      this.setState({sort:!this.state.sort, sortparameter:'status_desc'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Quantity')
    {
      this.setState({sort:!this.state.sort, sortparameter:'qty_lcd'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'UOM')
    {
      this.setState({sort:!this.state.sort, sortparameter:'packdesc_1'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Qty Processed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'qty_processed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Completed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'completed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Weight Process')
    {
      this.setState({sort:!this.state.sort, sortparameter:'wgt_processed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Rotadate')
    {
      this.setState({sort:!this.state.sort, sortparameter:'rota1'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Disposition')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_released'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Ref ')
    {
      this.setState({sort:!this.state.sort, sortparameter:'ref'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
  }

  sorting = (data, param, sort) => {
    data.sort((a,b) => {
      if(a[param] !== null && b[param] !== null)
      {
        if(sort == true)
      {
        if(a[param].toLowerCase() < b[param].toLowerCase()) return -1
        if(a[param].toLowerCase() > b[param].toLowerCase()) return 1
        return 0
      }
      else if(sort == false)
      {
        if(a[param].toLowerCase() < b[param].toLowerCase()) return 1
        if(a[param].toLowerCase() > b[param].toLowerCase()) return -1
        return 0
      }
      }
    })
    this.setState({data:data})
  }

  render(){
    return(
      <div>
        <table className="potable">
          <thead>
            <tr>
              {this.state.tableheader.map(header =>
                <th key={header} onClick={(e) => this.arrowHandler(e)} id={header}>{header} 
                <img key={header} className='arrow' src={this.state.activearrow}/>
                </th>
              )}
              
              <th className='iconU-edit'></th>
            </tr>
          </thead>
          <tbody>
        
          

              {this.props.datahead.map((data,i) => 
                  <tr className='tr'>
                    <td>{i+1}</td>
                    <td>{data.product}</td>
                    <td >{data.status_desc.substring(2)}</td>
                    <td>{data.qty_lcd}</td>
                    <td>{data.packdesc_1}</td>
                    <td>{data.qty_processed}</td>
                    <td>{data.weight}</td>
                    <td>{data.wgt_processed}</td>
                    <td><img style={{width:'15px',height:'13px'}} src={data.completed == "Y" ? ok :minus} /></td>
                    <td>{data.ref3}</td>
                    <td className='iconU-option'></td>
                  </tr>
              )}   
                  
          </tbody>
        </table>
      </div>
    )
  }
}

export default PurchaseOrderTable