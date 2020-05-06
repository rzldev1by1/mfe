import React, { Component } from 'react'
import { Button, Card, CardBody} from 'reactstrap'
import UserListComponent from './Component/UserListComponent'
import PersonalUserComponent from './Component/PersonalUserComponent'
import axios from 'axios'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'
import ModalNewUser from './Component/ModalNewUser'
import moment from 'moment'
import query from '../../AppComponent/query_menu_temp'
import Authentication from '../../Auth/Authentication'
import Paging from '../../AppComponent/Paging'
import create from '../../assets/img/brand/button_create@2x.png'
import menunav from '../../menunav'
import Export from '../../AppComponent/Export'


const today = moment(new Date()).format("YYYY-MM-DD");

const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
const notValidAll = 'Please make sure user name, email is valid and module has one enabled';
const notValidMail = 'Email is not valid';

const userModel = {
    "userId":"",
    "name":"",
    "email":"",
    "webGroup":"Warehouse",
    "lastAccess": today,
    "lastLogin": today,
	  "thisAccess": today,
	  "thisLogin": today,
    "password":"",
    "userMenu":[],
    'client':"",
    "disabled":"N",
    "company":""
}



class UserManagement extends Component{
    constructor(props){
        super(props);

        this.state ={
            userList : [],
            headers : [
                  'User ID', 'User Name', 'Site', 'Client', 'Last Accessed', 'Status'
                ],
            personalUser : [
                {youraccount:"-", userId:"-", client:"-", site:"-"}
                    ],
            headersPersonal : [
                'Your Account', 'User ID', 'Client', 'Site'
              ],

              isListLoaded:false,
              isModalNewOpen:false,
              accountInfo:userModel,
              moduleAccess:[],
              sites:[],
              clients:[],
              isModuleLoaded: false,
              isClientLoaded: false,
              isSiteLoaded: false,
              isSaveProgressing:false,
              displayRow:50,
              totalPage:0,
              currentPage:0,
              startIndex:0,
              lastIndex:0,
              isValidForm:false,
              firstTab:true,
              secondTab:false,
              validatorMessage:''
        }
          this.searchForm = React.createRef();
    }

    componentDidMount(){
        this.loadUsers();
        this.loadModuleAccess();
        this.loadClients();
        this.loadSites();
    }

    calculatePageRow = (listOfRows) => {
      let totalPage = 0;
        if(!listOfRows)
        return;

        if(listOfRows.length){
          let displayRow = this.state.displayRow;
          let page = parseInt(listOfRows.length / displayRow);
          let pageDiv = listOfRows.length % displayRow;

           totalPage = (pageDiv > 0 && pageDiv < displayRow)? (page + 1):page;

        }
      return totalPage;
    }

    nextClickHandler = (e) => {
      const {name,userId,email,userMenu} = this.state.accountInfo;
      if(name && userId && email && userMenu.length)
      {
        if(!email.match(regexMail))
            this.setState({isValidForm:true,validatorMessage:notValidMail});
        else
            this.setState({isValidForm:false},this.setTabActive);
      }else{
        this.setState({isValidForm:true,validatorMessage:notValidAll});
      }

    }

    setTabActive = () => {
      this.setState((prev) => {
        return {firstTab:!prev.firstTab,secondTab:!prev.secondTab}
      });
    }
    restructureUserList = (sources) => {
      let newUserArray = [];
        if(sources.length){
           newUserArray = sources.map((item, index) => {
              let newItem = {};
              newItem.userId = item.userid;
              newItem.user = item.name;
              newItem.email = item.email;
              newItem.userlevel = item.web_group;
              newItem.site = item.site?item.site:'-';
              newItem.client = item.client;
              newItem.lastaccess = item.last_access;
              newItem.status = (item.disabled === 'Y')?'Suspended':'Active';
              newItem.web_user = item.web_user;
              newItem.company = item.company;
              return newItem;
           });
        }

        return newUserArray;
    }
    restucturePersonalUser = (sources) => {
      var newArray = [];

      if(sources){
          newArray = sources.map((item,index)=>{
            let newItem = {};
            newItem.youraccount = item.email;
            newItem.userId = item.userId;
            newItem.client = item.client;
            newItem.site = '-';
            return newItem;
          });
      }
      return newArray;
    }

    getStartIndex = (currentPage) => {
      let startIndex = 0;
      if(currentPage < 1)
        return;

      let displayRow = this.state.displayRow;
      startIndex = (currentPage * displayRow) - displayRow;

      return startIndex;
    }

