import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import './UserManagement.css'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'
import endpoint from '../../helpers/endpoints'
import axios from 'axios'
import HeaderTitle from 'shared/container/TheHeader'
import ResetModal from './ModalPopup/Reset'

import moment from 'moment';
// import popupLock from '../../assets/img/brand/popup_lock.png'
// import popupLockSuccess from '../../assets/img/brand/popup_success_lock.png'

const today = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
const passChanged = '1999-08-28';
const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement'];

class UserManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleAccess: [],
            sites: [],
            clients: [],
            accountInfo: {},
            isSaveProgressing: false,
            isLoadComplete: false,
            modalPopupResetdisplay: false,
            isResetSuccess: false,
            isValidForm: false,
            isEnableAllModule: false,
            isEnableAllSite: false,
            isEnableAllClient: false,
        }

    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.getAccountInfo(id);
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

        let result = this.restructureAccount(data.data);
        this.setState({ accountInfo: result, isLoadComplete: true }, () => {
            this.loadMasterResource();
        });

    }

    loadMasterResource = () => {
        this.loadModuleAccess();
        this.loadSites();
        this.loadClients();
    }

    loadModuleAccess = async () => {
        let user = { ...this.state.accountInfo };
        let userMenu = [...user.userMenu].map((item, index) => { return item.menuid; });
        const { data } = await axios.get(endpoint.userManagementModuleAccess)
        let menus = data.filter((item) => { return menuAvailable.indexOf(item.menuname.toLowerCase()) !== -1 })
            .map((item, index) => {
                let newItem = item;
                let isStatus = false;
                if (user.web_group && user.web_group.toLowerCase() !== 'administrator') {
                    isStatus = userMenu.includes(item.menuid) ? true : false;
                }
                newItem.status = isStatus;
                return newItem;
            });
        this.setState({ moduleAccess: menus });
    }

    loadSites = async () => {
        let user = { ...this.state.accountInfo };
        const { data } = await axios.get(endpoint.getSite);
        let sites = data.map((item, index) => {
            let newItem = item;
            newItem.status = (item.site === user.site) ? true : false;
            return newItem;
        });
        this.setState({ sites: sites });
    }

    loadClients = async () => {
        let user = { ...this.state.accountInfo };
        const { data } = await axios.get(endpoint.getClient);

        let clients = data.map((item, index) => {
            let newItem = item;
            newItem.status = (item.code === user.client) ? true : false;
            return newItem;
        });
        this.setState({ clients: clients });
    }

    

    onEnabledAllModuleAccess = () => {
        let newState = [...this.state.moduleAccess];
        let isEnableAllModule = this.state.isEnableAllModule;
        let newArray = newState.map((item,index) => {
            let newItem = item;
            newItem.status = !isEnableAllModule;
            return newItem;
        })

        this.setState({ moduleAccess: newArray, isEnableAllModule: !isEnableAllModule });
    }

    onEnabledAllSite = () => {
        let isEnableAllSite = this.state.isEnableAllSite;
        
        let sites = [...this.state.sites];
        var newArray = sites.map((item, index) => {
            item.status = !isEnableAllSite;
            return item;
        });
        
        this.setState({ sites: newArray, isEnableAllSite: !isEnableAllSite });
    }

    onEnabledAllClient = () => {
        let isEnableAllClient = this.state.isEnableAllClient;        
        let clients = [...this.state.clients];
        var newArray = clients.map((item, index) => {
            item.status = !isEnableAllClient;
            return item;
        });        
        this.setState({ clients: newArray, isEnableAllClient: !isEnableAllClient });
    }

    onModuleAccessClick = (e, index) => {
        let moduleAccess = [...this.state.moduleAccess];
        let newModules = moduleAccess.map((item, idx) => {
            if (idx === index) {
                item.status = !item.status;
            }
            return item;
        });

        let isEnableAll = newModules.filter((item) => { return item.status === true}).length;
        let isEnableAllModule = (moduleAccess.length === isEnableAll)?true:false;

        this.setState({ moduleAccess: newModules,isEnableAllModule:isEnableAllModule});
    }

    onSiteStatusClick = (e, index) => {
        let sites = [...this.state.sites];          
        let newSites = sites.map((item, idx) => {
            if (idx === index) {
                item.status = true;
            } else {
                item.status = false;
            }
            return item;
        });
        let isEnableAll = newSites.filter((item) => { return item.status === true}).length;
        let isEnableAllSite = (sites.length === isEnableAll)?true:false;

        this.setState({ sites: newSites,isEnableAllSite:isEnableAllSite});
    }

    onClientStatusClick = (e, index) => {
        let clients = [...this.state.clients];
        let newClients = clients.map((item, idx) => {
            if (idx === index) {
                item.status = true;
            } else {
                item.status = false;
            }
            return item;
        });
        let isEnableAll = newClients.filter((item) => { return item.status === true}).length;
        let isEnableAllClient = (clients.length === isEnableAll)?true:false;

        this.setState({ clients: newClients, isEnableAllClient:isEnableAllClient });
    }


    onChangeName = (e) => {
        const { name, value } = e.target;
        let user = { ...this.state.accountInfo };
        user.user = value;
        this.setState({ accountInfo: user, isValidForm: false });
    }

    onChangeEmail = (e) => {
        const { name, value } = e.target;
        let user = { ...this.state.accountInfo };
        user.email = value;

        this.setState({ accountInfo: user, isValidForm: false });
    }

    generateUserID = (textValue) => {
        let result = "";

        if (textValue && textValue.length > 2) {
            var anysize = 3;//the size of string
            var charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
            for (var i = 0; i < anysize; i++)
                result += charset[Math.floor(Math.random() * (9))];
        }
        return result;
    }

    getParam = (passwordChange) => {
        let newParam = {};
        let accountInfo = { ...this.state.accountInfo };
        newParam.name = accountInfo.user;
        newParam.email = accountInfo.email;
        newParam.lastAccess = accountInfo.lastAccess;
        newParam.lastLogin = accountInfo.lastLogin;
        newParam.thisAccess = accountInfo.thisAccess;
        newParam.thisLogin = accountInfo.thisLogin;
        newParam.userMenu = this.changeUserMenuToStringArray(accountInfo.userMenu);
        newParam.client = accountInfo.client;
        newParam.site = accountInfo.site;
        newParam.disabled = accountInfo.disabled ? 'Y' : 'N';


        return newParam;
    }

    saveClick = () => {
        let newParam = this.getParam();

        if (newParam.name && newParam.email && newParam.userMenu.length) {
            this.setState({ isSaveProgressing: true }, () => { this.updateRequest(newParam); });
        } else {
            this.setState({ isValidForm: true });
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
        setTimeout(() => { self.setState({ isResetSuccess: false, modalPopupResetdisplay: false }) }, 5000);
    }

    resetPassword = () => {
        var self = this;
        const { match } = this.props;
        let web_user_id = match.params.id;
        const { user, userId, email, userMenu } = this.state.accountInfo;

        let url = `${endpoint.UserManagement_resetpassword}`;

        let newText = user.substring(0, 2);
        let result = this.generateUserID(today);
        let new_password = result + newText.toLowerCase();
        let param = { "email": email, "web_user": web_user_id, "new_password": new_password }


        //  axios.post(url,param,{ headers: headers })
        //    .then(res => {
        //      var result = [];
        //      if(res.status === 200){
        //        self.setState({isSaveProgressing:false, isResetSuccess:true, modalPopupResetdisplay:true},self.closeModalPopupResetAuto);

        //      }
        //      return result;
        //    })
        //    .catch(error => {
        //        console.log("error save",error);
        //    })
        //    .then((result) => {

        //    })


    }

    updateRequest = async (param) => {

        var self = this;
        const { userId } = self.state.accountInfo;

        let url = `${endpoint.userManagementUpdate}${userId}`;

        const { data, status } = await axios.post(url, param);
        if (status === 200) {
            this.setState({ isSaveProgressing: false, isResetSuccess: true });
        } else {
            this.setState({ isSaveProgressing: false, isResetSuccess: false });
        }

        let id = this.props.match.params.id;
        this.getAccountInfo(id);
    }

    gotoUM = () => {
        this.props.history.push('/users-management');

    }

    onClieckSuspendUser = () => {
        const { accountInfo } = this.state;
        accountInfo.disabled = !accountInfo.disabled;

        this.setState({ accountInfo: accountInfo })
    }

    onClickResetPassword = () => {
        this.setState({ modalPopupResetdisplay: true });
    }

    closeModalPopupReset = () => {
        this.setState({ modalPopupResetdisplay: false });
    }

    confirmResetPassword = () => {
        this.setState({ isSaveProgressing: false, modalPopupResetdisplay: false }, this.resetPassword());
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

    }

    render() {
        const { match } = this.props;
        const { moduleAccess, sites, clients, accountInfo } = this.state;


        return (<div>
            <div className={(this.state.isLoadComplete ? 'd-none' : 'spinner')} />
            <div className={(this.state.isLoadComplete ? ' ' : 'd-none')}>

                <div className="d-flex mt-4 mb-4">
                    <HeaderTitle breadcrumb={[
                        { to: '/users-management', label: 'User Management' },
                        { to: '', label: accountInfo.user, active: true },
                    ]} />
                </div>
                <div className="d-flex">
                    <CCard className="container-user-list border-0 flex-fill h-100">
                        <CCardBody>
                            <form onSubmit={(e) => { e.preventDefault(); this.saveClick(); }}>
                                <div className="account-detail mt-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3>
                                                <label className="text-primary">User Details</label>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2">
                                            <label className="text-title-detail">User ID</label>
                                        </div>

                                        <div className="col-2">
                                            <label className="text-title-detail">Name</label>
                                        </div>

                                        <div className="col-2">
                                            <label className="text-title-detail">Email</label>
                                        </div>


                                        <div className="col-3 pr-0">
                                            <label className="text-title-detail">Reset Password</label>
                                        </div>

                                        <div className="col-3 pl-0">
                                            <label className="text-title-detail">Suspend Users</label>
                                        </div>


                                    </div>
                                    <div className="row">

                                        <div className="col-2">
                                            <input type="text" readOnly className="form-control" value={accountInfo.userId} />
                                        </div>

                                        <div className="col-2">
                                            <input type="text" className="form-control" maxLength="60" onChange={(e) => { this.onChangeName(e); }} value={accountInfo.user} />
                                        </div>

                                        <div className="col-2">
                                            <input type="email" name="email" className="form-control" onChange={(e) => { this.onChangeEmail(e); }} value={accountInfo.email} />
                                        </div>


                                        <div className="col-3 pr-0">
                                            <div className="row pl-0">
                                                <div className="col-6 text-title-detail">
                                                    Are you sure you want<br />
                                                      to create new password?
                                                </div>
                                                <div className="col-5">
                                                    <button type="button" className={"btn " + ((accountInfo.passwordChange === '') ? "btn-outline-active" : "btn-outline-notActive")} onClick={(e) => { this.onClickResetPassword(); }}>Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 pl-0">
                                            <div className="row">
                                                <div className="col-6 text-title-detail" >
                                                    Are you sure you want<br />
                                                    to suspend this user?
                                              </div>
                                                <div className="col-6">
                                                    <button type="button" className={"btn " + ((!accountInfo.disabled) ? "btn-outline-active" : "btn-outline-notActive")} onClick={(e) => { this.onClieckSuspendUser(); }}>
                                                        {(!accountInfo.disabled) ? 'Suspend' : 'Disabled'}
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
                                                <label className="text-primary">System</label>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onModuleAccessClick} onModuleEnableAll={this.onEnabledAllModuleAccess} isEnableAllModule={this.state.isEnableAllModule} />
                                        </div>
                                        <div className="col-4 pl-0">
                                            <Site sites={sites} onEnableClick={this.onSiteStatusClick} onSiteEnableAll={this.onEnabledAllSite} isEnableAllSite={this.state.isEnableAllSite} />
                                        </div>
                                        <div className="col-4 um-client-scrollbar">
                                            <Client clients={clients} onEnableClick={this.onClientStatusClick} onClientEnableAll={this.onEnabledAllClient} isEnableAllClient={this.state.isEnableAllClient} />
                                        </div>

                                    </div>

                                </div>

                                <div className="d-flex mt-5 mr-3 justify-content-between">
                                    <button type="button" className=" font-lg font-md font-sm btn btn-primary btn-submit default-box-height" onClick={(e) => { this.gotoUM(); }}>
                                        <label className="create-user-label mb-0">Back</label>
                                    </button>

                                    <p>
                                        <label className={(this.state.isValidForm) ? "errorText " : " d-none"}>
                                            Please make sure user name, email is valid and module has one enabled
                                        </label>
                                    </p>

                                    <button type="button" className=" font-lg font-md font-sm btn btn-primary btn-submit default-box-height" onClick={(e) => { this.saveClick(); }}>
                                        <i className={(this.state.isSaveProgressing) ? "mr-2 fa fa-refresh fa-spin " : "fa fa-refresh fa-spin d-none"}></i>
                                        <label className="create-user-label mb-0">Save</label>
                                    </button>

                                </div>
                                <button type="submit" style={{ opacity: "0" }}></button>
                            </form>

                        </CCardBody>
                    </CCard>
                </div>


                <ResetModal show={this.state.modalPopupResetdisplay}
                    toggle={this.closeModalPopupReset}
                    isResetSuccess={this.state.isResetSuccess}
                    confirmResetPassword={this.confirmResetPassword} />
            </div>
        </div>)
    }

}
export default UserManagementDetail;
