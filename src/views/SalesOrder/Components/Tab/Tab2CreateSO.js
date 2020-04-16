import React,{Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import OrderLineReview from './OrderLineReview'

    class Tab2CreateSO extends Component{
        constructor(props){
            super(props)
            this.state ={
                tab1isactive:true,
                tab2isactive:false,
            }
        }

        close = () => {
          this.props.close()
        }
        tabhandler= () => {
          this.props.tabhandler()
        }
    

        render = () => {
          const {
              company,         
              site,  
              siteVal,
              client, 
              clientName,      
              orderId,
              customerOrderRef,
              vendorOrderRef,
              orderType,
              orderTypeVal,
              deliveryDate,
              customer,
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

          } = this.props.parameters.header
            return(
        <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
  
            <table className="createpotable">
                <tr>
                    <th>Site</th>
                    <th>Client</th>
                    <th>Order Type</th>
                    <th>Order Number</th>
                </tr>
                <tr>
                    <td><input value={siteVal} className="form-control" readOnly/></td>
                    <td><input value={clientName} className="form-control" readOnly/></td>
                    <td><input value={orderType} className="form-control" readOnly/></td>
                    <td><input value={orderId} className="form-control" readOnly/></td>
                </tr>
  
                <tr>
                    <th>Delivery Date</th>
                    <th>Customer Order Ref</th>
                    <th>Vendor Order Ref</th>                    
                </tr>
                <tr>
                    <td><input value={deliveryDate} className="form-control" readOnly/></td>
                    <td><input value={customerOrderRef} className="form-control" readOnly/></td>
                    <td><input value={vendorOrderRef} className="form-control" readOnly/></td>
                </tr>  

                <tr>
                  <th>Delivery Instruction</th>
                </tr>

                <tr>
                <td rowspan="3"><textarea value={deliveryInstruction} className="form-control put dlv" style={{height:"8em"}} readOnly/></td>
                </tr>
                            
            </table>

            <tr style={{color:"transparent"}}>1</tr>
            <h3 className="fonts">Costumer</h3>
            <table className="createpotable">
                <tr>
                    <th>Costumer</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Address 3</th>
                </tr>
                <tr>
                    <td><input value={customer} className="form-control put " readOnly/></td>
                    <td><input value={shipToAddress1} className="form-control put " readOnly/> </td>
                    <td><input value={shipToAddress2} className="form-control put " readOnly/> </td>
                    <td><input value={shipToAddress3} className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>                    
                </tr>
                <tr>
                    <td><input value={shipToAddress4} className="form-control put " readOnly/></td>
                    <td><input value={shipToAddress5} className="form-control put " readOnly/> </td>                    
                </tr>
                <tr>
                    <th>Suburb</th>
                    <th>Postcode</th>
                    <th>State</th>
                    <th>Country</th>                    
                </tr>
                <tr>
                    <td><input value={city} className="form-control put " readOnly/> </td>
                    <td><input value={postCode} className="form-control put " readOnly/> </td>
                    <td><input value={state} className="form-control put " readOnly/></td>
                    <td><input value={country} className="form-control put " readOnly/> </td>                    
                </tr>
            </table>
  
            <br/>
            <h3 className="fonts">Line Details</h3>
  
            <div className="line">
              <table className="lineTableDtl">
                  <tr>
                      <th width ='3.2%' style={{ textAlign:"center"}}>#</th>
                      <th width ='11.1%'  className='required-field'>Product</th>
                      <th width ='14.1%'>Product Description</th>
                      <th width='7.2%' className='required-field'>Qty</th>
                      <th width='7.2%'>Weight</th>
                      <th width ='10.1%' className='required-field'>UOM</th>
                      <th width ='10.1%'>Rota Date</th>
                      <th width='7.3%' >Batch</th>
                      <th width='7.3%' >Ref3</th>
                      <th width='7.3%' >Ref4</th>
                      <th width ='11.1%'>Disposition</th>
                      <th width='7.3%'>Pack Id</th> 
                  </tr>                             
                </table>
              </div>
              
              {
                this.props.parameters.lineDetail.map((data, idx) => {
                  return(
                    <OrderLineReview  parameters = {data}
                                      idx        = {idx}/>
                  )
                })
              }
              {/* <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )} style={{width:"98%"}} >
                {this.state.parameters.length == 0 ? null : this.state.parameters.orderLines.map((line, i) => 
                  this.linedetailsrowreview(line, i)
                )}
              </div> */}
              <tr>
                  <td style={{color:"transparent"}}>1</td>
                </tr>
              <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
              <Button onClick={() => this.props.createSalesOrder()} color="primary" className="btnsearch submit btnleft" style={{marginTop:"-50px"}} ><label className="font">Submit</label></Button> 
          </div>)
        }

        linedetailsrowreview = (line, i) => {
            return(
              <table>
                <tr>
                    <td hidden id={i+1}></td>
                    <td style={{width:"2%", textAlign:"center"}}><input value={i+1} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"12%"}}><input value={line.product} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"12%"}}><input value={line.product} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"3%"}}><input value={line.qty} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.uom} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.rotaDate} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.batch} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input value={line.ref3} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input value={line.ref4} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.disposition} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.packId} className="form-control inputs pec"  readOnly/></td>
                  </tr>
              </table>
            )
          }

          
    } export default Tab2CreateSO