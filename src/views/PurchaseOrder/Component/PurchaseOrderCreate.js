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
import moment from 'moment'
import AutoComplete from '../../../AppComponent/AutoComplete'
import Dropdown from '../../../AppComponent/Dropdown'
import DatePicker from '../../../AppComponent/DatePicker'
import swal from 'sweetalert'

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
                      lineNumber:1,
                      product:null,
                      productDescription:null,
                      qty:null,
                      uom:null,
                      rotadate: null,
                      batch:null,
                      ref3:null,
                      ref4:null,
                      disposition:null,
                      weight: "20",
                      orderDate: null
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
              supplierdatacr: [],
              dispositioncr: [],
              uomcr: [],
              productcr: [],
              productdesccr: [],

              // Create PO Form 
              site: undefined,
              client: undefined,
              supplier: undefined,
              customerRef: undefined,
              orderType: undefined,
              orderNo: undefined,
              orderDate: undefined,
              vendorRef: undefined,
              lineDetails: [],
              isSaveProgressing: false,
              createSuccess: false
                             
          }
    }

    componentWillReceiveProps = () => {
        this.setState({
            showModal: this.props.showmodal
        })
    }

    componentDidMount = () => {
      this.getclient();
    //   this.getsite();
      this.getsupplier();
    //   this.getordertype();
      this.getporesource();
      this.getdisposition();
      this.getproductcode();
      this.getproductname();
    }

    getporesource = () => {
        let self = this;
        axios.get(endpoint.getPOResources, {
            headers: headers
        })
        .then(res => {
            self.setState({
                sitedatacr: res.data.site,
                supplierdatacr: res.data.supplier,
                orderdatacr: res.data.orderType
            });
        })
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
          // console.log(error);
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
      //   console.log(error);
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
      axios.get(endpoint.getSupplier + "?client=" + headers.client, {
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

    getdisposition = () => {
        axios.get(endpoint.getDisposition, {
            headers: headers
        })
        .then(res => {
            const result = res.data;
            this.setState({ dispositioncr: res.data.code })
        })
        .catch(error => {

        })
    }

    getuom = (i, value) => {
        axios.get(endpoint.getUom + "?client=" + headers.client + "&product=" + value, {
            headers: headers
        })
        .then(res => {
            const result = res.data;
            this.setState({ uomcr: res.data.uom })
        })
        .catch(error => {
            this.setState({ uomcr: [] })
        })
    }

    getproductcode = () => {
        axios.get(endpoint.getProduct + "?client=" + headers.client, {
            headers: headers
        })
        .then(res => {
            const result = res.data;
            this.setState({ productcr: res.data.code })
        })
        .catch(error => {
            this.setState({ productcr: [] })
        })
    }

    getproductname = () => {
        axios.get(endpoint.getProduct + "?client=" + headers.client, {
            headers: headers
        })
        .then(res => {
            const result = res.data;
            this.setState({ productdesccr: res.data.name })
        })
        .catch(error => {
            this.setState({ productcr: [] })
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
    let siteName = [];
    let supplierNo = [];
    let supplierName = [];
    let orderData =[];
    let orderValue = [];
    if(this.state.clientdatacr){
        this.state.clientdatacr.map((data) => {
            clientName.push(data.name);
            clientValue.push(data.code);
        })
    }
    if(this.state.sitedatacr){
        this.state.sitedatacr.map((data) => {
            siteData.push(data.site);
            siteName.push(data.site + ":" + data.name)
        })  
    }
    if(this.state.supplierdatacr){
      this.state.supplierdatacr.map((data) => {
          supplierNo.push(data.supplier_no);
          supplierName.push(data.name);
      })
  }
  if(this.state.orderdatacr){
    this.state.orderdatacr.map((data) => {
        orderData.push(data.description);
        orderValue.push(data.code);
    })
}

    
    return(
      <div className="tabcontent">
        <h3 className="fonts">Order Details</h3>
        <table className="createpotable">
            <tr>
                <th className='required-field' style={{width:"396px"}}>Site</th>
                <th className='required-field' style={{width:"396px"}}>Client</th>
                <th className='required-field' style={{width:"396px"}}>Supplier</th>
                <th style={{width:"396px"}}>Customer Order Ref</th>
            </tr>
            <tr>
              <td>
                  <Dropdown placeHolder="Site" 
                            style={{width: "22%", position: "absolute", zIndex: '6'}} 
                            optionList={siteName.toString()} 
                            optionValue={siteData.toString()} 
                            getValue={(e) => this.setState({ site: e })} 
                            optionSelected={this.state.site}/>
             </td>
              <td>
                  <Dropdown placeHolder="Client" 
                            style={{width: "22%", position: "absolute"}} 
                            optionList={clientValue.toString()} 
                            optionValue={clientValue.toString()} 
                            getValue={(e) => this.setState({ client: e })} 
                            optionSelected={this.state.client}/>
              </td>
                {/* <td><input className={"form2 put pec" +("1" ? "" : "form2 valid pec") } placeholder="Client"/> </td> */}
              <td>
                <AutoComplete
                                suggestions={supplierName}
                                suggestionsValue={supplierNo}
                                defaultValue={this.state.supplier}
                                handleChange={(e) => this.setState({ supplier: e })} />
              </td>
                {/* <td><input onChange={(e) => this.setSuppliers(e)} className="form2 put pec" placeholder="Supplier"/> </td> */}
              <td>
                  <input className="form2 put pec" placeholder="Customer Order Ref" value={this.state.customerRef} maxLength="40" onChange={(e) => this.setState({ customerRef: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <th style={{color:"transparent"}}>1</th>
            </tr>
            <tr>
              <th style={{color:"transparent"}}>1</th>
            </tr>
            <tr>
                <th className='required-field'>Order Type</th>
                <th className='required-field'>Order No</th>
                <th className='required-field'>Order Date</th>
                <th>Vendor Order Ref</th>
            </tr>
            <tr>
            <td>
            <Dropdown  placeHolder="Order Type" 
                        style={{width: "22%", position: "absolute"}} 
                        optionList={orderData.toString()} 
                        optionValue={orderValue.toString()} 
                        getValue={(e) => this.setState({ orderType: e })} 
                        optionSelected={this.state.orderType}/>
            </td>
            <td><input className="form2 put pec" value={this.state.orderNo} placeholder="Order No" minLength="4" maxLength="12" onChange={(e) => this.setState({ orderNo: e.target.value })} /> </td>
                <td>
                  <DatePicker style={{ minWidth: "22%", position:"absolute" }} 
                              getDate={(e) => {this.setState({ orderDate: e }); this.state.rowlist[0].orderDate = e}}
                              defaultValue={this.state.orderDate}
                  />
                  {console.log(this.state.orderDate)}
                </td>                  
                <td><input className="form2 put pec" value={this.state.vendorRef}  placeholder="Vendor Order Ref" onChange={(e) => this.setState({ vendorRef: e.target.value })} maxLength="40"/> </td>
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
                <th style={{width:"3.5%", textAlign:"center"}}>#</th>
                <th className='required-field' style={{width:"12%"}}>Product</th>
                <th className='required-field' style={{width:"12%"}}>Product Description</th>
                <th className='required-field' style={{width:"5%"}}>Qty</th>
                <th className='required-field' style={{width:"6%"}}>UOM</th>
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
              <button onClick={() => this.addline()} type="button" className="btn btn-light font addline">+ Add Line</button>

              {this.state.tab2isactive ? 
              this.submit() :  
              <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
            } 
              {
  //   console.log(this.state.rowlist)
    }
     
      </div>
    )
  }


  tab2Content = () => {
    return(
      <div className="tabcontent fades">
        <h3 className="fonts">Order Details</h3>

        <table className="createpotable">
            <tr>
                <th style={{width:"396px"}}>Site</th>
                <th style={{width:"396px"}}>Client</th>
                <th style={{width:"396px"}}>Supplier</th>
                <th style={{width:"396px"}}>Customer Order Ref</th>
            </tr>
            <tr>
                <td><input className="form-control" value={this.state.site} readOnly/></td>
                <td><input value={this.state.supplier} value={this.state.client} className="form-control" readOnly/></td>
                <td><input value={this.state.supplier} value={this.state.supplier} className="form-control" readOnly/></td>
                <td><input className="form-control" value={this.state.customerRef} readOnly/></td>
            </tr>
            <tr>
                <td style={{color: 'transparent', fontSize: '4px'}}>blank</td>
            </tr>
            <tr>
                <th>Order Type</th>
                <th>Order No</th>
                <th>Order Date</th>
                <th>Vendor Order Ref</th>
            </tr>
            <tr>
                <td><input className="form-control" value={this.state.orderType} readOnly/></td>
                <td><input className="form-control" value={this.state.orderNo} readOnly/></td>
                <td><input className="form-control" value={moment(this.state.orderDate).format("DD MMMM YYYY")} readOnly/></td>
                <td><input className="form-control" value={this.state.vendorRef} readOnly/></td>
            </tr>              
        </table>

        <br/>
        <h3 className="fonts">Line Details</h3>

        <table className="tabledetails">
            <tr >
                <th style={{width:"2%", textAlign:"center", paddingLeft:"18px"}}>#</th>
                <th style={{width:"12%", paddingLeft:"20px"}}>Product</th>
                <th style={{width:"12%", paddingLeft:"24px"}}>Product Description</th>
                <th style={{width:"3%", paddingLeft:"29px"}}>Qty</th>
                <th style={{width:"6%", paddingLeft:"23px"}}>UOM</th>
                <th style={{width:"6%", paddingLeft:"24px"}}>Rota Date</th>
                <th style={{width:"6%", paddingLeft:"37px"}}>Batch</th>
                <th style={{width:"5%", paddingLeft:"25px", paddingRight:"-20px"}}>Ref3</th>
                <th style={{width:"5%", paddingRigth:"-30px"}}>Ref4</th>
                <th style={{width:"6%", paddingRight:"-30px"}}>Disposition</th>
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
          if(this.state.rowlist[i].lineNumber == id){
            this.state.rowlist.splice(i, 1);
            this.setState({rowlist: this.state.rowlist})
            this.state.rowlistidx -= 1;
            let lengthRowlist = this.state.rowlist.length;
            if(i < lengthRowlist){
              for(let x = i; x < lengthRowlist; x++){
                this.state.rowlist[x].lineNumber -= 1;
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
    let self = this;
    return(
      <table>
        <tr>
            <td hidden id={list.lineNumber} ></td>
            <td style={{width:"3.5%", textAlign:"center"}}><input className="form-control inputs pec" style={{ textAlign:"center" }} defaultValue={list.lineNumber} readOnly/></td>{console.log(self.state.rowlist[i].product)}
            <td style={{width:"12%"}}>
                <AutoComplete   useFor="POLineDetails"
                                suggestions={self.state.productcr}
                                    suggestionsValue={self.state.productcr}
                                    defaultValue={self.state.rowlist[i].product}
                                    handleChange={(e) => {self.state.rowlist[i].product = e; this.getuom(i, e)}} 
                                    inputStyle={{position: "relative", width: "100%"}}
                                    listStyle={{width: "100%"}}
                                    listBoxStyle={{width: "14%", marginTop: "10px"}}
                                    placeHolder="Product"
                                    getIndex={(e) => self.state.rowlist[i].productDescription = self.state.productdesccr[e]}
                                    />
            </td>
            <td style={{width:"12%"}}><input className="form-control inputs pec" placeholder="Choose a Product First" defaultValue={self.state.rowlist[i].productDescription} readOnly/></td>
            <td style={{width:"4.5%"}}><input type="number" min="1" className="form-control inputs pec" placeholder="Qty" defaultValue={self.state.rowlist[i].qty} onChange={(e) => self.state.rowlist[i].qty = e.target.value}/></td>
            <td style={{width:"6%"}}>
                <Dropdown placeHolder="UOM" 
                            style={{width: "100%", zIndex: self.state.rowlist.length - i}} 
                            optionList={self.state.uomcr.toString()} 
                            optionValue={self.state.uomcr.toString()} 
                            getValue={(e) => self.state.rowlist[i].disposition = e} />
            </td>
            <td style={{width:"11%"}}><DatePicker style={{ minWidth: "100%" }} field="smallField" getDate={(e) => self.state.rowlist[i].rotadate = e} defaultValue={self.state.rowlist[i].rotadate} /> </td>
            <td style={{width:"6%"}}><input className="form-control inputs pec" placeholder="Batch"  maxLength="30" defaultValue={self.state.rowlist[i].batch} onChange={(e) => self.state.rowlist[i].batch = e.target.value} /></td>
            <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref3"  maxLength="30" defaultValue={self.state.rowlist[i].ref3} onChange={(e) => self.state.rowlist[i].ref3 = e.target.value} /></td>
            <td style={{width:"5%"}}><input className="form-control inputs pec" placeholder="Ref4"  maxLength="30" defaultValue={self.state.rowlist[i].ref4} onChange={(e) => self.state.rowlist[i].ref4 = e.target.value} /></td>
            <td style={{width:"6.5%"}}>
                <Dropdown placeHolder="Dis" 
                            style={{width: "100%", zIndex: self.state.rowlist.length - i}} 
                            optionList={self.state.dispositioncr.toString()} 
                            optionValue={self.state.dispositioncr.toString()} 
                            getValue={(e) => self.state.rowlist[i].disposition = e} />
                            </td>
            <td id={list.lineNumber} onClick={(e) => this.deletelinehandler(e)} style={{width:"1.5%"}}><div className="iconU-delete"/></td>
          </tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}</td>
          {console.log(self.state.rowlist)}
      </table>
    )
  }

  linedetailsrowreview = (list, i) => {
    return(
      <table>
        <tr>
            <td hidden id={list.lineNumber}></td>
            <td style={{width:"3.5%", textAlign:"center"}}><input className="form-control inputs pec" style={{ textAlign:"center" }} value={list.lineNumber} readOnly/></td>
            <td style={{width:"12%"}}><input className="form-control inputs pec" value={list.product} readOnly/></td>
            <td style={{width:"12%"}}><input className="form-control inputs pec" value={list.productDescription} readOnly/></td>
            <td style={{width:"3.5%"}}><input className="form-control inputs pec" value={list.qty} readOnly/></td>
            <td style={{width:"6%"}}><input className="form-control inputs pec" value={list.uom} readOnly/></td>
            <td style={{width:"6.5%"}}><input className="form-control inputs pec" value={moment(list.rotadate).format("DD MMMM YYYY")} readOnly/></td>
            <td style={{width:"6%"}}><input className="form-control inputs pec" value={list.batch} readOnly/></td>
            <td style={{width:"5%"}}><input className="form-control inputs pec" value={list.ref3} readOnly/></td>
            <td style={{width:"5%"}}><input className="form-control inputs pec" value={list.ref4} readOnly/></td>
            <td style={{width:"6%"}}><input className="form-control inputs pec" value={list.disposition} readOnly/></td>
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
        lineNumber:this.state.rowlistidx,
        product:null,
        productDescription:null,
        uom:null,
        qty:null,
        rotadate: new Date(),
        batch:null,
        ref3:null,
        ref4:null,
        disposition:null,
        weight: "20",
        orderDate: this.state.orderDate
      }
    )})
  }

  saveclick = () =>{
    this.setState({isSaveProgressing:true}, this.createPO());
    
  }

  createPO = () => {
    let self = this;
    let param = {
        orderDetails: [{
          site: this.state.site,
          client: this.state.client,
          supplier: this.state.supplier,
          customerOrderRef: this.state.customerRef,
          orderType: this.state.orderType,
          orderNo: this.state.orderNo,
          orderDate: this.state.orderDate,
          vendorOrderRef: this.state.vendorRef,
          web_user: "216"
        }],
        lineDetails: [...this.state.rowlist]
    }
    axios.post(endpoint.purchaseOrderCreate, param, { headers: headers,})
    .then(res =>{
      if(res.data.message == "Successfully added"){
            self.setState({
                isSaveProgressing: false
            });
            self.props.closemodal();
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: {
                    text: "Ok",
                    className: "btn btn-primary"
                },
              });
            self.setState({
                tab1isactive:true,
                tab2isactive:false,
                site: undefined,
                client: undefined,
                supplier: undefined,
                customerRef: undefined,
                orderType: undefined,
                orderNo: undefined,
                orderDate: null,
                vendorRef: undefined,
                rowlist:[
                    {
                        lineNumber:1,
                        product:null,
                        productDescription:null,
                        qty:null,
                        uom:null,
                        rotadate: null,
                        batch:null,
                        ref3:null,
                        ref4:null,
                        disposition:null,
                        weight: "20",
                        orderDate: null
                        
                    }
                ],
                rowlistidx: 1,
            })
        }else{
            self.setState({
                isSaveProgressing: false
            });
            swal({
                title: "Error!",
                text: "The Site value must be entered",
                icon: "error",
                button: {
                    text: "Ok",
                    className: "btn btn-primary"
                },
              });
        }
    })
    .catch(error => {
        self.setState({
            isSaveProgressing: false
        });
        swal({
            title: "Error!",
            text: error.message,
            icon: "error",
            button: {
                text: "Ok",
                className: "btn btn-primary"
            },
          });
    })
  }

  submit = () => {
    return(
      <React.Fragment>
        <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
        <Button onClick={() => this.saveclick()} color="primary" className="btnsearch submit btnleft" style={{marginTop:"-50px"}} >
            <i className= {(this.state.isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
            <label className="font">Submit</label>
        </Button>        
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
                          Enter order and line details to create a new Purchase Order
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
