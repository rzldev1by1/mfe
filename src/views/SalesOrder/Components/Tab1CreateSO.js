import React,{Component} from 'react'
import Dropdown from '../../../AppComponent/Dropdown'
import date from '../../../assets/img/brand/field_date@2x.png'
import DatePicker from '../../../AppComponent/DatePicker'
import axios from 'axios'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Authentication from '../../../Auth/Authentication';

class Tab1CreateSO extends Component{
    constructor(props){
        super(props)
        this.state ={
            tab1isactive:true,
            tab2isactive:false,
            company:Authentication.getCompanyCode(),
            client:Authentication.getClient(),
            site:null,
            orderId:null,
            customerPoNo:null,
            vendorOrderNo:null,
            customer:null,
            orderType:null,
            deliveryDate:null,
            firstDelivery:null,
            lastDelivery:null,
            shipToName:null,
            shipToAddress1:null,
            shipToAddress2:null,
            shipToAddress3:null,
            shipToAddress4:null,
            shipToAddress5:null,
            city:null,
            postCode:null,
            state:null,
            country:null,
            deliveryInstruction:null,
            rowlist:[1],
            header: [],
            parameters:[],

            supplierName : [],
            supplierVal  : [],
            
            siteName     : [],
            siteVal      : [],
            
            orderTypeName: [],
            orderTypeVal : [],
        }
    }


    getSiteSelected = (value) => {
      this.setState({siteSelected: value});
    }

    setCustomerPoNoHandler = (e) =>{
      let custPoNo = e.target.value
      this.setState({customerPoNo:custPoNo})
    }

    getsite = () => {         
      axios.get(endpoint.getSite, {
        headers: headers
      })
        .then(res => {
          const result = res.data
          this.setState({ sitedata:result })
        })
        .catch(error => {
          // this.props.history.push("/logins")
        })
    }

