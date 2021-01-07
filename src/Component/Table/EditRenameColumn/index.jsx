import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Button, Container, Row, Col, Modal, Nav } from 'react-bootstrap'
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import {showColumn, saveEdit} from './services'
import './style.scss'

const EditRenameColumn = ({
    showModal,
    setShowMod,
    setEditColumnTemp,
    editColumnTemp,
    user,
    title,
    fields
}) => {
    const dispatch = useDispatch() 
    const [activeTab, setActiveTab] = useState(1)
    const [editColumn, setEditColumn] = useState({})
    const [sameColumnsIdx, setSameColumnsIdx] = useState({})
    
    const closeModal = (closeMod, editColumnTemp) => {
        setShowMod(closeMod)
        setEditColumnTemp(editColumnTemp)
    }

      
    function activeTabIndex(tab) {
        if (activeTab !== tab) {
          setActiveTab(tab)
        }
    }

    return (
      <Modal
        show={showModal}
        size='xl'
        centered
      >
        <Modal.Header className='bg-primary'>
          <Container className='px-0'>
            <Col className="mx-0">
              <Button
                onClick={closeModal.bind(this, false, editColumnTemp)}
                className="pr-0 mt-2 no-hover float-right"
              >
                <MdClose color='white' size={30} />
              </Button>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} className="pl-3 pt-4">
                <div className='d-flex'>
                  <FaRegEdit color='white' size={25} />
                  {' '}
                    &nbsp;
                  <span className='font-20 text-white'>Edit Column</span>
                </div>
                <span style={{ marginLeft: '29px' }} className='text-white'>
                  Show and hide the column according to your needs. Please select columns to show
                </span>
              </Col>
              
            </Col>
          </Container>
        </Modal.Header>
        <Modal.Body className='px-5 pt-3 pb-5'>
          <Row className={`mx-0 justify-content-between  ${  user.userLevel === 'Admin' ? 'mb-3' : ''}`}>
            <Col lg={6} className='text-primary font-20 p-0'>
              {title}
              {' '}
              Summary
            </Col>
            <Row className='align-items-center rename-columns mx-0 text-align-left'>
              <Nav tabs className="px-1">
                <div className='input-group'>
                  <NavItem className='pl-0 pr-0'>
                    <NavLink
                      className={`nav-link-cust tab-color${ activeTab === '1' ? ' tab-rename' : ''}`}
                      active={activeTab === '1'}
                      onClick={() => {activeTabIndex('1');}}
                    >
                      <div className='row rowTabCustom align-items-center'>
                        <span className='tabTitleText font-18'> 
                          {activeTab === '1'}
                          TOGGLE COLUMN
                        </span>
                      </div>
                    </NavLink>
                  </NavItem>

                  <NavItem className='pl-2 pr-0'>
                    <NavLink
                      className={`nav-link-cust tab-color${ activeTab === '2' ? ' tab-rename' : ''}`}
                      active={activeTab === '2'}
                      onClick={() => {
                            activeTabIndex('2');
                          }}
                    >
                      <div className='row rowTabCustom align-items-center'>
                        <span className='tabTitleText font-18'>
                          {activeTab === '2'}
                          {' '}
                          RENAME COLUMN
                        </span>
                      </div>
                    </NavLink>
                  </NavItem>
                </div>
              </Nav>
            </Row>
          </Row>
          <Row>
            <Col sm='12' md='12' lg='12' className="px-0">
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <Row xl={5} lg={10} className='mx-1 grid-col'>
                    {fields &&
                        fields.map((item, index) => {
                          return (
                            <Col key={index} className='p-2'>
                              <button
                                type
                                className={`text-left btn btn-block pl-2 ${
                                  !editColumn[index]
                                    ? 'btn-outline-primary'
                                    : 'btn-light-gray'
                                  }`}
                                onClick={showColumn.bind(
                                  this,
                                  item.accessor,
                                  index,
                                  fields.length,
                                  editColumn,
                                  setEditColumn
                                )}
                              >
                                {!editColumn[index] ? (
                                  <AiOutlineEye size={25} />
                                ) : (
                                    <AiOutlineEyeInvisible size={25} />
                                  )}
                                <b className='p-0'> {item.Header} </b>
                              </button>
                            </Col>
                          )})}
                  </Row>
                  <Col className="pt-5">
                    <Button
                      variant='primary'
                      className='px-3 float-right'
                      onClick={() => saveEdit({ editColumn, title, user, setEditColumnTemp, setShowModal: setShowMod, dispatch})}
                    >
                      SAVE
                    </Button>
                  </Col>
                </TabPane>
                <TabPane tabId='2'>
                  <Row xl={5} lg={10} className='mx-1 grid-col'>
                  {fields &&
                        fields.map((item, index) => {
                          return (
                            <div key={index} className='p-2'>
                             dddd
                            </div>
                          )
                        })}
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
}

export default EditRenameColumn