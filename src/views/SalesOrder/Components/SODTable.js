import React, { Component } from 'react'
import mid from '../../../../src/assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import ok from '../../../assets/img/brand/ok.png'
import invalid from '../../../assets/img/brand/invalid.png'
import Paging from "../../../AppComponent/Paging";
import SODExport from "./SODExport";

class SODTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.head,

      // commented based task to do FE that only show 10 field default "10 fields show as default, put the rest on edit columns" 
      //bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch', 'Rotadate', 'Ref3', 'Ref4', 'Disposition', 'Pack ID'],
      // bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch'],
      
      //header excel
      headerExcelColumn: [
        [{id:'site',text:'Site'},{id:'address1',text:'Address 1'},{id:'status',text:'Status'}],
        [{id:'client',text:'Client'},{id:'address2',text:'Address 2'},{id:'datereceived',text:'Delivery Date'}], 
        [{id:'orderno',text:'Order No'},{id:'address3',text:'Address 3'},{id:'datereceived',text:'Date Received'}],
        [{id:'ordertype',text:'Order Type'},{id:'address4',text:'Address 4'},{id:'datereleased',text:'Date Released'}],  
        [{id:'customername',text:'Customer'},{id:'address5',text:'Address 5'},{id:'datecompleted',text:'Date Completed'}],
        [{id:'customerpono',text:'Customer Order Ref'},{id:'city',text:'Suburb'},{id:'loadNumber',text:'Load Number'}],  
        [{id:'custordernumber',text:'Vendor Order Ref'},{id:'postcode',text:'Postcode'},{id:'loadoutstart',text:'Loadout Start'}],   
        [{id:null,text:null},{id:'state',text:'State'},{id:'loadoutfinish',text:'Loadout Finish'}],  
        [{id:null,text:null},{id:'country',text:'Country'},{id:'consignmentnumber',text:'Consignment No'}],  
        [{id:null,text:null},{id:null,text:null},{id:'freightcharge',text:'Freight Charge'}]
      ],

      tableheader: [
        { 
          id: "line",
          tableHeaderText: "Line No", 
          checkboxLabelText: "Line No", 
          isVisible: true,  
        },
        { 
          id: "product",
          tableHeaderText: "Product", 
          checkboxLabelText: "Product", 
          isVisible: true,  
        },
        { 
          id: "product_description",
          tableHeaderText: "Description", 
          checkboxLabelText: "Description", 
          isVisible: true,  
        },
        { 
          id: "qty",
          tableHeaderText: "Qty", 
          checkboxLabelText: "Qty", 
          isVisible: true,  
        },
        { 
          id: "qty_processed",
          tableHeaderText: "Qty Processed", 
          checkboxLabelText: "Qty Processed", 
          isVisible: true,  
        },
        { 
          id: "weight",
          tableHeaderText: "Weight", 
          checkboxLabelText: "Weight", 
          isVisible: true,  
        },
        { 
          id: "weight_processed",
          tableHeaderText: "Weight Processed", 
          checkboxLabelText: "Weight Processed", 
          isVisible: true,  
        },
        { 
          id: "completed",
          tableHeaderText: "Completed", 
          checkboxLabelText: "Completed", 
          isVisible: true,  
        },
        { 
          id: "oos",
          tableHeaderText: "OOS", 
          checkboxLabelText: "OOS", 
          isVisible: true,  
        },
        { 
          id: "batch",
          tableHeaderText: "Batch", 
          checkboxLabelText: "Batch", 
          isVisible: true,  
        },
        { 
          id: "ref2",
          tableHeaderText: "Rotadate", 
          checkboxLabelText: "Rotadate", 
          isVisible: true,  
        },
        { 
          id: "ref3",
          tableHeaderText: "Ref3", 
          checkboxLabelText: "Ref3", 
          isVisible: true,  
        },
        { 
          id: "ref4",
          tableHeaderText: "Ref4", 
          checkboxLabelText: "Ref4", 
          isVisible: true,  
        },
        { 
          id: "disposition",
          tableHeaderText: "Disposition", 
          checkboxLabelText: "Disposition", 
          isVisible: true,  
        },
        { 
          id: "pack_id",
          tableHeaderText: "Pack ID", 
          checkboxLabelText: "Pack ID", 
          isVisible: true,  
        },
      ],
      activearrow: mid,
      sortparameter: 'order_no',
      checkboxLabelText: 'order_no',
      sort: true,

      //pagination
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      displayPage: 1,
      totalRows: 0,
      maxPage: 0,
  
    }
  }

  componentDidMount(){
    this.props.getTableHeader(this.state.tableheader) 
  }
 

  setPagination = (result) => {
		let self = this;
		let respondRes = result;
		let totalPage = 0;

		if (respondRes.length > self.state.displayPage) {
			totalPage = respondRes % self.state.displayPage;
			if (totalPage > 0 && totalPage < 1) {
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
    console.log(this.props.head);
    let i = 1;
    let datax = this.props.head.map(elt=> [
      i++,   
      elt.product,  
      elt.product_description,  
      elt.qty,  
      elt.qty_processed,  
      elt.weight,  
      elt.weight_processed, 
      elt.completed, 
      elt.oos,  
      elt.batch,  
      elt.ref2, 
      elt.ref3, 
      elt.ref4,  
      elt.disposition,
      elt.pack_id
    ]
    );  
    return datax; 
  }
  
  ExportPDFName = () =>{
		let name= ""
		return name=("Sales Order Detail")
  }

  render() {
    return (
      <div>
        <div className="tablePage tablePageSo">
        <table className="defaultTable so-table" width='100%'>
          <thead>
            <tr>
              {this.state.tableheader.map((data,idx) =>{
                if(data.isVisible){
                  if(data.tableHeaderText === 'Weight') return <th height='50' className='align-right' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                  if(data.tableHeaderText === 'Qty Processed') return <th height='50' className='align-right' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                  if(data.tableHeaderText === 'Weight Processed') return <th height='50' className='align-right' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                  if(data.tableHeaderText === 'Pack ID') return <th height='50' className='align-right' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                  else return <th height='50' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                    
                } 
              })
              
              }
              
              <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
            </tr>
          </thead>
          <tbody>
            {this.props.head.map((data, i) =>
              <tr>
                {this.state.tableheader.map((column, columnIdx) => {
                  if(column.isVisible){ 
                      if(column.id === "line_no") return <td key={columnIdx}><label style={{ marginLeft: '20px' }}>{i + 1}</label></td>
                      if(column.id === "completed") return <td height='40'> {data.completed ? <img style={{ width: '15px', height: '13px' }} src={data.completed == "Y" ? ok : invalid} /> : '-'}</td>
                      if(column.id === 'qty') return <td className='align-right' height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                      if(column.id === 'qty_processed') return <td className='align-right' height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                      if(column.id === 'weight') return <td className='align-right pr-8' height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                      if(column.id === 'weight_processed') return <td className='align-right pr-8' height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                      if(column.id === 'pack_id') return <td className='align-right pr-8' height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                      return <td height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                    }
                       
                  })
                }         
              </tr>
            )}

          </tbody>
        </table>

        <table style={{display: 'none'}} id="excel"> 
            
            { this.state.headerExcelColumn.map((col,index) => { 
                return(
                  <tr>
                        <th colSpan='2' style={{textAlign:'left'}}>{(col.length) ? col[0].text : null}</th>
                        <td colSpan='2'>
                          {(this.props.header.length && col.length) ? this.props.header[0][col[0].id] : '-'}
                        </td>
                        <td colSpan='1'></td>
                        <th colSpan='2' style={{textAlign:'left'}}>{(col.length) ? col[1].text : null}</th>
                        <td colSpan='3'>
                          {(this.props.header.length && col.length) ? this.props.header[0][col[1].id] : '-'}
                        </td>
                        <td colSpan='1'></td>
                        <th colSpan='2' style={{textAlign:'left'}}>{(col.length) ? col[2].text : null}</th>
                        <td colSpan='2'>
                          {(this.props.header.length && col.length) ? this.props.header[0][col[2].id] : '-'}
                        </td>
                  </tr> 
                )
            })} 

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
                {this.props.head.map((data, i) =>
              <tr>
                {this.state.tableheader.map((column, columnIdx) => {
                      if(column.isVisible){ 
                          if(column.id === "line_no"){
                              return <td key={columnIdx}><label style={{ marginLeft: '20px' }}>{i + 1}</label></td>
                          }else{
                              return <td height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                          }
                        }
                          
                      })
                    }         
                  </tr>
                )}
            </table>

        </div>
        <div className=" p-0"  >
            <div className='fixed-bottom paginations paginationSO'>
                <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                        backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                        totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                        currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                        startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                        isActive={this.state.isActive}
                        numberEventClick={this.numberEventClick} />
                <SODExport ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
                        ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont}/>
            </div>
        </div>
      </div>
    )
  }
}

export default SODTable