    setParametersHandler = () => {
      let rowList = []
      let rowlistLength = this.state.rowlist.length;

      // Order Details
      const{
        client,
        site,
        orderId,
        customerPoNo,
        vendorOrderNo,
        customer,
        orderType,
        deliveryDate,
        firstDelivery,
        lastDelivery,
        shipToName,
        shipToAddress1,
        shipToAddress2,
        shipToAddress3,
        shipToAddress4,
        shipToAddress5,
        city,
        postCode,
        state,
        country,
        deliveryInstruction,
      } = this.state

        if(client == null || client == '')
        {
          alert('client cannot be empty')
          return
        }
        if(site == null || site =='')
        {
          alert('site cannot be empty')
          return
        }
        if(orderType == null || orderType == '')
        {
          alert('orderType cannot be empty')
          return
        } 
        if(customerPoNo == null || customerPoNo == '')
        {
          alert('customer po number cannot be empty')
          return
        } 
        if(deliveryInstruction == null || deliveryInstruction == '')
        {
          alert('delivery insruction cannot be empty')
          return
        }  
        if(deliveryDate == null || deliveryDate == '')
        {
          alert('delivery date cannot be empty')
          return
        }
        if(shipToName == null || shipToName == '')
        {
          alert('Supplier cannot be empty')
          return
        }
        if(vendorOrderNo == null || vendorOrderNo == '')
        {
          alert('vendor Order No cannot be empty')
          return
        }      
        if(firstDelivery == null || firstDelivery == '')
        {
          alert('first delivery cannot be empty')
          return
        }
        if(lastDelivery == null || lastDelivery == '')
        {
          alert('last delivery cannot be empty')
          return
        }
        if(orderId == null || orderId == '')
        {
          alert('orderId cannot be empty')
          return
        }
        if(customer == null || customer == '')
        {
          alert('customer cannot be empty')
          return
        }
        if(shipToAddress1 == null || shipToAddress1 == '')
        {
          alert('Address 1 cannot be empty')
          return
        }
        if(shipToAddress2 == null || shipToAddress2 == '')
        {
          alert('Address 2 cannot be empty')
          return
        }
        if(shipToAddress3 == null || shipToAddress3 == '')
        {
          alert('Address 3 cannot be empty')
          return
        }
        if(shipToAddress4 == null || shipToAddress4 == '')
        {
          alert('Address 4 cannot be empty')
          return
        }
        if(shipToAddress5 == null || shipToAddress5 == '')
        {
          alert('Address5 cannot be empty')
          return
        }
        if(city == null || city == '')
        {
          alert('suburb cannot be empty')
          return
        }
        if(postCode == null || postCode == '')
        {
          alert('post code cannot be empty')
          return
        }
        if(state == null || state == '')
        {
          alert('state cannot be empty')
          return
        }
        if(country == null || country == '')
        {
          alert('country cannot be empty')
          return
        }
       

        for(let number = 1 ; number <= rowlistLength ; number++)
        {
          let product         = document.getElementById('product_'+number).value
          let qty             = document.getElementById('qty_'+number).value
          let weight          = document.getElementById('weight_'+number).value
          let uom             = document.getElementById('uom_'+number).value
          let rotaDate        = document.getElementById('rotaDate_'+number).value
          let batch           = document.getElementById('batch_'+number).value                
          let ref3            = document.getElementById('ref3_'+number).value
          let ref4            = document.getElementById('ref4_'+number).value
          let disposition     = document.getElementById('disposition_'+number).value
          let packId          = document.getElementById('packId_'+number).value
          if(product == '')
          {
            alert('product in line '+number + ' cannot be empty')
            break;
          }
          else if(qty == '' || qty == null)
          {
            alert('quantity in line '+number + ' cannot be empty')
            break;
          }
          else if(weight == '' || weight == null)
          {
            alert('weight in line '+number + ' cannot be empty')
            break;
          }
          else if(uom == '' || uom == null)
          {
            alert('uom in line '+number + ' cannot be empty')
            break;
          }
          else if(rotaDate == '' || rotaDate == null)
          {
            alert('rotadate in line '+number + ' cannot be empty')
            break;
          }
          else if(batch == '' || batch == null)
          {
            alert('batch in line '+number + ' cannot be empty')
            break;
          }
          else if(ref3 == '' || ref3 == null)
          {
            alert('ref3 in line '+number + ' cannot be empty')
            break;
          }
          else if(ref4 == '' || ref4 == null)
          {
            alert('ref4 in line '+number + ' cannot be empty')
            break;
          }
          else if(disposition == '' || disposition == null)
          {
            alert('disposition in line '+number + ' cannot be empty')
            break;
          }
          else if(packId == '' || packId == null)
          {
            alert('pack id in line '+number + ' cannot be empty')
            break;
          }

          let data = {
            product          : product,
            qty              : qty,
            weight           : weight,
            uom              : uom,
            rotaDate         : rotaDate,
            batch            : batch,              
            ref3             : ref3,
            ref4             : ref4,
            disposition      : disposition,
            packId           : packId,
          }
          rowList.push(data)
        }

        let param = {
          orderDetails:{
          client              : client,
          site                : site,
          orderId             : orderId,
          customerPoNo        : customerPoNo,
          vendorOrderNo       : vendorOrderNo,
          customer            : customer,
          orderType           : orderType ,
          deliveryDate        : deliveryDate,
          firstDelivery       : firstDelivery,
          lastDelivery        : lastDelivery,
          shipToName          : shipToName,
          shipToAddress1      : shipToAddress1,
          shipToAddress2      : shipToAddress2,
          shipToAddress3      : shipToAddress3,
          shipToAddress4      : shipToAddress4,
          shipToAddress5      : shipToAddress5,
          city                : city,
          postCode            : postCode,
          state               : state,
          country             : country,
          deliveryInstruction : deliveryInstruction,
        },
          orderLines:rowList
        }
        this.setState({parameters: param}, () => {this.tabhandler(this.state.parameters)})
      }

      store = () => {
        axios.post(endpoint.purchaseOrderCreate, this.state.parameters, { headers: headers,})
      .then(res =>{
        if(res.status === 200){
            this.props.history.push("salesorder/" + this.state.orderNo);
            }
      })
      .catch(error => {

      })
    }
    
    tabhandler= (parameters) => {
      this.props.tabhandler(parameters)
    }



