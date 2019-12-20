import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CoolTabs from 'react-cool-tabs';
import '../../StockHolding/StockHolding.css'
const CreatePurchaseOrder = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(props.show);
  const handleModal = (modal) => {
    props.showModal(modal)
  }
  const toggle = () => {
    setModal(false)
    handleModal(modal)
  };

  const addLine = () => {
      return(
          <div style={{marginLeft:22}}>
              <table style={{width:'100%'}}>                  
                  <tr>
                      <td><input placeholder="Site" value='1'/></td>
                      <td><input placeholder="Product"/></td>
                      <td><input placeholder="qty"/></td>
                      <td><input placeholder="batch type"/></td>
                      <td><input placeholder="batch size"/></td>
                      <td><input placeholder="pack ID"/></td>
                      <td><input placeholder="select date"/></td>
                      <td><input placeholder="batch"/></td>
                      <td><input placeholder="ref3"/></td>
                      <td><input placeholder="ref4"/></td>
                      <td><input placeholder="disposition"/></td>
                  </tr>
              </table>
          </div>
      )
  }

  const [addLineGroup, setAddLineGroup] = useState([addLine()])

  const addLines = () => {
    setAddLineGroup([...addLineGroup, addLine()])
  }

  const Tab1 = () => {
      return(
          <div >
               <h4 className='tabHeaders' style={{marginLeft:22}}>Order Details</h4>
               <table style={{width:'100%',marginLeft:22}}>
                   <tr>
                       <td>Site</td>
                       <td>Order No</td>
                       <td>Supplier</td>
                       <td>Customer Order Ref</td>
                   </tr>
                   <tr>
                       <td><input placeholder="Site"/> </td>
                       <td><input placeholder="Order no."/> </td>
                       <td><input placeholder="Order id"/> </td>
                       <td><input placeholder="Customer Order ref."/> </td>
                    </tr>

                    <tr>
                       <td>Client</td>
                       <td>Order Date</td>
                       <td></td>
                       <td>Client Order Ref</td>
                   </tr>
                   <tr>
                       <td><input placeholder="Client"/> </td>
                       <td><input placeholder="Order Date"/> </td>
                       <td> </td>
                       <td><input placeholder="Vendor Order ref."/> </td>
                    </tr>
               </table>

               <h4 className='tabHeaders' style={{marginLeft:22}}>Line Details</h4>
               <table style={{width:'100%', marginLeft:22}} >
                  <tr>
                      <td>#</td>
                      <td>Porduct Entry</td>
                      <td>Quantity</td>
                      <td>Batch Type</td>
                      <td>Batch Size</td>
                      <td>Pack ID</td>
                      <td>Rota Date</td>
                      <td>Batch</td>
                      <td>Ref3</td>
                      <td>Ref4</td>
                      <td>Disposition</td>
                  </tr>
               </table>
               {addLineGroup.map(lines => lines)}
               <div onClick={()=> addLines()} className="addLine" style={{marginLeft:22, display:'flex', marginTop:5}}>
                <div className='circle' style={{textAlign:'center', textAlignLast:'center', fontSize:23.5}}>+</div> 
                <h4 style={{color:'#388DCD', textAlign:'center', marginTop:5, marginLeft:5}}>add line</h4>
               </div>
               
          </div>
      )
  }

  const Tab2 = () => {
      return(
          <div>
              this is Content2
          </div>
      )
  }

  return (
    <div>
      <Modal isOpen={props.show} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className}>
          <table>
            <tr>
              <td><h4 className='tabHeaders' toggle={toggle}>Create Purchase Order</h4></td>
              <td><div style={{textAlign:'center', paddingTop:10, marginLeft:-30}} className="circle" onClick={()=>toggle()}>X</div></td>
            </tr>
            <tr>
              <td><div className='tabshubHeaders'>Enter delivery and product details to create a new Purchase Order</div></td>
            </tr>            
          </table>
        
       
        <ModalBody style={{width:'100%'}}>

            <CoolTabs
            tabKey={'1'}
            style={{ width: '100%', height:  500, background:  'white' }}
            activeTabStyle={{ background:  'white', color:  '#388DCD' }}
            unActiveTabStyle={{ background:  '#f2f2f2', color:  '#000000' }}
            activeLeftTabBorderBottomStyle={{ background:  '#388DCD', height:  2 }}
            activeRightTabBorderBottomStyle={{ background:  '#388DCD', height:  2 }}
            tabsBorderBottomStyle={{ background:  '#e6e6e6', height:  2 }}
            leftContentStyle={{ background:  'white' }}
            rightContentStyle={{ background:  'white' }}
            leftTabTitle={'➀ Order and Product Detail'}
            rightTabTitle={'➁ Review'}
            leftContent={Tab1()}
            rightContent={Tab2()}
            contentTransitionStyle={'transform 0.2s ease-in'}
            borderTransitionStyle={'all 0.2s ease-in'}/>

        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreatePurchaseOrder;