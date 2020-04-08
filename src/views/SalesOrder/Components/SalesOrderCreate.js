
import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './SalesOrderCreate.css'
import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
import Tab1CreateSO from './Tab/Tab1CreateSO'
import Tab2CreateSO from './Tab/Tab2CreateSO'
import axios from 'axios'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import Authentication from '../../../Auth/Authentication';
import {headerValidation,lineDetailValidation} from '../Components/Validation/Validation'


class SalesOrderCreate extends Component{
    constructor(props){
        super(props)
        this.state ={
          tab1isactive:true,
          tab2isactive:false,
          parameters:{
          header: {
            company             : Authentication.getCompanyCode(),            
            site                : null,  
            siteVal             : null,
            client              : Authentication.getClient(),       
            orderId             : null,
            customerOrderRef    : null,
            vendorOrderRef      : null,
            orderType           : null,
            orderTypeVal        : null,
            deliveryDate        : null,
            customer            : this.props.resources.identity ? this.props.resources.identity[0].name : null,
            customerVal         : this.props.resources.identity ? this.props.resources.identity[0].customer_no : null,
            shipToAddress1      : this.props.resources.identity ? this.props.resources.identity[0].address_1 : null,
            shipToAddress2      : this.props.resources.identity ? this.props.resources.identity[0].address_2 : null,
            shipToAddress3      : this.props.resources.identity ? this.props.resources.identity[0].address_3 : null,
            shipToAddress4      : this.props.resources.identity ? this.props.resources.identity[0].address_4 : null,
            shipToAddress5      : this.props.resources.identity ? this.props.resources.identity[0].address_5 : null,
            city                : this.props.resources.identity ? this.props.resources.identity[0].city : null,
            postCode            : this.props.resources.identity ? this.props.resources.identity[0].postcode : null,
            state               : this.props.resources.identity ? this.props.resources.identity[0].state : null,
            country             : this.props.resources.identity ? this.props.resources.identity[0].country : null, 
            deliveryInstruction : null,
          },
          lineDetail: [
            {
              number           : 1,
              productVal       : null,
              product          : null,
              qty              : null,
              weight           : null,
              uom              : null,
              rotaDate         : null,
              batch            : null,              
              ref3             : null,
              ref4             : null,
              dispositionVal   : null,
              disposition      : null,
              packId           : null,
            }
          ],
        },
        identity:[],
        uomdata:[],        
        }
    }

    close = () => {
      this.props.closemodal()
    }

    tabhandler = () => {
      let a = headerValidation(this.state.parameters.header)  
      if(a){
        let b = lineDetailValidation(this.state.parameters.lineDetail[0])
        if(b)
        {
          this.setState({
            tab1isactive:!this.state.tab1isactive,
            tab2isactive:!this.state.tab2isactive
            })
        }
      }
    }

    // Set Site
    setSite = (siteVal,site) => {
      this.setState(prevState => ({
        parameters: {
          ...prevState.parameters,
            header:{
              ...prevState.parameters.header,            
              siteVal : siteVal,  
              site    : site
          }
        }
      }))
    }

    // Set Client
    setClient = (data) => {
      this.setState(prevState => ({
        parameters: {
          ...prevState.parameters,
            header:{
              ...prevState.parameters.header,            
              client : data,  
          }
        }
      }))
    }

    // Set Order Type
    setOrderType = (orderTypeVal, orderType) => {
      this.setState(prevState => ({
        parameters: {
          ...prevState.parameters,
            header:{
              ...prevState.parameters.header,            
              orderType     : orderType,  
              orderTypeVal  : orderTypeVal
          }
        }
      }))
    }

    // Set Order No
    setOrderId = (data) => {
      this.setState(prevState => ({
        parameters: {
          ...prevState.parameters,
            header:{
              ...prevState.parameters.header,            
              orderId : data,  
          }
        }
      }))
    }

