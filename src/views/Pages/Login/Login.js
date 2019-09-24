import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import bg from '../../../assets/img/brand/bg.png'
import logo from '../../../assets/img/brand/logo_ml_large.png'

class Login extends Component {
  render() {
    return (
      <div className="app flex-row" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover'}}>
        <Container style={{marginLeft: 0}}>
          <Row className="justify-content h-100">
            <Col md="5" sm="12" style={{paddingLeft: 0, paddingRight: 0}}>
              <CardGroup className="h-100">
                <Card className="p-4" style={{borderRadius: 0, width: ''}}>
                  <CardBody>
                    <img src={logo} width="240px" className="img-fluid" />
                    <Form style={{paddingTop: '60px'}}>
                      <h2 style={{fontFamily: 'Nunito', color: '#388DCD'}}><b>Microlistics Web</b></h2>
                      <p className="text-muted" style={{paddingBottom: '37px'}}>Welcome back, please login to your account.</p>
                      <InputGroup className="mb-3">
                        <input type="text" className="input" required="required"/>
                        <span class="bar"></span>
                        <label className="label"><b>Username</b></label>
                      </InputGroup>
                      <InputGroup className="mb-4" style={{marginTop: '29px'}}>
                        <input type="password" className="input" required="required"/>
                        <span class="bar"></span>
                        <label className="label"><b>Password</b></label>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        <input className="inp-cbx" id="cbx" type="checkbox" style={{display: 'none'}}/>
                          <label className="cbx" for="cbx">
                            <span>
                              <svg width="12px" height="10px" viewbox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                              </svg>
                            </span>
                            <span style={{color: '#919191'}}>Remember Me</span>
                          </label>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" style={{color: '#919191', textDecoration: 'none', marginTop: '-6px'}}>Forgot password?</Button>
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '45px'}}>
                        <Col xs="6">
                          <Button color="primary" className="px-4" style={{borderRadius: "33px", backgroundColor: '#388DCD', borderColor: '#388DCD', width: '135px'}}>Login</Button>
                        </Col>
                      </Row>
                      <Row>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
            <Col md="7">
              <div class="logo-box d-none d-sm-block"></div>   
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
