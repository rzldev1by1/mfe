import React, {Component} from 'react'
import axios from 'axios'
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
            supplier:null
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

    clienthandler = (e) => {
        this.setState({client:e.target.value},()=>{
            this.getordertype(this.state.client, this.state.site)
            this.props.filter(this.state.client)
        })
        this.getsupplier(e.target.value)
        
    }

    sitehandler = (e) => {
        this.setState({site:e.target.value},() => {
            this.getordertype(this.state.client, this.state.site)
            this.props.filter(null,this.state.site)
        })
        
    }

    statushandler = (e) => {
        this.setState({status:e.target.value}, () => {
          this.props.filter(null,null,this.state.status)
        })
    }

    ordertypehandler = (e) => {
        this.setState({ordertype:e.target.value}, () => {
          this.props.filter(null,null,null,this.state.ordertype)
        })
    }

    supplierhandler = (e) => {
        this.setState({supplier:e.target.value}, () => {
          this.props.filter(null,null,null,null,this.state.supplier)
        })
    }

    render(){        
        return(
            <div style={{display:'flex', width:'100%'}}> 
                <select onChange={(e) => this.clienthandler(e)} className="form-control dropdown">
                    <option selected disabled>Client</option>
                    {
                        this.state.clientdata.map(
                            data => <option value={data.code}>{data.name}</option>
                        )
                    }               
                    
                </select> 
                
                <select onChange={(e) => this.sitehandler(e)} className="form-control dropdown">
                    <option selected disabled>Site</option>
                    {
                        this.state.sitedata.map(
                        data => <option value={data.site}>{data.site}</option>
                        )
                    }
                </select>

                <select onChange={(e)=> this.statushandler(e)} className="form-control dropdown">
                    <option selected disabled>Status</option>
                    <option value="open">Open</option>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="released">Released</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="inprogress">Release in progress</option>
                </select>

                <select onChange={(e) => this.ordertypehandler(e)} className="form-control dropdown">
                    <option selected disabled>Order Type</option>
                    {
                        this.state.ordertypedata.map(
                            data => <option value={data.code}>{data.description}</option>
                        )
                    }
                </select>
                      
                <select onChange={(e) => this.supplierhandler(e)} className="form-control dropdown">
                    <option selected disabled>Supplier</option>
                    {
                        this.state.supplierdata.map(
                            data => <option value={data.supplier_no}>{data.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }

}