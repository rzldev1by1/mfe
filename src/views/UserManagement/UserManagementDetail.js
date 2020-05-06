import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import './UserManagement.css'
import ModuleAccess from './Component/ModuleAccess'
import Site from './Component/Site'
import Client from './Component/Client'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'
import axios from 'axios'
import users from './Users.json'
import moment from 'moment';
import popupLock from '../../assets/img/brand/popup_lock.png'
import popupLockSuccess from '../../assets/img/brand/popup_success_lock.png'

const today = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
const passChanged = '1999-08-28';



class UserManagementDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
          moduleAccess:[],
          sites:[],
          clients:[],
          accountInfo:{},
          isSaveProgressing:false,
          isLoadComplete:false,
          modalPopupResetdisplay:false,
          isResetSuccess:false,
          isValidForm:false
        }

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.getAccountInfo(id);
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
          newAccount.site = account.site;
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

    onEnabledAllModuleAccess = () => {
        let newState = [...this.state.moduleAccess];
        let userInfo = {...this.state.accountInfo};
        userInfo.userMenu = null;
        userInfo.userMenu = [];

        var newArray = newState.map((item,index) => {
              item.status = true;
              if(item.status){
                userInfo.userMenu.push({"menuid":item.menuid,"menuname":item.menuname});
              }

            return item;
        });

       this.setState({moduleAccess:newArray,accountInfo:userInfo});
    }

    onEnabledAllSite = () => {    
      let userInfo = {...this.state.accountInfo};
      let sites = [...this.state.sites];
      var newArray = sites.map((item,index) => {
            item.status = true;
          return item;
      });
      userInfo.site = null;
     this.setState({sites:newArray,accountInfo:userInfo});
  }

  onEnabledAllClient = () => { 
      let userInfo = {...this.state.accountInfo};      
      let clients = [...this.state.clients];
      var newArray = clients.map((item,index) => {
            item.status = true;
          return item;
      });
      userInfo.client = null;
     this.setState({clients:newArray,accountInfo:userInfo});
  }

    onSiteStatusClick = (e,data) => {
      if(data){
        let user = {...this.state.accountInfo};
        let newState = [...this.state.sites];
        var newArray = newState.map((item,index) => {
            item.status = false;
            if(item.site === data.site)
              item.status = true;
              if(item.status)
                  user.site = data.site;

            return item;
        });

        this.setState({sites:newArray,accountInfo:user});
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
      this.setState({accountInfo:user, isValidForm:false});
    }

    onChangeEmail = (e) => {
      const {name,value} = e.target;
      let user = {...this.state.accountInfo};
      user.email = value;

      this.setState({accountInfo:user, isValidForm:false});
    }

    generateUserID = (textValue) => {
      let result="";

      if(textValue && textValue.length > 2){
        var anysize = 3;//the size of string
        var charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
        for( var i=0; i < anysize; i++ )
        result += charset[Math.floor(Math.random() * (9))];
      }
      return result;
    }

    getParam = (passwordChange) => {
        let newParam = {};
        let accountInfo = {...this.state.accountInfo};
        newParam.name = accountInfo.user;
  	    newParam.email = accountInfo.email;
  	    newParam.lastAccess = accountInfo.lastAccess;
  	    newParam.lastLogin = accountInfo.lastLogin;
  	    newParam.thisAccess = accountInfo.thisAccess;
  	    newParam.thisLogin = accountInfo.thisLogin;
  	    newParam.userMenu = this.changeUserMenuToStringArray(accountInfo.userMenu);
        newParam.client = accountInfo.client;
        newParam.site = accountInfo.site;
        newParam.disabled = accountInfo.disabled?'Y':'N';
        

        return newParam;
    }

    saveClick = () => {
      let newParam = this.getParam();
      
      if(newParam.name && newParam.email && newParam.userMenu.length)
      {
        let updateReq = this.updateRequest(newParam);
        this.setState({isSaveProgressing:true, isValidForm:false},updateReq);
      }else{
        this.setState({isValidForm:true});
      }

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

    closeModalPopupResetAuto = () => {
      var self = this;
      setTimeout(()=>{ self.setState({isResetSuccess:false, modalPopupResetdisplay:false})},5000);
    }

    resetPassword = () => {
       var self = this;
       const {match} = this.props;
       let web_user_id = match.params.id;
       const {user,userId,email,userMenu} = this.state.accountInfo;

       let url = `${endpoint.UserManagement_resetpassword}`;

       let newText = user.substring(0,2);
       let result = this.generateUserID(today);
       let new_password = result+newText.toLowerCase();
       let param = {"email":email,"web_user":web_user_id, "new_password":new_password}


         axios.post(url,param,{ headers: headers })
           .then(res => {
             var result = [];
             if(res.status === 200){
               self.setState({isSaveProgressing:false, isResetSuccess:true, modalPopupResetdisplay:true},self.closeModalPopupResetAuto);

             }
             return result;
           })
           .catch(error => {
               console.log("error save",error);
           })
           .then((result) => {

           })


    }

    updateRequest = (param) => {

      var self = this;
      const {userId} = self.state.accountInfo;

      let url = `${endpoint.UserManagement_Update}${userId}`;

      
        axios.post(url,param,{ headers: headers })
          .then(res => {
            var result = [];
            if(res.status === 200){
              self.setState({isSaveProgressing:false, isResetSuccess:true});
              self.gotoUM();
            }
            return result;
          })
          .catch(error => {
              self.setState({isSaveProgressing:false, isResetSuccess:false});
              console.log("error save",error);
          })
          .then((result) => {
            
          });


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
       this.setState({modalPopupResetdisplay:true});
    }

    closeModalPopupReset = () => {
      this.setState({modalPopupResetdisplay:false});
    }

    confirmResetPassword = () => {        
        this.setState({isSaveProgressing:false, modalPopupResetdisplay:false}, this.resetPassword());
    }

    onSubmitHandler = (e) => {
      e.preventDefault();
      
    }

    render(){
        const {match} = this.props;
        const {moduleAccess,sites,clients, accountInfo} = this.state;

        return(<div>
            <div className={( this.state.isLoadComplete ? 'd-none': 'spinner')}/>
            <div className={( this.state.isLoadComplete ? ' ': 'd-none')}>

               <div className="d-flex mt-4 mb-4">
                    <div className='um-breadcrumb'>
                        <label onClick={() => { this.gotoUM(); }} className='margin-right-breadcrumb-title mb-0' style={{cursor:"pointer"}}>User Management</label>
                        <label className='margin-right-breadcrumb-title iconU-rightArrow mb-0' style={{fontSize:20}}></label>
                        <label className='breadcrumb-active-title mb-0'>{this.state.accountInfo.user}</label>
                    </div>
                </div>
                <div className="d-flex">
                    <Card className="container-user-list border-0 flex-fill h-100">
                        <CardBody>
                            <div >
                              <form onSubmit={(e)=>{e.preventDefault(); this.saveClick();}}>
                                <div className="account-detail mt-2">
                                    <div className="row">
                                      <div className="col-12">
                                        <h3>
                                          <label className="section-header-text">User Details</label>
                                        </h3>
                                      </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-2">
                                        <label className="title-label">User ID</label>
                                    </div>

                                    <div className="col-2">
                                        <label className="title-label">Name</label>
                                    </div>

                                    <div className="col-2">
                                        <label className="title-label">Email</label>
                                    </div>


                                    <div className="col-3 pr-0">
                                        <label className="title-label">Reset Password</label>
                                    </div>
                                    
                                    <div className="col-3 pl-0">
                                          <label className="title-label">Suspend Users</label>
                                    </div>
                                    

                                    </div>
                                    <div className="row">

                                        <div className="col-2">
                                            <input type="text" readOnly className="form-control" defaultValue={this.state.accountInfo.userId}/>
                                        </div>

                                        <div className="col-2">
                                            <input type="text" className="form-control" maxLength="60" onChange={(e)=>{this.onChangeName(e);}} defaultValue={this.state.accountInfo.user}/>
                                        </div>

                                        <div className="col-2">
                                            <input type="email" name="email" className="form-control" onChange={(e)=>{this.onChangeEmail(e);}} defaultValue={this.state.accountInfo.email}/>
                                        </div>


                                        <div className="col-3 pr-0">
                                              <div className="row pl-0">
                                                <div className="col-6" style={{color:"#637176",fontFamily:"Helvetica Neue Regular",fontSize:"1rem"}}>                                                  
                                                      Are you sure you want<br/>
                                                      to reset password?                                                  
                                                </div>
                                                <div className="col-5">
                                                  <button type="button" className={"btn "+((accountInfo.passwordChange === '')?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{this.onClickResetPassword();}}>Reset</button>
                                                </div>
                                              </div>
                                        </div>
                                        <div className="col-3 pl-0">
                                          <div className="row">
                                              <div className="col-6" style={{color:"#637176",fontFamily:"Helvetica Neue Regular",fontSize:"1rem"}}>
                                                    Are you sure you want<br/>
                                                    to suspend this user?                                                  
                                              </div>
                                              <div className="col-6">
                                                  <button type="button" className={"btn "+((!accountInfo.disabled)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{this.onClieckSuspendUser();}}>
                                                  { (!accountInfo.disabled)?'Suspend':'Disabled' }
                                                  </button>
                                              </div>
                                          </div>
                                              
                                        </div>


                                    </div>


                                </div>
                                <div className="system mt-4">
                                    <div className="row">
                                        <div className="col-12">
                                          <h3>
                                              <label className="section-header-text">System</label>
                                          </h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onModuleAccessClick} onModuleEnableAll={this.onEnabledAllModuleAccess}/>
                                        </div>
                                        <div className="col-4 pl-0">
                                            <Site sites={sites} onEnableClick={this.onSiteStatusClick} onSiteEnableAll={this.onEnabledAllSite}/>
                                        </div>
                                        <div className="col-4">
                                            <Client clients={clients} onEnableClick={this.onClientStatusClick} onClientEnableAll={this.onEnabledAllClient}/>
                                        </div>

                                    </div>

                                </div>

                                <div className="d-flex mt-5 mr-3 justify-content-between">
                                      <button type="button" className=" font-lg font-md font-sm btn btn-primary btn-submit default-box-height" onClick={(e)=>{this.gotoUM();}}>
                                          <label className="create-user-label mb-0">Back</label>
                                      </button>

                                      <p>
                                        <label className={(this.state.isValidForm)?"errorText ":" d-none"}>
                                            Please make sure user name, email is valid and module has one enabled
                                        </label>
                                      </p>

                                      <button type="button" className=" font-lg font-md font-sm btn btn-primary btn-submit default-box-height" onClick={(e)=>{this.saveClick();}}>
                                          <i className= {(this.state.isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                                          <label className="create-user-label mb-0">Save</label>
                                      </button>

                                </div>
                                 <button type="submit" style={{opacity:"0"}}></button>
                              </form>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Modal isOpen={this.state.modalPopupResetdisplay} toggle={this.toggleModalConfirm}
            centered={true} className={"modal-company modal-sm animated fadeIn"} backdrop="static"
            onOpened={() => this.state.updateSuccess ? setTimeout(() => this.toogleModalConfirm(), 1000) : {}}>
          <ModalHeader className="modal-header-popup-reset" toggle={this.toggleModalConfirm}>
            <div className="d-flex flex-column ml-4">
                <label style={{fontSize:"25px"}}>
                  <i className="fa fa-refresh mr-3"></i>
                    Reset Password
                </label>
                <label>
                Confirm your request to reset password
                </label>
            </div>
            <div className="mr-2">
                <p color="primary">
                  <i className="iconU-close mr-3" aria-hidden="true" onClick={(e)=>{this.closeModalPopupReset()}}/>
                </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center">
                <img className={this.state.isResetSuccess?"img-popup-reset-success":"img-popup-reset"} src={this.state.isResetSuccess?popupLockSuccess:popupLock} />
            </div>

            <div className="d-flex justify-content-center">
                {this.state.isResetSuccess?<label style={{fontSize:"50px",color:"#22ABE3"}}>Success!</label>:''}
            </div>

            <div className="d-flex justify-content-center">
                {this.state.isResetSuccess?<label>Reset password requested!</label>:<label>Do you want to reset your password?</label>}
            </div>
            <div className="d-flex justify-content-center mb-4">
                {this.state.isResetSuccess? <label>We will send you an email to reset password</label>:<label>Your new password will send to your registered email less than 24 hours</label>}
            </div>

            <div className="d-flex justify-content-between">
              {(this.state.isResetSuccess)?'':<button className="font-lg font-md font-sm btn btn-grey ml-4" style={{width:"15%"}} onClick={(e)=>{this.closeModalPopupReset()}}>No</button>}

              {(this.state.isResetSuccess)?'':<button className="font-lg font-md font-sm btn btn-primary mr-4" style={{width:"15%"}} onClick={(e)=>{this.confirmResetPassword()}}>Yes</button>}
            </div>
          </ModalBody>

          </Modal>
        </div>)
    }

}
export default UserManagementDetail;
