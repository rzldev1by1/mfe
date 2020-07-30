import _ from 'lodash'
import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table-v6'
import { Button, Container, Row, Col, Modal, Nav} from 'react-bootstrap'
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { CRow, CCol } from "@coreui/react";
import { MdClose } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import CustomPagination from 'shared/table/CustomPagination'
import Export from "./Export"
import 'react-table-v6/react-table.css'
import './CustomTable.css'

const baseUrl = process.env.REACT_APP_API_URL;

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
    this.dragged = null;
    this.reorder = [];
    let tables = localStorage.getItem("tables") ? JSON.parse(localStorage.getItem("tables")) : [];
    if(tables.length > 0){
        tables.map((data, idx) => {
            if(data.title == props.title){
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
      data: this.props.data,
      fields: this.props.fields,
      urlHeader: this.props.urlHeader,
      products: [],
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
    if(tables.length > 0){
        tables.map((data, index) => {
            if(data.title === this.props.title){
                tables.splice(index, 1);
            }
        })
        tables.push({
            userId: this.props.store.user.userId,
            title: this.props.title,
            reorderIdx: this.reorder
        })
    }else{
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

componentDidMount() {
  this.mountEvents();
}

componentDidUpdate() {
  this.mountEvents();
}

showModal = (show) => {
  this.setState({ showModal: show })
}
  componentDidMount = () => {
    this.headerRename();
  };
  activeTabIndex(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
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
            <span className='text-light-gray draggable-header'>
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
    let fields = [];
    let accessor = this.state.fields.map((data, idx) => {                
      let split = data.accessor
      return split
      });

    let placeholder = this.state.fields.map((data, idx) => {                
                let split = data.placeholder
                return split
                });
    let width = this.state.fields.map((data, idx) => {                
                let split = data.width
                return split
                });
    
    Object.values(data.data[0]).map((data, idx) => {
      let headerTable = {
        accessor: '',
        Header: '',
        placeholder: '',
        width: null,
        sortable: true,
      };
      headerTable.Header = data;
      headerTable.placeholder = placeholder[idx];
      headerTable.accessor = accessor[idx];
      headerTable.width = width[idx];
      fields.push(headerTable);
    });
    if (data.data.length) {
      this.setState({
        products: data.data[0],
        fields: fields,
      });
    }
  };

  // Header Name And

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
        if (item.accessor == data) {
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

    let newPayload = {};

    for (let i = 0; i < Object.keys(this.state.products).length; i++) {
      fieldsAccessor.map((data, idx) => {
        if (payloadIndex[i] == data) {
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

    const baseUrl = process.env.REACT_APP_API_URL;

    try {
      const urlAntec = await axios.post(
        baseUrl + this.props.UrlAntec(),
        payload
      );
      const urlBega = await axios.post(baseUrl + this.props.UrlBega(), payload);
      const urlAesop = await axios.post(
        baseUrl + this.props.UrlAesop(),
        payload
      );
      const urlClucth = await axios.post(
        baseUrl + this.props.UrlClucth(),
        payload
      );
      const urlExquira = await axios.post(
        baseUrl + this.props.UrlExquira(),
        payload
      );
      const urlLedvance = await axios.post(
        baseUrl + this.props.UrlLedvance(),
        payload
      );
      const urlOnestop = await axios.post(
        baseUrl + this.props.UrlOnestop(),
        payload
      );
      const urlStartrack = await axios.post(
        baseUrl + this.props.UrlStartrack(),
        payload
      );
      const urlTatura = await axios.post(
        baseUrl + this.props.UrlTatura(),
        payload
      );
      const urlTtl = await axios.post(baseUrl + this.props.UrlTtl(), payload);
      const urlTtchem = await axios.post(
        baseUrl + this.props.UrlTtchem(),
        payload
      );
      const { data } =
        urlAntec +
        urlBega +
        urlAesop +
        urlClucth +
        urlExquira +
        urlLedvance +
        urlOnestop +
        urlStartrack +
        urlTatura +
        urlTtl +
        urlTtchem;
    } catch (error) {
      console.log(error);
    }
  };

  changedColumn = (e) => {
    let changedColumns = this.state.changedColumns;

    if (e.target.value.length > 0) {
      changedColumns.map((item, idx) => {
        if (item.accessor) {
          if (item.accessor == e.target.name) {
            changedColumns.splice(idx, 1);
          }
        }
      });

      changedColumns.push({
        accessor: e.target.name,
        header: e.target.value,
      });

      this.setState({ changedColumns: changedColumns });
    }
  };

  renameSubmit = (e) => {
    this.renameSubmits(this.state.changedColumns);
    this.setState({ showModal: false });
  };
  ExportName = () => {
    let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let date1 = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      Seconds = date.getSeconds(),
      Minutes = date.getMinutes(),
      Hours = date.getHours();
    return (this.props.filename + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
  }

  ExportHeader = () => {
    let data = this.state.fields.map((data, idx) => {                
      return data.Header
      });
    return data
  }
  ExportData = () => {
    let dataAll = this.props.data.map((data,idx,) =>{
    let column = this.state.fields.map((column, columnIdx) => {       
            let split = [data[column.accessor] ]
            return split
           })
           return column
    })
    return dataAll
  }
  
  render() {
    const { showModal, editColumn, editColumnTemp, fields, activeTab } = this.state
    let { title, data, onClick, height, pagination,request_status,font } = this.props
    let headerIcon = this.headerIcon(data, fields, editColumnTemp);
    this.reorder.forEach(o => headerIcon.splice(o.a, 0, headerIcon.splice(o.b, 1)[0]));

    return (
      <React.Fragment>
        <ReactTable
          columns={headerIcon}
          data={data}
          showPagination={false}
          style={{ height }}
          // noDataText={(request_status)? request_status :"Please Wait..."}
          noDataText={<div>
          <div  className='caution-caution'/>
          <div>No Data Available</div>
        </div>}
          minRows='0'
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                !!onClick &&
                  onClick(rowInfo.original, state, column, e, instance);
              },
              style: {
                height : "3rem",
                cursor: !!onClick && 'pointer',
                textAlign: isNaN(rowInfo?.original[column.id])
                  ? 'left'
                  : 'right',
              },
            };
          }}
          {...this.props}
        />

      <table className="d-none" id="excel">
            <thead>
              <tr>
                {fields.map((data, idx) => {
                    return ( <th key={idx} id={data.accessor}>{data.Header}</th> )
                })}
              </tr>
            </thead>
            <tbody>
              {data ? data.map((data, i) =>
                <tr key={i} >
                  {fields.map((column, columnIdx) => {
                      return (
                        <td key={columnIdx}>{data[column.accessor]}</td>
                      )
                  })}
                </tr>
              ) :
                <div> No data available </div>
              }
            </tbody>
          </table>

        <CRow className="mt-3 pagination-custom">
           <CCol lg="10" className="px-0 margin-mr">
                <CustomPagination
                  data={data}
                  pagination={pagination}
                  goto={this.props.goto}
                  export={this.props.export}
                  fields={fields}
                />
            </CCol>
            <CCol lg="2" className="px-0 export-ml">
                <Export ExportName={this.ExportName} ExportPDFName={title}
                    ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={font} />
            </CCol>
        </CRow>
        <Modal
          show={showModal}
          size='xl'
          centered
          onHide={this.closeModal.bind(this, false, editColumnTemp)}
        >
          <Modal.Header className='bg-primary px-5 py-5'>
            <Container className='px-0'>
              <Row className="mx-0">
                <Col xs={10} sm={10} md={10} lg={10} xl={10} className="px-0">
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
                    className="pr-0 no-hover"
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
                  <Nav tabs className="px-1">
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
            <Row >
              <Col sm='12' md='12' lg='12' className="px-0">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId='1'>
                    <Row xl={5} lg={10} className='mx-1 grid-col'>
                      {fields &&
                        fields.map((item, index) => {
                          return (
                            <Col key={index} className='p-2'>
                              <button
                                className={`text-left btn btn-block ${
                                  !editColumn[index]
                                    ? 'btn-outline-primary'
                                    : 'btn-light-gray'
                                }`}
                                onClick={this.showColumn.bind(
                                  this,
                                  item.Header,
                                  index,
                                  fields.length
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
                          );
                        })}
                    </Row>
                    <Col className="pt-5">
                      <Button
                        variant='primary'
                        className='px-3 float-right'
                        onClick={this.saveEdit.bind(this, editColumn)}
                      >
                        SAVE
                      </Button>
                    </Col>
                  </TabPane>
                  <TabPane tabId='2'>
                    <Row xl={5} lg={10} className='mx-1'>
                      {fields &&
                        fields.map((item, index) => {
                          return (
                            <div key={index} className='p-2'>
                              <input
                                placeholder={item.placeholder}
                                name={item.accessor}
                                sortable={item.sortable}
                                onChange={this.changedColumn}
                                className={`text-left form-rename `}
                              />
                            </div>
                          );
                        })}
                    </Row>
                    <Col className="pt-5">
                      <Button
                        variant='primary'
                        className='px-3 float-right'
                        onClick={this.renameSubmit}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(CustomTable)