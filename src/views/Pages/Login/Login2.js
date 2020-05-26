import React, {Component} from 'react';
// import { Button, FormFeedback } from 'reactstrap';
// import axios from 'axios';
// import AppComponent from '../../../AppComponent';
import Authentication from '../../../Auth/Authentication';
import centerLogo from '../../../assets/img/brand/login_microlisticslogo@2x.png';
import videobg from '../../../assets/img/brand/microlisticsvideos.mp4';

import './Login.css'

class Logins extends Component{
    constructor(props) {
        super(props);

        this.state = {
            usernameClass: "form-control logininput inputWrap",
            passwordClass: "form-control logininput inputWrap",
            usernameValid: true,
            passwordValid: true,
            errorMessage: "",

            loginClicked: false,
            isLoad: false
        };
        this.loginForm = React.createRef();
    }

    authenticateUser = () => {
        let self = this;
        self.setState({ isLoad: true });

        let form = this.loginForm.current;
        let username = form.username.value;
        let password = form.password.value;
        let payload = {
            "userid": username,
            "password": password
        };
        
        (new Authentication()).authenticationHandler(payload)
        .then(result => {
            self.setState({ isLoad: false,
                            usernameValid: false, passwordValid: false,
                            errorMessage: result.message });

            if (result.isSuccess) {
                self.props.history.push("/stock/stockholding");
            }
        })
    }

    onInputChange = () => {
        this.setState({ loginClicked: false,
                        usernameValid: true, passwordValid: true,
                        usernameClass: "form-control logininput inputWrap",
                        passwordClass: "form-control logininput inputWrap" });
    }

    alertComponent = () => {
        if (this.state.loginClicked && this.state.errorMessage !== "") {
            return (
                <div className="alertFadeIn" style={{ display: "flex" }}>
                    <span className="iconU-i" />
                    <div style={{ marginLeft: "0.5%" }}>{this.state.errorMessage}</div>
                </div>
            );
        } else {
            return <div className="errormessage" />;
        }
    }

    validateForm = () => {
        let isValid = true;
        this.setState({ loginClicked: true,
                        usernameValid: true, passwordValid: true,
                        errorMessage: "" });

        let form = this.loginForm.current;
        let username = form.username.value;
        let password = form.password.value;


        if (!username) {
            this.setState({ usernameValid: false,
                            errorMessage: "Username is required" });
            isValid = false;
        }

        if (!password) {
            this.setState({ passwordValid: false,
                            errorMessage: "Password is required" });
            isValid = false;
        }

        if (!username && !password) {
            this.setState({ usernameValid: false,
                            passwordValid: false,
                            errorMessage: "Username and Password are required" });
            isValid = false;
        }


        if (isValid) {
            this.authenticateUser();
        }
    }

    render() {             
        return (
            <div className="background fontstyle">
                <video autoPlay muted loop id="bgvideo">
                    <source src={videobg} type="video/mp4" />
                </video>
                <div className="leftSide content">
                    <img src={centerLogo} className="mlslogo" alt="mlslogo" />
                    <form ref={this.loginForm} onSubmit={(e) => { e.preventDefault(); this.validateForm() }}>
                        <div className="loginInput">
                            <div style={{ marginBottom: "2%" }}>
                                <h1>Login</h1>
                            </div>

                            <input type="text" className={this.state.usernameClass + (this.state.usernameValid ? "" : " is-invalid")}
                                    id="username" name="username"
                                    onChange={this.onInputChange}
                                    placeholder="Username" />

                            <br/>

                            <input type="password" className={this.state.passwordClass + (this.state.passwordValid ? "" : " is-invalid")}
                                    id="password" name="password"
                                    onChange={this.onInputChange}
                                    placeholder="Password" />

                            <this.alertComponent />
                            <button className={"btnLogin " + (this.state.isLoad ? "text-center" : "text-left pl-4")} onClick={this.validateForm}>
                                {this.state.isLoad ? <i className="loader fa fa-refresh fa-2x fa-spin iconSpace" /> : "Login"}
                            </button>
                            
                            <div className="footer">
                                <div>© Microlistics Logistics {new Date().getFullYear()}</div>
                                <div style={{ width: "78%", float: "right" }}>help@microlistics.co.au</div>
                            </div>              
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Logins
