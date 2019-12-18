import React, {Component, useState} from  'react'
import '../StockHolding/StockHolding.css'
import '../StockMovement/StockMovement.css'
import {
    Table,
    } from 'reactstrap'
import axios from 'axios'
import AppComponent from '../../AppComponent'
import PurchaseOrderHeader from './Component/PurchaseOrderHeader'
import PurchaseOrderSearch from './Component/PurchaseOrderSearch'
import PurchaseOrderTable from './Component/PurchaseOrderTable'
import PurchaseOrderSearchExpand from './Component/PurchaseOrderSearchExpand'
import CreatePurchaseOrder from './Component/CreatePurchaseOrder'
import {Tabs, Tab} from 'react-bootstrap-tabs';

const PurchaseOrder = () => {
    const [filterMenu, setFilterMenu] = useState([{"menu":"client", "subMenu":["MLS","MLB"], }, {"menu":"site", "subMenu":["A","B","C"]},{"menu":"Status", "subMenu":["Open","Close"]},{"menu":"Supplier", "subMenu":["JohnDoe","JohnWick"]},{"menu":"Order Type", "subMenu":["Type 1", "Type 2"]},{"menu":"Area", "subMenu":["A Area", "B Area"]},{"menu":"Order Quantity", "subMenu":["Each", "Pallet"]}])
    const [hideFilter, setHideFilter] = useState(false)
    const hideHandler = (bool) => {
        setHideFilter(bool)
    }

    //DataTable
    const [tableHeader, setTableHeader] = useState(['Site','Order No', 'Client', 'Status', 'Status Description', 'Date Due', 'Date Received', 'Date Released', 'Date Completed', 'Supplier'])
    const [tableData, setTableData] = useState([{"data":['A','PO-4312-1213','Josaphat','Open','Description of Status','27/01/2019','27/01/2019','27/01/2019','27/01/2019','SDF']},{"data":['B','PO-4312-1213B','Josaphat2','Open','Description of Status','27/01/2019','27/01/2019','27/01/2019','27/01/2019','SDF']}])
    //show purchase order detail
     const [showDetail, setShowDetail] = useState(true)
    const purchaseOrderDetail = (value) => {
        setShowDetail(!showDetail)
    }

    const closeFromModal = (value) => {
        setShowDetail(value)
    }
    const header = () => {
        return(
          <tr>
              {
                tableHeader.map(header => 
                      <th>{header}</th>
                )}
               <th style={{textAlign:'center'}}><span className='glyphicon glyphicon-pencil'></span></th>
          </tr>      
        )
      }
    return(
            <div className='animated fadeIn'>
                <PurchaseOrderHeader showPOModal = {(value) => purchaseOrderDetail(value)}/>
                <PurchaseOrderSearch onFilterChange={(value)=>hideHandler(value)}/>
                {
                hideFilter ? 
                    <div className={'marginBottom'} style={{backgroundColor:'white', padding:10, textAlign:'center', display:'flex'}}>
                    {filterMenu.map(menu => <PurchaseOrderSearchExpand key={menu.menu} menu={menu.menu} subMenu={menu.subMenu}/>)}
                    </div> : null
                } 
                <Table responsive style={{width:'100%'}} className=" table-striped clickable-row rounded-bottom mb-0" size="sm" >
                    <thead>
                    {header()}
                    </thead> 
                    {
                        tableData.map(tableData => 
                            <PurchaseOrderTable tableData = {tableData.data} purchaseOrderDetailModal = {(value) => purchaseOrderDetail(value)}/>
                            )
                    }  
                </Table>      
                <CreatePurchaseOrder show={showDetail} showModal={(value)=> closeFromModal(value)}/> 
            </div>
    )

//     const [key, setKey] = useState('home');

//   return (
//       <div>
//         <Tabs>
//             <Tab label="Order and Product Details">
//                 <div className="animated fadeIn">sadasdas</div>
//             </Tab>
//             <Tab label="Review">Tab 2 content</Tab>
//         </Tabs>
//       </div>
    
//   );
}

export default PurchaseOrder