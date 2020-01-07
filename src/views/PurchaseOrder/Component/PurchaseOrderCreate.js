import React, {Component} from 'react'
import CoolTabs from 'react-cool-tabs'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class PurchaseOrderCreate extends Component{
    constructor(props){
        super(props)

        this.state = {
          tab1isactive:true,
          tab2isactive:false
          }
    }

    close = () => {
      this.props.closemodal()
    }

    tabhandler = () => {
      this.setState({
        tab1isactive:!this.state.tab1isactive, 
        tab2isactive:!this.state.tab2isactive
        })
    }

  tab1Content = () => {
    return(
      <div className='tabcontent'>
        <h3 className='font'>Order Details</h3>

        <table className='createpotable'>
            <tr>
                <th>Site</th>
                <th>Order No</th>
                <th>Supplier</th>
                <th>Customer Order Ref</th>
            </tr>
            <tr>
                <td><input placeholder="Site"/> </td>
                <td><input readOnly placeholder="Order no."/> </td>
                <td><input placeholder="Supplier"/> </td>
                <td><input placeholder="Customer Order ref."/> </td>
            </tr>

            <tr>
                <th>Client</th>
                <th>Order Date</th>
                <th>Order Type</th>
                <th>Client Order Ref</th>
            </tr>
            <tr>
                <td><input placeholder="Client"/> </td>
                <td><input placeholder="Order Date"/> </td>
                <td><input placeholder="Order Type"/></td>
                <td><input placeholder="Vendor Order ref."/> </td>
            </tr>
        </table>

        <br/>
        <h3 className='font'>Line Details</h3>

        <table className='tabledetails'>
                  <tr>
                      <th style={{width:'2.5%', textAlign:'center'}}>#</th>
                      <th style={{width:'12%'}}>Porduct Entry</th>
                      <th style={{width:'6%'}}>UOM</th>
                      <th style={{width:'3%'}}>Quantity</th>
                      <th style={{width:'6%'}}>Rota Date</th>
                      <th style={{width:'6%'}}>Batch</th>
                      <th style={{width:'5%'}}>Ref3</th>
                      <th style={{width:'5%'}}>Ref4</th>
                      <th style={{width:'6%'}}>Disposition</th>
                      <th style={{width:'1.5%'}}></th>
                  </tr>
                  <tr>
                      <td><input value='1'/></td>
                      <td><input placeholder='product'/></td>
                      <td>UOM</td>
                      <td><input placeholder='qty'/></td>
                      <td>Batch Type</td>
                      <td><input placeholder='batch'/></td>
                      <td><input placeholder='ref3'/></td>
                      <td><input placeholder='ref4'/></td>
                      <td><input placeholder='disposition'/></td>
                      <td><div className='iconU-delete'/></td>
                  </tr>
               </table>
               <button type="button" class="btn btn-light font">+ Add Line</button>
      </div>
    )
  }

  tab2Content = () => {
    return(
      <div className='tabcontent'>
        Tab2
      </div>
    )
  }

    render(){
        return(
          <Modal isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={true} className={this.classname}>
          <ModalHeader>
            <div className='create'><label className='iconU-edit'/><label className='font'>Create Purchase Order</label></div>
            <Button color="primary" className='btnsearch' onClick={() => this.close()}><label className='font'>Close</label><label className='iconU-close'/></Button>
          </ModalHeader>
          <ModalHeader className='Tab'>
            <div>
              Enter delivery and product details to create a new Pruchase Order
              <div className='tabs'>
                <div onClick={() => this.tabhandler()} className={'tab ' + (this.state.tab1isactive ? 'tabisactive' : null)}>1. Order & Product Details</div>
                <div onClick={() => this.tabhandler()} className={'tab ' + (this.state.tab2isactive ? 'tabisactive' : null)}>2. Review</div>
              </div>
            </div>
          </ModalHeader>       
         
          <ModalBody style={{width:'100%'}}>
            {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()}
          </ModalBody>
          <ModalFooter>
            footer
          </ModalFooter>
        </Modal>
        )
    }
}

export default PurchaseOrderCreate