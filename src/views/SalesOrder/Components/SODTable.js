import React, {Component} from  'react'
import mid from '../../../../src/assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import ok from '../../../assets/img/brand/ok.png'
import invalid from '../../../assets/img/brand/invalid.png'

class SODTable extends Component {
    constructor(props){
        super (props)

        this.state ={
            data : this.props.head,
            bodyheader : ['Line No','Product','Product Description','Qty','Qyt Processed','Weight','Weight Processed','Completed','OOS','Ref'],
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
        if(id == 'Site')
        {
          this.setState({sort:!this.state.sort, sortparameter:'site'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Client')
        {
          this.setState({sort:!this.state.sort, sortparameter:'client'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Order No')
        {
          this.setState({sort:!this.state.sort, sortparameter:'order_no'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Ship to Name')
        {
          this.setState({sort:!this.state.sort, sortparameter:'ship_to_name'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Customer Name')
        {
          this.setState({sort:!this.state.sort, sortparameter:'customer_name'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Status')
        {
          this.setState({sort:!this.state.sort, sortparameter:'status'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Date Received')
        {
          this.setState({sort:!this.state.sort, sortparameter:'date_due'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Date Rece')
        {
          this.setState({sort:!this.state.sort, sortparameter:'date_recd'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Date Released')
        {
          this.setState({sort:!this.state.sort, sortparameter:'date_released'})
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
        }
        else if(id == 'Supplier Name')
        {
          this.setState({sort:!this.state.sort, sortparameter:'date_completed'})
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
                  {/* {this.state.bodyheader.map(header =>
                    <th key={header} onClick={(e) => this.arrowHandler(e)} id={header}>{header} 
                    <img key={header} className='arrow' style={{marginLeft:'0.3em' , width:'0.6em'}} src={this.state.activearrow}/>
                    </th>
                  )} */}
                   {this.state.bodyheader.map(header =>
                    <th key={header} id={header}>{header} </th>
                  )}
                  <th className='iconU-edit'></th>
                </tr>
              </thead>
              <tbody>
            
              
    
                  {this.props.head.map((data,i) => 
                      <tr className='tr'>
                        <td>{i+1}</td>
                        <td>{data.product}</td>
                        <td style={{width :"12%"}} >{data.name}</td>
                        <td>{data.qty_lcd}</td>
                        <td>{data.qty_processed}</td>
                        <td>{data.weight}</td>
                        <td>{data.wgt_processed}</td>
                        <td><img style={{width:'15px',height:'13px'}} src={data.completed == "Y" ? ok : invalid} /></td>
                        <td>{data.qty_oos}</td>
                        <td>{data.ref}</td>
                      </tr>
                  )}   
                      
              </tbody>
            </table>
          </div>
        )
      }
    }

 export default SODTable


