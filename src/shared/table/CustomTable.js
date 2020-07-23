import _ from 'lodash'
import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table-v6'
import { Button, Container, Row, Col, Modal, Nav} from 'react-bootstrap'
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { MdClose } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import CustomPagination from 'shared/table/CustomPagination'
import axios from 'axios'
import 'react-table-v6/react-table.css'
import './CustomTable.css'
import '../../pages/StockHolding/StockHolding.css'

const baseUrl = process.env.REACT_APP_API_URL;

// automatic column width
const getColumnWidth = (rows, accessor, headerText) => {
  const cell = Math.max.apply(Math, rows.map(function (el) {
    if (el[accessor]) {
      if (el[accessor] === String) {
        el[accessor].trim()
        return el[accessor].length
      } else {
        return el[accessor].length
      }
    } else {
      return headerText.length
    }
  }));
  if (isFinite(cell)) {
    const width = cell > headerText.length ? cell : headerText.length
    // console.log(accessor, cell, headerText.length, width)
    return width * 12
  } else {
    return headerText.length * 10
  }
}

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.dragged = null;
    this.reorder = [];
    let tables = localStorage.getItem("tables") ? JSON.parse(localStorage.getItem("tables")) : [];
    if (tables.length > 0) {
      tables.map((data, idx) => {
        if (data.title === props.title) {
          this.reorder = data.reorderIdx
        }
      });
    }
    this.state = {
      showModal: false,
      editColumn: {},
      editColumnTemp: {},
      trigger: 0,
      activeTab: '1',
      changedColumns: [],
      fields: this.props.fields,
      products: []
    }
  }

  componentDidMount() {
    this.mountEvents();
    if (this.props.enableRename) {
      this.headerRename()
    }
  }

  componentDidUpdate() {
    this.mountEvents();
  }

  activeTabIndex(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  mountEvents() {
    const headers = Array.prototype.slice.call(
      document.querySelectorAll(".draggable-header")
    );

    headers.forEach((header, i) => {
      header.setAttribute("draggable", true);
      //the dragged header
      header.ondragstart = e => {
        e.stopPropagation();
        this.dragged = i;
   };  
  
   header.ondrag = e => e.stopPropagation;

      //the dropped header
      header.ondragover = e => {
        e.preventDefault();
  };

  header.ondrop = e => {
    e.preventDefault();
    // const { target, dataTransfer } = e;
    this.reorder.push({ a: i, b: this.dragged });
    this.setState({ trigger: Math.random() });

        let tables = localStorage.getItem("tables") ? JSON.parse(localStorage.getItem("tables")) : [];
        if (tables.length > 0) {
          tables.map((data, index) => {
            if (data.title === this.props.title) {
              tables.splice(index, 1);
            }
          })
          tables.push({
            userId: this.props.store.user.userId,
            title: this.props.title,
            reorderIdx: this.reorder
          })
        } else {
          tables.push({
            userId: this.props.store.user.userId,
            title: this.props.title,
            reorderIdx: this.reorder
          })
        }
        localStorage.setItem("tables", JSON.stringify(tables));
      };
    });
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
          let withIcon = (
            <span className='text-light-gray'>
              {h.Header}{' '}
              {h.sortable === false ? null : (
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 24 24'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z'></path>
                </svg>
              )}
            </span>
          );
          let obj = {
            Header: withIcon,
            Cell: h.Cell,
            accessor: h.accessor,
            sortable: h.sortable === false ? false : true,
            resizable: h.resizable || false,
            style: h.style || null,
            width: h.width || getColumnWidth(data, h.accessor, h.Header),
          }
          return listHeader = [...listHeader, obj]
        } else {
          return listHeader = [...listHeader]
        }
      })

    let editBtn = (
      <div className='edit-column' onClick={this.showModal.bind(this, true)}>
        <i className='iconU-edit text-primary' />
      </div>
    )
    let obj = {
      Header: editBtn,
      accessor: 'editBtn',
      width: 50,
      style: { textAlign: 'center' },
    };
    listHeader = [...listHeader, obj];
    return listHeader;
  };

  // Header Name
  headerRename = async () => {
    const url = this.props.UrlHeader();
    const { data } = await axios.get(url);
    let header = [];
    let headerDft = [];
    let accessor = Object.keys(data.data[0]);
    accessor.map((data, idx) => {
      let lowerCase = data.toLowerCase();
      if (lowerCase.includes(' ')) {
        let split = lowerCase.split(' ');
        let result = split.join('_');
        accessor[idx] = result;
      } else {
        accessor[idx] = lowerCase;
      }
    });
    let placeholder = Object.keys(data.data[0]);
    placeholder.map((data, idx) => {
      let lowerCase = data.toLowerCase();
      if (lowerCase.includes(' ')) {
        let split = lowerCase.split(' ');
        let result = split.join(' ');
        placeholder[idx] = result;
      } else {
        placeholder[idx] = lowerCase;
      }
    });
    Object.values(data.data[0]).map((data, idx) => {
      let headerTable = {
        accessor: 'site',
        Header: 'site',
        placeholder: 'site',
        sortable: true,
      };
      let headerDefault = {
        accessor: 'site',
        Header: 'site',
        placeholder: 'site',
        sortable: true,
      };
      headerDefault.Header = this.state.fields
      headerTable.Header = data;
      headerTable.placeholder = placeholder[idx];
      headerTable.accessor = accessor[idx];
      header.push(headerTable);
      headerDft.push(headerDefault)
    });
    console.log(header);
    if (data.data.length) {
      this.setState({
        products: data.data[0],
        fields: header,
      });
    }else {
      this.setState({
        products: data.data[0],
        fields: headerDft,
      });
    }
  };

  changedColumn = (e) => {
    let changedColumns = this.state.changedColumns;

    if (e.target.value.length > 0) {
      changedColumns.map((item, idx) => {
        if (item.accessor) {
          if (item.accessor === e.target.name) {
            changedColumns.splice(idx, 1)
          }
        }
      })

      changedColumns.push({
        accessor: e.target.name,
        header: e.target.value
      })

      this.setState({ changedColumns });
    }
  }

  headerRename = async () => {
    const url = `${this.props.headerUrl}?client=ANTEC`;
    const { data } = await axios.get(url);
    let header = [];
    let accessor = Object.keys(data.data[0]);
    accessor.map((data, idx) => {
      let lowerCase = data.toLowerCase();
      if (lowerCase.includes(' ')) {
        let split = lowerCase.split(' ');
        let result = split.join('_');
        accessor[idx] = result;
      } else {
        accessor[idx] = lowerCase;
      }
    });
    let placeholder = Object.keys(data.data[0]);
    placeholder.map((data, idx) => {
      let lowerCase = data.toLowerCase();
      if (lowerCase.includes(' ')) {
        let split = lowerCase.split(' ');
        let result = split.join(' ');
        placeholder[idx] = result;
      } else {
        placeholder[idx] = lowerCase;
      }
    });
    Object.values(data.data[0]).map((data, idx) => {
      let headerTable = {
        accessor: 'site',
        Header: 'site',
        placeholder: 'site',
        sortable: true,
      };
      headerTable.Header = data;
      headerTable.placeholder = placeholder[idx];
      headerTable.accessor = accessor[idx];
      header.push(headerTable);
    });
    if (data.data.length) {
      this.setState({
        products: data.data[0],
        fields: header,
      });
    }
  };

  renameSubmits = async (e) => {
    const fields = this.state.fields;
    const changedField = e;
    const changedFieldAccessor = [];
    const changedFieldHeader = [];

    changedField.map((item, idx) => {
      changedFieldAccessor.push(item.accessor);
      changedFieldHeader.push(item.header);
    });

    fields.map((item, idx) => {
      changedFieldAccessor.map((data, idx) => {
        if (item.accessor === data) {
          item.Header = changedFieldHeader[idx];
        }
      });
    });

    this.setState({ fields: fields });

    let payload = {};
    let payloadIndex = Object.keys(this.state.products);
    let defaultValues = Object.values(this.state.products);
    let fieldsAccessor = changedFieldAccessor;

    fieldsAccessor.map((data, idx) => {
      if (data.includes(' ')) {
        let uppercaseAccessor = data.toUpperCase();
        let index = uppercaseAccessor.split(' ');
        fieldsAccessor[idx] = index.join('_');
      } else {
        fieldsAccessor[idx] = data.toUpperCase();
      }
    });

    payloadIndex.map((data, idx) => {
      if (data.includes(' ')) {
        let uppercaseAccessor = data;
        let index = uppercaseAccessor.split(' ');
        payloadIndex[idx] = index.join('_');
      }
    });

    for (let i = 0; i < Object.keys(this.state.products).length; i++) {
      fieldsAccessor.map((data, idx) => {
        if (payloadIndex[i] === data) {
          payload[payloadIndex[i]] = changedFieldHeader[idx];
          payloadIndex.splice(i, 1);
          defaultValues.splice(i, 1);
        }
      });
    }

    payloadIndex.map((data, idx) => {
      payload[data] = defaultValues[idx];
    });

    this.setState({ columnsPayload: payload });
    try {
      const clients = ['ANTEC', 'BEGA', 'AESOP', 'CLUCTH', 'EXQUIRA', 'LEDVANCE', 'ONESTOP', 'STARTRACK', 'TATURA', 'TTL', 'TTCHEM']
      const clientsData = clients.map(async client => {
        const { data } = await axios.post(`${baseUrl}/${this.props.putUrl}?client=${client}`, payload)
        return data
      })
      // console.log(clientsData)
    } catch (error) {
      console.warn(error);
    }
  };

  renameSubmit = (e) => {
    this.renameSubmits(this.state.changedColumns);
    this.setState({ showModal: false })
  }

  render() {
    const { showModal, editColumn, editColumnTemp, fields, activeTab } = this.state
    let { title, data, onClick, height, pagination } = this.props
    let headerIcon = this.headerIcon(data, fields, editColumnTemp);
    this.reorder.forEach(o => headerIcon.splice(o.a, 0, headerIcon.splice(o.b, 1)[0]));

    return (
      <React.Fragment>
        <ReactTable
          columns={headerIcon}
          data={data}
          showPagination={false}
          style={{ height }}
          noDataText={'Please Wait...'}
          minRows='0'
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                !!onClick &&
                  onClick(rowInfo.original, state, column, e, instance);
              },
              style: {
                cursor: !!onClick && 'pointer',
                textAlign: isNaN(rowInfo?.original[column.id])
                  ? 'left'
                  : 'right',
              },
            };
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
          show={showModal}
          size='xl'
          centered
          onHide={this.closeModal.bind(this, false, editColumnTemp)}
        >
          <Modal.Header className='bg-primary px-5 py-5'>
            <Container className='px-0'>
              <Row className="mx-0">
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                  <div className='d-flex'>
                    <FaRegEdit color='white' size={25} /> &nbsp;
                    <span className='font-20 text-white'>Edit Column</span>
                  </div>
                  <span style={{ marginLeft: '29px' }} className='text-white'>
                    {`Show and hide the column according to your needs. Please select columns to show`}
                  </span>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className='p-0 text-right'
                >
                  <Button
                    onClick={this.closeModal.bind(this, false, editColumnTemp)}
                  >
                    <MdClose color='white' size={30} />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body className='px-5 pt-3 pb-5'>
            <Row className="mx-0 justify-content-between mb-3">
              <Col lg={6} className='text-primary font-20 p-0'>{title}</Col>
              <Row className='align-items-center rename-columns mx-0 text-align-left'>
                  <Nav tabs>
                    <div className='input-group'>
                      <NavItem className='pl-0 pr-0'>
                        <NavLink
                          className={
                            'nav-link-cust tab-color' +
                            (activeTab === '1' ? ' tab-rename' : '')
                          }
                          active={this.state.activeTab === '1'}
                          onClick={() => {
                            this.activeTabIndex('1');
                          }}
                        >
                          <div className='row rowTabCustom align-items-center'>
                            <span className='tabTitleText font-18'>
                              {activeTab === '1'}TOGGLE COLUMN
                            </span>
                          </div>
                        </NavLink>
                      </NavItem>

                      <NavItem className={'pl-2 pr-0 '}>
                        <NavLink
                          className={
                            'nav-link-cust tab-color' +
                            (activeTab === '2' ? ' tab-rename' : '')
                          }
                          active={this.state.activeTab === '2'}
                          onClick={() => {
                            this.activeTabIndex('2');
                          }}
                        >
                          <div className='row rowTabCustom align-items-center'>
                            <span className='tabTitleText font-18'>
                              {activeTab === '2'} RENAME COLUMN
                            </span>
                          </div>
                        </NavLink>
                      </NavItem>
                    </div>
                  </Nav>
              </Row>
            </Row>
            <Row className="align-items-center rename-columns">
              <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                <Nav tabs>
                  <div className="input-group" style={{ height: "max-content" }}>
                    <NavItem className="pl-0 pr-0">
                      <NavLink className={"nav-link-cust tab-color" + (activeTab === "1" ? " tab-rename" : "")} active={this.state.activeTab === "1"} onClick={() => { this.activeTabIndex("1"); }}>
                        <div className="row rowTabCustom align-items-center">
                          <span className="tabTitleText"> {activeTab === "1"}TOGGLE COLUMN </span>
                        </div>
                      </NavLink>
                    </NavItem>

                    <NavItem className={"pl-2 pr-0 "} style={{ marginLeft: "-6px" }}>
                      <NavLink className={"nav-link-cust tab-color" + (activeTab === "2" ? " tab-rename" : "")} active={this.state.activeTab === "2"} onClick={() => { this.activeTabIndex("2"); }}>
                        <div className="row rowTabCustom align-items-center">
                          <span className="tabTitleText"> {activeTab === "2"} RENAME COLUMN </span>
                        </div>
                      </NavLink>
                    </NavItem>
                  </div>
                </Nav>
              </div>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
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
                    <Button variant="primary" className="px-5 float-right" onClick={this.saveEdit.bind(this, editColumn)} >Save</Button>
                  </TabPane >
                  <TabPane tabId="2">
                    <Row xl={5} lg={10} className="mx-1"  >
                      {
                        fields && fields.map((item, index) => {
                          return (
                            <Col key={index} className="p-2">
                              <input placeholder={item.placeholder} name={item.accessor} sortable={item.sortable} onChange={this.changedColumn} className={`text-left form-rename `}>
                              </input>
                            </Col>
                          )
                        })
                      }
                    </Row>
                    <Button variant="primary" className="px-3 float-right" onClick={this.renameSubmit} >DONE</Button>
                  </TabPane >
                </TabContent>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(CustomTable)