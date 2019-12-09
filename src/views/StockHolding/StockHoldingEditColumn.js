import React, { Component } from 'react';
import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import './StockHoldingEditColumn.css';

export default class SalesOrderEditColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalClose: false
        };
        this.columnForm = React.createRef();
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            this.setEnableElements();
		}
    }

    onClickUpdateTable = () => {
        let columns = this.props.fields.map((element) => {
            element.isVisible = this.columnForm.current[element.id].checked;
            return element;
        });
        this.props.updateTableColumn(columns);
        this.props.toggle();
	}

    modalClose = () => {
        this.setState((prevState) => {
			return { modalClose: !prevState.modalClose }
		});
	}

    setEnableElements = () => {
        // let form = this.columnForm.current;

        // let totalCheckedCheckbox = this.props.fields.reduce((acc, cur) => {
        //     return (form[cur.id].checked ? 1 : 0) + acc;
        // }, 0);

        // this.props.fields.forEach((item, idx) => {
        //     if(item.id === 'orderId') return;
        //     form[item.id].disabled = totalCheckedCheckbox >= 10 && !form[item.id].checked;
        //     // form[item.id].disabled = totalCheckedCheckbox === 1 && form[item.id].checked;
        // });
	}

    render() {
        return (
			<Modal className="modal-company animated fadeIn editcol-modal" isOpen={(this.state.modalClose === true) ? !this.props.isOpen : this.props.isOpen}
					   toggle={this.props.toggle} backdrop="static" style={{ maxWidth: "1200px", width: "1000px" }}>
                <ModalHeader tag="div" className="editcol-header">
                  <div className="row">
                    <div className="col-10">
                        <h3><strong>Edit Columns</strong></h3>
                        <p className="d-block mb-0 p-0">Please select column to show</p>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btnclose-modal circle float-right" onClick={this.props.toggle}>
                          <i class="fa fa-times"></i>
                        </button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                    <div className="container-fluid px-4">
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
                                    <button type="button" className="btn btn-primary btn-editcol" onClick={this.onClickUpdateTable}>Update Table</button>
                                </div>
                            </div>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