    render= () => {
      console.log(this.props.resources)
      console.log(this.props.resources.supplier)
     
        return(
          <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
            <table className="createpotables">
                <tr>
                    <th className='required-field'>Site</th>
                    <th>Order Type</th>
                    <th>Customer PO No</th>
                    <th>Delivery Instructions</th>
                </tr>
                <tr>
                    <td><Dropdown getValue = {(val) => this.setState({site:val})} placeHolder="Site"  style={{minWidth: "100%", zIndex:"1"}} optionList={ this.props.resources.site.name} optionValue={ this.props.resources.site.code}/></td>
                    <td><Dropdown getValue = {(val) => this.setState({orderType:val})} placeHolder="Order Type" style={{minWidth: "100%"}} optionList={ this.props.resources.orderType.name} optionValue={ this.props.resources.orderType.code}/><input hidden id='orderType'/></td>
                    <td><input onChange={(e) => this.setState({customerPoNo:e.target.value})} id='customerPoNo' className="form-control put " placeholder="Customer PO No"/> </td>                 
                    <td rowspan="3"><textarea onChange={(e) => this.setState({deliveryInstruction:e.target.value})} id='deliveryInstruction' className="form-control put dlv" style={{height:"8em"}} placeholder="Delivery Instructions"/></td>
                </tr>
                <tr>
                    <th>Delivery Date</th>
                    <th>Supplier</th>
                    <th>Order No</th>
                </tr>
                <tr>
                <td><DatePicker getDate = {(date) => this.setState({deliveryDate:date})} style={{ minWidth: "100%" }}></DatePicker></td>  
                <td><Dropdown getValue = {(val) => this.setState({shipToName:val})} placeHolder="Order Type" style={{minWidth: "100%"}} optionList={ this.props.resources.supplier.name} optionValue={ this.props.resources.supplier.code}/><input hidden id='supplier'/></td>                
                <td><input onChange = {(e) => this.setState({vendorOrderNo:e.target.value})} maxLength="40" id='orderNo' className="form-control put " placeholder="Order No"/> </td>                  
                </tr>
                <tr>
                  <th>First Delivery</th>
                  <th>Last Delivery</th>
                  <th>Order Id</th>
                </tr>
                <tr>
                  <td><DatePicker getDate = {(date) => this.setState({firstDelivery:date})} style={{ minWidth: "100%" }}></DatePicker></td>
                  <td><DatePicker getDate = {(date) => this.setState({lastDelivery:date})} style={{ minWidth: "100%" }}></DatePicker></td>
                  <td><input onChange = {(e) => this.setState({orderId:e.target.value})} value={this.state.orderId} className="form-control put " placeholder="Order Id"/></td>
                </tr>
            </table>
            <tr style={{color:"transparent"}}>1</tr>
            <h3 className="fonts">Costumer</h3>
            <table className="createpotables">
                <tr>
                    <th>Costumer</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Address 3</th>
                </tr>
                <tr>
                    <td><input onChange={(e) => this.setState({customer:e.target.value})} id='customer' className="form-control put " placeholder="Costumer" value={this.props.resources.length > 0 ? this.props.resources.identity[0].name : null}/></td>
                    <td><input onChange={(e) => this.setState({shipToAddress1:e.target.value})} id='address1' maxLength="200" className="form-control put " placeholder="Address 1" value={this.props.resources.length > 0 ? this.props.resources.identity[0].address_1 : null}/> </td>
                    <td><input onChange={(e) => this.setState({shipToAddress2:e.target.value})} id='address2' maxLength="201" className="form-control put " placeholder="Address 2" value={this.props.resources.length > 0 ? this.props.resources.identity[0].address_2 : null}/> </td>
                    <td><input onChange={(e) => this.setState({shipToAddress3:e.target.value})} id='address3' maxLength="203" className="form-control put " placeholder="Address 3" value={this.props.resources.length > 0 ? this.props.resources.identity[0].address_3 : null}/> </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>
                    <th>Suburb</th>
                    <th>Postcode</th>
                </tr>
                <tr>
                    <td><input onChange={(e) => this.setState({shipToAddress4:e.target.value})} id='address4' maxLength="204" className="form-control put " placeholder="Address 4" value={this.props.resources.length > 0 ? this.props.resources.identity[0].address_4 : null}/></td>
                    <td><input onChange={(e) => this.setState({shipToAddress5:e.target.value})} id='address5' maxLength="205" className="form-control put " placeholder="Address 5" value={this.props.resources.length > 0 ? this.props.resources.identity[0].address_5 : null}/> </td>
                    <td><input onChange={(e) => this.setState({city:e.target.value})} id='suburb' maxLength="150" className="form-control put " placeholder="Suburb" value={this.props.resources.length > 0 ? this.props.resources.identity[0].city : null}/> </td>
                    <td><input onChange={(e) => this.setState({postCode:e.target.value})} id='postCode' maxLength="20" className="form-control put " placeholder="Postcode" value={this.props.resources.length > 0 ? this.props.resources.identity[0].postcode : null}/> </td>
                </tr>
                <tr>
                    <th>State</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td><input onChange={(e) => this.setState({state:e.target.value})}id='state' maxLength="150" className="form-control put " placeholder="State" value={this.props.resources.length > 0 ? this.props.resources.identity[0].state : null}/></td>
                    <td><input onChange={(e) => this.setState({country:e.target.value})} id='country' maxLength="30" className="form-control put " placeholder="Country" value={this.props.resources.length > 0 ? this.props.resources.identity[0].country : null}/></td>
                </tr>
            </table>
  
            <br/>
                <tr>
                  <td style={{color:"transparent"}}>1</td>
                </tr>
           
            <h3 className="fonts">Line Details</h3>
            <div className="line">
              <table className="lineTableDtl">
                  <tr>
                      <th style={{width:"2%", textAlign:"center"}}>#</th>
                      <th style={{width:"12%"}}>Product Entry</th>
                      <th style={{width:"12%"}}>Product Description</th>
                      <th style={{width:"4%"}}>Qty</th>
                      <th style={{width:"4%"}}>Weight</th>
                      <th style={{width:"4%"}}>UOM</th>
                      <th style={{width:"8%"}}>Rota Date</th>
                      <th style={{width:"6%"}}>Batch</th>
                      <th style={{width:"5%"}}>Ref3</th>
                      <th style={{width:"5%"}}>Ref4</th>
                      <th style={{width:"5%"}}>Disposition</th>
                      <th style={{width:"6.3%"}}>Pack Id</th> 
                  </tr>                             
                </table>
              </div>
                <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )} style={{width:"98%"}}>
                  {this.state.rowlist.map((number) => this.linedetailsrow(number))}
                </div>
                  <button onClick={() => this.addline()} type="button" class="btn btn-light font addline">+ Add Line</button>
  
