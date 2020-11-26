import React, { Component } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import './UserManagement.css'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'
import endpoint from '../../helpers/endpoints'
import axios from 'axios'
import HeaderTitle from 'shared/container/TheHeader'
import ResetModal from './ModalPopup/Reset'
import * as utility from './UmUtility'
import { FormFeedback } from 'reactstrap'
import { connect } from 'react-redux'
import moment from 'moment';
import loading from "../../assets/icons/loading/LOADING-MLS.gif"
import * as EmailValidator from 'email-validator'

// import popupLock from '../../assets/img/brand/popup_lock.png'
// import popupLockSuccess from '../../assets/img/brand/popup_success_lock.png'

const today = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
const passChanged = '1999-08-28';
const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement'];
// const webgroup = {
//     WAREHOUSE: 'Regular',
//     ADMIN: 'Admin'
// }

const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class UserManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleAccess: [],
            sites: [],
            clients: [],
            accountInfo: {},
            oldAccountInfo: {},
            isSaveProgressing: false,
            isLoadComplete: false,
            modalPopupResetdisplay: false,
            isResetSuccess: false,
            isValidForm: false,
            isEnableAllModule: false,
            isEnableAllSite: false,
            isEnableAllClient: false,
            loginInfo: {},
            adminClass: 'd-none',
            users: [],
            validation: {
                "name": { isValid: true, invalidClass: /*"is-invalid"*/"", message:'invalid email' },
                "email": { isValid: true, invalidClass: /*"is-invalid"*/"", message:'username must be entered' },
                "modules": { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on module access' },
                "sites": { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on site' },
                "clients": { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on client' }
            },
            isLoadReset: false,
            changed: false
        }

    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        console.log(id)
           const a = await this.getAccountInfo(id);
            const b = await this.loadPersonalLogin();
             const c = await this.loadUsers();
             this.setState({
                initialData:{
                    isEnableAllClient: this.state.isEnableAllClient,
                    isEnableAllSite: this.state.isEnableAllSite,
                    isEnableAllModule:this.state.isEnableAllModule,
                    moduleAccess:this.state.moduleAccess,
                    accountInfo:this.state.accountInfo
                }
            })
    }

    loadUsers = async (e) => {
        const { data } = await axios.get(`${endpoint.userManagementListUser}`)
        this.setState({ users: data.data.data });
    }


    checkEmailValidation = (textmail) => {
      const { validation} = this.state;

      let validFormat = EmailValidator.validate(textmail);
      validation.email["isValid"] = validFormat? true : false;

      if (!validFormat) {
        validation.email["message"] = utility.validationMsg.INVALID_EMAIL;
        validation.email["invalidClass"] = 'is-invalid';
      } else {
        validation.email["message"] = "";
        validation.email["invalidClass"] = '';
      }

      return validation;
    }

    checkNameValidation = (textName) => {

        const { users, validation } = this.state;

        let isValid = (textName === ""?false:true);

        validation.name["isValid"] = isValid;
        if(!isValid)
            validation.name["message"] = utility.validationMsg.USERNAME_REQUIRED;
        else
            validation.name["message"] = "";

        return validation;
    }

    restructureAccount = (sources) => {
        let newAccount = {};
        let account = sources[0];

        if (account) {
            newAccount.user = account.name;
            newAccount.email = account.email;
            newAccount.lastAccess = today;
            newAccount.lastLogin = today;
            newAccount.thisAccess = today;
            newAccount.thisLogin = today;
            newAccount.userMenu = this.restuctureMenuList(account.module);
            newAccount.userId = account.userid;
            newAccount.client = account.client;
            newAccount.disabled = account.disabled !== 'Y' ? false : true;
            newAccount.passwordChange = account.passwordChange ? account.passwordChange : '';
            newAccount.site = account.site;
            newAccount.web_group = account.web_group;
        }
        return newAccount;
    }

    restuctureMenuList = (sources) => {
        let newUserMenu = [];
        let userMenu = sources;

        if (userMenu.length) {
            newUserMenu = sources.map((item) => {
                let newItem = {};
                newItem.menuid = item.menu_id;
                newItem.menuname = item.menu_name;
                return newItem;
            });
        }
        return newUserMenu;
    }



    getAccountInfo = async (userid) => {
        const { data } = await axios.get(endpoint.userManagementUser_Detail + userid);
        console.log(data)
        if (data && data !== '') {
            let adminClassName = this.state.adminClass;
            let result = this.restructureAccount(data.data);

            if(result.web_group !== utility.webgroup.ADMIN)
                adminClassName = ' ';

            this.setState({ accountInfo: result, oldAccountInfo:result, isLoadComplete: true, adminClass: adminClassName }, () => {
                this.loadMasterResource();
            });
        }

    }

    loadMasterResource = () => {
        this.loadModuleAccess();
        this.loadSites();
        this.loadClients();
    }

    loadModuleAccess = async () => {
        let user = { ...this.state.accountInfo };
        let isEnableAllModule = { ...this.state.isEnableAllModule };
        let userMenu = [...user.userMenu].map((item, index) => { return item.menuid; });
        const { data } = await axios.get(endpoint.userManagementModuleAccess)
        let menus = data.filter((item) => { return menuAvailable.indexOf(item.menuname.toLowerCase()) !== -1 })
            .map((item, index) => {
                let newItem = item;
                let isStatus = false;
                if (user.web_group !== utility.webgroup.ADMIN) {
                    isStatus = userMenu.includes(item.menuid) ? true : false;
                }
                newItem.status = isStatus;
                return newItem;
            });


           isEnableAllModule = menus.filter((item) => {return item.status === true;}).length === menus.length?true:false;
        this.setState({ moduleAccess: menus,isEnableAllModule:isEnableAllModule });
    }

    loadSites = async () => {
        let user = { ...this.state.accountInfo };
        let isEnableAllSite = {...this.state.isEnableAllSite};
        const { data } = await axios.get(endpoint.getSite);

        let sites = data.map((item, index) => {
            let newItem = item;
            newItem.status = (user.site === null?true:((item.site === user.site) ? true : false));
            return newItem;
        });

         isEnableAllSite = sites.filter((item) => {return item.status === true;}).length === sites.length?true:false;
        this.setState({ sites: sites, isEnableAllSite:isEnableAllSite });
    }

    loadClients = async () => {
        let user = { ...this.state.accountInfo };
        let isEnableAllClient = {...this.state.isEnableAllClient};
        const { data } = await axios.get(endpoint.getClient);

        let clients = data.map((item, index) => {
            let newItem = item;
            newItem.status = (user.client === null?true: ((item.code === user.client) ? true : false));
            return newItem;
        });

        isEnableAllClient = clients.filter((item) => {return item.status === true;}).length === clients.length?true:false;
        this.setState({ clients: clients, isEnableAllClient:isEnableAllClient });
    }



    onEnabledAllModuleAccess = () => {
      let validation = { ...this.state.validation };
      let newState = [...this.state.moduleAccess];
      let isEnableAllModule = this.state.isEnableAllModule;
      let newArray = newState.map((item, index) => {
          let newItem = item;
          newItem.status = !isEnableAllModule;
          return newItem;
      })

      validation.modules.isValid = (newArray.filter((m) => m.status !== false).length > 0);

      this.setState({ moduleAccess: newArray, isEnableAllModule: !isEnableAllModule, validation });
    }


    onEnabledAllSite = () => {
      let validation = { ...this.state.validation };
      let isEnableAllSite = this.state.isEnableAllSite;

      let sites = [...this.state.sites];
      var newArray = sites.map((item, index) => {
          item.status = !isEnableAllSite;
          return item;
      });

      validation.sites.isValid = (newArray.filter((s) => s.status !== false).length > 0);

      this.setState({ sites: newArray, isEnableAllSite: !isEnableAllSite, validation });
    }

    onEnabledAllClient = () => {
      let validation = { ...this.state.validation };
      let isEnableAllClient = this.state.isEnableAllClient;
      let clients = [...this.state.clients];
      var newArray = clients.map((item, index) => {
          item.status = !isEnableAllClient;
          return item;
      });

      validation.clients.isValid = (newArray.filter((c) => c.status !== false).length > 0);

      this.setState({ clients: newArray, isEnableAllClient: !isEnableAllClient, validation });
    }

    onModuleAccessClick = (e, index) => {
      let validation = { ...this.state.validation };
      let moduleAccess = [...this.state.moduleAccess];
      let newModules = moduleAccess.map((item, idx) => {
          if (idx === index) {
              item.status = !item.status;
          }
          return item;
      });

      let isEnableAll = newModules.filter((item) => { return item.status === true }).length;
      let isEnableAllModule = (moduleAccess.length === isEnableAll) ? true : false;

      validation.modules.isValid = isEnableAll > 0;

      this.setState({ moduleAccess: newModules, isEnableAllModule: isEnableAllModule, validation });
    }

    onSiteStatusClick = (e, index) => {
      let validation = { ...this.state.validation };
      let sites = [...this.state.sites];
      let newSites = sites.map((item, idx) => {
          if (idx === index) {
              item.status = true;
          } else {
              item.status = false;
          }
          return item;
      });
      let isEnableAll = newSites.filter((item) => { return item.status === true }).length;
      let isEnableAllSite = (sites.length === isEnableAll) ? true : false;

      validation.sites.isValid = isEnableAll > 0;

      this.setState({ sites: newSites, isEnableAllSite: isEnableAllSite, validation });
    }

    onClientStatusClick = (e, index) => {
      let validation = { ...this.state.validation };
      let clients = [...this.state.clients];
      let newClients = clients.map((item, idx) => {
          if (idx === index) {
              item.status = true;
          } else {
              item.status = false;
          }
          return item;
      });
      let isEnableAll = newClients.filter((item) => { return item.status === true }).length;
      let isEnableAllClient = (clients.length === isEnableAll) ? true : false;

      validation.clients.isValid = isEnableAll > 0;

      this.setState({ clients: newClients, isEnableAllClient: isEnableAllClient, validation });
    }



    onChangeName = (e) => {
        const { name, value } = e.target;
        let user = { ...this.state.accountInfo };
        let validation = this.checkNameValidation(value);
        user.user = value;
        this.setState({ accountInfo: user, isValidForm: false, validation:validation });
    }

    onBlurEmail = async (e) => {
      const { value } = e.target;
      const { oldAccountInfo } = this.state;
      let validation = { ...this.state.validation };
      const {data}  = await axios.post(endpoint.userManagementCheckMailValidation,{email:value});
      validation.email["isValid"] = ((oldAccountInfo.email !== value) && data === 0)?true:false;

      if (!validation.email["isValid"]) {
        validation.email["message"] = utility.validationMsg.EMAIL_EXIST;
        validation.email["invalidClass"] = 'is-invalid';
      } else {
        validation.email["message"] = "";
        validation.email["invalidClass"] = '';
        if (!this.checkEmailValidation(value).email["isValid"]) {
          validation.email["message"] = utility.validationMsg.INVALID_EMAIL;
          validation.email["invalidClass"] = 'is-invalid';
        } else {
          validation.email["message"] = "";
        }
      }

      this.setState({ validation:validation });
    }

    onChangeEmail = (e) => {
        const { name, value } = e.target;
        let user = { ...this.state.accountInfo };
        console.log(user.email, value)
        let validation = this.checkEmailValidation(value);
        user.email = value;
        this.setState({ accountInfo: user, isValidForm: false, validation:validation });
    }

    getParam = (passwordChange) => {
        const { moduleAccess, sites, clients } = this.state;

        let newParam = {};

        let adminMenu = moduleAccess.map((item, index) => {
                return item.menuid;
            });

        let userMenu = moduleAccess.filter((item) => { return item.status === true; })
            .map((item, index) => {
                return item.menuid;
            });

        let site = sites.find((item, index) => {
            return item.status === true;
        });


        let siteValue = (site && (sites.filter((item) => {return item.status === true;}).length !== sites.length))? site.site:null;

        let client = clients.find((item, index) => {
            return item.status === true;
        });

        let clientValue = (client && (clients.filter((item) => {return item.status === true;}).length !== clients.length))? client.code:null;

        let accountInfo = { ...this.state.accountInfo };
        newParam.name = accountInfo.user;
        newParam.email = accountInfo.email;
        newParam.lastAccess = accountInfo.lastAccess;
        newParam.lastLogin = accountInfo.lastLogin;
        newParam.thisAccess = accountInfo.thisAccess;
        newParam.thisLogin = accountInfo.thisLogin;
        newParam.userMenu = accountInfo.web_group === utility.webgroup.ADMIN? adminMenu:userMenu;
        newParam.client = (accountInfo.web_group === utility.webgroup.ADMIN? null:clientValue);
        newParam.site = (accountInfo.web_group === utility.webgroup.ADMIN? null:siteValue);
        newParam.disabled = accountInfo.disabled ? 'Y' : 'N';


        return newParam;
    }

    saveClick = () => {
        let newParam = this.getParam();

        let validation = {...this.state.validation};;

        let emailValid = this.checkEmailValidation(newParam.email);
        let nameValid = this.checkNameValidation(newParam.name);

        if(!emailValid.email['isValid'])
            validation.email = emailValid.email;
        if(!emailValid.name['isValid'])
            validation.name = nameValid.name;

        if (validation.email["isValid"] && validation.name["isValid"] && newParam.userMenu.length) {
            this.setState({ isSaveProgressing: true, validation:validation }, () => { this.updateRequest(newParam); });
        } else {
            this.setState({ isValidForm: true, validation:validation });
        }

    }

    changeUserMenuToStringArray = (arraySources) => {
        var menus = [];
        if (arraySources.length) {
            menus = arraySources.map((item) => {
                return item.menuid;
            })
        }
        return menus;
    }

    closeModalPopupResetAuto = () => {
        var self = this;
        setTimeout(() => { self.setState({ isResetSuccess: false, modalPopupResetdisplay: false }, this.gotoUM) }, 5000);
    }

    resetPassword = () => {
        var self = this;
        const { match } = this.props;
        let web_user_id = match.params.id;
        const { user, userId, email, userMenu } = this.state.accountInfo;

        let url = `${endpoint.userManagementresetpassword}`;

        let newText = user.substring(0, 2);
        let result = utility.generateUserID(today);
        let new_password = result + newText.toLowerCase();
        let param = { "email": email, "web_user": web_user_id, "new_password": new_password }

        this.setState({ isLoadReset: true })
        axios.post(url, param).then(res => {
            if (res.status === 200) {
                self.setState({ isSaveProgressing: false, isResetSuccess: true, modalPopupResetdisplay: true, isLoadReset: false });
                // self.closeModalPopupResetAuto();
            }

        });

    }

    updateRequest = async (param) => {

        var self = this;
        const { userId, user, email } = self.state.accountInfo;

        let url = `${endpoint.userManagementUpdate}${userId}`;

        const { data, status } = await axios.post(url, param);
        if (status === 200) {
            let lastChangedUser = {}
            lastChangedUser.name = user;
            lastChangedUser.userId = userId;
            lastChangedUser.email = email;
            let data = lastChangedUser;
            this.props.dispatch({ type: 'CHANGED_USER', data })
            this.setState({ isSaveProgressing: false, isResetSuccess: true }, this.gotoUM());
        } else {
            this.setState({ isSaveProgressing: false, isResetSuccess: false });
        }

        // let id = this.props.match.params.id;
        // this.getAccountInfo(id);
    }

    gotoUM = () => {
        this.props.history.push('/users-management');

    }
    onClieckSuspendUser = () => {
        let accountInfoUpdate = {...this.state.accountInfo}
        // const { accountInfo } = this.state;
        console.log(accountInfoUpdate.disabled);
        accountInfoUpdate.disabled = !accountInfoUpdate.disabled;

        this.setState({ accountInfo: accountInfoUpdate}, () => console.log(accountInfoUpdate.disabled))
    }

    onClickResetPassword = () => {
        this.setState({ modalPopupResetdisplay: true });
    }

    closeModalPopupReset = () => {
        this.setState({ modalPopupResetdisplay: false, isResetSuccess: false });
    }

    confirmResetPassword = () => {
        this.setState({ isSaveProgressing: false }, this.resetPassword());
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
    }

    loadPersonalLogin = () => {
        // let userInfo = utility.readFromLocalStorage("persist:root");
        // let user = JSON.parse(userInfo.user)
        let userInfo = this.props.store;
        this.setState({ loginInfo: userInfo.user });
    }

    edit = (changed) => {
      const { initialData, accountInfo, moduleAccess, clients, sites, validation } = this.state
      let edited = false

      if (initialData && accountInfo.email) {
        const activeClient = clients.filter((c) => c.status !== false);
        const activeSite = sites.filter((s) => s.status !== false);
        const activeModule = (accountInfo.web_group !== 'Admin') ? moduleAccess.filter((m) => m.status !== false) : ["Admin"];
        if(!changed){
            edited = false;
        }else{
            edited = true;
        }

        if (accountInfo.email === '' ||
            accountInfo.user === '' ||
            !validation.email.isValid ||
            !validation.clients.isValid ||
            !validation.sites.isValid ||
            !validation.modules.isValid) {
              edited = false;
        }
      }

      return edited
    }

    render() {
        const { moduleAccess, sites, clients, accountInfo, adminClass,validation } = this.state;
        let edited = this.edit(this.state.changed)

        return (<div className="um-detail w-100 h-100">
            {/* <div className={(this.state.isLoadComplete ? 'd-none' : 'spinner')} />
            <div className={(this.state.isLoadComplete ? ' ' : 'd-none')}>
            </div> */}

            <HeaderTitle breadcrumb={[
                { to: '/users-management', label: 'User Management' },
                // { to: '', label: accountInfo.user, active: true },
            ]} />
            <CCard>
                <CCardBody className="p-3">
                    <form onSubmit={(e) => { e.preventDefault(); this.saveClick(); }}>
                        <div className="account-detail">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <h3 className="mb-0">
                                    <i class="fa fa-user pr-3" aria-hidden="true"></i><label className="text-primary mb-0">{accountInfo.user}</label>
                                    </h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-1">
                                    <label className="text-title-detail">User ID</label>
                                </div>

                                <div className="col-md-3">
                                    <label className="text-title-detail">Email</label>
                                </div>

                                <div className="col-md-2">
                                    <label className="text-title-detail">Name</label>
                                </div>

                                <div className="col-md-3 pr-0">
                                    <label className="text-title-detail">Reset Password</label>
                                </div>

                                <div className={`col-md-3 pl-0 ${adminClass}`}>
                                     <label className="text-title-detail">Suspend Users</label>
                                </div>


                            </div>
                            <div className="row mb-3">

                                <div className="col-md-1 pr-0">
                                    <input type="text" readOnly className="form-control" value={accountInfo.userId} />
                                </div>

                                <div className="col-md-3 pr-0">
                                    <input type="email" name="email" className={`form-control ${validation.email["isValid"]? '':validation.email["invalidClass"]}`} onChange={(e) => { this.onChangeEmail(e , accountInfo.email);this.setState({ changed: true }) }} onBlur={(e)=> {this.onBlurEmail(e);}} value={accountInfo.email} />
                                    <FormFeedback className="invalid-error-padding">
                                        {`${validation.email["message"]}`}
                                    </FormFeedback>
                                </div>

                                <div className="col-md-2 pr-0">
                                    <input type="text" className={`form-control ${validation.name["isValid"]?'':validation.name["invalidClass"]}`} maxLength="60" onChange={(e) => { this.onChangeName(e);this.setState({ changed: true }) }} value={accountInfo.user} />
                                    <FormFeedback className="invalid-error-padding">
                                        {`${validation.name["message"]}`}
                                    </FormFeedback>
                                </div>


                                <div className="col-md-3 pr-0">
                                    <div className="row pl-0">
                                        <div className="col-6 text-title-detail pr-0">
                                            Are you sure you want to create new password?
                                                </div>
                                        <div className="col-5">
                                            <button type="button" className={"btn " + ((accountInfo.passwordChange === '') ? "btn-outline-active" : "btn-outline-notActive")} onClick={(e) => { this.onClickResetPassword(); }}>RESET</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-md-3 pl-0 ${adminClass}`}>
                                    <div className="row">
                                        <div className="col-6 text-title-detail" >
                                            Are you sure you want<br />
                                                    to suspend this user?
                                              </div>
                                        <div className="col-6">
                                            <button type="button" className={"btn " + ((!accountInfo.disabled) ? "btn-outline-active" : "btn-outline-notActive px-0")} onClick={(e) => { this.onClieckSuspendUser(); }}>
                                                {(!accountInfo.disabled) ? 'SUSPEND' : 'ENABLE'}
                                            </button>
                                        </div>
                                    </div>

                                </div>


                            </div>


                        </div>
                        <div id="system" className={`system mb-0 ${adminClass}`}>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="mb-0">
                                        <label className="text-primary mb-0">System</label>
                                    </h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onModuleAccessClick} onModuleEnableAll={this.onEnabledAllModuleAccess} isEnableAllModule={this.state.isEnableAllModule} />
                                    <input type="checkbox" name="moduleAccess" className={`d-none ${validation.modules["isValid"]?'':validation.modules["invalidClass"]}`} />
                                    <FormFeedback>
                                        {`${validation.modules["message"]}`}
                                    </FormFeedback>
                                </div>
                                <div className="col-4 pl-0">
                                    <Site sites={sites} onEnableClick={this.onSiteStatusClick} onSiteEnableAll={this.onEnabledAllSite} isEnableAllSite={this.state.isEnableAllSite} />
                                    <input type="checkbox" name="sites" className={`d-none ${validation.sites["isValid"]?'':validation.sites["invalidClass"]}`} />
                                    <FormFeedback>
                                        {`${validation.sites["message"]}`}
                                    </FormFeedback>
                                </div>
                                <div className="col-4 um-client-scrollbar">
                                    <Client clients={clients} onEnableClick={this.onClientStatusClick} onClientEnableAll={this.onEnabledAllClient} isEnableAllClient={this.state.isEnableAllClient} />
                                    <input type="checkbox" name="clients" className={`d-none ${validation.clients["isValid"]?'':validation.clients["invalidClass"]}`} />
                                    <FormFeedback>
                                        {`${validation.clients["message"]}`}
                                    </FormFeedback>
                                </div>

                            </div>

                        </div>

                        <div className="d-flex mt-3 mr-3 justify-content-between">
                            <button type="button" className=" font-lg btn btn-primary btn-submit default-box-height" onClick={(e) => { this.gotoUM(); }}>
                                <label className="create-user-label mb-0">BACK</label>
                            </button>

                            <p>
                                <label className={(this.state.isValidForm) ? "errorText " : " d-none"}>
                                    Please make sure user name, email is valid and module has one enabled
                                        </label>
                            </p>

                            <button type="button" className={`font-lg btn btn-submit default-box-height ${edited ? "btn-primary" : "btn-grey"}`} disabled={!edited} onClick={(e) => { this.saveClick(); }} >
                                {this.state.isSaveProgressing ? <img src={loading} className='mt-min-5' width='45' height='45'/> : 'SAVE'}
                            </button>

                        </div>
                        <button type="submit" style={{ opacity: "0" }}></button>
                    </form>

                </CCardBody>
            </CCard>



            <ResetModal show={this.state.modalPopupResetdisplay}
                toggle={this.closeModalPopupReset}
                isLoad={this.state.isLoadReset}
                isResetSuccess={this.state.isResetSuccess}
                confirmResetPassword={this.confirmResetPassword} />

        </div>)
    }
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDetail);
