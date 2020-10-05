import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './MessageTab.css'
import attention from '../assets/img/Attention.png'
import complete from '../assets/img/Complete.png'
import error from '../assets/img/Error.png'

export default class MessageTab extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {module,status, back, orderNo, exit} = this.props
        
        let imgSrc = complete;
        let statusMessage = 'The ' + module + ' ' + orderNo + ' has successfully submitted for processing.'
        if(status === 'Successfully added') imgSrc = complete
        else imgSrc = attention

        
        if(status !== 'Successfully added') 
        statusMessage = 'The order that you tried to create could not be saved to the system.'
        return (
            <Container className="px-5 py-4 tab-content">
                <Col className='pl-4 pb-4 mb-1'>
                  <img src={imgSrc} alt='message' className='img-msg'/>
                  <div className='h1 bold text-gray-title'>{status === 'Successfully added' ? 'Success' : 'Sorry'}</div>
                  <div className='h4 text-gray w-50 msg-tab text-gray-md'>
                    {statusMessage}
                    <span className='h4 text-gray w-50'>{status === 'Successfully added' ? null : 'Please try again.'}</span>
                  </div>
                  <Row className='flex justify-content-between align-items-center'>
                      {
                          status == 'Successfully added' ?
                          <button className='btn btn-green mb-2' onClick={() => exit()}>DONE</button>
                          :
                          <button className='btn btn-primary mb-2' onClick={() => back()}>BACK</button>
                      }
                    
                    <div className='text-right vertical-middle h-fit-content e-text-color'>{`${status !== 'Successfully added' ? 'Error Code 400' : 'Code 200'}`}</div>
                  </Row>
                </Col>
              </Container>
        )
    }
}