    getLastIndex = (currentPage) => {
      const {totalPage,userList} = this.state;

      let lastIndex = 0;
      if(currentPage < 1)
        return;

      let displayRow = this.state.displayRow;

      lastIndex = (currentPage !== totalPage)? (currentPage * displayRow):userList.length;

      return lastIndex;
    }

    numberEventClick = (currentPage) => {
      if(currentPage <= this.state.totalPage){
        let page = parseInt(currentPage);
        let startIndex = this.getStartIndex(page);
        let lastIndex = this.getLastIndex(page);
        this.setState({ currentPage: page,startIndex:startIndex,lastIndex:lastIndex });
      }
  	}

    nextPageClick = () => {
      if (this.state.currentPage < this.state.totalPage) {
        this.setState((prev) => {
          let currentPage = prev.currentPage + 1;
          return {
            currentPage:currentPage,
            startIndex:this.getStartIndex(currentPage),
            lastIndex:this.getLastIndex(currentPage)
          }
        });
      }

    }

    backPageClick = () => {
      if (this.state.currentPage > 1) {
        this.setState((prev) => {
          let currentPage = prev.currentPage - 1;
          return {
            currentPage:currentPage,
            startIndex:this.getStartIndex(currentPage),
            lastIndex:this.getLastIndex(currentPage)
          }
        });
      }
    }

    lastPageClick = () => {
      if (this.state.currentPage < this.state.totalPage) {
        let currentPage = this.state.totalPage;
        this.setState({ currentPage:currentPage,startIndex:this.getStartIndex(currentPage),lastIndex:this.getLastIndex(currentPage)})
      }
    }

    firstPageClick = () => {
      if (this.state.currentPage > 1) {
        let currentPage = 1;
        this.setState({ currentPage:currentPage,startIndex:this.getStartIndex(currentPage),lastIndex:this.getLastIndex(currentPage)})
      }
    }

    getUserID = () => {
      let user = JSON.parse(localStorage.getItem("user"));
       if(user)
          return user.userId;
      else
          return null;
    }

    loadUsers = () => {
       
        var self = this;
        axios.get(endpoint.UserManagement_ListUser, {
          headers: headers
        })
          .then(res => {
            var result = [];
            if(res.status === 200){
              let totalPage = self.calculatePageRow(res.data.data);

              let userId = self.getUserID()
              let startIndex = self.state.startIndex;
              let lastIndex = self.state.displayRow;
              let currentPage = parseInt(lastIndex / self.state.displayRow)
              result = self.restructureUserList(res.data.data);
              let loginUser = self.restucturePersonalUser(result.filter((item)=>{ return item.userId === userId}));

              self.setState({isListLoaded:true,userList:result, personalUser:loginUser, totalPage:totalPage,
                startIndex:startIndex,lastIndex:lastIndex,currentPage:currentPage});
            }
            return result;
          })
          .catch(error => {

          })
          .then((result) => {

          })
    }

    onCreateClick = () => {
        this.setState({isModalNewOpen:!this.state.isModalNewOpen});
    }

    closeModalPopUp = () => {
      this.setState({isModalNewOpen:!this.state.isModalNewOpen},()=>{ window.location.reload();})
    }

    onChangeName = (e) => {
      const {value} = e.target;
      let newText = value.substring(0,2);
      let user = {...this.state.accountInfo};
      let result = this.generateUserID(value);
      user.name = value;
      user.userId = newText.toLowerCase()+result;
      user.password = result+newText.toLowerCase();

      this.setState({accountInfo:user, isValidForm:false});
    }

    onChangeCompany = (e) => {
      const {value} = e.target;
      let user = {...this.state.accountInfo};
      user.company = value;
      this.setState({accountInfo:user});
    }

