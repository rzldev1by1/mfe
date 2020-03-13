  import React, {Component} from 'react'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
  // import DatePicker from './DatePicker'
  import axios from 'axios'
  import {endpoint, headers,} from '../../../AppComponent/ConfigEndpoint'
  import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
  import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
  import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
  import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
  import date from '../../../assets/img/brand/field_date@2x.png'
  import DayPicker from 'react-day-picker';
  import './Style/PurchaseOrderCreate.css'
  import 'react-day-picker/lib/style.css';
  import AutoComplete from '../../General/AutoComplete'
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
                rotadate:null,
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
            orderdatacr: [],
            sitedatacr: [],
            supplierdatacr: []
            }
      }

      componentDidMount = () => {
        this.getclient();
        this.getsite();
        this.getsupplier();
        this.getordertype();
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

    getordertype = () => {
      axios.get(endpoint.getOrderType, {
        headers: headers
      })
        .then(res => {
          const result = res.data
          this.setState({ orderdatacr:result })
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

      getsupplier = () => {   
        axios.get(endpoint.getSupplier, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ supplierdatacr:result })
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

      setSuppliers = (e) => {
        let value = e.target.value
        this.setState({supplier:value})
      }
      
    tab1Content = () => {
      let clientName = [];
      let clientValue = [];
      let siteData = [];
      let supplierName = [];
      let orderData =[];
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
      if(this.state.supplierdatacr){
        this.state.supplierdatacr.map((data) => {
            supplierName.push(data.name);
        })
    }
    if(this.state.orderdatacr){
      this.state.orderdatacr.map((data) => {
          orderData.push(data.code);
      })
  }

      
      return(
        <div className="tabcontent">
          <h3 className="fonts">Order Details</h3>
          <table className="createpotable">
              <tr>
                  <th style={{width:"396px"}}>Site</th>
                  <th style={{width:"396px"}}>Client</th>
                  <th style={{width:"396px"}}>Supplier</th>
                  <th style={{width:"396px"}}>Customer Order Ref</th>
              </tr>
              <tr>
                  <td ><AutoComplete suggestions={siteData}/></td>
                  <td><AutoComplete suggestions={clientName}/></td>
                  {/* <td><input className={"form2 put pec" +("1" ? "" : "form2 valid pec") } placeholder="Client"/> </td> */}
                  <td><AutoComplete suggestions={supplierName}/></td>
                  {/* <td><input onChange={(e) => this.setSuppliers(e)} className="form2 put pec" placeholder="Supplier"/> </td> */}
                  <td><input className="form2 put pec" placeholder="Customer Order Ref" maxLength="40"/> </td>
              </tr>
              <tr>
                <th style={{color:"transparent"}}>1</th>
              </tr>
              <tr>
                <th style={{color:"transparent"}}>1</th>
              </tr>
              <tr>
                  <th>Order Type</th>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th>Vendor Order Ref</th>
              </tr>
              <tr>
              <td>
              <AutoComplete suggestions={orderData}/>
              </td>
              <td><input className="form2 put pec" placeholder="Order No" minLength="4" maxLength="12"/> </td>
                  <td>
                    <DatePicker style={{ minWidth: "22%", position:"absolute" }} />
                  </td>                  
                  <td><input className="form2 put pec"  placeholder="Vendor Order Ref"  maxLength="40"/> </td>
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
                    <th style={{width:"11%"}}>Rota Date</th>
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
                  <td><input value={this.state.supplier} className="form-control" readOnly/></td>
                  <td><input value={this.state.supplier} className="form-control" readOnly/></td>
                  <td><input className="form-control" readOnly/></td>
              </tr>

              <tr>
                  <th>Client</th>
                  <th>Order No</th>
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
              <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs pec" value={list.id} readOnly/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product"  maxLength="40"/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Product Description"/></td>
              <td style={{width:"3%"}}><input type="number" min="1" className="form-control inputs pec" placeholder="Qty"/></td>
              <td style={{width:"6%"}}>
                  <select className="form-control selectinput ">
                    <option className="pec" selected disabled>UOM</option>
                    <option>each</option>
                    <option>pallet</option>
                  </select>
              </td>
              <td style={{width:"11%"}}><DatePicker style={{ minWidth: "100%" }} field="smallField" /> </td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Batch"  maxLength="30"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref3"  maxLength="30"/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref4"  maxLength="30"/></td>
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
              <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs pec" value={list.id} readOnly/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"12%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"3%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"5%"}}><input className="form-control inputs pec" readOnly/></td>
              <td style={{width:"6%"}}><input className="form-control inputs pec" readOnly/></td>
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
          rotadate:null,
          batch:null,
          ref3:null,
          ref4:null,
          disposition:null
        }
      )})
    }

    saveclick = () =>{
    // let post = productEntry = null
      axios.post(endpoint.purchaseOrder , { headers: headers,})
      .then(res =>{
        console.log(res.data)
      })
    }

    submit = () => {
      return(
        <React.Fragment>
          <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
          <Button onClick={() => this.saveclick()} color="primary" className="btnsearch submit btnleft" style={{marginTop:"-50px"}} ><label className="font">Submit</label></Button>        
        </React.Fragment>      
      )
    }

      render(){
          return(
                <Modal className="POCreate" isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }}toggle={true} >
                  <div className="createModal">
                    <ModalHeader style={{marginTop:"1%"}}>
                          <div className="create"><label className="iconU-createModal"/><label className="font"><h2>Create Purchase Order</h2></label></div>
                            <p color="primary" onClick={() => this.close()}>
                              <i className="iconU-close mr3" style={{fontSize:"1.6em" , marginLeft:"-3em"}} aria-hidden="true" />
                            </p>
                    </ModalHeader>

                    <ModalHeader className="Tabs" style={{marginTop:"-40px"}} >
                          <div>
                            <div className="createdec">
                            Enter delivery and product details to create a new Purchase Order
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
              </div>
          </Modal>    
          )
      }
  }

  export default PurchaseOrderCreate