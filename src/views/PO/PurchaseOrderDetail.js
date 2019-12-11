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
    					<div className="row">
    						<div className="col-12 p-0">
    							<div className="row mb-0 p-0">
    								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <Card className="form-group row rounded-top-05 mb-0 border-0">
                          <div className="col-12 pb-2 pt-3 pl-3">
                            <div className="row">
                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Product</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text">dasd</label>
                              </div>

                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Stock On Hand</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text">asdasd</label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Description</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text">asdasdasd</label>
                              </div>

                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Allocated Qty</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text"></label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <label className="font-weight-bold primary-text">UoM</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text">asdasd</label>
                              </div>

                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Available Qty</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text"></label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <label className="font-weight-bold primary-text">Rotadate Type</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text"></label>
                              </div>

                              <div className="col-3">
                                <label className="font-weight-bold primary-text">On Purchase Qty</label>
                              </div>
                              <div className="col-3">
                                <label className="secondary-text"></label>
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
