import _ from 'lodash'
import React from 'react'
import ReactTable from 'react-table-v6'
import { Button, Container, Row, Col, Modal,Nav, NavItem, NavLink, TabPane, TabContent  } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import { FaRegEdit, FaPencilAlt } from 'react-icons/fa'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import CustomPagination from 'shared/table/CustomPagination'
import 'react-table-v6/react-table.css'
import './CustomTable.css'

// automatic column width
const getColumnWidth = (rows, accessor, headerText) => {
  const cellLength = Math.max(
    ...rows.map(row => {
      let value = '';
      if (typeof accessor === 'string') {
        value = _.get(row, accessor);
      } else {
        value = accessor(row);
      }
      if (typeof value === 'number') return value.toString().length;
      return (value || '').length;
    }),
    headerText.length
  );
  return cellLength * 12
}

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editColumn: {},
      editColumnTemp: {},
      activeTab: "1",
    }
  }
  activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}

  showModal = (show) => {
    this.setState({ showModal: show })
  }

  closeModal = (close, editColumnTemp) => {
    this.setState({ showModal: close, editColumn: editColumnTemp })
  }

  showColumn = (header, index, length) => {
    const { editColumn } = this.state
    let max = (length - Object.keys(editColumn).length) > 1
    let hide = editColumn[index] === undefined

    if (hide && max) {
      // hide column
      let obj = {
        [index]: header
      }

      let addColumn = {
        ...editColumn,
        ...obj
      }
      this.setState({ editColumn: addColumn })
    } else if ((!hide && max) || (!max && !hide)) {
      // show column
      let deleteColumn = {
        ...editColumn
      }
      delete deleteColumn[index]

      this.setState({ editColumn: deleteColumn })
    } else {
      return
    }
  }

  saveEdit = (editColumn) => {
    this.setState({ editColumnTemp: editColumn, showModal: false })
  }

  headerIcon = (data, header, editColumn) => {
    let listHeader = []
    header && header.map((h, index) => {
      if (!editColumn[index]) {
        let withIcon = <span className="text-light-gray">
          {h.Header} {h.sortable === false ?
            null : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
            </svg>
          }
        </span>
        let obj = {
          Header: withIcon,
          Cell: h.Cell,
          accessor: h.accessor,
          sortable: h.sortable === false ? false : true,
          resizable: h.resizable || false,
          width: h.width || getColumnWidth(data, h.accessor, h.Header),
        }
        return listHeader = [...listHeader, obj]
      } else {
        return listHeader = [...listHeader]
      }
    })

    let editBtn = <div className="edit-column" onClick={this.showModal.bind(this, true)}><i className="iconU-edit text-primary" /></div>
    let obj = {
      Header: editBtn,
      accessor: 'editBtn',
      width: 50,
      style: { textAlign: 'center' }
    }
    listHeader = [...listHeader, obj]
    return listHeader
  }

  render() {
    const { showModal, editColumn, editColumnTemp, activeTab } = this.state
    let { title, data, fields, onClick, height, pagination } = this.props
    const headerIcon = this.headerIcon(data, fields, editColumnTemp)
    return (
      <React.Fragment>
        <ReactTable
          columns={headerIcon}
          data={data}
          showPagination={false}
          style={{ height }}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                !!onClick && onClick(rowInfo.original, state, column, e, instance)
              },
              style: {
                cursor: !!onClick && 'pointer',
                textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right'
              }
            }
          }}
          {...this.props}
        />
        <CustomPagination
          data={data}
          pagination={pagination}
          goto={this.props.goto}
          export={this.props.export}
        />
        <Modal
          show={showModal} size='xl' centered
          onHide={this.closeModal.bind(this, false, editColumnTemp)}
        >
          <Modal.Header className="bg-primary">
            <Container>
              <Row>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                  <div className="d-flex">
                    <FaRegEdit color='white' size={25} /> &nbsp;
                    <span className="font-20 text-white">Edit Column</span>
                  </div>
                  <span className="text-white">
                    {`Show and hide the column according to your needs. Please select columns to show`}
                  </span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} className="p-0 text-right">
                  <Button onClick={this.closeModal.bind(this, false, editColumnTemp)}>
                    <MdClose color='white' size={30} />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body>
            <Row xl={5} lg={4} md={3} sm={3} xs={2} className="mx-1">
              <Col className="text-primary font-20 p-2">{title}</Col>
            </Row>
            <Row className="align-items-center rename-columns">
                  <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                  <Nav tabs>
                      <div className="input-group">
                          <NavItem className="pl-0 pr-0">                         
                                  <NavLink  className={"nav-link-cust tab-color" + (activeTab === "1" ? " tab-rename" : "")} active={this.state.activeTab === "1"} onClick={() => this.activeTabIndex("1")}>
                                      <div className="row rowTabCustom align-items-center">
                                          <span className="tabTitleText">
                                          {activeTab === "1" }TOGGLE COLUMN
                                          </span>
                                      </div>
                                 </NavLink>
                            </NavItem>

                            <NavItem className={"pl-2 pr-0 "}>
                                  <NavLink className={"nav-link-cust tab-color" + (activeTab === "2" ? " tab-rename" : "")} active={this.state.activeTab === "2"} onClick={() => this.activeTabIndex("2")}>
                                      <div className="row rowTabCustom align-items-center">
                                            <span className="tabTitleText">
                                            {activeTab === "2" } RENAME COLUMN
                                            </span>
                                      </div>
                                  </NavLink>
                          </NavItem>
                        </div>
                    </Nav>
                    </div>
                </Row>
            <Row activeTab={this.state.activeTab}>
              <Row xl={5} lg={10} className="mx-1"  >
              {
                fields && fields.map((item, index) => {
                  return (
                    <Col key={index} className="p-2">
                      <button className={`text-left btn btn-block ${!editColumn[index] ? 'btn-outline-primary' : 'btn-light-gray'}`}
                        onClick={this.showColumn.bind(this, item.Header, index, fields.length)}
                      >
                        {!editColumn[index] ? <AiOutlineEye size={25} /> : <AiOutlineEyeInvisible size={25} />}
                        <b className="p-0"> {item.Header} </b>
                      </button>
                    </Col>
                  )
                })
              }
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="px-5" onClick={this.saveEdit.bind(this, editColumn)} >Save</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

export default CustomTable