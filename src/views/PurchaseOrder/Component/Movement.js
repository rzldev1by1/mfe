import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios';
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import moment from 'moment';
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
class Movement extends Component {
    constructor(props){
        super(props)

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
            sortparameter:null,
            siteSP:mid,
            clientSP:mid,
            productSP:mid,
            productNameSP:mid,
            uomSP:mid,
            sort:true,

            //pagonation
            startIndex:0,
			endIndex:3

        }
    }

    componentDidMount(){
        this.getData()
        this.pushTable()
    }

    getData = (start, end, period) => {
        this.props.isComplete(false)
        this.setState({complete:false, activearrow:mid, sort:true})
        let dtStart = start ? start : this.state.startDate
        let dtEnd = end ? end : this.state.endDate
        let periods = period ? period : this.state.filterType
        axios.get(endpoint.stockMovement + '?startDate='+dtStart+'&endDate='+dtEnd+'&filterType='+periods, {
        headers: headers
        })
        .then(res => {
        const result = res.data.data
        this.setState({ data:result, complete:true, filterType:periods})
        this.props.isComplete(true)
        this.props.data(result)
        })
        .catch(error => {
        // this.props.history.push("/logins")
        })
    }

    tableMovement = (props) => {
        return(
        <div style={{display:'flex'}}>
            <td className='tet' xs='2'>{props.detail.sa_plus ? props.detail.sa_plus : '-'}</td>
            <td className='tet' xs='2'>{props.detail.sa_minus ? props.detail.sa_minus : '-'}</td>
            <td className='tet' xs='2'>{props.detail.recv_weight ? props.detail.recv_weight : '-'}</td>
            <td className='tet' xs='3'>{props.detail.send_weight ? props.detail.send_weight : '-'}</td>
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
            <div style={{textAlign:"center"}}>{dates}</div>
            <div style={{display:'flex',  borderBottom:'1px solid #d5d8da', color:'#22ABE3'}}>
                <th className='tet' xs='2'>SA+</th>
                <th className='tet' xs='2'>SA-</th>
                <th className='tet' xs='2'>Rec</th>
                <th className='tet' xs='3'>Send</th>
            </div>
        </div>
        )
    }

    productHeader = () => {
        return(
            <div>
                <div className='productHeader'>
                    <th onClick={(e) => this.arrowHandler(e)} id='site' >Site <img className='arrowss' src={this.state.activearrow}/></th>
                    <th onClick={(e) => this.arrowHandler(e)} id='client' >Client <img className='arrowss' src={this.state.activearrow}/></th>
                    <th onClick={(e) => this.arrowHandler(e)} id='product' >Product <img className='arrowss' src={this.state.activearrow}/></th>
                    <th onClick={(e) => this.arrowHandler(e)} id='productName' >Description <img className='arrowss' src={this.state.activearrow}/></th>
                    <th onClick={(e) => this.arrowHandler(e)} id='uom'>UOM <img className='arrowss' src={this.state.activearrow}/></th>
                </div>
            </div>
            )
    }

    productBody = (props) => {
        return(
            <div>
                <div className='productListBody' style={{display:'flex'}}>
                    <td className='productList' id='site' >{props.site}</td>
                    <td className='productList' id='client' >{props.client}</td>
                    <td className='productList' id='product' >{props.product}</td>
                    <td className='productList' id='productName' >{props.product_name}</td>
                    <td className='productList' id='uom' xs='3'>{props.packdesc}</td>
                </div>
            </div>
            )
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

      setSliceValue= (startIndex, endIndex) => {
        this.setState({startIndex:startIndex, endIndex:endIndex})
	}

    render(){
        if(this.state.pushTableComplete)
        {
            this.pushData()
            this.sortData()
        }
        return(
            <div className={this.state.complete ? 'movementBody' : null}>
                <Container className="themed-container conts" fluid={true}> 
                <div className={'productData scrolly ' + (this.state.complete ? 'fades' : 'hidden')} style={{display:'flex'}}>
                    <table width='100%' align='left' >
                        <thead>
                            <tr>
                                <td  style={{borderRight:'1.5px solid #ededed'}}>{this.productHeader()}</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.slice(this.state.startIndex,this.state.endIndex).map((data) =>
                                <tr style={{borderBottom:'1px solid #f5f5f5'}}>
                                <td height='50' style={{borderRight:'1.5px solid #ededed'}}>
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
                                        <td style={{paddingLeft:'1px',color:'#B4B9BB',borderRight:'1.5px solid #ededed',borderLeft:'1.5px solid #ededed'}}>{this.movementHeader(date)}</td>
                                            )
                                }
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'1rem'}} className='mvmntHead'>
                        {
                            this.state.data.slice(this.state.startIndex,this.state.endIndex).map((data) =>
                                <tr style={{borderBottom:'1px solid #f5f5f5'}}>
                                {
                                    data.detail.map(detail =>
                                    <td height='50' width='15%' style={{borderRight:'1.5px solid #ededed',borderLeft:'1.5px solid #ededed'}}><this.tableMovement detail={detail}/></td>
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
                            <tr>
                                <td>{this.productHeader()}</td>
                                { 
                                    this.state.dateArray.map(date =>
                                        <td>{this.movementHeader(date)}</td>
                                            )
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.slice(this.state.startIndex,this.state.endIndex).map((data) =>
                                <tr style={{borderBottom:'1px solid #f5f5f5'}}>
                                <td>
                                    <this.productBody site={data.site} product={data.product} product_name={data.product_name} packdesc={data.packdesc} client={data.client}/>
                                </td>
                                {
                                    data.detail.map(detail =>
                                    <td><this.tableMovement detail={detail}/></td>
                                        )

                                }
                                </tr>
                            )
                        }                            
                        </tbody>
                    </table>          
                <div className={( this.state.complete ? 'hidden': 'spinner')}/>
                </Container>
            </div>
        )
    }
}

export default Movement