    onChangeEmail = (e) => {
      const {value} = e.target;
      let user = {...this.state.accountInfo};
      user.email = value;

      this.setState({accountInfo:user,isValidForm:false});
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

    restuctureData = (sites) => {
     return sites.map((item,index)=>{
          let newItem = item;
          newItem.status = false;
          return newItem;
      });
    }

    restuctureDataModule = (sites) => {
     return sites.map((item,index)=>{
          let newItem = item;
          newItem.status = false;
          return newItem;
      });
    }

    writeToLocalStorage = (keyName, value) => {
      if(!sessionStorage.getItem(keyName)){
        sessionStorage.setItem(keyName,value);
      }
    }

    loadModuleAccess = (role) => {

      var self = this;
      

      axios.get(endpoint.UserManagement_ModuleAccess, {
        params: {role:role},
        headers: headers
      })
        .then(res => {
          var result = [];

          if(res.status === 200){

            if(sessionStorage.getItem('menus')){
              sessionStorage.removeItem('menus');
            }

            result = res.data;
            let menuAccessTemp = result.filter((item) => { return query.indexOf(item.menuname.toLowerCase()) !== -1 });
           let resultMenu =  menunav.items.filter((item)=>{ return item['key'] !== 'usermanagement'}).map((item,idx) =>
            {
              
              let keyName = item['key'];
              let menuItem = menuAccessTemp.filter((item)=>{ return item.menuid === keyName});

              return menuItem[0];
            }
          );

            let newResult = self.restuctureData(resultMenu);
            self.setState({moduleAccess:newResult,isModuleLoaded:true},self.writeToLocalStorage('menus',JSON.stringify(newResult)));
          }
          return result;
        })
        .catch(error => {

        })
        .then((result) => {

        })
    }

    loadSites = (role) => {
      var self = this;
      axios.get(endpoint.getSite, {
        params: {role:role},
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = res.data;
            let newResult = self.restuctureData(result);
            self.setState({sites:newResult,isSiteLoaded:true},self.writeToLocalStorage('sites',JSON.stringify(newResult)));
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
      axios.get(endpoint.getClient, {
        headers: headers
      })
        .then(res => {
          var result = [];
          if(res.status === 200){
            result = res.data;
            let newResult = self.restuctureData(result);
            self.setState({clients:newResult,isClientLoaded:true},self.writeToLocalStorage('clients',JSON.stringify(newResult)));
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
        var newArray = newState.map((item,index) => {

            if(item.menuid === data.menuid){
              item.status = !item.status;
              if(item.status){
                userModel.userMenu.push(item.menuid);
              }else{
                if(userModel.userMenu.length){
                  let idx = userModel.userMenu.indexOf(item.menuid);
                  userModel.userMenu.splice(idx,1);
                }
              }


            }
            return item;
        });

       this.setState({moduleAccess:newArray});
      }
    }

    onEnabledAllModuleAccess = () => {
        let account = {...this.state.accountInfo};
        userModel.userMenu = null;
        userModel.userMenu = [];

        let newState = [...this.state.moduleAccess];
        var newArray = newState.map((item,index) => {
              item.status = true;
              if(item.status){
                userModel.userMenu.push(item.menuid);
              }

            return item;
        });

       account.userMenu = userModel.userMenu;

       this.setState({moduleAccess:newArray,accountInfo:account});
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
        let user = {...this.state.accountInfo};
        let newState = [...this.state.clients];
        var newArray = newState.map((item,index) => {
            item.status = false;
            if(item.code === data.code){
              item.status = true;
              if(item.status)
                user.client = item.code;
            }

            return item;
        });

        this.setState({clients:newArray,accountInfo:user});
      }
    }


    saveClick = () => {

      const {name,userId,email,userMenu} = this.state.accountInfo;
      if(name && userId && email && userMenu.length)
      {
        this.setState({isSaveProgressing:true,isValidForm:false},this.saveRequest);
      }else{
        this.setState({isValidForm:true});
      }
    }

    saveRequest = () => {

      var self = this;
      const {name,userId,email,userMenu} = self.state.accountInfo;
      if(name && userId && email && userMenu.length)
      {
        let param = {...this.state.accountInfo};

        axios.post(endpoint.UserManagement_Create,param,{ headers: headers })
          .then(res => {
            var result = [];
            if(res.status === 200){
              self.setState({isSaveProgressing:false});
              self.closeModalPopUp();
              window.location.reload();
              
            }
            return result;
          })
          .catch(error => {
              self.setState({isSaveProgressing:false});
              self.closeModalPopUp();

          })
          .then((result) => {

          })
      }

    }
    ExportName = () => {
      let filename = "";
      
      let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = new Date();
      let date1 = date.getDate(),
          month = date.getMonth(),
          year = date.getFullYear(),
          Seconds = date.getSeconds(),
          Minutes = date.getMinutes(),
          Hours = date.getHours();
      filename=("Microlistics_UserManagement." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)
      
      return filename;
    }

    ExportPDFName = () =>{
      let name= ""
      name =("User Management")
      return name;
      }

      ExportHeader = () =>{
        let headers = this.state.headers
        return headers
      }
      ExportData = () => {
       let data = this.state.userList.map(elt=> [elt.userId, elt.user,elt.site,elt.client,elt.lastaccess,elt.status]);
       console.log(data)
       return data
      }

    isValidUser = () => {
      let result = false;
      let userlevel = Authentication.getUserLevel();
      if(userlevel){
        if(userlevel.toLowerCase() === 'administrator')
          result = true;
      }
      return result;
    }

    searchHandler = (e) => {
      e.preventDefault();
      
      let self = this;
      let param = {};
      let currentForm = this.searchForm.current
      let searchValue = currentForm.searchInput.value;


      if(searchValue){
        param.searchParam = searchValue;
      }else{
        param.searchParam = "";
      }

      
        let endpointApi = `${endpoint.UserManagement_ListUser}`;

        axios.get(endpointApi, {
          params: param,
          headers: headers
        })
        .then(res => {
          let result = [];
            if(res.status === 200){
                result = self.restructureUserList(res.data.data);
                self.setState({userList:result});
            }
          return result;
        })
        .catch( error => {
            console.log(error);
        })
        .then(result => {

        });

    }

    render(){

        return(<div>
            <div className="pt-4 mb-3">
                <div className="row">
                    <div className="col-6 pr-0">
                      <h2 className='margin-right-breadcrumb-title'>
                          User Management
                      </h2>
                    </div>

                    <div className="col-6 pl-0 ml-0 ">
                        <button style={{width:"199px"}} className={(this.isValidUser() ?"btn btn-primary text-button float-right default-box-height":"d-none")} onClick={(e)=>{this.onCreateClick()}}>

                        <img src={create} alt="create user" className="mr-2 mb-1" style={{width:'8%'}}/>
                        Create User
                        </button>
                    </div>
                </div>
            </div>


           <PersonalUserComponent data={this.state.personalUser} headers={this.state.headersPersonal} />


            <div className={( this.state.isListLoaded ? 'd-none': 'spinner')}/>
            <div className={( this.state.isListLoaded ? '':' d-none ')}>
              <div className="mb-3">
                <Card className="container-user-list border-0 mb-0"> 
                <CardBody>
                <form ref={this.searchForm} onSubmit ={this.searchHandler}>
                <div className="row">
                <div className='pr-3 pl-3 ' style={{width: "86%"}}>
                    <div className="searchINP">
                    <div className="input-group p-0 searchSection">
                    <div className="input-group searchBox w-100 default-box-height" style={{maxWidth:"none"}}>
                    <span className="input-group-text border-0 bg-transparent ml-2" style={{ padding:"0.4rem" }}>
                    <i className="iconU-search" />
                    </span>
                    <input type="text" style={{ fontFamily: "Helvetica Neue Medium", backgroundColor:"transparent" }}
                    className="form-control searchInput" id="searchInput" name="searchInput"
                    placeholder="Enter User Id or User Name" />
                    </div>
                    </div>
                    </div>
                </div>
                <div className='pr-3' style={{width: "14%"}} >
                    <Button type="submit" className="default-box-height search search-um text-button btn-primary">
                      Search
                    </Button>
                </div>

                {/* <div className="col-2 m-0"> */}


                </div>
                </form>
                </CardBody> 
                </Card>
              </div>

                <Card className="container-user-list border-0 mb-2">
                <CardBody className="p-0">
                <UserListComponent data={this.state.userList} headers={this.state.headers} route={this.props}
                startIndex={this.state.startIndex} lastIndex={this.state.lastIndex} 
                className='animated fadeIn'  />

                <ModalNewUser isOpen={this.state.isModalNewOpen} closeModal={this.closeModalPopUp} model={this.state.accountInfo}
                onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail} moduleAccess={this.state.moduleAccess}
                isModuleLoaded={this.state.isModuleLoaded} moduleAccessEnableClick={this.onModuleAccessClick}
                sites={this.state.sites} isSiteLoaded={this.state.isSiteLoaded} sitesEnableClick={this.onSiteStatusClick}
                clients={this.state.clients} isClientLoaded={this.state.isClientLoaded} clientEnableClick={this.onClientStatusClick}
                onSaveClick={this.saveClick} isSaveProgressing={this.state.isSaveProgressing} onChangeCompany={this.onChangeCompany}
                onModuleEnableAll = {this.onEnabledAllModuleAccess} isValidForm={this.state.isValidForm} onNextClickHandler={this.nextClickHandler}
                firtsTabActive={this.state.firstTab} secondTabActive={this.state.secondTab} onClickTabActive={this.setTabActive}
                message={this.state.validatorMessage} />

                </CardBody>
                </Card>

              
                <div className=" p-0"  >
                  <div className='paginations paginations-um '>
                      <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                        backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                        totalRows={this.state.userList.length} currentPage={this.state.currentPage}
                        maxPage={(this.state.totalPage)}
                        startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                        numberEventClick={this.numberEventClick}/>
                      <Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
                          ExportHeader={this.ExportHeader} ExportData={this.ExportData}/>
                  </div>
                </div>
            </div>

        </div>)
    }
}

export default UserManagement;
