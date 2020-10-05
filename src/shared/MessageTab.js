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
        const {module,status, back, orderNo, exit, role, name} = this.props
        
        let imgSrc = complete;
        let statusMessage = 'The ' + module + ' ' + orderNo + ' has successfully submitted for processing.'
        if(status === 'Successfully added') imgSrc = complete
        else imgSrc = attention

        
        if(status !== 'Successfully added') {
            statusMessage = 'The '+ (module == 'UM' ? 'user' : 'order') + ' that you tried to create could not be saved to the system.'
        }
        
        if(status == "No Internet Connection"){
            statusMessage = "Check your Internet Connection"
        }

        if(status == 200){
            statusMessage = "You have created a new " + role + " User for " + name + ". The " + role + " User " + name + " will receive an email shortly with their user ID and password to access the portal"
        }
        return (
            <Container className="px-5 py-4 tab-content">
                <Col className='pl-4 pb-4 mb-1'>
                  <i style={{color:"#cccccc"}} className={"img-msg " + ((status === 'Successfully added') || (status === 200) ? "msg-Icon_Complete" : status == "No Internet Connection" ? "msg-Icon_Reload" : " msg-Icon_Caution")}></i>
                  <div className='h1 bold text-gray-title font-2xl mt-2'>{(status !== 'Successfully added') && (status !== 200) ? 'Sorry' : ''}{status === "Successfully added" ? 'Success' : ''}{status === 200 ? 'Thank You' : ''}</div>
                  <div className='h4 text-gray w-75 msg-tab text-gray-md font-2xl'>
                    {statusMessage}
                    <span className='h4 text-gray w-50 font-2xl'>{(status === 'Successfully added') || (status === 200) ? null : 'Please try again.'}</span>
                  </div>
                  <Row className='flex justify-content-between align-items-center'>
                      {
                          (status === 'Successfully added') || (status === 200) ?
                          <button className='font-lg font-md font-sm btn mr-5 mb-4 ml-n2' style={{marginTop:"-20px"}} onClick={() => exit()}><i className="reset-done" style={{color: "#81efdd"}}></i></button>
                          :
                          status === "No Internet Connection" ? <button className='font-lg font-md font-sm btn mr-5 mb-4 ml-n2' style={{marginTop:"-20px"}} onClick={() => back()}><i className="reload_button" style={{color: "#fcb0b0"}}></i></button> : <button className='btn btn-primary mb-2' onClick={() => back()}>BACK</button>
                      }
                    
                    <div className='text-right vertical-middle h-fit-content e-text-color'>{`${(status === 'Successfully added') || (status === 200) ? 'Code 200' : 'Error Code 400'}`}</div>
                  </Row>
                </Col>
              </Container>
        )
    }
}