import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../../src/AppComponent'
import mid from '../../../../../src/assets/img/brand/field-idle.png'
import down from '../../../../assets/img/brand/field-bot.png'
import up from '../../../../assets/img/brand/field-top.png'
import ok from '../../../../assets/img/brand/ok.png'
import minus from '../../../../assets/img/brand/minus.png'

import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:this.props.datahead,
      tableheader: [
          {
            id: "orig_line_number", 
            checkboxLabelText: "Line No", 
            tableHeaderText: "Line No", 
            isVisible: true, 
            key: "orig_line_number", 
            type: "string"
          },
          {
            id: "product", 
            checkboxLabelText: "Product", 
            tableHeaderText: "Product", 
            isVisible: true, 
            key: "product", 
            type: "string"
          },
          {
            id: "product_name", 
            checkboxLabelText: "Product Description", 
            tableHeaderText: "Product Description", 
            isVisible: true, 
            key: "product_name", 
            type: "string"
          },
          {
            id: "quantity", 
            checkboxLabelText: "Qty", 
            tableHeaderText: "Qty", 
            isVisible: true, 
            key: "quantity", 
            type: "string"
          },
          {
            id: "packdesc_1", 
            checkboxLabelText: "UOM", 
            tableHeaderText: "UOM", 
            isVisible: true, 
            key: "packdesc_1", 
            type: "string"
          },
          {
            id: "qty_processed", 
            checkboxLabelText: "Qty Processed", 
            tableHeaderText: "Qty Processed", 
            isVisible: true, 
            key: "qty_processed", 
            type: "string"
          },
          {
            id: "weight", 
            checkboxLabelText: "Weight", 
            tableHeaderText: "Weight", 
            isVisible: true, 
            key: "weight", 
            type: "string"
          },
          {
            id: "weight_processed", 
            checkboxLabelText: "Weight Processed", 
            tableHeaderText: "Weight Processed", 
            isVisible: true, 
            key: "weight_processed", 
            type: "string"
          },
          {
            id: "completed", 
            checkboxLabelText: "Completed", 
            tableHeaderText: "Completed", 
            isVisible: true, 
            key: "completed", 
            type: "string"
          },
          {
            id: "batch", 
            checkboxLabelText: "Batch", 
            tableHeaderText: "Batch", 
            isVisible: true, 
            key: "batch", 
            type: "string"
          },
          {
            id: "rotadate", 
            checkboxLabelText: "Rota Date", 
            tableHeaderText: "Rota Date", 
            isVisible: true, 
            key: "rotadate", 
            type: "string"
          },
          {
            id: "ref3", 
            checkboxLabelText: "Ref 3", 
            tableHeaderText: "Ref 3", 
            isVisible: true, 
            key: "ref3", 
            type: "string"
          },
          {
            id: "ref4", 
            checkboxLabelText: "Ref 4", 
            tableHeaderText: "Ref 4", 
            isVisible: true, 
            key: "ref4", 
            type: "string"
          },
          {
            id: "disposition", 
            checkboxLabelText: "Disposition", 
            tableHeaderText: "Disposition", 
            isVisible: true, 
            key: "disposition", 
            type: "string"
          }
      ],
      activearrow:mid,
      sortparameter:'order_no',
      sort:true
    }
  }

  componentDidMount(){
      this.props.getTableHeader(this.state.tableheader)
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
      this.setState({sort:!this.state.sort, sortparameter:'status_description'})
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
              {this.state.tableheader.map((header, idx) => {
                  if(header.isVisible){
                      return (
                        <th key={idx} 
                        
                        id={header.id}>
                            {header.tableHeaderText} 
                        
                        </th>
                      )
                  }
              }
              )}
              
              <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
            </tr>
          </thead>
          <tbody>
        
          

              {this.props.datahead.map((data,i) => 
                  <tr key={i} className='tr'>
                    {this.state.tableheader.map((column, columnIdx) => {
                        if(column.isVisible){
                            if(column.id === "line_no"){
                                return <td key={columnIdx}>{i+1}</td>
                            }
                            if(column.id === "status_description"){
                                return <td key={columnIdx}>{data[column.id].substring(2)}</td>
                            }
                            if(column.id === "completed"){
                                return <td key={columnIdx}>
                                            <img style={{width:'15px',height:'13px'}} src={data[column.id] == "Y" ? ok : minus}></img>
                                       </td>
                            }
                            return <td key={columnIdx}>{data[column.id] ? data[column.id] : "-"}</td>
                        }
                    })}
                    <td></td>
                  </tr>
              )}   
                  
          </tbody>
        </table>
      </div>
    )
  }
}

export default PurchaseOrderTable