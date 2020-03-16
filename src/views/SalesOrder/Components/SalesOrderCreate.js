  import React, {Component} from 'react'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
  import './SalesOrderCreate.css'
  import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
  import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
  import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
  import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
  import Tab1CreateSO from './Tab1CreateSO'
  import Tab2CreateSO from './Tab2CreateSO'
  import axios from 'axios'
  import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
  import date from '../../../assets/img/brand/field_date@2x.png'

  class SalesOrderCreate extends Component{
      constructor(props){
          super(props)
          this.state ={
            tab1isactive:true,
            tab2isactive:false,
              order : {
                  site : null,
                  orderType : null,
                  customerNo : null,
                  deliveryDate : null,
                  orderNo : null,
                  vendorNo : null,
                  deliveryInst : null             
            },
              customer : {
                  customerName : null,
                  address1 :null,
                  address2 :null,
                  address3 :null,
                  address4 :null,
                  address5 :null,
                  suburb : null,
                  postCode : null,
                  state : null,
                  country : null
            },
              linerows :[
               {
                  product : null,
                  productDec : null,
                  qyt : null,
                  weight : null,
                  uom : null,
                  rotadate : null,
                  batch : null,
                  ref3 : null,
                  ref4 : null,
                  disposittion : null,
                  packId : null
              }
            ]
          }
      }
      close = () => {
        this.props.closemodal()
        // this.setState({
        //   tab1isactive:true,
        //   tab2isactive:false
        //   })
      }
      tabhandler = () => {
        this.setState({
          tab1isactive:!this.state.tab1isactive,
          tab2isactive:!this.state.tab2isactive
          })
      }
      
      render(){
          return(
            <Modal isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }}toggle={true}>
              <div className="createModals">
                <ModalHeader style={{marginTop:"1%"}}>
                  <div  style={{display:"inline flex", marginLeft:"32px"}} ><label className="iconU-createModal"/><label className="font"><h2>Create Sales Order</h2></label></div>
                    <p color="primary" onClick={() => this.close()}>
                      <i className="iconU-close"  style={{fontSize:"1.6em" , marginLeft:"-3em"}} aria-hidden="true" />
                    </p>
                </ModalHeader>

                <ModalHeader className="clickTabs" style={{marginTop:"-40px"}} >
                  <div>
                    <div className="createdecs">Enter delivery and product details to create a new Sales Order</div>
                      <div className="tabs font">
                          <div style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab1 "  + (this.state.tab1isactive ? "isactivefont" : null) }>
                              <img className="numberimg" style={{width:"9%"}} src={this.state.tab1isactive ? oneactive : oneinactive} />  Order & Product Details
                          </div>
                          <div  style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab2 tab-review " + (this.state.tab2isactive ? "isactivefont" : null)}>
                              <img className="numberimg " style={{width:"22%"}} src={this.state.tab1isactive ?  twoinactive :  twoactive } /> Review
                          </div>
                      </div>
                  </div>
                </ModalHeader>       
            
            <ModalBody style={{width:"100%"}}>
              {this.state.tab1isactive ? <Tab1CreateSO/> : <Tab2CreateSO/>}
            </ModalBody>
              {/* {this.state.tab2isactive ? 
                this.submit() :  
                <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
              }       */}
              </div>
          </Modal>
          )
      }

  } export default SalesOrderCreate