import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './UserManagement.css'

class UserManagementDetail extends Component{
    constructor(props){
        super(props);


    }

    render(){
        const {match} = this.props;

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
                                      <span className='p-1 m-2 client-active'>Enable</span>
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
                                {
                                  /*
                                    <span className='p-1 m-2 client-active'>Aeosop</span>
                                    <span className='p-1 m-2 client-notActive'>Nike</span>
                                    <span className='p-1 m-2 client-active'>Logitech</span>
                                    <span className='p-1 m-2 client-notActive'>Lenovo</span>
                                    <span className='p-1 m-2 client-notActive'>Samsung</span>
                                    **/
                                  }
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
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>)
    }

}
export default UserManagementDetail;
