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
            startDate:'2019-07-15',
            endDate:'2019-09-30',
            dateArray:[],
            dataArray:[]
        }
    }

    componentDidMount(){
        this.getData()
        this.pushTable()
    }

    getData = () => {
        axios.get(endpoint.stockMovement + '?startDate=2019-01-15&endDate=2019-09-30&filterType=month', {
        headers: headers
        })
        .then(res => {
        const result = res.data.data
        this.setState({ data:result })
        })
        .catch(error => {
        // this.props.history.push("/logins")
        })
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
        let dateArray = ['2019-01-15']
        let startDate = moment('2019-01-15')
        let endDate = moment('2019-09-30')
        let startMonth = startDate.format('M')
        let endMonth = endDate.format('M')
        while(startMonth < endMonth)
        {
            startDate.add(1, 'M')          
            let newDate = startDate.format('YYYY-MM-DD')
            dateArray.push(newDate)
            startMonth++
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
        console.log(this.state.data)
    }

    movementHeader = (date) => {
        return(
        <div>
            <div>{date}</div>
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
      
        return(
            <Container className="themed-container conts" fluid={true}>
              
               <Col className='cont scrollx' style={{display:'flex'}}>
               { this.pushData()}
               { this.sortData()}
                {/* <Col xs='4'>
                    <Row>
                        <Col xs='1' className='tablez'>Site</Col>
                        <Col xs='2' className='tablez'>Product</Col>
                        <Col xs='4' className='tablez'>Description</Col>
                        <Col xs='2' className='tablez'>UOM</Col>
                    </Row>

                    {
                            this.state.data.map((data) => 
                                <Row>
                                    <Col xs='1' className='tablez'>{data.site}</Col>
                                    <Col xs='2' className='tablez'>{data.product}</Col>
                                    <Col xs='4' className='tablez'>{data.product_name}</Col>
                                    <Col xs='2' className='tablez'>{data.packdesc}</Col>
                                    <Col display='flex'>
                                    {
                                            data.detail.map(detail =>
                                                <Col display='flex'> <this.tableMovement detail={detail}/> </Col>
                                                
                                                        )
                                    }
                                    </Col>
                                </Row>
                            )
                        }      
                     */}
                    


                <table align='left' style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <td height='50' rowSpan='2'>Site</td>
                            <td rowSpan='2'>Product</td>
                            <td rowSpan='2'>Description</td>
                            <td rowSpan='2'>UOM</td>
                            { 
                                this.state.dateArray.map(date =>
                                    <td>{this.movementHeader(date)}</td>
                                        )
                            }
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.data.map((data) => 
                            <tr style={{borderBottom:'1px solid grey'}}>
                            <td height='60'>{data.site}</td>
                            <td>{data.product}</td>
                            <td>{data.product_name}</td>
                            <td>{data.packdesc}</td>
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
               </Col>
            </Container>
        )
    }
}

export default Movement