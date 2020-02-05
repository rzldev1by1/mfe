import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import UserListComponent from './Component/UserListComponent'
import PersonalUserComponent from './Component/PersonalUserComponent'
import users from './Users.json'
import axios from 'axios'
import {endpoint,headers} from '../../AppComponent/ConfigEndpoint'


class UserManagement extends Component{
    constructor(props){
        super(props);

        this.state ={
            userList : [],
            headers : [
                'User', 'Userid', 'User Level', 'Client', 'Last Access', 'Status', ''
                ],
            personalUser : [
                {youraccount:"georgesmith@ttl.com", userid:"12345", client:"All Client", site:"All Site"}
                    ],
            headersPersonal : [
                'Your Account', 'User ID', 'Client', 'Site'
              ],

              isListLoaded:false,

        }
    }

    componentDidMount(){
        this.loadUsers();

    }

    restructureUserList = (sources) => {
      let newUserArray = [];
        if(sources.length){
           newUserArray = sources.map((item, index) => {
              let newItem = {};
              newItem.user = item.name;
              newItem.userId = item.userid;
              newItem.email = item.email;
              newItem.userlevel = item.web_group;
              newItem.client = item.client;
              newItem.lastaccess = item.last_access;
              newItem.status = "Active";
              newItem.action = "";
              newItem.web_user = item.web_user;
              return newItem;
           });
        }

        return newUserArray;
    }



    loadUsers = () => {
        // if(users){
        //   this.setState({isListLoaded:true,userList:users});
        // }
        var self = this;
        axios.get(endpoint.UserManagement_ListUser, {
          headers: headers
        })
          .then(res => {
            var result = [];
            if(res.status === 200){
              console.log(res.data.data);
              result = self.restructureUserList(res.data.data);
              self.setState({isListLoaded:true,userList:result});
            }
            return result;
          })
          .catch(error => {

          })
          .then((result) => {
            // console.log(result);
          })
    }

    onCreateClick = () => {
        const {history,match} = this.props;
        history.push(`${match.url}/create`);
    }


    render(){

        return(<div>
            <div className="d-flex pt-4">
                <div className="flex-fill">
                    <h3>
                        <label>User Management</label>
                    </h3>
                </div>
                <div className="flex-fill">
                    <button className="btn btn-primary float-right" style={{width:'20%'}} onClick={(e)=>{this.onCreateClick()}}>+ add user</button>
                </div>

            </div>
            <div className="mb-3">

                    <PersonalUserComponent data={this.state.personalUser} headers={this.state.headersPersonal} />

            </div>

            <Card>
                <CardBody>
                {
                  (!this.state.isListLoaded)?
                      <span className="d-flex justify-content-center">
                          <i className= {(!this.state.isListLoaded)?"fa fa-refresh loading-2bigger fa-spin":"fa fa-refresh fa-spin d-none"}></i>
                      </span>
                    :
                    <UserListComponent data={this.state.userList} headers={this.state.headers} route={this.props}/>
                }
                </CardBody>
            </Card>
        </div>)
    }
}

export default UserManagement;
