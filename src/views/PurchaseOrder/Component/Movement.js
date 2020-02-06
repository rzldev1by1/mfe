import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios';
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
class Movement extends Component {
    constructor(props){
        super(props)

        this.state = {
            data:[],
            startDate:'2019-07-15',
            endDate:'2019-09-30'
        }
    }

    componentDidMount(){
        this.getData()
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
        console.log(props.data)
        return(
        <div style={{display:'flex'}}>
            <Col xs='5'>{props.detail.date ? props.detail.date : '-'}</Col>
            <Col xs='2'>{props.detail.sa_plus ? props.detail.sa_plus : '-'}</Col>
            <Col xs='2'>{props.detail.sa_minus ? props.detail.sa_minus : '-'}</Col>
            <Col xs='2'>{props.detail.recv_weight ? props.detail.recv_weight : '-'}</Col>
            <Col xs='3'>{props.detail.send_weight ? props.detail.send_weight : '-'}</Col>
        </div>
        )
    }

    render(){
        console.log(this.state.data)
        return(
            <Container className="themed-container conts" fluid={true}>
               <Row className='cont scrollx'>
                <Col xs='4'>
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
                                    {
                                        data.detail.map(detail =>
                                            <Col xs='auto'><this.tableMovement detail={detail}/></Col>
                                                )
                                    }
                                    
                                </Row>
                            )
                        }      
                    
                    


                {/* <table align='left' style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <td height='50' rowSpan='2'>Site</td>
                            <td rowSpan='2'>Product</td>
                            <td rowSpan='2'>Description</td>
                            <td rowSpan='2'>UOM</td>
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
                </table> */}
                </Col>
                <Col>
                    sdfds
                </Col>
                    
               </Row>
            </Container>
        )
    }
}

export default Movement