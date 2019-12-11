import React, { Component } from 'react';
import { Card, CardBody,Col, Row, Table,Button,ButtonDropdown,FormGroup,
		Breadcrumb, BreadcrumbItem,Input, InputGroup, InputGroupAddon,
    DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import axios from 'axios';
import AppComponent from '../../AppComponent';
import Paging from '../General/Paging';


class PurchaseOrderDetail extends Component{
    constructor(props){
      super(props);

    }

    	componentDidMount(){

      }

      render(){

        return(
          <React.Fragment>
    				<div className="animated fadeIn">
                <div className="d-flex flex-row">
                    <Breadcrumb>
                      <BreadcrumbItem active>
                        Purchase Order
                      </BreadcrumbItem>
                    </Breadcrumb>
                </div>
    					<div className="d-flex flex-row">
    						<div className="col-12">
    							<div className="row">
    								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <Card className="form-group rounded-top-05 border-0 pt-2">
                            <div className="d-flex flex-row">
                               <div className="flex-fill p-2">
                                    <div className="flex-column">
                                      <label className="col-5">Site</label>
                                      <label className="col-7">Site</label>
                                    </div>
                                    <div className="flex-column">
                                      <label className="col-5">Client</label>
                                      <label className="col-7">Client</label>
                                    </div>
                                    <div className="flex-column">
                                      <label className="col-5">Order no</label>
                                      <label className="col-7">Order no</label>
                                    </div>
                                    <div className="flex-column">
                                      <label className="col-5">Order type</label>
                                      <label className="col-7">Order type</label>
                                    </div>

                               </div>


                               <div className="flex-fill p-2">
                                 <div className="flex-column">
                                   <label className="col-5">Supplier no</label>
                                   <label className="col-7">Supplier no</label>
                                 </div>
                                 <div className="flex-column">
                                   <label className="col-5">Supplier name</label>
                                   <label className="col-7">Supplier name</label>
                                 </div>
                                 <div className="flex-column">
                                   <label className="col-5">Customer order ref</label>
                                   <label className="col-7">Customer order ref</label>
                                 </div>
                                 <div className="flex-column">
                                   <label className="col-5">Vendor order no</label>
                                   <label className="col-7">Vendor order no</label>
                                 </div>
                               </div>

                               <div className="flex-fill p-2">
                               <div className="flex-column">
                                 <label className="col-5">Status</label>
                                 <label className="col-7">Status</label>
                               </div>
                               <div className="flex-column">
                                 <label className="col-5">Date due</label>
                                 <label className="col-7">Date due</label>
                               </div>
                               <div className="flex-column">
                                 <label className="col-5">Date released</label>
                                 <label className="col-7">Date released</label>
                               </div>
                               <div className="flex-column">
                                 <label className="col-5">Date completed</label>
                                 <label className="col-7">Date completed</label>
                               </div>
                               </div>

                               <div className="flex-fill">
                                    <div className="d-flex justify-content-end p-3">
                                      <Button className="circle m-2">
                                      <i className="fa fa-pencil " />
                                      </Button>
                                      <Button className="circle m-2">
                                      <i className="fa fa-trash" />
                                      </Button>
                                    </div>
                               </div>



                            </div>
                        </Card>
    								</div>
    							</div>


    						</div>
    					</div>
    				</div>
    			</React.Fragment>
        );
      }
}

export default PurchaseOrderDetail;
