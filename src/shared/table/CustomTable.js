import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table-v6'
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'
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
      trigger: 0
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
        let withIcon = <span className="text-light-gray draggable-header">
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
          style: h.style || null,
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
    const { showModal, editColumn, editColumnTemp } = this.state
    let { title, data, fields, onClick, height, pagination,request_status } = this.props  
    let headerIcon = this.headerIcon(data, fields, editColumnTemp);
    this.reorder.forEach(o => headerIcon.splice(o.a, 0, headerIcon.splice(o.b, 1)[0]));

    return (
      <React.Fragment>
        <ReactTable
          columns={headerIcon}
          data={data}
          showPagination={false}
          style={{ height }}
          noDataText={(request_status)?request_status:"Please Wait..."}
          minRows='0'
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
          <Modal.Header className="bg-primary py-5">
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
            <Row xl={5} lg={4} md={3} sm={3} xs={2} className="mx-1">
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="px-5" onClick={this.saveEdit.bind(this, editColumn)} >SAVE</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(CustomTable)