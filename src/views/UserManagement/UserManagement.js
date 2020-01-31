import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import UserListComponent from './Component/UserListComponent'
import PersonalUserComponent from './Component/PersonalUserComponent'
import users from './Users.json'


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



    loadUsers = () => {
        if(users){
          this.setState({isListLoaded:true,userList:users});
        }
    }


    render(){
        console.log(this.state.userList.length);
        return(<div>
            <div className="d-flex pt-4">
                <div className="flex-fill">
                    <h3>
                        <label>User Management</label>
                    </h3>
                </div>
                <div className="flex-fill">
                    <button className="btn btn-primary float-right" style={{width:'20%'}}>+ add user</button>
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