                  {this.state.tab2isactive ? 
                  this.submit() :  
                  <Button onClick={() => this.setParametersHandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
                } 
         
          </div>
        )
      }

      setRotadateHandler = (date, number) => {
        if(document.getElementById('rotaDate_'+number).value.length <=1)
          document.getElementById('rotaDate_'+number).value = date
      }
      
      deletelinehandler = (number) => {
        let updated = this.state.rowlist.length
        alert(number)
        if(updated > 1)
        {
          let line = document.getElementById('tr_Id'+number)
          line.parentNode.removeChild(line)
 
        }else{
          alert("cant delete row")
        }
      }
  
      addline = () => {
        let number = this.state.rowlist.length +1
        this.setState({rowlist: this.state.rowlist.concat(number)
        })
      }
      

      linedetailsrow = (number) => {
        return(
          <table>
            <tr id={'trId_'+number}>
                <td hidden id={number} ></td>
                <td style={{width:"2%", textAlign:"center"}}><input id={'number_'+number} className="form-control inputs " value={number} readOnly/></td>
                <td style={{width:"12%"}}><input id={'product_'+number} className="form-control inputs " placeholder="Product"/></td>
                <td style={{width:"12%"}}><input id={'productDesc_'+number} className="form-control inputs " placeholder="Product Description"/></td>
                <td style={{width:"4%"}}><input type='number' id={'qty_'+number} className="form-control inputs " placeholder="Qty"/></td>
                <td style={{width:"4%"}}><input id={'weight_'+number} className="form-control inputs " placeholder="Weight"/></td>
                <td style={{width:"4%"}}>
                    <select id={'uom_'+number} className="form-control selectinput ">
                      <option className="" selected disabled>UOM</option>
                      <option>each</option>
                      <option>pallet</option>
                    </select>
                </td>
                <td style={{width:"4.5%"}}>
                <td><DatePicker  getDate={(day) => this.setRotadateHandler(day, number) } style={{ minWidth: "115%" }}></DatePicker> <input value={0} hidden id={'rotaDate_'+number}/></td>  
                </td>
                <td style={{width:"6%"}}><input id={'batch_'+number} className="form-control inputs " placeholder="Batch"/></td>
                <td style={{width:"5%"}}><input id={'ref3_'+number} className="form-control inputs " placeholder="Ref3"/></td>
                <td style={{width:"5%"}}><input id={'ref4_'+number} className="form-control inputs " placeholder="Ref4"/></td>
                <td style={{width:"6%"}}><input id={'disposition_'+number} value={'Q'} maxLength='1' className="form-control inputs " placeholder="Disposition"/></td>
                <td style={{width:"6%"}}><input id={'packId_'+number} className="form-control inputs " placeholder="Pack ID"/></td>
                <td id={number} onClick={() => this.deletelinehandler(number)} style={{width:"1.5%"}}><div className="iconU-delete"/></td>
              </tr>
              <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}</td>
          </table>
        )
      }
  


}

Tab1CreateSO.defaultProps = {
  resources:[]
};

export default Tab1CreateSO