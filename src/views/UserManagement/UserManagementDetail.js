import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './UserManagement.css'
import ModuleAccess from './Component/ModuleAccess'
import Site from './Component/Site'
import Client from './Component/Client'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'
import axios from 'axios'
import users from './Users.json'
import moment from 'moment';

const today = moment(new Date()).format("DD-MM-YYYY");



class UserManagementDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
          moduleAccess:[],
          sites:[],
          clients:[],
          accountInfo:{},
          isSaveProgressing:false,
          isLoadComplete:false
        }

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.getAccountInfo(id);
        // this.loadMasterResource();

    }

    restructureAccount = (sources) => {
      let newAccount = {};
      let account = sources[0];

      if(account){
          newAccount.user = account.name;
          newAccount.email = account.email;
          newAccount.lastAccess = today;
          newAccount.lastLogin = today;
          newAccount.thisAccess = today;
          newAccount.thisLogin = today;
          newAccount.userMenu = this.restuctureMenuList(account.module);
          newAccount.userId = account.userid;
          newAccount.client = account.client;
          newAccount.disabled = account.disabled !== 'Y'?false:true;
          newAccount.passwordChange = account.passwordChange?account.passwordChange:'';
      }
      return newAccount;
    }

    restuctureMenuList= (sources) => {
      let newUserMenu = [];
      let userMenu = sources;

      if(userMenu.length){
          newUserMenu = sources.map((item)=>{
            let newItem = {};
            newItem.menuid = item.menu_id;
            newItem.menuname = item.menu_name;
            return newItem;
          });
          console.log(newUserMenu);
      }
      return newUserMenu;
    }

    getAccountInfo = (userid) => {
      var self = this;
      axios.get(endpoint.UserManagement_User_Detail+userid, {
        headers: headers
      })
        .then(res => {
          var result = [];
            console.log(res);
          if(res.status === 200){
            if(res.data === ''){
                this.props.history.push('/users-management');
            }
            else{
              result = self.restructureAccount(res.data.data);
              self.setState({accountInfo:result,isLoadComplete:true},self.loadMasterResource);
            }
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {
          // console.log(result);
        })


    }

    restuctureData = (sites) => {
     return sites.map((item,index)=>{
          let newItem = item;
          newItem.status = false;
          return newItem;
      });
    }

    loadMasterResource = () => {
      let menus = this.readSessionStorage('menus');
      let sites = this.readSessionStorage('sites');
      let clients = this.readSessionStorage('clients');

       menus = this.setMenuBasedUser(menus);
       clients = this.setClientBasedUser(clients);

      if(menus.length && sites.length && clients.length)
        this.setState({moduleAccess:menus,sites:sites,clients:clients});
    }

    setClientBasedUser = (clients) => {
      const {client} = this.state.accountInfo;

      if(clients.length){
        if(client){
          let idx = clients.findIndex((item)=> item.code.toLowerCase() === client.toLowerCase());
          if(idx>=0){
            clients[idx]["status"] = true;
          }
        }
      }
      return clients;
    }

    setMenuBasedUser = (menus) => {
      const {userMenu} = this.state.accountInfo;
      if(userMenu.length){
        userMenu.forEach((item)=>{
            let idx = menus.findIndex((menu)=> menu.menuid === item.menuid);
            if(idx>=0){
              menus[idx]["status"] = true;
            }
        });
      }
      return menus;
    }

    readSessionStorage=(keyName) => {
      let anyObject = [];
       if(sessionStorage.getItem(keyName)){
         anyObject = JSON.parse(sessionStorage.getItem(keyName));

       }
       return anyObject;
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
        let userInfo = {...this.state.accountInfo};


        var newArray = newState.map((item,index) => {

            if(item.menuid === data.menuid){
              item.status = !item.status;
              if(item.status){
                userInfo.userMenu.push({"menuid":item.menuid,"menuname":item.menuname});
              }else{
                if(userInfo.userMenu.length){
                  let idx = userInfo.userMenu.findIndex((menu)=> menu.menuid === data.menuid);
                  userInfo.userMenu.splice(idx,1);
                }
              }
            }
            return item;
        });

       this.setState({moduleAccess:newArray,accountInfo:userInfo});
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
      let user = {...this.state.accountInfo};

      if(data){
        let newState = [...this.state.clients];
        var newArray = newState.map((item,index) => {
            item.status = false;
            if(item.code === data.code){
              item.status = true;
                if(item.status)
                  user.client = data.code;
            }

            return item;
        });

        this.setState({clients:newArray,accountInfo:user});
      }
    }


    onChangeName = (e) => {
      const {name,value} = e.target;
      let user = {...this.state.accountInfo};
      user.user = value;
      this.setState({accountInfo:user});
    }

    onChangeEmail = (e) => {
      const {name,value} = e.target;
      let user = {...this.state.accountInfo};
      user.email = value;

      this.setState({accountInfo:user});
    }

    saveClick = () => {

      let accountInfo = {...this.state.accountInfo};

      let newParam = {};
      newParam.name = accountInfo.user;
	    newParam.email = accountInfo.email;
	    newParam.lastAccess = accountInfo.lastAccess;
	    newParam.lastLogin = accountInfo.lastLogin;
	    newParam.thisAccess = accountInfo.thisAccess;
	    newParam.thisLogin = accountInfo.thisLogin;
	    newParam.userMenu = this.changeUserMenuToStringArray(accountInfo.userMenu);
      newParam.client = accountInfo.client;
      newParam.disabled = accountInfo.disabled?'Y':'N';
      // if(accountInfo.passwordChange !== '')
      //   newParam.passwordChange = accountInfo.passwordChange;

      if(newParam.name && newParam.email && newParam.userMenu.length)
      {
        let updateReq = this.updateRequest(newParam);
        this.setState({isSaveProgressing:true},updateReq);
      }

      /*
      const {name,userId,email,userMenu} = this.state.accountInfo;


      **/
    }

    changeUserMenuToStringArray= (arraySources)=>{
      var menus = [];
      if(arraySources.length){
        menus = arraySources.map((item)=>{
          return item.menuid;
        })
      }
      return menus;
    }

    updateRequest = (param) => {

      var self = this;
      const {name,userId,email,userMenu} = self.state.accountInfo;

      let url = `${endpoint.UserManagement_Update}${userId}`


        axios.post(url,param,{ headers: headers })
          .then(res => {
            var result = [];
            if(res.status === 200){
              self.setState({isSaveProgressing:false});
              self.gotoUM();
            }
            return result;
          })
          .catch(error => {
              console.log("error save",error);
          })
          .then((result) => {
            // console.log(result);
          })

    }

    gotoUM = () => {
      this.props.history.push('/users-management');
    }

    onClieckSuspendUser = () => {
      const {accountInfo} = this.state;
      accountInfo.disabled = !accountInfo.disabled;

      this.setState({accountInfo:accountInfo})
    }

    onClickResetPassword = () => {
      const {accountInfo} = this.state;
      if(accountInfo.passwordChange === ''){
        accountInfo.passwordChange = '28-08-1999';
        this.setState({accountInfo:accountInfo})
      }

    }

    render(){
        const {match} = this.props;
        const {moduleAccess,sites,clients, accountInfo} = this.state;

        return(<div>
           <div className="d-flex mt-4">
                <div className='um-breadcrumb'>
                    <h2 onClick={() => { this.gotoUM(); }} className='margin-right-breadcrumb-title' style={{cursor:"pointer"}}>User Management</h2>
                    <h2 className='margin-right-breadcrumb-title iconU-rightArrow' style={{fontSize:20}}/>
                    <h2 className='breadcrumb-active-title'>{this.state.accountInfo.user}</h2>
                </div>
            </div>
            <div className="d-flex pt-4">
                <Card className="container-user-list border-0 flex-fill h-100">
                    <CardBody>
                        <div className={( this.state.isLoadComplete ? 'd-none': 'spinner')}/>
                        <div className={( this.state.isLoadComplete ? ' ': 'd-none')}>
                            <div className="account-detail mt-2">
                                <div className="row">
                                  <div className="col-12">
                                    <h3>
                                      <label className="name-account font-bolder">User Details</label>
                                    </h3>
                                  </div>
                                </div>

                                <div className="row">
                                <div className="col-2">
                                    <label className="text-bolder title-label">Name</label>
                                </div>

                                <div className="col-2">
                                    <label className="text-bolder title-label">Email</label>
                                </div>

                                <div className="col-2">
                                    <label className="text-bolder title-label">ID</label>
                                </div>
                                <div className="col-2">
                                    <label className="text-bolder title-label">Reset Password</label>
                                </div>
                                <div className="col-1">

                                </div>
                                <div className="col-2">
                                      <label className="text-bolder title-label">Suspend Users</label>
                                </div>
                                <div className="col-1">

                                </div>

                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <input type="text" className="form-control" onChange={(e)=>{this.onChangeName(e);}} defaultValue={this.state.accountInfo.user}/>
                                    </div>

                                    <div className="col-2">
                                        <input type="text" name="email" className="form-control" onChange={(e)=>{this.onChangeEmail(e);}} defaultValue={this.state.accountInfo.email}/>
                                    </div>

                                    <div className="col-2">
                                        <input type="text" readOnly className="form-control" defaultValue={this.state.accountInfo.userId}/>
                                    </div>
                                    <div className="col-3">
                                          <div className="col pl-0">
                                          <label>
                                              Are you sure you want<br/>
                                              to reset password?
                                          </label>
                                            <span className={'p-1 float-right '  + ((accountInfo.passwordChange === '')? ' client-active':'client-notActive')} onClick={(e)=>{this.onClickResetPassword()}}>
                                              Reset Password
                                            </span>
                                          </div>
                                    </div>
                                    <div className="col-3">
                                          <div className="col pl-0">
                                            <label className="account-name">Are you sure you want <br/> to suspend this user?</label>
                                            <span className={'p-1 float-right '+((!accountInfo.disabled)?'client-active ':' client-notActive ')} onClick={(e)=>{this.onClieckSuspendUser()}}>
                                            { (!accountInfo.disabled)?'Enable':'Disable' }
                                            </span>
                                          </div>
                                    </div>


                                </div>


                            </div>
                            <div className="system mt-4">
                                <div className="row">
                                    <div className="col-12">
                                      <h3>
                                          <label className="name-account font-bolder">System</label>
                                      </h3>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="flex-fill mr-2">
                                        <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onModuleAccessClick}/>
                                    </div>
                                    <div className="flex-fill mr-2">
                                        <Site sites={sites} onEnableClick={this.onSiteStatusClick}/>
                                    </div>
                                    <div className="flex-fill mr-2">
                                        <Client clients={clients} onEnableClick={this.onClientStatusClick}/>
                                    </div>

                                </div>

                            </div>

                            <div className="d-flex mt-5 mr-3 justify-content-end">

                                  <button className=" font-lg font-md font-sm btn btn-primary btn-submit" onClick={(e)=>{this.saveClick();}}>
                                      <i className= {(this.state.isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                                      <label className="create-user-label mb-0">Save</label>
                                  </button>

                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>)
    }

}
export default UserManagementDetail;
