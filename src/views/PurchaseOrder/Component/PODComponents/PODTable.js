import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../../src/AppComponent'
import mid from '../../../../../src/assets/img/brand/field-idle.png'
import down from '../../../../assets/img/brand/field-bot.png'
import up from '../../../../assets/img/brand/field-top.png'
import ok from '../../../../assets/img/brand/ok.png'
import minus from '../../../../assets/img/brand/minus.png'
import Paging from '../../../../AppComponent/Paging'
import PODExport from './PODExport'
import moment from 'moment'

import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:this.props.datahead,
      tableheader: [
          {
            id: "orig_line_number", 
            checkboxLabelText: "Line No", 
            tableHeaderText: "Line No", 
            isVisible: true, 
            key: "orig_line_number", 
            type: "string"
          },
          {
            id: "product", 
            checkboxLabelText: "Product", 
            tableHeaderText: "Product", 
            isVisible: true, 
            key: "product", 
            type: "string"
          },
          {
            id: "product_name", 
            checkboxLabelText: "Description", 
            tableHeaderText: "Description", 
            isVisible: true, 
            key: "product_name", 
            type: "string"
          },
          {
            id: "quantity", 
            checkboxLabelText: "Qty", 
            tableHeaderText: "Qty", 
            isVisible: true, 
            key: "quantity", 
            type: "string"
          },
          {
            id: "packdesc_1", 
            checkboxLabelText: "UOM", 
            tableHeaderText: "UOM", 
            isVisible: true, 
            key: "packdesc_1", 
            type: "string"
          },
          {
            id: "qty_processed", 
            checkboxLabelText: "Qty Processed", 
            tableHeaderText: "Qty Processed", 
            isVisible: true, 
            key: "qty_processed", 
            type: "string"
          },
          {
            id: "weight", 
            checkboxLabelText: "Weight", 
            tableHeaderText: "Weight", 
            isVisible: true, 
            key: "weight", 
            type: "string"
          },
          {
            id: "weight_processed", 
            checkboxLabelText: "Weight Processed", 
            tableHeaderText: "Weight Processed", 
            isVisible: true, 
            key: "weight_processed", 
            type: "string"
          },
          {
            id: "completed", 
            checkboxLabelText: "Completed", 
            tableHeaderText: "Completed", 
            isVisible: true, 
            key: "completed", 
            type: "string"
          },
          {
            id: "batch", 
            checkboxLabelText: "Batch", 
            tableHeaderText: "Batch", 
            isVisible: true, 
            key: "batch", 
            type: "string"
          },
          {
            id: "rotadate", 
            checkboxLabelText: "Rota Date", 
            tableHeaderText: "Rota Date", 
            isVisible: true, 
            key: "rotadate", 
            type: "string"
          },
          {
            id: "ref3", 
            checkboxLabelText: "Ref 3", 
            tableHeaderText: "Ref 3", 
            isVisible: true, 
            key: "ref3", 
            type: "string"
          },
          {
            id: "ref4", 
            checkboxLabelText: "Ref 4", 
            tableHeaderText: "Ref 4", 
            isVisible: true, 
            key: "ref4", 
            type: "string"
          },
          {
            id: "disposition", 
            checkboxLabelText: "Disposition", 
            tableHeaderText: "Disposition", 
            isVisible: true, 
            key: "disposition", 
            type: "string"
          }
      ],
      activearrow:mid,
      sortparameter:'order_no',
      sort:true,

      //pagination
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      displayPage: 1,
      totalRows: 0,
      maxPage: 0
    }
  }

  componentDidMount(){
      this.props.getTableHeader(this.state.tableheader)
  }

  arrowHandler = (e) => {
    let id = e.currentTarget.id
    let activearrow = this.state
    if(this.state.activearrow == mid)
      {
        this.setState({activearrow:up})
        this.sortby(id)
      }

      if(this.state.activearrow == up)
      {
        this.setState({activearrow:down})
        this.sortby(id)
      }

      if(this.state.activearrow == down)
      {
        this.setState({activearrow:up})
        this.sortby(id)
      }
  }

  sortby = (id) => {
    if(id == 'Product')
    {
      this.setState({sort:!this.state.sort, sortparameter:'product'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Status Description')
    {
      this.setState({sort:!this.state.sort, sortparameter:'status_description'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Quantity')
    {
      this.setState({sort:!this.state.sort, sortparameter:'qty_lcd'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'UOM')
    {
      this.setState({sort:!this.state.sort, sortparameter:'packdesc_1'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Qty Processed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'qty_processed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Completed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'completed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Weight Process')
    {
      this.setState({sort:!this.state.sort, sortparameter:'wgt_processed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Rotadate')
    {
      this.setState({sort:!this.state.sort, sortparameter:'rota1'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Disposition')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_released'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Ref ')
    {
      this.setState({sort:!this.state.sort, sortparameter:'ref'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
  }

  sorting = (data, param, sort) => {
    data.sort((a,b) => {
      if(a[param] !== null && b[param] !== null)
      {
        if(sort == true)
      {
        if(a[param].toLowerCase() < b[param].toLowerCase()) return -1
        if(a[param].toLowerCase() > b[param].toLowerCase()) return 1
        return 0
      }
      else if(sort == false)
      {
        if(a[param].toLowerCase() < b[param].toLowerCase()) return 1
        if(a[param].toLowerCase() > b[param].toLowerCase()) return -1
        return 0
      }
      }
    })
    this.setState({data:data})
  }

  
  setPagination = (result) => {
		let self = this;
		let respondRes = result;
		let totalPage = 0;

		if (respondRes.length > self.state.displayPage) {
			totalPage = respondRes % self.state.displayPage;
			if (totalPage > 0 && totalPage < 50) {
				totalPage = parseInt(respondRes.length / self.state.displayPage) + 1;
			} else {
				totalPage = respondRes.length / self.state.displayPage;
			}
			self.setState({ maxPage: totalPage });
		} else {
			self.setState({ maxPage: 1 });
    } 
      
		self.setState({  totalRows: Object.keys(result.data.data).length }); 
      self.numberEventClick(self.state.currentPage);
      self.changeLastIndex(self.state.currentPage);
  }

  changeStartIndex = (currentPage) => {
		this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage });
	}

	changeLastIndex = (currentPage) => {
		this.setState({ lastIndex: parseInt(currentPage) * this.state.displayPage });
  }

	numberEventClick = (currentPage) => {
		let page = parseInt(currentPage);
		this.setState({ currentPage: page });
		this.changeStartIndex(page);
		this.changeLastIndex(page);
	}

	nextPageClick = () => {
		if (this.state.currentPage < this.state.maxPage) {
			this.setState((prev) => {
				prev.currentPage++;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => {
				prev.currentPage--;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
	}

    lastPageClick = () => {
        if (this.state.currentPage < this.state.maxPage) {
            let currentPage = parseInt(this.state.maxPage + 1 );

            this.setState({ currentPage: currentPage});
            this.changeStartIndex(currentPage);
            this.changeLastIndex(currentPage);
        }
        return;
    }
    firstPageClick = () => {
      if (this.state.currentPage > 1) {
        let currentPage = 1;

        this.setState({ currentPage: currentPage});
        this.changeStartIndex(currentPage);
        this.changeLastIndex(currentPage);
    }
    return;
  }
  
  ExportName = () => {
    let filename = ""
    let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let date1 = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        Seconds = date.getSeconds(),
        Minutes = date.getMinutes(),
        Hours = date.getHours();
     return filename=("Microlistics_PurchaseOrderDetails." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)  
  }

  ExportHeader = () =>{
    //let headers = ["Site","Client","Order No", "Order Type", "Customer"," Status", "Delivery Date", "Date Received", "Date Released", "Date Completed"]
   // return headers
   let headers = [];
   this.state.tableheader.map((header, idx) => { 
          headers.push(header.tableHeaderText); 
    });
    return headers
  }

  ExportFont = () => {
    let Font = "10";
    return Font;
  };

  ExportData = () => {
    let i = 1;
    let line_data = this.props.datahead.map(elt=> [i++,   
      elt.product,  
      elt.product_name,  
      elt.quantity,  
      elt.packdesc_1,  
      elt.qty_processed,  
      elt.weight,  
      elt.weight_processed,   
      elt.completed,   
      elt.batch,  
      elt.rotadate, 
      elt.ref3, 
      elt.ref4,  
      elt.disposition
    ]);  

    let header = this.props.datahead[0]; 
    let header_data =  [
      header.site,
      header.client,
      header.client_name,
      header.order_no,
      header.order_type,
      header.supplier_id,
      header.supplier_name,
      header.customer_order_ref,
      header.vendor_ord_ref,
      header.vendor_ord_ref,
      header.status,
      header.status_description,
      header.delivery_date,
      header.date_released,
      header.date_completed,
      header.date_received 
    ];

    console.log("------------------");
    console.log(header_data);
    return line_data;

    // let data = [];
    // this.props.datahead.map((datax,i) =>  
    // {
    //   let tmp_arr = [];
    //   this.state.tableheader.map((column, columnIdx) => {
    //     if(column.isVisible){ 
    //           tmp_arr[columnIdx] = datax[column.id]; 
    //     }
    // });
    // data.push(tmp_arr);
    // console.log("--------------------------------");
    // console.log(data);
    // return data;  
  // });
}

  ExportPDFName = () =>{
		let name= ""
		return name=("Purchase Order Detail")
  }
    
  render(){
    return(
      <div>

          <div className="tablePage tablePagePo">
            <table className="defaultTable">
              <thead>
                <tr>
                  {this.state.tableheader.map((header, idx) => {
                      if(header.isVisible){
                          return (
                            <th key={idx} 
                            
                            id={header.id}>
                                {header.tableHeaderText} 
                            
                            </th>
                          )
                      }
                  }
                  )}

                  <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
                </tr>
              </thead>
              <tbody>
            
              

                  {this.props.datahead.map((data,i) => 
                      <tr key={i} className='tr'>
                        {this.state.tableheader.map((column, columnIdx) => {
                            if(column.isVisible){
                                if(column.id === "line_no"){
                                    return <td key={columnIdx}>{i+1}</td>
                                }
                                if(column.id === "status_description"){
                                    return <td key={columnIdx}>{data[column.id].substring(2)}</td>
                                }
                                if(column.id.includes("date")){
                                    return <td key={columnIdx}>{data[column.id] ? moment(data[column.id]).format("DD/MM/YYYY") : "-"}</td>
                                }
                                if(column.id === "completed"){
                                    return <td key={columnIdx}>
                                                <img style={{width:'15px',height:'13px'}} src={data[column.id] == "Y" ? ok : minus}></img>
                                          </td>
                                }
                                return <td key={columnIdx}>{data[column.id] ? data[column.id] : "-"}</td>
                            }
                        })}
                        <td></td>
                      </tr>
                  )}   
                      
              </tbody>
            </table>

            <table style={{display: 'none'}} id="excel"> 

            <tr>
                      <th colSpan='2' style={{textAlign:'left'}}>Site</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].site : '-'}
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Supplier No</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].supplier_id : '-' }
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Date Received</th>
                      <td colSpan='2'>
                         {this.props.datahead.length ? this.props.datahead[0].date_received : '-'}
                      </td>
            </tr>
            <tr>
                      <th colSpan='2' style={{textAlign:'left'}}>Client</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].client : '-'}
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Supplier Name</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].supplier_name : '-' }
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Date Due</th>
                      <td colSpan='2'>
                         {this.props.datahead.length ? this.props.datahead[0].delivery_date : '-'}
                      </td>
            </tr>
            <tr>
                      <th colSpan='2' style={{textAlign:'left'}}>Order No</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].order_no : '-'}
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Customer Order Ref</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].customer_order_ref : '-' }
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Date Released</th>
                      <td colSpan='2'>
                         {this.props.datahead.length ? this.props.datahead[0].date_released : '-'}
                      </td>
            </tr>
            <tr>
                      <th colSpan='2' style={{textAlign:'left'}}>Order Type</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].order_type : '-'}
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Vendor Order Ref</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].vendor_ord_ref : '-' }
                      </td>
                      <td colSpan='1'></td>
                      <th colSpan='2' style={{textAlign:'left'}}>Date Completed</th>
                      <td colSpan='2'>
                         {this.props.datahead.length ? this.props.datahead[0].date_completed : '-'}
                      </td>
            </tr>
            <tr>
                      <th colSpan='2' style={{textAlign:'left'}}>Status</th>
                      <td colSpan='2'>
                        {this.props.datahead.length ? this.props.datahead[0].status : '-'}
                      </td> 
            </tr>

            <tr><td colSpan="14"> </td></tr>

                <tr>
                  {this.state.tableheader.map((header, idx) => {
                      if(header.isVisible){
                          return (
                            <th key={idx} 
                            
                            id={header.id}>
                                {header.tableHeaderText} 
                            
                            </th>
                          )
                      }
                  }
                  )}

                  <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
                </tr> 
                  {this.props.datahead.map((data,i) => 
                      <tr key={i} className='tr'>
                        {this.state.tableheader.map((column, columnIdx) => {
                            if(column.isVisible){
                                if(column.id === "line_no"){
                                    return <td key={columnIdx}>{i+1}</td>
                                }
                                if(column.id === "status_description"){
                                    return <td key={columnIdx}>{data[column.id].substring(2)}</td>
                                }
                                if(column.id.includes("date")){
                                    return <td key={columnIdx}>{data[column.id] ? moment(data[column.id]).format("DD/MM/YYYY") : "-"}</td>
                                }
                                if(column.id === "completed"){
                                    return <td key={columnIdx}>
                                                <img style={{width:'15px',height:'13px'}} src={data[column.id] == "Y" ? ok : minus}></img>
                                          </td>
                                }
                                return <td key={columnIdx}>{data[column.id] ? data[column.id] : "-"}</td>
                            }
                        })}
                        <td></td>
                      </tr>
                  )}    
            </table>
          </div>
                
          <div className=" p-0"  >
              <div className='paginations fixed-bottom'>
                  <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                          backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                          totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                          currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                          startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                          isActive={this.state.isActive}
                          numberEventClick={this.numberEventClick} />
                  <PODExport ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
                          ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont}/>
              </div>
          </div>
      </div>
    )
  }
}

export default PurchaseOrderTable