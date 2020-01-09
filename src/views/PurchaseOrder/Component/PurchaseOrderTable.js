import React, {Component} from  'react'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      tableheader : ['Site','Order No','Client','Status','Status Description','Date Due','Date Received','Date Released','Date Completed','Supplier Name'],
      tablebody : ['A','PO-4312','Josaphat','1','Available','27/01/2020','27/01/2020','27/01/2020','27/01/2020', 'Swann-wq12'],
      activearrow:mid
    }
  }

  arrow = (header) => {
    return(
      <img id={header} onClick={() => this.arrowHandler(header)} className='arrow' src={this.state.activearrow}/>
    )
  }

  arrowHandler = (header) => {
    if(this.state.activearrow == mid)
    {
      this.setState({activearrow:up})
    }

    if(this.state.activearrow == up)
    {
      this.setState({activearrow:down})
    }

    if(this.state.activearrow == down)
    {
      this.setState({activearrow:up})
    }
  }

  render(){
    return(
      <div>
        <table class="table">
          <thead>
            <tr>
              {this.state.tableheader.map(header =><th>{header}{this.arrow(header)}</th>)}
              <th className='iconU-edit'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            <tr className='tr'>
              {this.state.tablebody.map(body => <td>{body}</td>)}
              <td className='iconU-option'></td>
            </tr>
            
          </tbody>
        </table>
      </div>
    )
  }
}

export default PurchaseOrderTable