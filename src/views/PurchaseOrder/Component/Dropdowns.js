import React, {Component} from 'react'
import axios from 'axios'
import Dropdown from './Dropdown'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
export default class Dropdowns extends Component {
    constructor(props){
        super(props)

        this.state = {
            clientdata:[],
            sitedata:[],
            statusdata:[],
            ordertypedata:[],
            supplierdata:[],

            client:null,
            site:null,
            status:null,
            ordertype:null,
            supplier:null,

            clientSelected:'Client',
            siteSelected:'Site',
            statusSelected:'Status',
            ordertypeSelected:'Order Type',
            supplierSelected:'Supplier',

            clientExpand:false,
            siteExpand:false,
            statuseExpand:false,
            ordertypeeExpand:false,
            suppliereExpand:false,

             //autocomplete
             autoText:null,
             autoArray:null,
             autoArrays:[]
        }
    }

    componentDidMount() {
        this.getclient()
        this.getsite()
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

      getsite = () => {         
        axios.get(endpoint.ddlsite, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ sitedata:result })
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
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

      getsupplier = (client) => {
        axios.get(endpoint.ddlsupplier + '?client='+client.toUpperCase(), {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ supplierdata:result })
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
      }

    //new Dropdown

    //Client
    selectedClient = (e) => {
      this.setState({clientSelected:e.target.textContent}, () =>{
          this.getordertype(this.state.client, this.state.site)
          this.props.filter(this.state.client)
      })
      this.getsupplier(e.target.id)
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

    //Site
    selectedSite = (e) => {
      this.setState({siteSelected:e.target.textContent}, () =>{
          this.getordertype(this.state.client, this.state.site)
          this.props.filter(null,this.state.site)
      })
      this.setState({site:e.target.id})
      this.setState({siteExpand: false})
    }

    expandSite = () => {
      this.setState({
        clientExpand: false,
        siteExpand: !this.state.siteExpand,
        statuseExpand: false,
        ordertypeeExpand: false,
        suppliereExpand:false  
      })
    }

    //Status
    selectedStatus = (e) => {
      this.setState({statusSelected:e.target.textContent})
      this.setState({status:e.target.id}, () =>{
        this.props.filter(null,null,this.state.status)
    })
      this.setState({statuseExpand: false})
    }

    expandStatus = () => {
      this.setState({
        clientExpand: false,
        siteExpand: false,
        statuseExpand: !this.state.statuseExpand,
        ordertypeeExpand: false,
        suppliereExpand:false 
      })
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
        clientExpand: false,
        siteExpand: false,
        statuseExpand: false,
        ordertypeeExpand: !this.state.ordertypeeExpand,
        suppliereExpand:false
      })
    }

    //Supplier
    selectedSupplier = (e) => {
      this.setState({supplierSelected:e.target.textContent})
      this.setState({supplier:e.target.id}, () =>{
        this.props.filter(null,null,null,null,this.state.supplier)
    })
      this.setState({suppliereExpand: false})
    }

    expandSupplier = () => {
      this.setState({
        clientExpand: false,
        siteExpand: false,
        statuseExpand: false,
        ordertypeeExpand: false,
        suppliereExpand:!this.state.suppliereExpand
      })
    }

    selectedName = (val) => {
      this.props.filter(val)
    }

    getName = (e) => {
          if(e.target.value)
          {
            
            var array = this.state.clientdata.map(data => {return data.name})
            this.setState({autoArrays:
                array.filter(val => val.toLowerCase().includes(e.target.value))
            })
          }
          else
          {
              this.setState({autoArrays:[]})
              this.setState({autoArray:null})
          }
    }

    render(){        
        return(
            <div style={{display:'flex', width:'100%'}}> 
            {/* <Dropdown dataParam = {this.state.clientdata} selectedName={(val) => this.selectedName(val)}/> */}
            
             {/* <input className='form-control' onChange={(e) => this.getName(e)}/> */}
            {/* <div>{this.state.autoArray}</div> */}
            {
                // this.state.autoArrays.map(data => <div className='tes' onClick={(e) => this.selectedName(e)}>{data}</div>)
            }
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

                <div class="dropdown dd">
                  <button onClick={() => this.expandSite()} type="button" className="btn dropdown-button dropdown-toggle po" data-toggle="dropdown">
                  {this.state.siteSelected}
                  </button>
                  <div class={"dropdown-menu " + (this.state.siteExpand ? "show" : null)}>
                  {
                      this.state.sitedata.map(
                          data => <div onClick={(e) => this.selectedSite(e)} class="dropdown-item" id={data.site}>{data.site}</div>
                      )
                  }
                  </div>
                </div>

                <div class="dropdown dd">
                  <button onClick={() => this.expandStatus()} type="button" className="btn dropdown-button dropdown-toggle po" data-toggle="dropdown">
                  {this.state.statusSelected}
                  </button>
                  <div class={"dropdown-menu " + (this.state.statuseExpand ? "show" : null)}>
                          <div onClick={(e) => this.selectedStatus(e)} class="dropdown-item" id="open">Open</div>
                          <div onClick={(e) => this.selectedStatus(e)} class="dropdown-item" id="all">All</div>
                          <div onClick={(e) => this.selectedStatus(e)} class="dropdown-item" id="released">Released</div>
                          <div onClick={(e) => this.selectedStatus(e)} class="dropdown-item" id="completed">Completed</div>
                          <div onClick={(e) => this.selectedStatus(e)} class="dropdown-item" id="unavailable">Unavailable</div>
                  </div>
                </div>

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