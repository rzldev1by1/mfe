import React, {Component} from 'react'
import axios from 'axios'
import Dropdown from './Dropdown'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
export default class Dropdowns extends Component {
    constructor(props){
        super(props)

        this.state = {
            ordertypedata:[],
            ordertype:null,
            ordertypeSelected:'Order Type',
            ordertypeeExpand:false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
     }

      getordertype = (client, site) => {
        if(client && site)
        {
            axios.get(endpoint.ddlordertype  + '?client='+client + '&site='+site, {
                headers: headers
              })
                .then(res => {
                  const result = res.data
                  this.setState({ ordertypedata:result })
                })
                .catch(error => {
                  // this.props.history.push("/logins")
                })
        }
      }

    //Order Type
    selectedOrderType = (e) => {
      this.setState({ordertypeSelected:e.target.textContent})
      this.setState({ordertype:e.target.id}, () =>{
        this.props.filter(null,null,null,this.state.ordertype)
    })
      this.setState({ordertypeeExpand: false})
    }

    expandOrderType = () => {
      this.setState({
        ordertypeeExpand: !this.state.ordertypeeExpand,
      })
    }

    render(){        
        return(
            <div style={{display:'flex', width:'100%'}}> 
                <div class="dropdown dd">
                  <button onClick={() => this.expandOrderType()} type="button" className="btn dropdown-button dropdown-toggle po" data-toggle="dropdown">
                  {this.state.ordertypeSelected}
                  </button>
                  <div class={"dropdown-menu " + (this.state.ordertypeeExpand ? "show" : null)}>
                  {
                      this.state.ordertypedata.map(
                          data => <div onClick={(e) => this.selectedOrderType(e)} class="dropdown-item" id={data.code}>{data.description}</div>
                      )
                  }
                  </div>
                </div>
            </div>
        )
    }

}