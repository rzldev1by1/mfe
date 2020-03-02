  import React, {Component} from 'react'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
  // import DatePicker from './DatePicker'
  import axios from 'axios'
  import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
  import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
  import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
  import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
  import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
  import date from '../../../assets/img/brand/field_date@2x.png'
  import DayPicker from 'react-day-picker';
  import './Style/PurchaseOrderCreate.css'
  import 'react-day-picker/lib/style.css';

  import Dropdown from '../../../AppComponent/Dropdown'
  import DatePicker from '../../../AppComponent/DatePicker'

  class PurchaseOrderCreate extends Component{
      constructor(props){
          super(props)
          this.state = {
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
                disposition:null
              }
            ],

            rowlistidx: 1,

            data:[
              {
                "menu":"Client",
                "subMenu":["asd","asds"]
              }
            ],

            showdatepicker:false,
            showdaterote:false,

            //dropdown
            sitecrSelected: undefined,
            clientcrSelected: undefined,
            orderTypecrSelected: undefined,
            uomSelected:"UOM",

            clientExpand:false,
            orderTypeExpand:false,
            uomExpand:false,
            clientdatacr: [],
            sitedatacr: []
            }
      }

      componentDidMount = () => {
        this.getclient();
        this.getsite();
      }

      close = () => {
        this.props.closemodal()
        this.setState({
          tab1isactive:true,
          tab2isactive:false
          })
      }

      tabhandler = () => {
        this.setState({
          tab1isactive:!this.state.tab1isactive,
          tab2isactive:!this.state.tab2isactive
          })
      }

      datePickerHandler = (day) => {
        this.setState({showdatepicker:!this.state.showdatepicker})
        this.setState({orderdate:day})
      }
      datePickerRote = (day) => {
        this.setState({showdaterote:!this.state.showdaterote})
        this.setState({rotedate:day})
      }

      getclient = () => {
        axios.get(endpoint.getClient, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ clientdatacr:result })
          })
          .catch(error => {
            // this.props.history.push("/logins")
            console.log(error);
          })
    }

      getsite = () => {         
        axios.get(endpoint.getSite, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ sitedatacr:result })
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
      }

      getSiteSelected = (value) => {
        this.setState({sitecrSelected: value});
      }

      getClientSelected = (value) => {
        this.setState({clientcrSelected: value});
      }

      getOrderTypeSelected = (value) => {
        this.setState({orderTypecrSelected: value});
      }
      
    tab1Content = () => {
      let clientName = [];
      let clientValue = [];
      let siteData = [];
      if(this.state.clientdatacr){
          this.state.clientdatacr.map((data) => {
              clientName.push(data.name);
              clientValue.push(data.code);
          })
      }
      if(this.state.sitedatacr){
          this.state.sitedatacr.map((data) => {
              siteData.push(data.site);
          })
      }
      return(
        <div className="tabcontent">
          <h3 className="fonts">Order Details</h3>
          <table className="createpotable">
              <tr>
                  <th>Site</th>
                  <th>Client</th>
                  <th>Supplier</th>
                  <th>Customer Order Ref</th>
              </tr>
              <tr>
                  <td><input className="form-control put pec" placeholder="Site"/></td>
                  <td><input className="form-control put pec" placeholder="Client"/> </td>
                  {/* <td><Dropdown placeHolder="Site"  style={{minWidth: "100%",width: "1px"}} optionList={siteData.toString()} optionValue={siteData.toString()} getValue={this.getSiteSelected}/></td>
                  <td><Dropdown placeHolder="Client" style={{minWidth: "100%"}} optionList={clientName.toString()} optionValue={clientValue.toString()} getValue={this.getClientSelected}/></td> */}
                  <td><input className="form-control put pec" placeholder="Supplier"/> </td>
                  <td><input className="form-control put pec" placeholder="Customer Order Ref"/> </td>
              </tr>
              <tr>
                <td style={{color:"transparent"}}>1</td>
              </tr>
              <tr>
                  <th>Order Type</th>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th>Vendor Order Ref</th>
              </tr>
              <tr>
              <td>
                <Dropdown placeHolder="Order Type" style={{minWidth: "100%"}} optionList="Type 1,Type 2" optionValue="Type 1,Type 2" getValue={this.getOrderTypeSelected}/>
              </td>
              <td><input className="form-control put pec" placeholder="Order No"/> </td>
                  <td>
                    <div className="inputDate ">
                      <input className="form2 pec" placeholder="Order Date" value={this.state.orderdate}/>
                      {/* <input className="form-control withIcon" value={this.state.orderdate}/> */}
                      <img onClick={() => this.datePickerHandler()} className="dateimg" src={date}/>
                    </div>
                  </td>                  
                  <td><input className="form-control put pec"  placeholder="Vendor Order Ref"/> </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                {/* {this.state.showdatepicker ? <DatePicker getChosenDay={(day) => this.datePickerHandler(day)}/> : null} */}
                </td>
                <td></td>
              </tr>
          </table>

          <br/>
              <tr>
                <td style={{color:"transparent"}}>1</td>
              </tr>
         
          <h3 className="fonts">Line Details</h3>
          <div className="line">
            <table className="tabledetails">
                <tr>
                    <th style={{width:"2%", textAlign:"center"}}>#</th>
                    <th style={{width:"12%"}}>Product Entry</th>
                    <th style={{width:"12%"}}>Product Description</th>
                    <th style={{width:"3%"}}>Qty</th>
                    <th style={{width:"6%"}}>UOM</th>
                    <th style={{width:"6%"}}>Rota Date</th>
                    <th style={{width:"6%"}}>Batch</th>
                    <th style={{width:"5%"}}>Ref3</th>
                    <th style={{width:"5%"}}>Ref4</th>
                    <th style={{width:"6%"}}>Disposition</th>
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

    tab2Content = () => {
      return(
        <div className="tabcontent fades">
          <h3 className="fonts">Order Details</h3>

          <table className="createpotable">
              <tr>
                  <th>Site</th>
                  <th>Order No</th>
                  <th>Supplier</th>
                  <th>Customer Order Ref</th>
              </tr>
              <tr>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
              </tr>

              <tr>
                  <th>Client</th>
                  <th>Order Date</th>
                  <th>Order Type</th>
                  <th>Client Order Ref</th>
              </tr>
              <tr>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
              </tr>              
          </table>

          <br/>
          <h3 className="fonts">Line Details</h3>

          <table className="tabledetails">
              <tr >
                  <th style={{width:"2%", textAlign:"center"}}>#</th>
                  <th style={{width:"12%"}}>Product Entry</th>
                  <th style={{width:"12%"}}>Product Description</th>
                  <th style={{width:"3%"}}>Qty</th>
                  <th style={{width:"6%"}}>UOM</th>
                  <th style={{width:"6%"}}>Rota Date</th>
                  <th style={{width:"6%"}}>Batch</th>
                  <th style={{width:"5%"}}>Ref3</th>
                  <th style={{width:"5%"}}>Ref4</th>
                  <th style={{width:"6%"}}>Disposition</th>
              </tr>                  
            </table>
            
            <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )} style={{width:"98%"}} >
              {this.state.rowlist.map((list, i) => this.linedetailsrowreview(list, i))}
            </div>
            <tr>
                <td style={{color:"transparent"}}>1</td>
              </tr>
            <div style={{marginTop:"7%"}}>
            {this.state.tab2isactive ? 
                this.submit() :  
                <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ></Button>
              } 
            </div>
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

    selectedValue = (id, value) => {
      if(id == "Saya")
      {
          this.setState({client:value})
      }
  }

    linedetailsrow = (list, i) => {
      return(
        <table>
          <tr>
              <td hidden id={list.id} ></td>
              <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs pec" value={list.id}/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product"/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product Description"/></td>
              <td style={{width:"3%"}}><input className="form-control inputs pec" placeholder="Qty"/></td>
              <td style={{width:"6%"}}>
                  <select className="form-control selectinput ">
                    <option className="pec" selected disabled>UOM</option>
                    <option>each</option>
                    <option>pallet</option>
                  </select>
              </td>
              <td style={{width:"6%", height:"10%"}}>
              <div className="inputDate ">
              <input className="form2 pec" value={this.state.rotedate} placeholder="Rota Date"/>
              <img onClick={() => this.datePickerRote()} className="dateimg" src={date}/>
              </div>
              </td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Batch"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref3"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref4"/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Disposition"/></td>
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

    linedetailsrowreview = (list, i) => {
      return(
        <table>
          <tr>
              <td hidden id={list.id}></td>
              <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs pec" value={"A"}/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product"/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product Description"/></td>
              <td style={{width:"3%"}}><input className="form-control inputs pec" placeholder="Qty"/></td>
              <td style={{width:"6%"}}>
                  <select className="form-control selectinput">
                    <option className="pec" selected disabled>UOM</option>
                    <option>each</option>
                    <option>pallet</option>
                  </select>
              </td>
              <td style={{width:"6%"}}>
              <div className="inputDate ">
              <input className="form2" value={this.state.rotedate} placeholder="Rota Date"/>
              <img onClick={() => this.datePickerRote()} className="dateimg" src={date}/>
              </div>
              </td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Batch"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref3"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref4"/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Disposition"/></td>
            </tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}</td>
        </table>
      )
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

    submit = () => {
      return(
        <React.Fragment>
          <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
          <Button onClick={() => this.close()} color="primary" className="btnsearch submit btnleft" style={{marginTop:"-50px"}} ><label className="font">Submit</label></Button>        
        </React.Fragment>      
      )
    }

      render(){
          return(
            <Modal  isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }}
            toggle={true} className="POCreate">
            <ModalHeader style={{marginTop:"1%"}}>
              <div className="create"><label className="iconU-createModal"/><label className="font"><h2>Create Purchase Orders</h2></label></div>
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
                    <div style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab1 " + (this.state.tab1isactive ? "tabisactive" : null)}>
                        <img className="numberimg" style={{width:"9%"}} src={this.state.tab1isactive ? oneactive : oneinactive}/>  Order & Product Details
                    </div>
                    <div  style={{color:"#919191"}} onClick={() => this.tabhandler()} className={"tab2 tab-review " + (this.state.tab2isactive ? "tabisactive" : null)}>
                         <img className="numberimg " style={{width:"22%"}} src={this.state.tab2isactive ? twoactive : twoinactive}/> Review
                    </div>
                 </div>
              </div>
            </ModalHeader>       
            
            <ModalBody className="bodycontent" style={{width:"100%"}}>
              {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()}
            </ModalBody>
              {/* {this.state.tab2isactive ? 
                this.submit() :  
                <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
              }       */}
          </Modal>
          )
      }
  }

  export default PurchaseOrderCreate