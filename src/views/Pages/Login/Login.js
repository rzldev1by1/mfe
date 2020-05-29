import React, { Component } from 'react'
import Authentication from '../../../Auth/Authentication'
import Logo from '../../../assets/img/brand/LOGO.png'
// import videobg from '../../assets/img/brand/microlisticsvideos.mp4'

import './Login.css'

class Logins extends Component {
    state = {
        formValidation: {
            username: true,
            password: true
        },
        emailValidation:true,
        errorMessage: "",
        isLoad: false,
        forgotPassword:false
    }

    validateForm = (e) => {
        e.preventDefault()        
        let errorMessage = ''
        if(!this.state.forgotPassword)
        {
            this.setState({ isLoad: true })
            const username = e.target.username.value
            const password = e.target.password.value
            if (username && password) {
                const payload = { "userid": username, "password": password }
                const auth = new Authentication()
                auth.authenticationHandler(payload).then(result => {
                    if (result.isSuccess) {
                        this.props.history.push(result.url)
                        // this.props.history.push("/stock/stockholding")
                        return
                    } else {
                        errorMessage = result.message
                    }
                    this.setState({ isLoad: false, errorMessage, formValidation: { username: true, password: true } })
                })
            } else {
                let formValidation = {
                    username: username.length ? true : false,
                    password: password.length ? true : false,
                }
                if (!password) {
                    errorMessage = "Password is required"
                }
                if (!username) {
                    errorMessage = "Username is required"
                }
                if (!username && !password) {
                    errorMessage = "Username and Password are required"
                }
                this.setState({ isLoad: false, formValidation, errorMessage })

            }
        }

        if(this.state.forgotPassword){
            this.setState({ isLoad: true })
            const email = e.target.email.value
            if(email.length === 0)
            {
                this.setState({emailValidation:false, isLoad:false})
            }
        }
    }

    changeFormHanlder = () => {
        this.setState({forgotPassword: !this.state.forgotPassword})
    }

    loginForm(errorMessage, formValidation){
        return(
            <form className={"offset-lg-1 " + (this.state.forgotPassword ? 'form-hidden' : 'form-show')} onSubmit={this.validateForm}>
                        <div className="card">
                            <div className="card-body">
                                <img src={Logo} className="logo mb-5" alt="mlslogo" />
                                <input className={'form-control  inputLogin ' + (formValidation.username ? "" : " is-invalid")}
                                    type="text" name="username"
                                    placeholder="Enter your username here" />
                                <br />
                                <input className={'form-control inputLogin ' + (formValidation.password ? "" : " is-invalid")}
                                    type="password" name="password"
                                    placeholder="Enter your password here"
                                />
                                <div className={'error ' + (errorMessage ? ' alertFadeIn' : '')}>
                                    {errorMessage && <div><span className="iconU-i" /> {errorMessage}</div>}
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <button type="submit" className="btn btn-primary btn-login col-12">
                                            {this.state.isLoad ? <i className="loader fa fa-refresh fa-2x fa-spin" /> : "Login"}
                                        </button>
                                    </div>
                                    <div className="col-sm-8 mt-3">
                                        <span className='form-login-change' onClick={() => this.changeFormHanlder()}>Forgot Password ?</span>
                                    </div>
                                </div>
                                <div className="links mt-3">
                                    <a href="#privacy">Privacy and Policy</a>
                                    <span> &nbsp; | &nbsp; </span>
                                    <a href="#terms">Terms and Conditions</a>
                                </div>
                            </div>
                        </div>
                        <div className="copyright offset-lg-1 mt-5">
                            <a target='blank' href='https://www.microlistics.com.au/'>© Microlistics {new Date().getFullYear()}</a>
                        </div>
                    </form>
        )
    }

    forgotPasswordForm(errorMessage, formValidation){
        return(
            <form className={"offset-lg-1 " + (this.state.forgotPassword ? 'form-show' : 'form-hidden')} onSubmit={this.validateForm}>
                        <div className="card">
                            <div className="card-body">
                                <img src={Logo} className="logo mb-5" alt="mlslogo" />
                                <input className={'form-control  inputLogin ' + (this.state.emailValidation ? "" : " is-invalid")}
                                    type="text" name="email"
                                    placeholder="Enter your email address here" />
                                    <span className='email-message'>Enter your email address to find your acccount</span>
                                    <input className={'form-control  inputLogin form-hidden '}
                                    type="text" name="none"
                                    placeholder="Enter your email address here" />
                                <div className={'error ' + (errorMessage ? ' alertFadeIn' : '')}>
                                    {errorMessage && <div><span className="iconU-i" /> {errorMessage}</div>}
                                </div>
                                <div className="row"> 
                                    <div className="col-sm-4 white-space">
                                        <button type="submit" className="btn btn-primary btn-login col-12">
                                            {this.state.isLoad ? <i className="loader fa fa-refresh fa-2x fa-spin " /> : "Send"}
                                        </button>
                                    </div>
                                    <div className="col-sm-8 mt-3">
                                        <span className='form-login-change' onClick={() => this.changeFormHanlder()}>Login page</span>
                                    </div>
                                </div>
                                <div className="links mt-3">
                                    <a href="#privacy">Privacy and Policy</a>
                                    <span> &nbsp; | &nbsp; </span>
                                    <a href="#terms">Terms and Conditions</a>
                                </div>
                            </div>
                        </div>
                        <div className="copyright offset-lg-1 mt-5">
                            <a target='blank' href='https://www.microlistics.com.au/'>© Microlistics {new Date().getFullYear()}</a>
                        </div>
                    </form>
        )
    }

    render() {
        const { errorMessage, formValidation } = this.state
        return (
            <div className="login">
                <div className="container-fluid">
                    {
                        this.state.forgotPassword ? this.forgotPasswordForm(errorMessage, formValidation) : this.loginForm(errorMessage, formValidation)
                    }
                </div>
            </div>
        )
    }
}

export default Logins
