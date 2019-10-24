import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, 
		 Card, CardBody, CardGroup,
		 Col, Row, 
		 Container, Form,
		 Input, InputGroup, InputGroupAddon, InputGroupText,
		 FormFeedback } from 'reactstrap';
import bg from '../../../assets/img/brand/bg.jpg';
import logo from '../../../assets/img/brand/logo_ml_large.png';
// import logo2 from '../../../assets/img/brand/logo_ml_w.png';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			valid: {
				username: { isValid: true, message: "" },
				password: { isValid: true, message: "" }
			}
		}

		this.loginForm = React.createRef();
	}

	validateForm = () => {
		let isValid = true;
		let form = this.loginForm.current;
		let validState = this.state.valid;

		let usernameValidState = validState.username;
		usernameValidState.isValid = !form.username.value ? false : true;
		usernameValidState.message = !form.username.value ? "Username is required" : "";
		validState.username = usernameValidState;
		isValid = usernameValidState.isValid;

		let passwordValidState = validState.password;
		passwordValidState.isValid = !form.password.value ? false : true;
		passwordValidState.message = !form.password.value ? "Password is required" : "";
		validState.password = passwordValidState;
		isValid = passwordValidState.isValid;

		this.setState({ valid: validState });
		return isValid;
	}

	authenticateUser = () => {
		if (this.validateForm()) {
			let form = this.loginForm.current;

			if (form.username.value === "onebyonedev" && form.password.value === "onebyone") {
				this.props.history.push('/stockholding')
			}
		}
	}

    render() {
        return (
        <div className="app flex-row" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover'}}>
            <Container className="ml-0">
                <Row className="justify-content h-100">
                    <Col className="pl-0 pr-0" md="5" sm="12">
                        <CardGroup className="h-100">
                            <Card className="p-4" style={{ borderRadius: 0, width: '' }}>
                                <CardBody>
                                    <img className="img-fluid" src={logo} width="240px" alt="Microlistics Web" />
                                    <form className="pt-5" ref={this.loginForm} onSubmit={e => { e.preventDefault() ; this.authenticateUser() }}>
                                        <h2 className="titleMenu">
											<strong>Microlistics Web</strong>
										</h2>
                                        <p className="text-muted pb-5">Welcome back, please login to your account.</p>
                                        <InputGroup className="mb-4">
											<input type="text" className={"form-control input" + (this.state.valid.username.isValid ? "" : " is-invalid")}
													id="username" name="username"
													onChange={this.validateForm} autoComplete="off" />
											<FormFeedback valid={this.state.valid.username.isValid}>{this.state.valid.username.message}</FormFeedback>

                                            <span className="bar" />
                                            <label className="label">
												<strong>Username</strong>
											</label>
                                        </InputGroup>

                                        <InputGroup className={"mb-4" + (this.state.valid.password.isValid ? "" : " is-invalid")}>
											<input type="password" className={"form-control input" + (this.state.valid.password.isValid ? "" : " is-invalid")}
													id="password" name="password"
													onChange={this.validateForm} autoComplete="off" />
											<FormFeedback valid={this.state.valid.password.isValid}>{this.state.valid.password.message}</FormFeedback>

                                            <span className="bar"></span>
                                            <label className="label">
												<strong>Password</strong>
											</label>
                                        </InputGroup>

                                        <Row>
                                            <Col xs="6">
                                                <input type="checkbox" className="inp-cbx d-none" id="cbx" />
                                                <label className="cbx" htmlFor="cbx">
                                                    <span>
                                                        <svg viewBox="0 0 12 10" width="12px" height="10px">
                                                            <polyline points="1.5 6 4.5 9 10.5 1" />
                                                        </svg>
                                                    </span>
                                                    <span className="rememberMe">Remember Me</span>
                                                </label>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button className="btnForgotPwd px-0" color="link">Forgot Password?</Button>
                                            </Col>
                                        </Row>
                                        <Row className="pt-5">
                                            <Col xs="6">
                                                <Button className="btnLogin px-4" color="primary" onClick={this.authenticateUser}>
													<strong>L O G I N</strong>
												</Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                    <Col md="7">
                        {/* <div className="logo-box d-none d-sm-block">
							<img className="img-fluid" src={logo2} width="240px" />
						</div>    */}
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}

export default Login;
