import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './UserManagement.css'
import ModuleAccess from './Component/ModuleAccess'
import Site from './Component/Site'
import Client from './Component/Client'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'
import axios from 'axios'
import users from './Users.json'



class UserManagementDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
          moduleAccess:[],
          sites:[],
          clients:[],
          isModuleLoaded: false,
          isClientLoaded: false,
          isSiteLoaded: false,
          accountInfo:{}
        }

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.getAccountInfo(id);
        this.loadModuleAccess("warehouse");
        this.loadSites();
        this.loadClients();
    }

    restructureAccount = (sources) => {
      let newAccount = {};
      let account = sources[0];

      if(account){
          newAccount.user = account.name;
          newAccount.email = account.email;
          newAccount.lastAccess = account.last_access;
          newAccount.lastLogin = account.last_login;
          newAccount.thisAccess = account.this_access;
          newAccount.thisLogin = account.this_login;
          newAccount.userMenu = account.userMenu;
          newAccount.userId = account.userid;
      }
      return newAccount;
    }

    getAccountInfo = (userid) => {
      var self = this;
      axios.get(endpoint.UserManagement_User_Detail+userid, {
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = self.restructureAccount(res.data.data);
            self.setState({accountInfo:result});
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })
        // if(users){
        //     let user = users.filter((item) => {return item.userid === userid})[0];
        //     this.setState({accountInfo:user});
        // }

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

            self.setState({moduleAccess:newResult,isModuleLoaded:true});
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
            self.setState({sites:newResult,isSiteLoaded:true});
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
            self.setState({clients:newResult,isClientLoaded:true});
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })
    }

    onModuleAccessClick = (e,data) => {

      if(data){
        let newState = [...this.state.moduleAccess];
        var newArray = newState.map((item,index) => {

            if(item.menuid === data.menuid){
              item.status = !item.status;
            }
            return item;
        });

       this.setState({moduleAccess:newArray});
      }

      // if(element.classList.contains('btn-outline-notActive')){
      //     element.classList.remove('btn-outline-notActive')
      //     element.classList.add('btn-outline-active')
      //     element.innerHTML = "Enable"
      // }
      // else{
      //   element.classList.remove('btn-outline-active')
      //   element.classList.add('btn-outline-notActive')
      //   element.innerHTML = "Disable"
      // }
    }

    onSiteStatusClick = (e,data) => {
      console.log(data);
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

    onChangeName = (e) => {
      const {name,value} = e.target;
      if(value && value.length > 2){
         let newText = value.substring(0,2);

          var anysize = 3;//the size of string
          var charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
          let result="";
          for( var i=0; i < anysize; i++ )
          result += charset[Math.floor(Math.random() * (value.split('').length))];

         let user = {...this.state.accountInfo};
         user.user = value;
         user.userid = newText+result;

        this.setState({accountInfo:user});
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
                                  <label className="name-account font-bolder">{this.state.accountInfo.user}</label>
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
                                    <input type="text" className="form-control" onChange={(e)=>{this.onChangeName(e);}} defaultValue={this.state.accountInfo.user}/>
                                </div>

                                <div className="col-4">
                                    <input type="text" className="form-control" defaultValue={this.state.accountInfo.userId}/>
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
                                    <input type="text" className="form-control" defaultValue={this.state.accountInfo.email}/>
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
                                    <ModuleAccess moduleAccess={moduleAccess} isLoaded={this.state.isModuleLoaded} onEnableClick={this.onModuleAccessClick}/>
                                </div>
                                <div className="flex-fill mr-2">
                                    <Site sites={sites} isLoaded={this.state.isSiteLoaded} onEnableClick={this.onSiteStatusClick}/>
                                </div>
                                <div className="flex-fill mr-2">
                                    <Client clients={clients} isLoaded={this.state.isClientLoaded} onEnableClick={this.onClientStatusClick}/>
                                </div>

                            </div>


                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>)
    }

}
export default UserManagementDetail;
