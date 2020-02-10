import React, {Component} from 'react'
import axios from 'axios'
import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'
export default class DropdownClient extends Component {
    constructor(props){
        super(props)

        this.state = {
            clientdata:[],
            client:null,
            clientSelected:'Client',
            clientExpand:false,
        }
    }

    componentDidMount() {
        this.getclient()
      }

    getclient = () => {
        axios.get(endpoint.ddlclient, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ clientdata:result })
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
      }

    //Client
    selectedClient = (e) => {
      this.setState({clientSelected:e.target.textContent}, () =>{
          this.props.clientVal(this.state.client)
      })
      this.setState({client:e.target.id})
      this.setState({clientExpand: false})
    }

    expandClient = () => {
      this.setState({
        clientExpand: !this.state.clientExpand,
        siteExpand: false,
        statuseExpand: false,
        ordertypeeExpand: false,
        suppliereExpand:false        
      })
    }
    render(){        
        return(
            <div style={{display:'flex', width:'100%'}}> 
                <div class="dropdown dd">
                  <button onClick={() => this.expandClient()} type="button" className="btn dropdown-button dropdown-toggle po" data-toggle="dropdown">
                  {this.state.clientSelected}
                  </button>
                  <div class={"dropdown-menu " + (this.state.clientExpand ? "show" : null)}>
                  {
                      this.state.clientdata.map(
                          data => <div onClick={(e) => this.selectedClient(e)} class="dropdown-item" id={data.code}>{data.name}</div>
                      )
                  }
                  </div>
                </div>
            </div>
        )
    }

}