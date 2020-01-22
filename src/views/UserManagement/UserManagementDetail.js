import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './UserManagement.css'
import ModuleAccess from './Component/ModuleAccess'
import Site from './Component/Site'
import Client from './Component/Client'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'
import axios from 'axios'

class UserManagementDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
          moduleAccess:[],
          sites:[],
          clients:[]
        }

    }

    componentDidMount(){
        this.loadModuleAccess("warehouse");
        this.loadSites();
        this.loadClients();
    }

    restuctureData = (sites) => {
     return sites.map((item,index)=>{
          let newItem = item;
          newItem.status = false;
          return newItem;
      });
    }

    loadModuleAccess = (role) => {
      var self = this;
      let query = ["purchase orders","stock holding", "stock movement", "create sales order"];

      axios.get(endpoint.UserManagement_ModuleAccess, {
        params: {role:role},
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = res.data;
            let newResult = self.restuctureData(result.filter((item) => { return query.indexOf(item.menuname.toLowerCase()) !== -1 }));
            // let filteredArray = result.filter((item) => { return query.indexOf(item.menuname.toLowerCase()) !== -1 });
            self.setState({moduleAccess:newResult});
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })
    }

    loadSites = (role) => {
      var self = this;
      axios.get(endpoint.ddlsite, {
        params: {role:role},
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = res.data;
            let newResult = self.restuctureData(result);
            self.setState({sites:newResult});
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })
    }

    loadClients = () => {
      var self = this;
      axios.get(endpoint.ddlclient, {
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = res.data;
            let newResult = self.restuctureData(result);
            self.setState({clients:newResult});
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })
    }

    onEnableClick = (e) => {
      const element = e.target;

      if(element.classList.contains('btn-outline-notActive')){
          element.classList.remove('btn-outline-notActive')
          element.classList.add('btn-outline-active')
          element.innerHTML = "Enable"
      }
      else{
        element.classList.remove('btn-outline-active')
        element.classList.add('btn-outline-notActive')
        element.innerHTML = "Disable"
      }
    }

    onSiteStatusClick = (e,data) => {
      if(data){
        let newState = [...this.state.sites];
        var newArray = newState.map((item,index) => {
            item.status = false;
            if(item.site === data.site)
              item.status = true;

            return item;
        });

        this.setState({sites:newArray});
      }
    }

    onClientStatusClick = (e,data) => {
      if(data){
        let newState = [...this.state.clients];
        var newArray = newState.map((item,index) => {
            item.status = false;
            if(item.code === data.code)
              item.status = true;

            return item;
        });

        this.setState({clients:newArray});
      }
    }

    render(){
        const {match} = this.props;
        const {moduleAccess,sites,clients} = this.state;

        return(<div>
           <div className="d-flex mt-4">
                <div className="flex-fill">
                    <h3>
                        <label className="font-bolder">User Management</label>
                    </h3>
                </div>
            </div>
            <div className="d-flex pt-4">
                <Card className="flex-fill">
                    <CardBody>
                        <div className="account-detail mt-2">
                            <div className="row">
                              <div className="col-12">
                                <h3>
                                  <label className="name-account font-bolder">Phil Jones</label>
                                </h3>
                              </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="text-bolder">Name</label>
                                </div>

                                <div className="col-4">
                                    <label className="text-bolder">ID</label>
                                </div>
                                <div className="col-4">
                                      <label className="text-bolder">Suspend User</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <input type="text" className="form-control" defaultValue="Phil Jones"/>
                                </div>

                                <div className="col-4">
                                    <input type="text" className="form-control" defaultValue={this.props.match.params.id}/>
                                </div>
                                <div className="col-3">
                                      <label className="account-name">Are you sure you want to suspend this user?</label>
                                </div>
                                <div className="col-1">
                                      <span className='p-1 m-2 client-active float-right'>Enable</span>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-4">
                                    <label className="text-bolder">Email</label>
                                </div>

                                <div className="col-4">

                                    <label className="text-bolder">Reset Password</label>
                                </div>
                                <div className="col-4">

                                </div>
                            </div>
                            <div className="row">

                                <div className="col-4">
                                    <input type="text" className="form-control" defaultValue="philjones@ttl.com"/>
                                </div>
                                <div className="col-4">
                                    <label className="account-name">Contact Microlistic for request to reset password</label>
                                    <span className='p-1 client-active float-right'>Reset</span>
                                </div>
                                <div className="col-4">

                                </div>
                            </div>
                        </div>
                        <div className="system mt-4">
                            <div className="row">
                                <div className="col-12">
                                  <h3>
                                      <label className="text-bolder">System</label>
                                  </h3>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="flex-fill mr-2">
                                    <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onEnableClick}/>
                                </div>
                                <div className="flex-fill mr-2">
                                    <Site sites={sites} onEnableClick={this.onSiteStatusClick}/>
                                </div>
                                <div className="flex-fill mr-2">
                                    <Client clients={clients} onEnableClick={this.onClientStatusClick}/>
                                </div>

                            </div>
{
  /**

  <div className="row">
  <div className="col-4">
  <label className="text-bolder">Module Access</label>
  </div>
  <div className="col-4">
  <label className="text-bolder">Site</label>
  </div>
  <div className="col-4">
  <label className="text-bolder">Client</label>
  </div>
  </div>
  <div className="row mb-1">
  <div className="col-3">
  <label className="account-name">Stock Holding</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  <div className="col-3">
  <label className="account-name">A(Melbourne)</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  <div className="col-3">
  <label className="account-name">Aeosop</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  </div>
  <div className="row mb-1">
  <div className="col-3">
  <label className="account-name">Stock Movement</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>

  <div className="col-3">
  <label className="account-name">B(Sydney)</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  <div className="col-3">
  <label className="account-name">Nike</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  </div>
  <div className="row mb-1">
  <div className="col-3">
  <label className="account-name">Sales Order</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  <div className="col-3">
  <label className="account-name">C(Adelaide)</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  <div className="col-3">
  <label className="account-name">Logitech</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-active float-right'>Enable</span>
  </div>
  </div>
  <div className="row mb-1">
  <div className="col-3">
  <label className="account-name">Purchase Order</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  <div className="col-3">
  <label className="account-name">N201 (Batam)</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  <div className="col-3">
  <label className="account-name">Lenovo</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  </div>
  <div className="row mb-1">
  <div className="col-3">
  <label className="account-name">User Management</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  <div className="col-3">
  <label className="account-name">BP01 (Jakarta)</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  <div className="col-3">
  <label className="account-name">Samsung</label>
  </div>
  <div className="col-1">
  <span className='p-1 m-1 client-notActive float-right'>Disable</span>
  </div>
  </div>

  **/
}

                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>)
    }

}
export default UserManagementDetail;
