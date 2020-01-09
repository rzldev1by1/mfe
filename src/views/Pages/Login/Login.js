import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import AppComponent from '../../../AppComponent';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Row,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback
} from 'reactstrap';
import axios from 'axios';
import bg from '../../../assets/img/brand/bg.jpg';
import logo from '../../../assets/img/brand/logo_ml_large.png';
import centerLogo from '../../../assets/img/brand/Microlistics_WTG_White_Medium.png';
// import logo2 from '../../../assets/img/brand/logo_ml_w.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: {
                username: {
                    isValid: true,
                    message: ""
                },
                password: {
                    isValid: true,
                    message: ""
                }
            }
        }

        this.loginForm = React.createRef();
    }

    validateForm = () => {
        let isValid = true;
        let form = this.loginForm.current;
        let validState = this.state.valid;

        let usernameValidState = validState.username;
        usernameValidState.isValid = !form.username.value
            ? false
            : true;
        usernameValidState.message = !form.username.value
            ? "Username is required"
            : "";
        validState.username = usernameValidState;
        isValid = usernameValidState.isValid;

        let passwordValidState = validState.password;
        passwordValidState.isValid = !form.password.value
            ? false
            : true;
        passwordValidState.message = !form.password.value
            ? "Password is required"
            : "";
        validState.password = passwordValidState;
        isValid = passwordValidState.isValid;

        this.setState({valid: validState});
        return isValid;
    }

    authenticateUser = () => {
        if (this.validateForm()) {
			let form = this.loginForm.current;
			let usrIn = form.username.value;
            let pwdIn = form.password.value;
            // "userid":"MLS12345",
            // "password":"password"
            axios({
                method: 'post',
                url: AppComponent.getBaseUrl() + "userlogin",
                data: {
                    "userid": usrIn,
                    "password":pwdIn
                }
            })
            .then(res => {
              // console.log(res.data);
                localStorage.setItem("companyCode",res.data.data.companyCode);
                localStorage.setItem("userLevel",res.data.data.userLevel);
                localStorage.setItem('token',res.data.data.token);
                this
                    .props
                    .history
                    .push('/stock/stockholding')
            })
            .catch(function (error) {
                if(error)
                {
                    alert("Invalid Username/password");
                }
            });
            // if (form.username.value === "onebyonedev" && form.password.value === "onebyone") {
            //     this
            //         .props
            //         .history
            //         .push('/stockholding')
            // }
        }
    }

    render() {
        return (
            <div>
                <Container className="ml-0">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-lg-4 fullscreen-left pl-0 pr-0">
                            <Card
                                className="border-0"
                                style={{
                                height: '100%'
                            }}>
                                <CardBody>
                                    <img className="img-fluid" src={logo} width="240px" alt="Microlistics Web"/>
                                    <form
                                        className="mt-5"
                                        style={{
                                        bottom: "0",
                                        height: "100%"
                                    }}
                                        ref={this.loginForm}
                                        onSubmit={e => {
                                        e.preventDefault();
                                        this.authenticateUser()
                                    }}>
                                        <h2 className="titleMenu">
                                            <strong>Microlistics Web</strong>
                                        </h2>
                                        <p className="text-muted pb-5">Welcome back, please login to your account.</p>
                                        <InputGroup className="mb-4">
                                            <input
                                                type="text"
                                                className={"form-control input" + (this.state.valid.username.isValid
                                                ? ""
                                                : " is-invalid")}
                                                id="username"
                                                name="username"
                                                onChange={this.validateForm}
                                                autoComplete="off"/>
                                            <FormFeedback valid={this.state.valid.username.isValid}>{this.state.valid.username.message}</FormFeedback>
                                            <span className="bar"/>
                                            <label className="label">
                                                <strong>Username</strong>
                                            </label>
                                        </InputGroup>

                                        <InputGroup
                                            className={"mb-4" + (this.state.valid.password.isValid
                                            ? ""
                                            : " is-invalid")}>
                                            <input
                                                type="password"
                                                className={"form-control input" + (this.state.valid.password.isValid
                                                ? ""
                                                : " is-invalid")}
                                                id="password"
                                                name="password"
                                                onChange={this.validateForm}
                                                autoComplete="off"/>
                                            <FormFeedback valid={this.state.valid.password.isValid}>{this.state.valid.password.message}</FormFeedback>

                                            <span className="bar"></span>
                                            <label className="label">
                                                <strong>Password</strong>
                                            </label>
                                        </InputGroup>

                                        <Row>
                                            <Col xs="6">
                                                <input type="checkbox" className="inp-cbx d-none" id="cbx"/>
                                                <label className="cbx" htmlFor="cbx">
                                                    <span>
                                                        <svg viewBox="0 0 12 10" width="12px" height="10px">
                                                            <polyline points="1.5 6 4.5 9 10.5 1"/>
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
                                                <Button
                                                    className="btnLogin px-4"
                                                    color="primary"
                                                    onClick={this.authenticateUser}>
                                                    <strong>L O G I N</strong>
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <div className="contact-us">
                                                    <label>
                                                        <span>
                                                            Don't have an account?
                                                        </span>
                                                    </label>
                                                    <label className="ml-2">
                                                        <span className="blueLabel">
                                                            Contact Us
                                                        </span>
                                                    </label>
                                                    <h3 className="blueLabel">
                                                        help@microlistic.com.au
                                                    </h3>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-7 col-lg-8 fullscreen-right pl-0">
                            <div className="background-right-full h-100">
                                <div className="background-shadow h-100">
                                    <Row>
                                        <Col>
                                            <ul className="companyProfile">
                                                <li>
                                                    <label className="profTitle">Blog</label>
                                                </li>
                                                <li>
                                                    <label className="profTitle">Contact</label>
                                                </li>
                                                <li>
                                                    <label className="profTitle">Technology</label>
                                                </li>
                                                <li>
                                                    <label className="profTitle">About Us</label>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>

                                    <div className="row h-100">
                                        <div className="col align-self-center h-50">
                                            <div className="d-flex justify-content-center area-logo-shadow">
                                                <div></div>
                                                <div className="h-100 logo-shadow">
                                                    <img className="center-area-logo" src={centerLogo}/>
                                                </div>
                                                <div></div>
                                            </div>

                                        </div>
                                    </div>

                                    <Row className="float-left copyright-section">
                                        <Col>
                                            <label className="pl-5 whiteLabel">
                                                © Microlistics Logistics {new Date().getFullYear()}
                                            </label>
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Login;
