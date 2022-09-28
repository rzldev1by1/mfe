import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Button, Container, Row, Col, Modal, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import PopUpResetTable from '../../Modal/PopUpResetTable';
import endpoints from '../../../helpers/endpoints';
import {
  showColumn,
  saveEdit,
  changedColumn,
  renameSubmit,
  headerRename,
  resetColumnName,
  resetColumnTable,
} from './services';
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
    templateHeader: [],
  });
  const closeModal = (closeMod) => {
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
      return <div> </div>;
    }
    return false;
  };

  const currentOrderColumn = localStorage.getItem(`tables__${module}__${user.name}`);
  const templateColumn = [];
  fields.forEach((fieldsData) => {
    templateColumn.push(fieldsData.accessor);
  });
  const version = endpoints.env.REACT_APP_API_URL_VERSION;
  const UrlHeader = () => {
    return `/${version}/settings/field-label/${splitModule}?client=ALL`;
  };

  const UrlAll = () => {
    return `/${version}/settings/field-label/${splitModule}?client=all`;
  };

  useEffect(() => {
    const newState = { ...state };
    newState.editColumn = columnHidden || [];
    if (JSON.stringify(currentOrderColumn) === JSON.stringify(templateColumn) || currentOrderColumn === null) {
      newState.disableBtn = true;
    }
    setState(newState);
  }, [columnHidden]);

  // useEffect(() => {  },[state.editColumn])
  useEffect(() => {
    headerRename({ UrlHeader, state, setState, fields, setFields, data });
  }, [data]);

  function activeTabIndex(tab) {
    if (state.activeTab !== tab) {
      const newState = { ...state };
      newState.activeTab = tab;
      setState(newState);
    }
  }

  function resetConfirmation() {
    if (modalReset === false) {
      setShowMod(false);
      setModalReset(true);
    } else {
      setShowMod(true);
      setModalReset(false);
    }
  }

  const renderTooltip = ({ props, msg }) => (
    <Tooltip id="button-tooltip-reset" {...props}>
      {msg}
    </Tooltip>
  );

  const renderTooltipRename = ({ props, header, defaults, id, name }) => (
    <Tooltip
      id={`${header !== defaults ? 'button-tooltip-input-rename' : 'tooltip-input-rename-none'}`}
      {...props}
      onClickCapture={() => changedColumn({ state, setState, fields, defaults, id, name })}
    >
      Default: <span>{defaults}</span>
    </Tooltip>
  );

  let isChanged = fields?.filter(fieldsData => fieldsData.Header !== fieldsData.placeholder)
  isChanged = isChanged?.length === 0

  const dataMode = darkMode?.map(d => { return d.dark_mode })
  return (
    <div>
      <Modal show={showModal} size="xl" centered>
        <Modal.Header className={`${dataMode == "1" ? 'customDarkModes' : 'bg-primary'} modal-radiusH p-0`}>
          <Container className="px-0">
            <Row className="mx-0 px-0" style={{ height: "140px" }}>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} className="pl-4 align-items-center d-flex">
                <div className="d-flex">
                  <div className="pr-2 align-items-center d-flex">
                    <i className="ri-draft-line ri-2x pr-1" />
                    <span className="font-20" style={{ fontWeight: "600", color: "#FFF" }}>{title}</span>&nbsp;
                  </div>
                  <div className="v-rename" />
                  <div className="pl-2 pt-1">
                    <span className="font-20 text-white">Edit Column</span>
                    <span className="text-white d-flex"> Please select columns to {state.activeTab === '2' ? 'rename' : 'show'}.</span>
                  </div>
                </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} className={`justify-content-end d-flex ${dataMode == "1" ? 'rename-img-drak' : 'rename-img'}`}>
                <Row>
                  <Col onClick={closeModal.bind(this, false, editColumnTemp)} className="justify-content-end d-flex" style={{ cursor: "pointer" }}>
                    <i className="ri-close-line ri-3x" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body className={`${dataMode == "1" ? 'DarkModesEditRename ' : ' '} modal-radiusB p-3`}>
          <Row className={`mx-0 justify-content-between  ${user.userLevel === 'Admin' ? 'mb-2' : ''}`}>
            <Row className="align-items-center rename-columns mx-0 text-align-left px-1">
              <Nav tabs className="px-1">
                <div className="input-group">
                  <NavItem className="pl-0 pr-0">
                    <NavLink
                      className={`nav-link-cuts d-flex align-items-center tab-color ${state.activeTab === '1' ? ' tab-rename' : ''
                        }`}
                      active={state.activeTab === '1'}
                      onClick={() => {
                        activeTabIndex('1');
                      }}
                    >
                      <div className="row align-items-center">
                        <span className="font-18">
                          {state.activeTab === '1'}
                          TOGGLE COLUMN
                        </span>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className="pl-2 pr-0">
                    <NavLink
                      className={`nav-link-cuts d-flex align-items-center tab-color${state.activeTab === '2' ? ' tab-rename' : ''
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
                      fields.map((item) => {
                        return (
                          <Col key={item.accessor} className="p-2">
                            <button
                              type="button"
                              className={`text-left btn btn-block pl-2 ver-center-item ${!state.editColumn?.includes(item.accessor) ? 'btn-outline-primary' : 'btn-light-gray'
                                }`}
                              onClick={() =>
                                showColumn({
                                  header: item.accessor,
                                  length: fields.length,
                                  setState,
                                  state,
                                })}
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
                            resetColumnTable({
                              module,
                              user,
                              editColumnTemp,
                              fields,
                              state,
                              setState,
                              dragStatus,
                              dispatch,
                            })}
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
                      onClick={() => saveEdit({ state, title, user, setEditColumnTemp, setShowModal: setShowMod, dispatch })}
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
                          <div key={item.accessor} className="p-2">
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
                                onChange={(e) => changedColumn({ e, state, setState, fields })}
                                className={`text-left form-rename ${state.sameColumnsIdx?.includes(index.toString()) ? ' input-danger' : ''}`}
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
                            resetColumnTable({
                              module,
                              user,
                              editColumnTemp,
                              fields,
                              state,
                              setState,
                              dragStatus,
                              dispatch,
                            })}
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
          splitModule={splitModule}
        />
      )}
    </div>
  );
};

export default EditRenameColumn;
