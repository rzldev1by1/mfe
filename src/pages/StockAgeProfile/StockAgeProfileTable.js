import _ from "lodash";
import React from "react";
import ReactTable from "react-table-v6";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { FaRegEdit, FaPencilAlt } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import "react-table-v6/react-table.css";
import "shared/table/CustomTable.css";

class StockAgeProfileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editColumn: {},
      editColumnTemp: {},
    };
  }

  showModal = (show) => {
    this.setState({ showModal: show });
  };

  closeModal = (close, editColumnTemp) => {
    this.setState({ showModal: close, editColumn: editColumnTemp });
  };

  showColumn = (header, index, length) => {
    const { editColumn } = this.state;
    let max = length - Object.keys(editColumn).length > 1;
    let hide = editColumn[index] === undefined;

    if (hide && max) {
      // hide column
      let obj = {
        [index]: header,
      };

      let addColumn = {
        ...editColumn,
        ...obj,
      };
      this.setState({ editColumn: addColumn });
    } else if ((!hide && max) || (!max && !hide)) {
      // show column
      let deleteColumn = {
        ...editColumn,
      };
      delete deleteColumn[index];

      this.setState({ editColumn: deleteColumn });
    } else {
      return;
    }
  };

  saveEdit = (editColumn) => {
    this.setState({ editColumnTemp: editColumn, showModal: false });
  };

  headerIcon = (header, editColumn) => {
    let listHeader = [];
    header &&
      header.map((data, i) => {
        let listColumn = [];
        if (editColumn[i] === undefined) {
          data.columns.map((datax, index) => {
            let withIcon = (
              <span className="text-light-gray">
                {datax.Header}
                {datax.sortable ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
                  </svg>
                ) : null}
              </span>
            );

            let obj = {
              Header: withIcon,
              accessor: datax.accessor,
              sortable: datax.sortable || false,
              resizable: datax.resizable || false,
              style: datax.style || null,
              className: datax.className || null,
              headerClassName: datax.headerClassName || null,
              headerStyle: datax.headerStyle || null,
              width: datax.width || undefined,
              // 'style': { textAlign: 'right' },
              Cell: datax.Cell,
            };
            listColumn = [...listColumn, obj];
          });

          let new_header = (
            <span className="text-light-gray">{data.Header}</span>
          );
          let obj = {
            Header: new_header,
            columns: listColumn,
            fixed: data.fixed || null,
            headerClassName: data.headerClassName || null,
            headerStyle: data.headerStyle || null,
            width: data.width || undefined,
          };
          return (listHeader = [...listHeader, obj]);
        } else {
          return (listHeader = [...listHeader]);
        }
      });
    return listHeader;
  };

  render() {
    const { showModal, editColumn, editColumnTemp } = this.state;
    let { title, data, fields, onClick, height, pagination } = this.props;
    const headerIcon = this.headerIcon(fields, editColumnTemp);
    console.log(headerIcon);
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
                !!onClick &&
                  onClick(rowInfo.original, state, column, e, instance);
              },
              style: {
                cursor: !!onClick && "pointer",
                textAlign: isNaN(rowInfo?.original[column.id])
                  ? "left"
                  : "right",
              },
            };
          }}
          {...this.props}
        />
        <Modal
          show={showModal}
          size="xl"
          centered
          onHide={this.closeModal.bind(this, false, editColumnTemp)}
        >
          <Modal.Header className="bg-primary">
            <Container>
              <Row>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                  <div className="d-flex">
                    <FaRegEdit color="white" size={25} /> &nbsp;
                    <span className="font-20 text-white">Edit Column</span>
                  </div>
                  <span className="text-white">
                    {`Show and hide the column according to your needs. Please select columns to show`}
                  </span>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className="p-0 text-right"
                >
                  <Button
                    onClick={this.closeModal.bind(this, false, editColumnTemp)}
                  >
                    <MdClose color="white" size={30} />
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
              {fields &&
                fields.map((item, index) => {
                  return (
                    <Col key={index} className="p-2">
                      <button
                        className={`text-left btn btn-block ${
                          !editColumn[index]
                            ? "btn-outline-primary"
                            : "btn-light-gray"
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
                        <b className="p-0"> {item.Header} </b>
                      </button>
                    </Col>
                  );
                })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="px-5"
              onClick={this.saveEdit.bind(this, editColumn)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StockAgeProfileTable;
