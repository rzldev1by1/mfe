import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import UserListComponent from './Component/UserListComponent'
import PersonalUserComponent from './Component/PersonalUserComponent'


class UserManagement extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state ={
            userList : [
                {user:"George Smith", userid:"12345", userlevel:"Admin", client:"All", lastaccess:"12 Dec 2019", status:"Active",action:""},
                {user:"Phil Jones", userid:"23456", userlevel:"User", client:"Aeosop, Nike", lastaccess:"12 Dec 2019", status:"Active",action:""},
                {user:"Agnes", userid:"34567", userlevel:"User", client:"Nike", lastaccess:"12 Dec 2019",status:"Active",action:""},
                {user:"Conie", userid:"45678", userlevel:"User", client:"Aeosop", lastaccess:"12 Dec 2019",status:"Suspended",action:""},
                {user:"Niera", userid:"56789", userlevel:"Admin", client:"Nike", lastaccess:"12 Dec 2019",status:"Active",action:""}
                    ],
            headers : [
                'User', 'Userid', 'User Level', 'Client', 'Last Access', 'Status', ''
                ],
            personalUser : [
                {youraccount:"georgesmith@ttl.com", userid:"12345", client:"All Client", site:"All Site"}
                    ],
            headersPersonal : [
                'Your Account', 'User ID', 'Client', 'Site'
                ]
            
        }
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
                    <button className="btn btn-primary float-right" style={{width:'20%'}}>+ add user</button>
                </div>
                
            </div>
            <div>
                 <PersonalUserComponent data={this.state.personalUser} headers={this.state.headersPersonal} />
            </div>
                
            <Card>
                <CardBody>
                    <UserListComponent data={this.state.userList} headers={this.state.headers} route={this.props}/>
                </CardBody>
            </Card>
        </div>)
    }
}

export default UserManagement;