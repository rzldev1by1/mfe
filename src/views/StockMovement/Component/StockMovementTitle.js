import React, { Component } from 'react';
import { CardBody, Row, FormGroup, InputGroup} from 'reactstrap';
import './StyleSheet/StockMovementTitle.css';

class StockMovementTitle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: ''
      }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                    <CardBody>
                        <Row className="align-items-center">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                                <FormGroup>
                                    <InputGroup>
                                        <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                            <h4 className="headerTitle">Stock Movement</h4>
                                        </div>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </Row>
                    </CardBody>
                </div>
            </div>
        )
      }
  }
export default StockMovementTitle;
