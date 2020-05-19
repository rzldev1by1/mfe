import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios';
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import moment from 'moment';
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import Paging from '../../../AppComponent/Paging'
import Export from '../../../AppComponent/Export'
import ExportExcel from '../../../AppComponent/ExportExcel'



class Movement extends Component {
    constructor(props){
        super(props);
        this.hover = this.hover.bind(this);
        this._checkActiveHover = this._checkActiveHover.bind(this);
        this._checkActiveSorting = this._checkActiveSorting.bind(this);
        this._setSameHeight = this._setSameHeight.bind(this);
        
        this.state = {
            data:[],            
            startDate:moment().subtract(27, 'days').format('YYYY-MM-DD'),
            endDate:moment().format('YYYY-MM-DD'),
            filterType:'week',
            dateArray:[],
            dataArray:[],
            complete:false,
            pushTableComplete:false,

            activearrow:mid,
            activecolumnsort:null,
            sortparameter:null,
            siteSP:mid,
            clientSP:mid,
            productSP:mid,
            productNameSP:mid,
            uomSP:mid,
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
    //testing  hover
    hover(stat,product) {  
        if(stat=='active'){
            this.setState({hover_stat: product});
        }else{
            this.setState({hover_stat: null});
        }
    }

    _checkActiveHover(product) {
        return (product == this.state.hover_stat) ? 'hover-active' : "";
    }
    
    componentDidMount(){
        this.getData()
        this.pushTable()
    }

    getData = (start, end, period, site="", client="", product="") => {
        this.props.isComplete(false)
        this.setState({complete:false, activearrow:mid, sort:true})
        let dtStart = start ? start : this.state.startDate
        let dtEnd = end ? end : this.state.endDate
        let periods = period ? period : this.state.filterType
        axios.get(endpoint.stockMovement + '?startDate='+dtStart+'&endDate='+dtEnd+'&filterType='+periods+'&client='+client+'&site='+site+'&product='+product, {
        headers: headers
        })
        .then(res => {
        const result = res.data.data
        this.setPagination(res)
        this.setState({ data:result, complete:true, filterType:periods})
        this.props.isComplete(true)
        this.props.data(result)
        this.pushTable(dtStart, dtEnd,periods)  
        this.potableref.current.setPagination(res) 
        })
        .catch(error => {
        
        })
    }

    tableMovement = (props) => {
        return(
        <div style={{display:'flex'}}>
            <td key="6" className='tet' xs='2'>{props.detail.sa_plus ? props.detail.sa_plus : '-'}</td>
            <td key="7" className='tet' xs='2'>{props.detail.sa_minus ? props.detail.sa_minus : '-'}</td>
            <td key="8" className='tet' xs='2'>{props.detail.recv_weight ? props.detail.recv_weight : '-'}</td>
            <td key="9" className='tet' xs='3'>{props.detail.send_weight ? props.detail.send_weight : '-'}</td>
        </div>
        )
    }

    pushTable = (start,end, period) => { 
        let dateArray = []
        let stDate = start ? start : this.state.startDate
        let enDate = end ? end : this.state.endDate
        let periodd = period ? period : this.state.filterType
        let startDate = moment(stDate)
        let endDate = moment(enDate)
        while(startDate <= endDate)
        {  
            let newDate = startDate.format('YYYY-MM-DD')
            dateArray.push(newDate)

            if(periodd == 'day')
            {
                startDate.add('days', 1)
            }

            else if(periodd == 'week')
            {
                startDate.add('days', 7)
            }
            else if(periodd == 'month')
            {
                startDate.add(1, 'M')
            }
               
        }
        this.setState({dateArray:dateArray, pushTableComplete:true})

        let data = this.state.data
        for(let i = 0 ; i < data.length ; i ++)
        {
            let availableDate = []
            for(let x = 0 ; x < data[i].detail.length ; x++)
            {
                availableDate.push(data[i].detail[x].date)
            }
            for(let y = 0 ; y < dateArray.length ; y ++)
            {
                if(!availableDate.includes(dateArray[y]))
                {
                    let dataFormat =  {
                        'date': dateArray[y], 
                        'sa_plus':'-',  
                        'sa_minus':'-',  
                        'recv_weight':'-', 
                        'send_weight':'-'
                    }
                    data[i].detail.push(dataFormat)
                }
            }
            //console.log(availableDate);
        }
    }

    pushData = () => {
        let data = this.state.data
        for(let i = 0 ; i < data.length ; i ++)
        {
            let availableDate = []
            for(let x = 0 ; x < data[i].detail.length ; x++)
            {
                availableDate.push(data[i].detail[x].date)
            }
            for(let y = 0 ; y < this.state.dateArray.length ; y ++)
            {
                if(!availableDate.includes(this.state.dateArray[y]))
                {
                    let dataFormat =  {
                        'date':this.state.dateArray[y], 
                        'sa_plus':'-',  
                        'sa_minus':'-',  
                        'recv_weight':'-', 
                        'send_weight':'-'
                    }
                    data[i].detail.push(dataFormat)
                }
            }
            //console.log(availableDate);
        }
    }

    sortData = () => {
        let data = this.state.data

        for(let i = 0 ; i < data.length ; i ++)
        {
            let detail = data[i].detail

            detail.sort((a,b) => {
                if(a['date'] !== null && b['date'] !== null)
                {
                  if(a['date'].toLowerCase() < b['date'].toLowerCase()) return -1
                  if(a['date'].toLowerCase() > b['date'].toLowerCase()) return 1
                  return 0
                }
              })
              
        }
    }

    movementHeader = (date) => {
        let dates = moment(date).format('DD MMMM YYYY')
        if(this.state.complete)
        {
            if(this.state.filterType == 'day')
            {
                dates = moment(date).format('DD MMMM YYYY')
            }
            else if(this.state.filterType == 'week')
            {
                let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                dates = moment(date).format('DD MMMM YYYY')
                dates = dates + ' - ' + dates2
            }
            else if(this.state.filterType == 'month')
            {
                dates = moment(date).format('MMMM YYYY')
            }
        }
        return(
        <div>
            <tr>
              <th colSpan="4" key="6" style={{textAlign:"center"}}>{dates}</th>
            </tr>
            <tr>
                <div className="" style={{display:'flex',  color:'#22ABE3'}}>
                    <th key="6" className='tet' xs='2'>SA+</th>
                    <th key="6" className='tet' xs='2'>SA-</th>
                    <th key="6" className='tet' xs='2'>Rec</th>
                    <th key="6" className='tet' xs='3'>Send</th>
                </div>
            </tr>
            
        </div>
        )
    }

    headersExport = () =>{
        return(
            <div>
                <tr>
                                <th key="1" onClick={(e) => this.arrowHandler(e)} id='site' rowspan="2">Site </th>
                                <th key="2" onClick={(e) => this.arrowHandler(e)} id='client' rowspan="2">Client </th>
                                <th key="3" onClick={(e) => this.arrowHandler(e)} id='product' rowspan="2">Product </th>
                                <th key="4" onClick={(e) => this.arrowHandler(e)} id='productName' rowspan="2">Description</th>
                                <th key="5" onClick={(e) => this.arrowHandler(e)} id='uom' rowspan="2">UOM</th>
                                {/* <td>{this.productHeader()}</td> */}
                                { 
                                    this.state.dateArray.map(date =>
                                        {
                                            let dates = moment(date).format('DD MMMM YYYY')
                                            if(this.state.complete)
                                            {
                                                if(this.state.filterType == 'day')
                                                {
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                }
                                                else if(this.state.filterType == 'week')
                                                {
                                                    let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                    dates = dates + ' - ' + dates2
                                                }
                                                else if(this.state.filterType == 'month')
                                                {
                                                    dates = moment(date).format('MMMM YYYY')
                                                }
                                            }
                                            return(
                                            <div>
                                                <th colSpan="4" key="6" style={{textAlign:"center"}}>{dates}</th>
                                                
                                            </div>
                                            )
                                        }
                                            )
                                }
                            </tr>
                            <tr>
                                {this.state.dateArray.map((date, idx) => {
                                        return(
                                                <div style={{display:'flex',  borderBottom:'1px solid #d5d8da', color:'#3366FF'}}>
                                                    <th key="6" className='tet' xs='2'>SA+</th>
                                                    <th key="7" className='tet' xs='2'>SA-</th>
                                                    <th key="8" className='tet' xs='2'>Rec</th>
                                                    <th key="9" className='tet' xs='3'>Send</th>
                                                </div>
                                        )
                                     }) 
                                }
                            </tr>
                        </div>
                            
        )
    }
    productHeader = () => {
        return(
            <div>
                <div className='productHeader'>
                    <th key="1" onClick={(e) => this.arrowHandler(e)} className='headerSite' id='site' >Site <img className='arrowss' src={this._checkActiveSorting('site')}/></th>
                    <th key="2" onClick={(e) => this.arrowHandler(e)} className='headerClient' id='client' >Client <img className='arrowss' src={this._checkActiveSorting('client')}/></th>
                    <th key="3" onClick={(e) => this.arrowHandler(e)} className='headerProduct' id='product' >Product <img className='arrowss' src={this._checkActiveSorting('product')}/></th>
                    <th key="4" onClick={(e) => this.arrowHandler(e)} className='headerProductName' id='productName' >Description <img className='arrowss' src={this._checkActiveSorting('productName')}/></th>
                    <th key="5" style={{minWidth: 0, marginLeft: 0}} className='headerUom' onClick={(e) => this.arrowHandler(e)} id='uom' >UOM <img className='arrowss' src={this._checkActiveSorting('uom')}/></th>
                </div>
            </div>
            )
    }

    productBody = (props) => {
        return(
            <div>
                <div className='productListBody' style={{display:'flex'}}>
                    <td className='productList listSite' id='site'  key="1">{props.site}</td>
                    <td className='productList listClient' id='client'  key="2">{props.client}</td>
                    <td className='productList listProduct' id='product'  key="3">{props.product}</td>
                    <td className='productList listProductName' id='productName'  key="4">{props.product_name}</td>
                    <td className='productList listUom' id='uom' xs='3' key="5">{props.packdesc}</td>
                </div>
            </div>
            )
    }

   
    arrowHandler = (e) => {
        let id = e.currentTarget.id
        let activearrow = this.state
        this.setState({ activecolumnsort: id })
        if(this.state.activearrow == mid )
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
    
      _checkActiveSorting(header){ 
        if(header==this.state.activecolumnsort){ 
          if (this.state.activearrow == mid) {
            return up;
          }
    
          if (this.state.activearrow == up) {
            return down;
          }
    
          if (this.state.activearrow == down) {
            return up;
          }
        }else{
          return mid;
        }
      }
    
      sortby = (id) => {
        if(id == 'site')
        {
          this.setState({sort:!this.state.sort, sortparameter:'site'}, () =>
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if(id == 'client')
        {
          this.setState({sort:!this.state.sort, sortparameter:'client'}, () =>
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if(id == 'product')
        {
          this.setState({sort:!this.state.sort, sortparameter:'product'}, () =>
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if(id == 'productName')
        {
          this.setState({sort:!this.state.sort, sortparameter:'product_name'}, () =>
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if(id == 'uom')
        {
          this.setState({sort:!this.state.sort, sortparameter:'packdesc'}, () =>
          this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
      }
    
      sorting = (data, param, sort) => {
        data.sort((a,b) => {
          if(a[param] !== null && b[param] !== null)
          {
            if(sort == false)
          {
            if(a[param].toLowerCase() < b[param].toLowerCase()) return -1
            if(a[param].toLowerCase() > b[param].toLowerCase()) return 1
            return 0
          }
          else if(sort == true)
          {
            if(a[param].toLowerCase() < b[param].toLowerCase()) return 1
            if(a[param].toLowerCase() > b[param].toLowerCase()) return -1
            return 0
          }
          }
        })
        this.setState({data:data})
      }

    //   setSliceValue= (startIndex, endIndex) => {
    //     this.setState({startIndex:startIndex, endIndex:endIndex})
	// }

    onMouseEnter(){
        console.log();
    }

    _setSameHeight(product) {
        const height = document.querySelectorAll("[data-foo='"+product+"']").clientHeight; 
        console.clear();
        console.log(height);
    }

    
  setPagination = (result) => {
        let self = this;
        let respondRes = result;
        let totalPage = 0;
        console.log(result.data)
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

    headersExport = () =>{
        return(
            <div>
                <tr>
                                <th key="1" onClick={(e) => this.arrowHandler(e)} id='site' rowspan="2">Site </th>
                                <th key="2" onClick={(e) => this.arrowHandler(e)} id='client' rowspan="2">Client </th>
                                <th key="3" onClick={(e) => this.arrowHandler(e)} id='product' rowspan="2">Product </th>
                                <th key="4" onClick={(e) => this.arrowHandler(e)} id='productName' rowspan="2">Description</th>
                                <th key="5" onClick={(e) => this.arrowHandler(e)} id='uom' rowspan="2">UOM</th>
                                {/* <td>{this.productHeader()}</td> */}
                                { 
                                    this.state.dateArray.map(date =>
                                        {
                                            let dates = moment(date).format('DD MMMM YYYY')
                                            if(this.state.complete)
                                            {
                                                if(this.state.filterType == 'day')
                                                {
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                }
                                                else if(this.state.filterType == 'week')
                                                {
                                                    let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                                                    dates = moment(date).format('DD MMMM YYYY')
                                                    dates = dates + ' - ' + dates2
                                                }
                                                else if(this.state.filterType == 'month')
                                                {
                                                    dates = moment(date).format('MMMM YYYY')
                                                }
                                            }
                                            return(
                                            <div>
                                                <th colSpan="4" key="6" style={{textAlign:"center"}}>{dates}</th>
                                                
                                            </div>
                                            )
                                        }
                                            )
                                }
                            </tr>
                            <tr>
                                {this.state.dateArray.map((date, idx) => {
                                        return(
                                                <div style={{display:'flex',  borderBottom:'1px solid #d5d8da', color:'#3366FF'}}>
                                                    <th key="6" className='tet' xs='2'>SA+</th>
                                                    <th key="7" className='tet' xs='2'>SA-</th>
                                                    <th key="8" className='tet' xs='2'>Rec</th>
                                                    <th key="9" className='tet' xs='3'>Send</th>
                                                </div>
                                        )
                                     }) 
                                }
                            </tr>
                        </div>
                            
        )
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
		 return filename=("Stock_Movement." +date1 +"-"+ arrmonth[month] +"-"+ year+"."+Hours+"-"+Minutes+"-"+Seconds)  
	  }

	  ExportPDFName = () =>{
		let name= ""
		return name=("Stock Movement")
	  }
	
	  ExportHeader = () =>{
		let header = ["Site","Client","Product", "Description", "UOM",]
		return header
	  }
	
	  ExportData = () => {
		let data = this.state.data.map(elt=> [elt.site, elt.client, elt.product, elt.product_name, elt.packdesc, elt.detail.length]);
		return data
      }
      
    render(){
        if(this.state.pushTableComplete)
        {
            // this.pushData()
            this.sortData()
        }
        return(
            <div className={this.state.complete ? 'movementBody' : null}>
                <Container className="themed-container conts" fluid={true}> 
                <div className={'productData scrolly ' + (this.state.complete ? 'fades' : 'hidden')} style={{display:'flex'}}>
                    <table width='100%' align='left' >
                        <thead>
                            <tr>
                                <td style={{borderRight:'0px solid #ededed'}}>{this.productHeader()}</td>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.data.slice(this.state.startIndex,this.state.endIndex).map((data) => 
                                <tr  className={this._checkActiveHover(data.product)} style={{borderBottom:'1px solid #f5f5f5'}} onMouseEnter={() => this.hover('active',data.product)} onMouseLeave={() => this.hover('deactive',data.product)} >
                                <td height='50' style={{borderRight:'0px solid #ededed'}}>
                                    <this.productBody site={data.site} product={data.product} product_name={data.product_name} packdesc={data.packdesc} client={data.client}/>
                                </td>
                                </tr>
                            )
                            
                        }                            
                        </tbody>
                    </table>
                </div>             
                <div className={'movementData scrollx ' + (this.state.complete ? 'fades' : 'hidden')} style={{display:'flex'}}>
                    <table align='left' style={{width:'100%'}}>
                        <thead className='mvmntHead'>
                            <tr>
                                { 
                                    this.state.dateArray.map(date =>
                                        <td style={{paddingLeft:'1px',color:'#B4B9BB',borderRight:'1.5px solid #ededed',borderLeft:'0px solid #ededed',borderBottom:'1px solid #d5d8da'}}>{this.movementHeader(date)}</td>
                                            )
                                }
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'1rem'}} className='mvmntHead'>
                        { 
                            this.state.data.slice(this.state.startIndex,this.state.endIndex).map((data) =>

                                <tr  style={{borderBottom:'1px solid #f5f5f5'}}  onMouseEnter={() => this.hover('active',data.product)} onMouseLeave={() => this.hover('deactive',data.product)}  className={this._checkActiveHover(data.product)}>
                                {
                                    data.detail.map(detail =>
                                    <td key="6" height='50' width='15%' style={{borderRight:'1.5px solid #ededed',borderLeft:'0px solid #ededed'}}><this.tableMovement detail={detail}/></td>
                                        )

                                }
                                </tr>
                            )
                        }                            
                        </tbody>
                    </table>
                </div>
                    
                    <table width='100%' align='left' id="excel" className="d-none" >
                        <thead>
                            {this.headersExport()}
                        </thead>
                        <tbody>
                        {
                            this.state.data.map((data) =>
                                <tr style={{borderBottom:'1px solid #f5f5f5'}}>
                                
                                    <this.productBody site={data.site} product={data.product} product_name={data.product_name} packdesc={data.packdesc} client={data.client}/>
                                
                                {
                                    data.detail.map(detail =>
                                    <this.tableMovement detail={detail}/>
                                        )

                                }
                                </tr>
                            )
                        }                            
                        </tbody>
                    </table>          
                <div className={( this.state.complete ? 'hidden': 'spinner')}/>
                </Container>


                
                <div className=" p-0"  >
                  <div className='paginations '>
                      <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                              backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                              totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                              currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                              startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                              isActive={this.state.isActive}
                              numberEventClick={this.numberEventClick} />
                      {((this.state.data.length>0)?<ExportExcel ExportName={this.ExportName}/>:null)}
                  </div>
                </div>
            </div>
        )
    }
}

export default Movement
