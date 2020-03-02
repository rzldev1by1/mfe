import React, { Component } from 'react'
import axios from 'axios';
import {endpoint, headers,} from '../../../AppComponent/ConfigEndpoint'
import Paging from '../../General/Paging';
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import "../SalesOrder.css"
import moment from 'moment'

class ListOrderComponent extends Component {
  constructor(props){
    super(props)
   
    this.dropdownref = React.createRef()

    this.state = {
      data:[],      
      tableheader :  ["Site","Client","Order No", "Order Type", "Customer"," Status", "Delivery Date", "Date Received", "Date Released", "Date Completed"],
      activearrow:mid,
      sortparameter:'orderNO',

      currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage:3,
			totalRows: 0,
			maxPage: 0,
    }
  }


  load = () => {
    this.props.loadCompleteHandler(true)
  }

  componentDidMount(){
    this.loadSalesOrder()
  }


  searchPurchaseOrder = (search,client,site,status,ordertype,supplier) => {
    
    this.setState({currentPage: 1,
      startIndex: 0, lastIndex: 0,
      totalRows: 0, maxPage: 0})

    let param = search
    if(param)
    {
      param = param.toUpperCase()
    }
    let url = '?searchParam='

    if(client)
    {
      param = client
      url = '?client='
    }

    else if(site)
    {
      param = site
      url = '?site='
    }

    else if(status)
    {
      param = status
      url = '?status='
    }

    else if(ordertype)
    {
      param = ordertype
      url = '?orderType='
    }

    else if(supplier)
    {
      param = supplier
      url = '?supplier='
    }

    this.props.loadCompleteHandler(false)
    axios.get(endpoint.salesOrder + url + param, {
      headers: headers
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data:result })
        this.load()
        this.setPagination(result)
      })
      .catch(error => {
        // this.props.history.push("/logins")
      })
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

		self.setState({ displayContent: "FOUND",
						masterResStockHolding: respondRes,
						totalRows: respondRes.length });

		self.numberEventClick(self.state.currentPage);
	}


  loadSalesOrder = () => {
    this.setState({ currentPage: 1,
                    startIndex: 0, lastIndex: 0,
                    totalRows: 0, maxPage: 0})

    axios.get(endpoint.salesOrder, {
      headers: headers
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data:result })
        this.load()
        this.setPagination(result);
      })
      .catch(error => {
        // this.props.history.push("/logins")
      })
  }
  
  sortby = (id) => {
    if(id == 'Site')
    {
      this.setState({sort:!this.state.sort, sortparameter:'site'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Client')
    {
      this.setState({sort:!this.state.sort, sortparameter:'client'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Order No')
    {
      this.setState({sort:!this.state.sort, sortparameter:'order_no'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Ship to Name')
    {
      this.setState({sort:!this.state.sort, sortparameter:'ship_to_name'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Customer Name')
    {
      this.setState({sort:!this.state.sort, sortparameter:'customer_name'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Status')
    {
      this.setState({sort:!this.state.sort, sortparameter:'status'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Received')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_due'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Rece')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_recd'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Released')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_released'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Supplier Name')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_completed'})
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
  
    render(){
      return(
        <div>
          <div className='tablePages tablecontent'>
               <table className="potable">
                  <thead>
                     <tr>
                       {this.state.tableheader.map(header =>
                        <th key={header} onClick={(e) => this.arrowHandler(e)} id={header}>{header} 
                           <img key={header} className='arrow' style={{marginLeft:'0.3em' , width:'0.6em'}} src={this.state.activearrow}/>
                        </th>
                              )}  
                              <th className='iconU-edit'></th>
                       </tr>
                    </thead>
                    <tbody>
                          {this.state.data  ? this.state.data.slice(this.state.startIndex, this.state.lastIndex).map((data,i) => 
                                  <tr onClick={() => window.location.replace(window.location.origin + '/#/sales-orders/'+data.order_no)} className='tr'>
                                      <td>{data.site}</td>
                                      <td>{data.client}</td>
                                      <td>{data.order_no}</td>
                                      <td>{data.order_type}</td>
                                      <td>{data.customer_name}</td>
                                      <td>{data.status_desc}</td>
                                      <td>{'' + (data.date_due ? moment(data.date_due).format("YYYY/MM/DD") : '') }</td>
                                      <td>{'' + (data.date_recd ? moment(data.date_recd).format("YYYY/MM/DD") : '') }</td>
                                      <td>{'' + (data.date_released ? moment(data.date_released).format("YYYY/MM/DD") : '') }</td>
                                      <td>{'' + (data.date_completed ? moment(data.date_completed).format("YYYY/MM/DD") : '') }</td>
                          <td>{console.log(data)}</td>
                                  </tr>
                              ) : 
                                  <div> No data available </div>
                                  }  
                      </tbody>
                        </table>
            </div>
            <div className='paginations'>
                    <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                            backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                            isActive={this.state.isActive}
                            numberEventClick={this.numberEventClick}/>
                </div>    
          </div>)
    }
}
export default ListOrderComponent;