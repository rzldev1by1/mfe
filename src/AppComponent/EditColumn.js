import React, { Component } from 'react';
import {
    Col, Row,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import './EditColumn.css';

import iconedit from '../assets/img/brand/modal_create.png'
import eyeactive from '../assets/img/brand/eyeactive.png'
import eyeinactive from '../assets/img/brand/eyeinactive.png'

export default class SalesOrderEditColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newColumn: []
        }
        this.columnForm = React.createRef();
        let modulTitle = "";
    }

    componentDidUpdate() {
        // if (this.props.isOpen) {
        //     this.setEnableElements();
        // }
    }

    onClickUpdateTable = () => {
        // console.clear()
        // let columns = this.props.fields.map((element) => { 
        //     element.isVisible = document.getElementById(element.id).value
        //     return element;
        // });
        this.props.updateTableColumn(this.state.newColumn);
        this.props.toggle();
    }

    setEnableElements = (idx) => {
        let newColumn = this.props.fields
        let active = newColumn[idx].isVisible
        newColumn[idx].isVisible = !active
        this.setState({ newColumn: newColumn });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onBackdropPress={() => this.setState({ showmodal: false })}>
                <div className="ge-edit-column-modal">
                <ModalHeader className="edit-column-modal-header">
                    <div className='main-modal'>
                        <div className='edit-column-modal-header'>
                            <div className='edit-column-modal'>
                                <img src={iconedit} />
                                <div className='edit-column-modal-title'>Edit Column</div>
                            </div>
                            <span className='btnclose-modal-edit' onClick={this.props.toggle}>
                                <i
                                    className="iconU-close"
                                    style={{ fontSize: "25px" }}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <div>Show and hide the column according to your needs. Please select 5 to 10 columns to show.</div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    {/* <div className="container-fluid px-2">
                        <Row>
                            <Col xs="12">
                                <form ref={this.columnForm}>
                                    <div className="form-row">
                                        {this.props.fields.map((item, idx) => (
                                            <div className="form-group col-12 col-sm-6 col-md-4 mb-1" key={item.id}>
                                                <div className="form-check">
													<label className="check-text">
														<input type="checkbox" className="eye"
																id={item.id} name={item.id}
																defaultChecked={item.isVisible} value={item.value}
																disabled={item.isDisabled}
																onChange={this.setEnableElements} />
														<span className="glyphicon glyphicon-eye-open checked" />
														<span className="glyphicon glyphicon-eye-close unchecked" />
														{item.checkboxLabelText}
													</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <div className="col-12">
                                <div className="footer-button">
                                    <button type="button" className="btn btn-primary btn-editcol" onClick={this.onClickUpdateTable}>Update Column</button>
                                </div>
                            </div>
                        </Row>
                    </div> */}


                    <label className='edit-column-modal-font'>{this.props.modulName}</label>
                    <div className="grid-container-edit-column-modal">


                        {this.props.fields.map((data, idx) => {
                            return (
                                <div key={idx}
                                    onClick={() => this.setEnableElements(idx)}
                                    className={"grid-item-edit-column-modal " + (data.isVisible ? 'edit-column-modal-active' : 'edit-column-modal-inactive')}>
                                    <img src={data.isVisible ? eyeactive : eyeinactive} alt=''/>
                                    {data.checkboxLabelText}
                                    <input type="checkbox" className="eye"
                                        id={data.id} name={data.id}
                                        defaultChecked={data.isVisible} value={this.props.fields[idx].isVisible}
                                        disabled={data.isDisabled}
                                        // onChange={this.setEnableElements} 
                                        hidden="hidden" />
                                </div>
                            )
                        })}
                    </div>
                    <Row className="mt-4">
                        <div className="col-12">
                            <div className="footer-button">
                                <button type="button" className="btn btn-primary btn-editcol" onClick={this.onClickUpdateTable}> Save </button>

                            </div>
                        </div>
                    </Row>
                </ModalBody>
                </div>
            </Modal>
        )
    }
}
