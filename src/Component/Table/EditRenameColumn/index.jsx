import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Button, Container, Row, Col, Modal, Nav } from 'react-bootstrap';
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { showColumn, saveEdit, changedColumn, renameSubmit, headerRename } from './services';
import './style.scss';

const EditRenameColumn = ({
  showModal,
  setShowMod,
  setEditColumnTemp,
  editColumnTemp,
  user,
  title,
  fields,
  columnHidden,
  setFields,
  splitModule,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    error: {},
    sameColumns: [],
    sameColumnsIdx: [],
    editColumn: [],
    activeTab: '1',
    changedColumns: [],
    products: [],
    columnsPayload: [],
  });
  const closeModal = (closeMod, editColumnTemp) => {
    const ErrorClose = { ...state };
    setShowMod(closeMod);
    setEditColumnTemp(editColumnTemp);
    ErrorClose.error = {};
    ErrorClose.sameColumnsIdx = [];
    setState(ErrorClose);
  };
  const Required = ({ error, id }) => {
    if (error) {
      const object = Object.keys(error);
      if (object.includes(id))
        return <span className="text-error text-danger position-absolute font-rename-error">{error && error[id]}</span>;
      else return <div></div>;
    }
  };

  const UrlHeader = () => {
    return `/settings/field-label/${splitModule}?client=ALL`;
  };

  const UrlAll = () => {
    return `/settings/field-label/${splitModule}?client=all`;
  };

  useEffect(() => {
    let newState = { ...state };
    newState.editColumn = columnHidden || [];
    setState(newState);
  }, [columnHidden]);

  // useEffect(() => {  },[state.editColumn])
  useEffect(() => {
    headerRename({ UrlHeader, state, setState, fields, setFields });
  }, []);

  function activeTabIndex(tab) {
    if (state.activeTab !== tab) {
      let newState = { ...state };
      newState.activeTab = tab;
      setState(newState);
    }
  }
  return (
    <Modal show={showModal} size="xl" centered>
      <Modal.Header className="bg-primary">
        <Container className="px-0">
          <Col className="mx-0 pr-4 pb-3">
            <Button onClick={closeModal.bind(this, false, editColumnTemp)} className="pr-0 mt-2 no-hover float-right">
              <MdClose color="white" size={30} />
            </Button>
            <Col xs={10} sm={10} md={10} lg={10} xl={10} className="pl-3 pt-4">
              <div className="d-flex">
                <FaRegEdit color="white" size={25} /> &nbsp;
                <span className="font-20 text-white">Edit Column</span>
              </div>
              <span style={{ marginLeft: '29px' }} className="text-white">
                Show and hide the column according to your needs. Please select columns to show.
              </span>
            </Col>
          </Col>
        </Container>
      </Modal.Header>
      <Modal.Body className="px-5 pt-3 half-padding">
        <Row className={`mx-0 justify-content-between  ${user.userLevel === 'Admin' ? 'mb-3' : ''}`}>
          <Col lg={6} className="text-primary font-20 p-0 d-flex align-items-center">
            {title}
          </Col>
          <Row className="align-items-center rename-columns mx-0 text-align-left">
            <Nav tabs className="px-1">
              <div className="input-group">
                <NavItem className="pl-0 pr-0">
                  <NavLink
                    className={`nav-link-cust d-flex align-items-center tab-color${
                      state.activeTab === '1' ? ' tab-rename' : ''
                    }`}
                    active={state.activeTab === '1'}
                    onClick={() => {
                      activeTabIndex('1');
                    }}
                  >
                    <div className="row rowTabCustom align-items-center">
                      <span className="tabTitleText font-18">
                        {state.activeTab === '1'}
                        TOGGLE COLUMN
                      </span>
                    </div>
                  </NavLink>
                </NavItem>

                <NavItem className="pl-2 pr-0">
                  <NavLink
                    className={`nav-link-cust d-flex align-items-center tab-color${
                      state.activeTab === '2' ? ' tab-rename' : ''
                    }`}
                    active={state.activeTab === '2'}
                    onClick={() => {
                      activeTabIndex('2');
                    }}
                  >
                    <div className="row rowTabCustom align-items-center">
                      <span className="tabTitleText font-18">{state.activeTab === '2'} RENAME COLUMN</span>
                    </div>
                  </NavLink>
                </NavItem>
              </div>
            </Nav>
          </Row>
        </Row>
        <Row>
          <Col sm="12" md="12" lg="12" className="px-0">
            <TabContent activeTab={state.activeTab}>
              <TabPane tabId="1">
                <Row xl={5} lg={10} className="mx-1 grid-col">
                  {fields &&
                    fields.map((item, index) => {
                      return (
                        <Col key={index} className="p-2">
                          <button
                            type
                            className={`text-left btn btn-block pl-2 ver-center-item ${
                              !state.editColumn?.includes(item.accessor) ? 'btn-outline-primary' : 'btn-light-gray'
                            }`}
                            onClick={() =>
                              showColumn({
                                header: item.accessor,
                                length: fields.length,
                                setState,
                                state,
                              })
                            }
                          >
                            {!state.editColumn?.includes(item.accessor) ? (
                              <AiOutlineEye size={25} />
                            ) : (
                              <AiOutlineEyeInvisible size={25} />
                            )}
                            <b className="p-0 pl-1"> {item.Header} </b>
                          </button>
                        </Col>
                      );
                    })}
                </Row>
                <Col className="pt-5">
                  <Button
                    variant="primary"
                    className="float-right"
                    style={{ padding: '0rem 1.08rem' }}
                    onClick={() =>
                      saveEdit({ state, title, user, setEditColumnTemp, setShowModal: setShowMod, dispatch })
                    }
                  >
                    SAVE
                  </Button>
                </Col>
              </TabPane>
              <TabPane tabId="2">
                <Row xl={5} lg={10} className="mx-1 grid-col">
                  {fields &&
                    fields.map((item, index) => {
                      return (
                        <div key={index} className="p-2">
                          <input
                            id={index}
                            autoComplete="off"
                            placeholder={item.placeholder}
                            name={item.Header}
                            sortable={item.sortable}
                            onChange={(e) => changedColumn({ e, state, setState, fields })}
                            className={
                              'text-left form-rename' +
                              (state.sameColumnsIdx?.includes(index.toString()) ? ' input-danger' : '')
                            }
                          />
                        </div>
                      );
                    })}
                </Row>
                <Col className="pt-5">
                  {fields &&
                    fields.map((item) => {
                      return <Required id={item.Header} error={state.error} />;
                    })}
                  <Button
                    variant="primary"
                    className="px-3 float-right"
                    onClick={() => renameSubmit({ state, setState, setShowMod, UrlAll, fields, setFields })}
                  >
                    DONE
                  </Button>
                </Col>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EditRenameColumn;
