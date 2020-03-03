  import React, {Component} from 'react'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
  import axios from 'axios'
  import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
  import date from '../../../assets/img/brand/field_date@2x.png'

  class SalesOrderCreate extends Component{
      constructor(props){
          super(props)
          this.state ={
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
      
      render(){
          return(
            <Modal  isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }}toggle={true}>
                <ModalHeader style={{marginTop:"1%"}}>
                <div><label className="iconU-createModal"/><label className="font"><h2>Create Purchase Orders</h2></label></div>
                    <p color="primary" onClick={() => this.close()}>
                    <i className="iconU-close" aria-hidden="true" />
                    </p>
                </ModalHeader>
                <ModalHeader className="Tab" style={{marginTop:"-40px"}} >
                <div>
                    <div className="createdec">
                    Enter delivery and product details to create a new Purchase Orders
                    </div>
                    <div className="tabs font">
                        <div style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab1 " }>
                            <img className="numberimg" style={{width:"9%"}}/>  Order & Product Details
                        </div>
                        <div  style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab2 tab-review "}>
                            <img className="numberimg " style={{width:"22%"}} /> Review
                        </div>
                    </div>
                </div>
                </ModalHeader>       
            
            <ModalBody className="bodycontent" style={{width:"100%"}}>
              {/* {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()} */}
            </ModalBody>
              {/* {this.state.tab2isactive ? 
                this.submit() :  
                <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
              }       */}
          </Modal>
          )
      }

  } export default SalesOrderCreate