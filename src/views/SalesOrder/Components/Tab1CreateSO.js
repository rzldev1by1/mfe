import React,{Component} from 'react'
import Dropdown from '../../../AppComponent/Dropdown'
import date from '../../../assets/img/brand/field_date@2x.png'
import DatePicker from '../../../AppComponent/DatePicker'
import axios from 'axios'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Tab1CreateSO extends Component{
    constructor(props){
        super(props)
        this.state ={
            tab1isactive:true,
            tab2isactive:false,
            order:{
              site:null,
              orderno:null,
              supplier:null,
              orderref:null,
              client:null,
              orderdate:null,
              rotedate:null,
              ordertype:null,
              vendorref:null,
            },
            rowlist:[
              {
                id:1,
                productEntry:null,
                productDes:null,
                uom:null,
                qty:null,
                rodaDate:null,
                batch:null,
                ref3:null,
                ref4:null,
                disposition:null,

                siteSelected: undefined,

                rowlistidx: 1,

              }
            ],
        }
    }


    getSiteSelected = (value) => {
      this.setState({siteSelected: value});
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
    tabhandler= () => {
      this.props.tabhandler()
    }

    render= () => {
      let clientName = [];
      let clientValue = [];
      let siteData = [];
      if(this.state.clientdatacr){
          this.state.clientdatacr.map((data) => {
              clientName.push(data.name);
              clientValue.push(data.code);
          })
      }
      if(this.state.sitedata){
          this.state.sitedata.map((data) => {
              siteData.push(data.site);
          })
      }
        return(
          <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
            <table className="createpotables">
                <tr>
                    <th>Site</th>
                    <th>Order Type</th>
                    <th>Customer PO No</th>
                    <th>Delivery Instructions</th>
                </tr>
                <tr>
                <td><Dropdown placeHolder="Site"  style={{minWidth: "100%", zIndex:"1"}} optionList="M,S" optionValue="M,S" getValue={(v)=>console.log(v)}/></td>
                    <td><Dropdown placeHolder="Order Type" style={{minWidth: "100%"}} optionList="Type 1,Type 2" optionValue="Type 1,Type 2" getValue={(v)=>console.log(v)}/> </td>
                    <td><input className="form-control put " placeholder="Customer PO No"/> </td>                 
                    <td rowspan="3"><textarea className="form-control put dlv" style={{height:"8em"}} placeholder="Delivery Instructions"/></td>
                </tr>
                <tr>
                    <th>Delivery Date</th>
                    <th>Order Type</th>
                    <th>Order No</th>
                </tr>
                <tr>
                <td><DatePicker style={{ minWidth: "100%" }}></DatePicker></td>  
                <td><input className="form-control put " placeholder="Supplier"/> </td>
                <td><input className="form-control put " placeholder="Order No"/> </td>                  
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
                    <td><input className="form-control put " placeholder="Costumer"/></td>
                    <td><input className="form-control put " placeholder="Address 1"/> </td>
                    <td><input className="form-control put " placeholder="Address 2"/> </td>
                    <td><input className="form-control put " placeholder="Address 3"/> </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>
                    <th>Suburb</th>
                    <th>Postcode</th>
                </tr>
                <tr>
                    <td><input className="form-control put " placeholder="Address 4"/></td>
                    <td><input className="form-control put " placeholder="Address 5"/> </td>
                    <td><input className="form-control put " placeholder="Suburb"/> </td>
                    <td><input className="form-control put " placeholder="Postcode"/> </td>
                </tr>
                <tr>
                    <th>State</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td><input className="form-control put " placeholder="State"/></td>
                    <td><input className="form-control put " placeholder="Country"/> </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
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
                  {this.state.rowlist.map((list, i) => this.linedetailsrow(list, i))}
                </div>
                  <button onClick={() => this.addline()} type="button" class="btn btn-light font addline">+ Add Line</button>
  
                  {this.state.tab2isactive ? 
                  this.submit() :  
                  <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
                } 
                  {
        console.log(this.state.rowlist)}
         
          </div>
        )
      }
      
      deletelinehandler = (e) => {
        let updated = this.state.rowlist.length
        
        // Jika Jumlah produk Entry Lebih dari satu
        if( updated >1){
          let id = e.currentTarget.id;
          for(let i = 0; i < updated; i++){
              if(this.state.rowlist[i].id == id){
                this.state.rowlist.splice(i, 1);
                this.setState({rowlist: this.state.rowlist})
                this.state.rowlistidx -= 1;
                let lengthRowlist = this.state.rowlist.length;
                if(i < lengthRowlist){
                  for(let x = i; x < lengthRowlist; x++){
                    this.state.rowlist[x].id -= 1;
                  }
                  this.setState({rowlist: this.state.rowlist})
                }
                break;
              }
          }
          // this.state.rowlist.map((rowlist, idx) => {
          //   if (rowlist.id == id) {
          //       this.state.rowlistidx -= 1;
          //       this.state.rowlist.splice(idx, 1);
          //       this.setState({rowlist: this.state.rowlist})
          //   }
          // })
          updated = this.state.rowlist.length
        }else{
          alert("cant delete row")
        }
      }
  
      addline = () => {
        this.state.rowlistidx += 1;
        this.setState({rowlist: this.state.rowlist.concat(
          {
            id:this.state.rowlistidx,
            productEntry:null,
            productDes:null,
            uom:null,
            qty:null,
            rodaDate:null,
            batch:null,
            ref3:null,
            ref4:null,
            disposition:null
          }
        )})
      }
      

      linedetailsrow = (list, id,) => {
        return(
          <table>
            <tr>
                <td hidden id={list.id} ></td>
                <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs " value={list.id} readOnly/></td>
                <td style={{width:"12%"}}><input className="form-control inputs " placeholder="Product"/></td>
                <td style={{width:"12%"}}><input className="form-control inputs " placeholder="Product Description"/></td>
                <td style={{width:"4%"}}><input className="form-control inputs " placeholder="Qty"/></td>
                <td style={{width:"4%"}}><input className="form-control inputs " placeholder="Weight"/></td>
                <td style={{width:"4%"}}>
                    <select className="form-control selectinput ">
                      <option className="" selected disabled>UOM</option>
                      <option>each</option>
                      <option>pallet</option>
                    </select>
                </td>
                <td style={{width:"4.5%"}}>
                <td><DatePicker style={{ minWidth: "115%" }}></DatePicker></td>  
                </td>
                <td style={{width:"6%"}}><input className="form-control inputs " placeholder="Batch"/></td>
                <td style={{width:"5%"}}><input className="form-control inputs " placeholder="Ref3"/></td>
                <td style={{width:"5%"}}><input className="form-control inputs " placeholder="Ref4"/></td>
                <td style={{width:"6%"}}><input className="form-control inputs " placeholder="Disposition"/></td>
                <td style={{width:"6%"}}><input className="form-control inputs " placeholder="Pack ID"/></td>
                <td id={list.id} onClick={(e) => this.deletelinehandler(e)} style={{width:"1.5%"}}><div className="iconU-delete"/></td>
              </tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}</td>
          </table>
        )
      }
  


} export default Tab1CreateSO