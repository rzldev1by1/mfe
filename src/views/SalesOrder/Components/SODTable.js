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
            bodyheader : ['Line No','Product','Product Description','Qty','Qty Processed','Weight','Weight Processed','Completed','OOS','Ref'],
            activearrow:mid,
            sortparameter:'order_no',
            sort:true
                    
        }
    }

      render(){
        return(
          <div>
            <table className="potable">
              <thead>
                <tr>
                   {this.state.bodyheader.map(header =>
                    <th key={header} id={header}>{header} </th>
                  )}
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


