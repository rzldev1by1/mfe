import React from 'react';
import  { Button, CardBody, Row, FormGroup, InputGroup } from 'reactstrap';

import create from '../assets/img/brand/button_create@2x.png';

const HeaderTitle = (props) => {
    return (
        <div className="col-12 col-lg-12 col-md-12 col-sm-12 headerSection">
            <CardBody className="pl-0 pb-0">
                <Row className="align-items-center">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <FormGroup>
                            <InputGroup>
                                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                    <h2 className="headerTitle">{props.headerTitle}</h2>
                                </div>
                            </InputGroup>
                        </FormGroup>
                    </div>
                </Row>
            </CardBody>
            <Button className={props.createButton ? "btnCreate" : "d-none"} color="primary" onClick={props.triggerModalAdd}>
                <img src={create} alt="create" className="createLogo" />
                <strong>Create</strong>
            </Button>
        </div>
    );
}

export default HeaderTitle;