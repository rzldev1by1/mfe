import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import ModuleAccess from '../ModuleAccess'
import Site from '../Site'
import Client from '../Client'
import axios from 'axios'
import endpoint from '../../../helpers/endpoints'
import * as utility from '../UmUtility'
import { FormFeedback } from 'reactstrap'

const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class NewUser extends React.PureComponent {

    state = {
        sites: [],
        client: [],
        moduleAccess: [],
        validation: {
            "name": { isValid: true, invalidClass: "is-invalid" },
            "email": { isValid: true, invalidClass: "is-invalid" }
          },
    }

    componentDidMount() {
        
    }

    checkMail = async (email) => {
        const { data } = await axios.post(endpoint.userManagementCheckMailValidation,{email:email});
        console.log(data);
    }

    checkEmailValidation = (textmail) => {     
           
        const {users} = this.props;
        let validation = { ...this.state.validation };
        //  this.checkMail(textmail);
         let isValidUser = users.filter((item)=>{return item.email === textmail}).length > 0?false:true;
         let validFormat = !textmail.match(regexMail)?false:true;
        validation.email["isValid"] = (isValidUser && validFormat)?true:false;           
        return validation;
      }
    checkNameValidation = (textName) => {     
           
        const {users} = this.props;
        let validation = { ...this.state.validation };
         
        validation.name["isValid"] = textName === ""?false:true;
        return validation;
      }

      onEmailChange = (e) => {
          let validation = this.checkEmailValidation(e.target.value);
          this.props.onChangeEmail(e);
          this.setState({validation:validation});
      }
      onNameChange = (e) => {
          let validation = this.checkNameValidation(e.target.value);          
          this.props.onChangeName(e);
          this.setState({validation:validation});
      }

      onNext = () => {
          const {user} = this.props;
          let validation = {...this.state.validation};;
         
        let emailValid = this.checkEmailValidation(user.email);
        let nameValid = this.checkNameValidation(user.name);
        validation.email = emailValid.email;
        validation.name = nameValid.name;

        if(emailValid.email["isValid"] && nameValid.name["isValid"])
            this.props.next('review');

            this.setState({validation:validation})
      }


    render() {
        const { isAdmin, user, onModuleEnableClick, onSiteEnableClick, onClientEnableClick,
            moduleAccess, sites, clients, isEnableAllSite, isEnableAllClient, isEnableAllModule,
            onModuleEnableAllClick, onClientEnableAllClick, onSiteEnableAllClick } = this.props;
        const { validation } = this.state;
        return (
            <Container className="px-5 pt-4 pb-5">
                <Row>
                    <Col lg="2" className="pr-0">
                        <h3 className="text-primary font-20 um-text-webgroup">New User</h3>
                    </Col>
                    <Col lg="10" className="pl-0">
                        <Row>
                            <Col lg="4" md="4" sm="12" className="pl-0">
                                <label className="webgroup d-flex justify-content-between">
                                    <input type="checkbox" onChange={(e) => { this.props.onWebGroupSelect(e); }} />
                                    <span className={`flex-fill ${isAdmin ? " webgroup-notactive" : " webgroup-active"}`}>REGULAR USER</span>
                                    <span className={`flex-fill ${isAdmin ? " webgroup-active" : " webgroup-notactive"}`}>ADMIN USER</span>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col sm="4">
                        <label className="mb-0 text-muted">User ID</label>
                    </Col>
                    <Col sm="4">
                        <label className="mb-0 text-muted">Email</label>
                    </Col>
                    <Col sm="4">
                        <label className="mb-0 text-muted">Name</label>
                    </Col>

                </Row>

                <Row>
                    <Col sm="4">
                        <input type="text" name="userid" readOnly className="form-control" value={user.userId} />
                        <div>
                            <span className="text-title font-sm">Auto Generated</span>
                        </div>
                    </Col>
                    <Col sm="4">
                        <input type="email" name="email" placeholder="Enter an email address" className={`form-control ${validation.email["isValid"]? '':validation.email["invalidClass"]}`} onChange={(e) => { this.onEmailChange(e); }} value={user.email || ''} />
                        <FormFeedback className="invalid-error-padding">
                            invalid email
                        </FormFeedback>
                    </Col>
                    <Col sm="4">
                        <input type="text" name="userName" placeholder="Enter a username" maxLength="60" className={`form-control ${validation.name["isValid"]?'':validation.name["invalidClass"]}`} onChange={(e) => { this.onNameChange(e); }} value={user.name || ''} />
                        <FormFeedback>
                            username required
                        </FormFeedback>
                    </Col>
                </Row>
                <Row className={`mt-3 ${isAdmin ? 'd-none' : ''}`}>

                    <Col className="col-12">
                        <h3 className="text-primary font-20">System</h3>
                    </Col>

                </Row>
                <Row className={`${isAdmin ? 'd-none' : ''}`}>
                    <Col lg="4">
                        <ModuleAccess moduleAccess={moduleAccess} onEnableClick={onModuleEnableClick} onModuleEnableAll={onModuleEnableAllClick} isEnableAllModule={isEnableAllModule} />
                    </Col>
                    <Col lg="4">
                        <Site sites={sites} onEnableClick={onSiteEnableClick} onSiteEnableAll={onSiteEnableAllClick} isEnableAllSite={isEnableAllSite} />
                    </Col>
                    <Col lg="4">
                        <Client clients={clients} onEnableClick={onClientEnableClick} onClientEnableAll={onClientEnableAllClick} isEnableAllClient={isEnableAllClient} />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={2}></Col>
                    <Col lg={8}></Col>
                    <Col lg={2} className="text-right">
                        <button className="btn btn-primary font-lg" onClick={(e) => { this.onNext(); }}>{'NEXT'}</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewUser;