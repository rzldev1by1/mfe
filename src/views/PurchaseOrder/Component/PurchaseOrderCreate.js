  import React, {Component} from 'react'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
  import DatePicker from './DatePicker'
  import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
  import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
  import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
  import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
  import date from '../../../assets/img/brand/field_date@2x.png'
  import DayPicker from 'react-day-picker';
  import './Style/PurchaseOrderCreate.css'
  import 'react-day-picker/lib/style.css';

  import DropdownClient from './Dropdown/DropdownClient'
  import DropdownSite from './Dropdown/DropdownSite'

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
                "menu":'Client',
                "subMenu":['asd','asds']
              }
            ],

            showdatepicker:false,
            showdaterote:false,

            //dropdown
            clientSelected:'Client',
            orderTypeSelected:'Order Type',
            uomSelected:'UOM',

            clientExpand:false,
            orderTypeExpand:false,
            uomExpand:false,
            siteValue: undefined
            }
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
        this.setState({showdateRote:!this.state.showdaterote})
        this.setState({rotedate:day})
      }

    tab1Content = () => {
      return(
        <div className='tabcontent'>
          <h3 className='font'>Order Details</h3>
          <table className='createpotable'>
              <tr>
                  <th>Site</th>
                  <th>Order Type</th>
                  <th>Supplier</th>
                  <th>Customer Order Ref</th>
              </tr>
              <tr>
                  <td><DropdownSite siteValue={(e) => this.setState({ siteValue: e})}/></td>
                  <td>
                    <select className="form-control selectinput">
                      <option selected disabled>Order Type</option>
                      <option>Type 1</option>
                      <option>Type 2</option>
                    </select>
                  </td>
                  <td><input className="form-control " placeholder="Supplier"/> </td>
                  <td><input className="form-control " placeholder="Customer Order ref."/> </td>
              </tr>

              <tr>
                  <th>Client</th>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th>Vendor Order Ref</th>
              </tr>
              <tr>
                  <td><DropdownClient/></td>
                  <td><input className="form-control" value='PO-003'/></td>
                  <td>
                    <div className='inputDate '>
                      <input className="form-control withIcon" value={this.state.orderdate}/>
                      <img onClick={() => this.datePickerHandler()} className='dateimg' src={date}/>
                    </div>
                  </td>                  
                  <td><input className="form-control "  placeholder="Vendor Order ref."/> </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>{this.state.showdatepicker ? <DatePicker getChosenDay={(day) => this.datePickerHandler(day)}/> : null}</td>
                <td></td>
              </tr>
          </table>

          <br/>
          <h3 className='font'>Line Details</h3>

          <table className='tabledetails'style={{width:'92%'}}>
              <tr>
                  <th style={{width:'2.5%', textAlign:'center'}}>#</th>
                  <th style={{width:'12%'}}>Product Entry</th>
                  <th style={{width:'12%'}}>Product Description</th>
                  <th style={{width:'3%'}}>Quantity</th>
                  <th style={{width:'6%'}}>UOM</th>
                  <th style={{width:'6%'}}>Rota Date</th>
                  <th style={{width:'6%'}}>Batch</th>
                  <th style={{width:'5%'}}>Ref3</th>
                  <th style={{width:'5%'}}>Ref4</th>
                  <th style={{width:'6%'}}>Disposition</th>
              </tr>                               
            </table>
            <div className={'tablerow ' + (this.state.rowlist.length >2 ? 'scroll' : null )} style={{width:'92%'}}>
              {this.state.rowlist.map((list, i) => this.linedetailsrow(list, i))}
            </div>

                <button onClick={() => this.addline()} type="button" class="btn btn-light font addline">+ Add Line</button>
                {
      console.log(this.state.rowlist)}
        </div>
      )
    }

    tab2Content = () => {
      return(
        <div className='tabcontent fades'>
          <h3 className='font'>Order Details</h3>

          <table className='createpotable'>
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
          <h3 className='font'>Line Details</h3>

          <table className='tabledetails'style={{width:'92%'}}>
              <tr >
                  <th style={{width:'2.5%', textAlign:'center'}}>#</th>
                  <th style={{width:'12%'}}>Porduct Entry</th>
                  <th style={{width:'12%'}}>Porduct Description</th>
                  <th style={{width:'3%'}}>Quantity</th>
                  <th style={{width:'6%'}}>UOM</th>
                  <th style={{width:'6%'}}>Rota Date</th>
                  <th style={{width:'6%'}}>Batch</th>
                  <th style={{width:'5%'}}>Ref3</th>
                  <th style={{width:'5%'}}>Ref4</th>
                  <th style={{width:'6%'}}>Disposition</th>
              </tr>                  
            </table>
            <div className={'tablerow ' + (this.state.rowlist.length >2 ? 'scroll' : null )} style={{width:'92%'}} >
              {this.state.rowlist.map((list, i) => this.linedetailsrowreview(list, i))}
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
        alert('cant delete row')
      }
    }

    selectedValue = (id, value) => {
      if(id == 'Saya')
      {
          this.setState({client:value})
      }
  }

    linedetailsrow = (list, i) => {
      return(
        <table>
          <tr>
              <td hidden id={list.id} ></td>
              <td style={{width:'2%', textAlign:'center'}}><input className="form-control inputs" value={list.id}/></td>
              <td style={{width:'12%'}}><input className="form-control inputs" placeholder='product'/></td>
              <td style={{width:'12%'}}><input className="form-control inputs" placeholder='product dec'/></td>
              <td style={{width:'3%'}}><input className="form-control inputs" placeholder='qty'/></td>
              <td style={{width:'6%'}}>
                  <select className="form-control selectinput">
                    <option selected disabled>UOM</option>
                    <option>each</option>
                    <option>pallet</option>
                  </select>
              </td>
              <td style={{width:'6%'}}>
              <div className='inputDate '>
              <input className="form-control withIcon" value={this.state.orderdate} placeholder='rota date'/>
              <img onClick={() => this.datePickerRote()} className='dateimg' src={date}/>
              </div>
              </td>
              {this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}
              <td style={{width:'6%'}}><input className="form-control inputs" placeholder='batch'/></td>
              <td style={{width:'5%'}}><input className="form-control inputs" placeholder='ref3'/></td>
              <td style={{width:'5%'}}><input className="form-control inputs" placeholder='ref4'/></td>
              <td style={{width:'6%'}}><input className="form-control inputs" placeholder='disposition'/></td>
              <td id={list.id} onClick={(e) => this.deletelinehandler(e)} style={{width:'1.5%'}}><div className='iconU-delete'/></td>
            </tr>
        </table>
      )
    }

    linedetailsrowreview = (list, i) => {
      return(
        <table>
          <tr>
              <td hidden id={list.id}></td>
              <td style={{width:'2%', textAlign:'center'}}><input className="form-control inputs" value={"A"}/></td>
              <td style={{width:'12%'}}><input className="form-control inputs" placeholder='product'/></td>
              <td style={{width:'12%'}}><input className="form-control inputs" placeholder='product dec'/></td>
              <td style={{width:'3%'}}><input className="form-control inputs" placeholder='qty'/></td>
              <td style={{width:'6%'}}>
                  <select className="form-control selectinput">
                    <option selected disabled>UOM</option>
                    <option>each</option>
                    <option>pallet</option>
                  </select>
              </td>
              <td style={{width:'6%'}}>
              <div className='inputDate '>
              <input className="form-control withIcon" value={this.state.orderdate} placeholder='rota date'/>
              <img onClick={() => this.datePickerRote()} className='dateimg' src={date}/>
              </div>
              </td>
              <td style={{width:'6%'}}><input className="form-control inputs" placeholder='batch'/></td>
              <td style={{width:'5%'}}><input className="form-control inputs" placeholder='ref3'/></td>
              <td style={{width:'5%'}}><input className="form-control inputs" placeholder='ref4'/></td>
              <td style={{width:'6%'}}><input className="form-control inputs" placeholder='disposition'/></td>
            </tr>
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
          <Button onClick={() => this.tabhandler()} color="primary" className='btnsearch back' ><label className='font'>Back</label></Button>
          <Button onClick={() => this.close()} color="primary" className='btnsearch submit' ><label className='font'>Submit</label></Button>        
        </React.Fragment>      
      )
    }

      render(){
          return(
            <Modal isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={true} className={this.classname}>
            <ModalHeader>
              <div className='create'><label className='iconU-edit'/><label className='font'>Create Purchase Order</label></div>
              <Button color="primary" className='btnsearch crt' onClick={() => this.close()}><label className='font btnLabel'>Close</label><label className='iconU-close sym'/></Button>
            </ModalHeader>
            <ModalHeader className='Tab'>
              <div>
                Enter delivery and product details to create a new Pruchase Order
                <div className='tabs'>
                  <div onClick={() => this.tabhandler()} className={'tab ' + (this.state.tab1isactive ? 'tabisactive' : null)}>
                    <img className='numberimg' src={this.state.tab1isactive ? oneactive : oneinactive}/> Order & Product Details
                  </div>
                  <div onClick={() => this.tabhandler()} className={'tab tab-review ' + (this.state.tab2isactive ? 'tabisactive' : null)}>
                    <img className='numberimg' src={this.state.tab2isactive ? twoactive : twoinactive}/> Review
                  </div>
                </div>
              </div>
            </ModalHeader>       
          
            <ModalBody className='bodycontent' style={{width:'100%'}}>
              {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()}
            </ModalBody>
            <ModalFooter className='footers'>
              {this.state.tab2isactive ? 
                this.submit() :  
                <Button onClick={() => this.tabhandler()} color="primary" className='btnsearch next' ><label className='font btnLabel'>Next</label></Button>
              }
            
            </ModalFooter>
          </Modal>
          )
      }
  }

  export default PurchaseOrderCreate