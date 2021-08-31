import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Button, Container, Row, Col, Modal, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { showColumn, saveEdit, changedColumn, renameSubmit, headerRename, resetColumnName, resetColumnTable } from './services';
import PopUpResetTable from 'Component/Modal/PopUpResetTable'
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
  module,
  data
}) => {
  const dispatch = useDispatch();
  const reorder = useSelector((state) => state.reorder);
  const darkMode = useSelector((state) => state.darkModeMLS);
  const dragStatus = useSelector((state) => state.dragStatus);
  const [modalReset, setModalReset] = useState(false);
  const [state, setState] = React.useState({
    error: {},
    sameColumns: [],
    sameColumnsIdx: [],
    editColumn: [],
    activeTab: '1',
    changedColumns: [],
    products: [],
    columnsPayload: [],
    disableBtn: false,
    modConfirmation: false,
    newName: '',
    currentHeader: [],
    templateHeader: []
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
        return <span className="text-danger position-absolute font-rename-error">{error && error[id]}</span>;
      else return <div></div>;
    }
  };

  const currentOrderColumn = localStorage.getItem(`tables__${module}__${user.name}`)
  let templateColumn = []
  const newState = { ...state };
  let currentHeaders = []
  let templateHeaders = []
  fields.map((data) => {
    templateColumn.push(data.accessor)
  });

  const version = process.env.REACT_APP_API_URL_VERSION;
  const UrlHeader = () => {
    return `${version}/settings/field-label/${splitModule}?client=ALL`;
  };

  const UrlAll = () => {
    return `${version}/settings/field-label/${splitModule}?client=all`;
  };

  useEffect(() => {
    let newState = { ...state };
    newState.editColumn = columnHidden || [];
    if (JSON.stringify(currentOrderColumn) === JSON.stringify(templateColumn) || currentOrderColumn === null) {
      newState.disableBtn = true
    }
    setState(newState);
  }, [columnHidden]);

  // useEffect(() => {  },[state.editColumn])
  useEffect(() => {
    headerRename({ UrlHeader, state, setState, fields, setFields, data });
  }, [data]);

  function activeTabIndex(tab) {
    if (state.activeTab !== tab) {
      let newState = { ...state };
      newState.activeTab = tab;
      setState(newState);
    }
  }

  function resetConfirmation() {
    if (modalReset === false) {
      setShowMod(false);
      setModalReset(true)
    } else {
      setShowMod(true);
      setModalReset(false)
    }
  }

  const renderTooltip = ({ props, msg }) => (
    <Tooltip id="button-tooltip-reset" {...props}>
      {msg}
    </Tooltip>
  );

  const renderTooltipRename = ({ props, header, defaults, changedColumn, state, setState, fields, id, name }) => (
    <Tooltip id={`${header !== defaults ? "button-tooltip-input-rename" : "tooltip-input-rename-none"}`} {...props} onClickCapture={() => changedColumn({ state, setState, fields, defaults, id, name })}>
      Default: <span>{defaults}</span>
    </Tooltip>
  );

  let isChanged = fields?.filter(data => data.Header !== data.placeholder)
  isChanged = isChanged?.length ? false : true
  return (
    <div>
      <Modal show={showModal} size="xl" centered>
        <Modal.Header className={`${darkMode ? 'customDarkModes' : 'bg-primary'}`}>
          <Container className="px-0">
            <Col className="mx-0 px-0">
              <div onClick={closeModal.bind(this, false, editColumnTemp)} className={`${darkMode ? 'drakClose ' : ''} pr-0 pt-0 pb- float-right `} style={{ cursor: "pointer" }}>
                <MdClose color="white" size={30} />
              </div>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} className="pl-1">
                <div className="d-flex">
                  <FaRegEdit color="white" size={25} /> &nbsp;
                  <span className="font-20" style={{ color: '#A6BCFC' }}>{title}:</span>&nbsp;
                  <span className="font-20 text-white">Edit Column</span>
                </div>
                <span style={{ marginLeft: '29px' }} className="text-white">
                  Please select columns to {state.activeTab === '2' ? 'rename' : 'show'}.
                </span>
              </Col>
            </Col>
          </Container>
        </Modal.Header>
        <Modal.Body className={`${darkMode ? 'DarkModesEditRename ' : ' '} p-3`}>
          <Row className={`mx-0 justify-content-between  ${user.userLevel === 'Admin' ? 'mb-2' : ''}`}>
            <Row className="align-items-center rename-columns mx-0 text-align-left">
              <Nav tabs className="px-1">
                <div className="input-group">
                  <NavItem className="pl-0 pr-0">
                    <NavLink
                      className={`nav-link-cust d-flex align-items-center tab-color${state.activeTab === '1' ? ' tab-rename' : ' tes'}`}
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
                      className={`nav-link-cust d-flex align-items-center tab-color${state.activeTab === '2' ? ' tab-rename' : ' tes'
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
          <Row className="px-2 content-edit">
            <Col sm="12" md="12" lg="12" className="px-0">
              <TabContent activeTab={state.activeTab}>
                <TabPane tabId="1">
                  <Row xl={5} lg={10} className="mx-0 grid-col">
                    {fields &&
                      fields.map((item, index) => {
                        return (
                          <Col key={index} className="p-2">
                            <button
                              type
                              className={`text-left btn btn-block pl-2 ver-center-item ${!state.editColumn?.includes(item.accessor) ? 'btn-outline-primary' : 'btn-light-gray'
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
                  <Col className="pt-2 px-2 d-flex justify-between">
                    <Col className="p-0">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({
                          msg: 'Every value that has been renamed by the User will reset to the system default.'
                        })}
                        className="reset-button"
                      >
                        <Button
                          variant="primary"
                          style={{ padding: '0rem 1.08rem', marginRight: '1rem' }}
                          onClick={user.userLevel === 'Admin' ? () => { resetConfirmation() } : () => { resetColumnName({ user, splitModule }) }}
                          className={!isChanged ? '' : "btn-disabled"}
                          disabled={isChanged}
                        >
                          RESET COLUMN NAME
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({
                          msg: 'Every value that has been arranged by the User will be reset to the system default.'
                        })}
                        className="reset-button"
                      >
                        <Button
                          variant="primary"
                          style={{ padding: '0rem 1.08rem' }}
                          onClick={() =>
                            resetColumnTable({ module, user, editColumnTemp, fields, state, setState, dragStatus, dispatch })
                          }
                          disabled={!dragStatus}
                          className={!dragStatus ? "btn-disabled" : ""}
                        >
                          RESET COLUMN ORDER
                        </Button>
                      </OverlayTrigger>
                    </Col>
                    <Button
                      variant="primary"
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
                  <Row xl={5} lg={10} className="mx-0 grid-col">
                    {fields &&
                      fields.map((item, index) => {
                        return (
                          <div key={index} className="p-2">
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 3000 }}
                              overlay={renderTooltipRename({ header: item.Header, defaults: item.placeholder, changedColumn, state, setState, fields, id: index, name: item.Header })}
                            >
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
                            </OverlayTrigger>
                          </div>
                        );
                      })}
                  </Row>
                  <Col className="pt-2 px-2 d-flex justify-between">
                    <Col className="p-0">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({
                          msg: 'Every value that has been renamed by the User will reset to the system default.'
                        })}
                        className="reset-button"
                      >
                        <Button
                          variant="primary"
                          style={{ padding: '0rem 1.08rem', marginRight: '1rem' }}
                          onClick={user.userLevel === 'Admin' ? () => { resetConfirmation() } : () => { resetColumnName({ user, splitModule }) }}
                          className={!isChanged ? '' : "btn-disabled"}
                          disabled={isChanged}
                        >
                          RESET COLUMN NAME
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({
                          msg: 'Every value that has been arranged by the User will be reset to the system default.'
                        })}
                        className="reset-button"
                      >
                        <Button
                          variant="primary"
                          style={{ padding: '0rem 1.08rem' }}
                          onClick={() =>
                            resetColumnTable({ module, user, editColumnTemp, fields, state, setState, dragStatus, dispatch })
                          }
                          disabled={!dragStatus}
                          className={!dragStatus ? "btn-disabled" : ""}
                        >
                          RESET COLUMN ORDER
                        </Button>
                      </OverlayTrigger>
                    </Col>
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
      {!modalReset ? null : (
        <PopUpResetTable
          modal={modalReset}
          setModalReset={setModalReset}
          resetConfirmation={resetConfirmation}
          resetColumnName={resetColumnName}
          user={user}
          splitModule={splitModule} />
      )}
    </div>
  );
};

export default EditRenameColumn;
