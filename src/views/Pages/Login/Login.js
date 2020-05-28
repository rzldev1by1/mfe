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
        errorMessage: "",
        isLoad: false
    }

    validateForm = (e) => {
        e.preventDefault()
        this.setState({ isLoad: true })
        let errorMessage = ''
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

    render() {
        const { errorMessage, formValidation } = this.state
        return (
            <div className="login">
                <div className="container-fluid">
                    <form className="offset-lg-1" onSubmit={this.validateForm}>
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
                                        <a href="#forgot">Forgot Password ?</a>
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
                </div>
            </div>
        )
    }
}

export default Logins
