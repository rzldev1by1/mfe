import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios';
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import moment from 'moment';
class Movement extends Component {
    constructor(props){
        super(props)

        this.state = {
            data:[],            
            startDate:'2019-01-01',
            endDate:'2019-12-30',
            filterType:'month',
            dateArray:[],
            dataArray:[],
            complete:false
        }
    }

    componentDidMount(){
        this.getData()
        this.pushTable()
    }

    getData = () => {
        axios.get(endpoint.stockMovement + '?startDate='+this.state.startDate+'&endDate='+this.state.endDate+'&filterType='+this.state.filterType, {
        headers: headers
        })
        .then(res => {
        const result = res.data.data
        this.setState({ data:result, complete:true })
        })
        .catch(error => {
        // this.props.history.push("/logins")
        })
    }

    searchData = (start, end, period,complete) =>{
        this.setState({startDate:start, endDate:end, filterType:period, complete:complete})
        this.getData()
        this.pushTable()
        this.props.isComplete(this.state.complete)
    }

    tableMovement = (props) => {
        return(
        <div style={{display:'flex'}}>
            <div className='tet' xs='2'>{props.detail.sa_plus ? props.detail.sa_plus : '-'}</div>
            <div className='tet' xs='2'>{props.detail.sa_minus ? props.detail.sa_minus : '-'}</div>
            <div className='tet' xs='2'>{props.detail.recv_weight ? props.detail.recv_weight : '-'}</div>
            <div className='tet' xs='3'>{props.detail.send_weight ? props.detail.send_weight : '-'}</div>
        </div>
        )
    }

    pushTable = () => {
        let dateArray = []
        let startDate = moment(this.state.startDate)
        let endDate = moment(this.state.endDate)
        while(startDate <= endDate)
        {  
            let newDate = startDate.format('YYYY-MM-DD')
            dateArray.push(newDate)
            startDate.add(1, 'M')   
        }
        this.setState({dateArray:dateArray})
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
        return(
        <div>
            <div style={{textAlign:"center"}}>{moment(date).format('MMMM YYYY')}</div>
            <div style={{display:'flex'}}>
            <div className='tet' xs='2'>SA+</div>
            <div className='tet' xs='2'>SA-</div>
            <div className='tet' xs='2'>Rec</div>
            <div className='tet' xs='3'>Send</div>
        </div>
        </div>
        )
    }

    render(){
        this.pushData()
        this.sortData()
        return(
            <Container className="themed-container conts" fluid={true}>              
               <Col className={'cont scrollx ' + (this.state.complete ? 'fades' : 'hidden')} style={{display:'flex'}}>
               
                <table align='left' style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <td height='50' rowSpan='2'>Site</td>
                            <td rowSpan='2'>Product</td>
                            <td rowSpan='2'>Description</td>
                            <td rowSpan='2'>UOM</td>
                            { 
                                this.state.dateArray.map(date =>
                                    <td style={{borderRight:'1.5px solid #E2E2E2',borderLeft:'1.5px solid #E2E2E2'}}>{this.movementHeader(date)}</td>
                                        )
                            }
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.data.map((data) => 
                            <tr style={{borderBottom:'1px solid #E2E2E2'}}>
                            <td height='60'>{data.site}</td>
                            <td>{data.product}</td>
                            <td>{data.product_name}</td>
                            <td>{data.packdesc}</td>
                            {
                                data.detail.map(detail =>
                                <td style={{borderRight:'1.5px solid #E2E2E2',borderLeft:'1.5px solid #E2E2E2'}}><this.tableMovement detail={detail}/></td>
                                    )

                            }
                            </tr>
                        )
                    }                            
                    </tbody>
                </table>
               </Col>
               <div className={( this.state.complete ? 'hidden': 'spinner')}/>
            </Container>
        )
    }
}

export default Movement