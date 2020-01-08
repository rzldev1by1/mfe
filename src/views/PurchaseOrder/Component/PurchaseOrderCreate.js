import React, {Component} from 'react'
import CoolTabs from 'react-cool-tabs'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class PurchaseOrderCreate extends Component{
    constructor(props){
        super(props)

        this.state = {
          tab1isactive:true,
          tab2isactive:false,
          rowlist:[this.linedetailsrow()]
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
      <div className="tabcontent">
        <h3 className="font">Order Details</h3>

        <table className="createpotable">
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
        <h3 className="font">Line Details</h3>

        <table className="tabledetails">
            <tr>
                <th style={{width:"2.5%", textAlign:"center"}}>#</th>
                <th style={{width:"12%"}}>Porduct Entry</th>
                <th style={{width:"6%"}}>UOM</th>
                <th style={{width:"3%"}}>Quantity</th>
                <th style={{width:"6%"}}>Rota Date</th>
                <th style={{width:"6%"}}>Batch</th>
                <th style={{width:"5%"}}>Ref3</th>
                <th style={{width:"5%"}}>Ref4</th>
                <th style={{width:"6%"}}>Disposition</th>
                <th style={{width:"1.5%"}}></th>
            </tr>                  
          </table>
          <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )}>
            {this.state.rowlist.map(list => list)}
          </div>

               <button onClick={() => this.addline()} type="button" class="btn btn-light font addline">+ Add Line</button>
      </div>
    )
  }

  tab2Content = () => {
    return(
      <div className="tabcontent">
        <h3 className="font">Order Details</h3>

        <table className="createpotable">
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
        <h3 className="font">Line Details</h3>

        <table className="tabledetails">
            <tr>
                <th style={{width:"2.5%", textAlign:"center"}}>#</th>
                <th style={{width:"12%"}}>Porduct Entry</th>
                <th style={{width:"6%"}}>UOM</th>
                <th style={{width:"3%"}}>Quantity</th>
                <th style={{width:"6%"}}>Rota Date</th>
                <th style={{width:"6%"}}>Batch</th>
                <th style={{width:"5%"}}>Ref3</th>
                <th style={{width:"5%"}}>Ref4</th>
                <th style={{width:"6%"}}>Disposition</th>
                <th style={{width:"1.5%"}}></th>
            </tr>                  
          </table>
          <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )}>
            {this.state.rowlist.map(list => list)}
          </div>
      </div>
    )
  }

  linedetailsrow = () => {
    return(
      <table>
        <tr>
            <td style={{width:"2.5%", textAlign:"center"}}><input className="form-control" value="1"/></td>
            <td style={{width:"12%"}}><input placeholder="product"/></td>
            <td style={{width:"6%"}}>UOM</td>
            <td style={{width:"3%"}}><input placeholder="qty"/></td>
            <td style={{width:"6%"}}>Batch Type</td>
            <td style={{width:"6%"}}><input placeholder="batch"/></td>
            <td style={{width:"5%"}}><input placeholder="ref3"/></td>
            <td style={{width:"5%"}}><input placeholder="ref4"/></td>
            <td style={{width:"6%"}}><input placeholder="disposition"/></td>
            <td style={{width:"1.5%"}}><div className="iconU-delete"/></td>
          </tr>
      </table>
    )
  }

  addline = () => {
    this.setState({rowlist: this.state.rowlist.concat(this.linedetailsrow())})
  }

  submit = () => {
    return(
      <React.Fragment>
        <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
        <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch submit" ><label className="font">Submit</label></Button>        
      </React.Fragment>      
    )
  }

    render(){
        return(
          <Modal isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={true} className={this.classname}>
          <ModalHeader>
            <div className="create"><label className="iconU-edit"/><label className="font">Create Purchase Order</label></div>
            <Button color="primary" className="btnsearch" onClick={() => this.close()}><label className="font">Close</label><label className="iconU-close"/></Button>
          </ModalHeader>
          <ModalHeader className="Tab">
            <div>
              Enter delivery and product details to create a new Pruchase Order
              <div className="tabs">
                <div onClick={() => this.tabhandler()} className={"tab " + (this.state.tab1isactive ? "tabisactive" : null)}>1. Order & Product Details</div>
                <div onClick={() => this.tabhandler()} className={"tab " + (this.state.tab2isactive ? "tabisactive" : null)}>2. Review</div>
              </div>
            </div>
          </ModalHeader>       
         
          <ModalBody className="bodycontent" style={{width:"100%"}}>
            {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()}
          </ModalBody>
          <ModalFooter className="footers">
            {this.state.tab2isactive ? 
              this.submit() :  
              <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next" ><label className="font">Next</label></Button>
            }
           
          </ModalFooter>
        </Modal>
        )
    }
}

export default PurchaseOrderCreate