    // Set Delivery Date
    setDeliveryDate = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            deliveryDate: data
          }
        }
      }))
    }

    // Set Customer Order Ref
    setCustomerOrderRef = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            customerOrderRef:data
          }
        }
      }))
    }

    // Set Vendor Order Ref
    setVendorOrderRef = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            vendorOrderRef:data
          }
        }
      }))
    }

    // Set Delivery Instruction
    setDeliveryInstruction = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            deliveryInstruction:data
          }
        }
      }))
    }

    // Set Customer
    setCustomer = (customerVal, customer) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            customer    : customer,
            customerVal : customerVal
          }
        }
      }))
    }

    // Set Address 1
    setAddress1 = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            shipToAddress1:data
          }
        }
      }))
    }

    // Set Address 2
    setAddress2 = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            shipToAddress2:data
          }
        }
      }))
    }

    // Set Address 3
    setAddress3 = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            shipToAddress3:data
          }
        }
      }))
    }

    // Set Address 4
    setAddress4 = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            shipToAddress4:data
          }
        }
      }))
    }

    // Set Address 5
    setAddress5 = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            shipToAddress5:data
          }
        }
      }))
    }

    // Set City
    setCity = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            city:data
          }
        }
      }))
    }

    // Set Post Code
    setPostCode = (data) => {
      this.setState(prevState => ({
        parameters:{
            ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            postCode: data
          }
        }
      }))
    }

    //  Set State
    setStates = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            state:data
          }
        }
      }))
    }

    setCountry = (data) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          header:{
            ...prevState.parameters.header,
            country:data
          }
        }
      }))
    }

    getIdentity = (customerVal) => {
      let param = '?client='+Authentication.getClient()+'&&customerNo='+customerVal
      let self = this
      axios.get(endpoint.getSoIdentity+param,{
        headers:headers
      })
      .then(res => {
        const result = res.data.identity[0]
        let nm = result.name
          self.setState(prevState => ({
            parameters:{
              ...prevState.parameters,
              header:{
                ...prevState.parameters.header,
                customer            : nm,
                customerVal         : result.customer_no,
                shipToAddress1      : result.address_1,
                shipToAddress2      : result.address_2,
                shipToAddress3      : result.address_3,
                shipToAddress4      : result.address_4,
                shipToAddress5      : result.address_5,
                city                : result.city,
                postCode            : result.postcode,
                state               : result.state,
                country             : result.country, 
              }
            }
          }))
      }).catch(error => {
        // this.props.history.push("/logins")
        console.log(error);
      })
    }

    getUom = (productVal) => {

      if(productVal == '' || !productVal) return
      let param = '?client='+Authentication.getClient()+'&&product='+productVal
      axios.get(endpoint.getUom+param, 
        {
          headers:headers
        })
      .then(res => {
        let result = res.data.uom
        this.setState({uomdata:result})
      })
      .catch(error => {
        console.log(error)
      })
    }

    setProduct = (productVal, product) => {
      let newParam                  = {...this.state.parameters}
      newParam.lineDetail[0].product   = product
      newParam.lineDetail[0].productVal   = productVal

      this.setState({parameters:newParam})
      this.getUom(productVal)
    }

    setQty = (qty) => {
      let newParam                        = {...this.state.parameters}
      newParam.lineDetail[0].qty          = qty

      this.setState({parameters:newParam})
    }

    setWeight = (weight) => {
      let newParam                    = {...this.state.parameters}
      newParam.lineDetail[0].weight   = weight

      this.setState({parameters:newParam})
    }

    setUom = (uom) => {
      let newParam                  = {...this.state.parameters}
      newParam.lineDetail[0].uom    = uom

      this.setState({parameters:newParam})
    }

    setRotaDate = (rotaDate) => {
      let newParam                      = {...this.state.parameters}
      newParam.lineDetail[0].rotaDate   = rotaDate

      this.setState({parameters:newParam})
    }

    setBatch = (batch) => {
      let newParam                  = {...this.state.parameters}
      newParam.lineDetail[0].batch   = batch

      this.setState({parameters:newParam})
    }

    setRef3 = (ref3) => {
      let newParam                  = {...this.state.parameters}
      newParam.lineDetail[0].ref3   = ref3

      this.setState({parameters:newParam})
    }

    setRef4 = (ref4) => {
      let newParam                  = {...this.state.parameters}
      newParam.lineDetail[0].ref4   = ref4

      this.setState({parameters:newParam})
    }

    setDispoisition = (dispositionVal, disposition) => {

      let newParam                          = {...this.state.parameters}
      newParam.lineDetail[0].disposition    = disposition
      newParam.lineDetail[0].dispositionVal = dispositionVal

      this.setState({parameters:newParam})

    }

    setPackid = (packId) => {
      this.setState(prevState => ({
        parameters:{
          ...prevState.parameters,
          lineDetail:{
            ...prevState.parameters.lineDetail,
            packId:packId
          }
        }
      }))
    }

    createSalesOrder = () => {
      let parameters = this.state.parameters
      console.log(parameters)
      axios.post(endpoint.salesOrderCreate, parameters, {
        headers:headers
      })
      .then(res => {
        alert('sales order created successfully')
      })
      .catch(error => {
        alert('failed to create sales order')
      })
    }

    render(){
        return(
          <Modal className="SOCreate " isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }}toggle={true}>
            <div className="createModals">
              <ModalHeader style={{marginTop:"1%"}}>
                <div  style={{display:"inline flex", marginLeft:"30px"}} ><label className="iconU-createModal"/><label className="font"><h2>Create Sales Order</h2></label></div>
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
            {this.state.tab1isactive ?  <Tab1CreateSO   productdata             = {this.props.productdata}
                                                        dispositiondata         = {this.props.dispositiondata}
                                                        resources               = {this.props.resources} 
                                                        parameters              = {this.state.parameters} 
                                                        tabhandler              = {() => this.tabhandler()}
                                                        tab1IsActive            = {this.state.tab1isactive}

                                                        getIdentity             = {(customerVal) => this.getIdentity(customerVal)}
                                                        getUom                  = {(productVal) => this.getUom(productVal)}
                                                        uomdata                 = {this.state.uomdata}

                                                        setSite                 = {(siteVal, site) => this.setSite(siteVal, site)}
                                                        setClient               = {(clientVal, client) => this.setClient(clientVal,client)}
                                                        setOrderType            = {(orderTypeVal, orderType) => this.setOrderType(orderTypeVal, orderType)}

                                                        setOrderId              = {(data) => this.setOrderId(data)}

                                                        setDeliveryDate         = {(data) => this.setDeliveryDate(data)}
                                                        setCustomerOrderRef     = {(data) => this.setCustomerOrderRef(data)}
                                                        setVendorOrderRef       = {(data) => this.setVendorOrderRef(data)}
                                                        
                                                        setDeliveryInstruction  = {(data) => this.setDeliveryInstruction(data)}

                                                        setCustomer             = {(customerVal, customer) => this.setCustomer(customerVal, customer)}
                                                        setAddress1             = {(data) => this.setAddress1(data)}
                                                        setAddress2             = {(data) => this.setAddress2(data)}
                                                        setAddress3             = {(data) => this.setAddress3(data)}

                                                        setAddress4             = {(data) => this.setAddress4(data)}
                                                        setAddress5             = {(data) => this.setAddress5(data)}

                                                        setCity                 = {(data) => this.setCity(data)}
                                                        setPostCode             = {(data) => this.setPostCode(data)}
                                                        setStates               = {(data) => this.setStates(data)}
                                                        setCountry              = {(data) => this.setCountry(data)}

                                                        setProduct              = {(productVal, product) => this.setProduct(productVal,product)}
                                                        setQty                  = {(qty) => this.setQty(qty)}
                                                        setWeight               = {(weight) => this.setWeight(weight)}
                                                        setUom                  = {(uom) => this.setUom(uom)}
                                                        setRotaDate             = {(rotaDate) => this.setRotaDate(rotaDate)}
                                                        setBatch                = {(batch) => this.setBatch(batch)}
                                                        setRef3                 = {(ref3) => this.setRef3(ref3)}
                                                        setRef4                 = {(ref4) => this.setRef4(ref4)}
                                                        setDispoisition         = {(dispositionVal, disposition) => this.setDispoisition(dispositionVal, disposition)}
                                                        setPackid               = {(packid) => this.setPackid(packid)}


                                                        validation              = {() => this.validation()}
                                                        
                                                        /> :
                                        <Tab2CreateSO   parameters          = {this.state.parameters} 
                                                        close               = {() => this.close()} 
                                                        tabhandler          = {() => this.tabhandler()} 
                                                        createSalesOrder    = {() => this.createSalesOrder()}
                                                        />}
          </ModalBody>
            </div>
        </Modal>
        )
    }

} export default SalesOrderCreate