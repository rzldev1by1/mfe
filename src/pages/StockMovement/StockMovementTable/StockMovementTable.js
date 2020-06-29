import React from 'react'
import ReactTable from 'react-table-v6'
import { Button, FormControl, Container, Row, Col, Modal } from 'react-bootstrap'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { MdSkipNext, MdSkipPrevious, MdClose } from 'react-icons/md'
import { FaRegEdit, FaPencilAlt } from 'react-icons/fa'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import 'react-table-v6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './StockMovementTable.css'

// import mid from 'assets/img/field-idle.png'
// import down from 'assets/img/field-bot.png'
// import up from 'assets/img/field-top.png'

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

class StockMovementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      button: [1, 2, 3],
      btnStat: "left",
      goPage: '',
      maxPage: null,
      showModal: false,
      editColumn: {},
      editColumnTemp: {}
    }
  }

  handlePrev(page, maxPage) {
    const { button, btnStat } = this.state
    if (page !== 0) {
      let newButton = button
      let newBtnStat = btnStat
      if (page < maxPage && page > 1) {
        newButton[0] = newButton[0] - 1
        newButton[1] = newButton[1] - 1
        newButton[2] = newButton[2] - 1
      }
      if (page === 1) {
        newBtnStat = 'left'
      } else {
        newBtnStat = 'mid'
      }
      this.setState({ page: page - 1, button: newButton, btnStat: newBtnStat })
    }
  }

  handleNext(page, maxPage) {
    const { button, btnStat } = this.state
    if (page !== maxPage) {
      let newButton = button
      let newBtnStat = btnStat
      if (page < (maxPage - 1) && page > 0) {
        newButton[0] = newButton[0] + 1
        newButton[1] = newButton[1] + 1
        newButton[2] = newButton[2] + 1
      }
      if (page === (maxPage - 1)) {
        newBtnStat = 'right'
      } else {
        newBtnStat = 'mid'
      }
      this.setState({ page: page + 1, button: newButton, btnStat: newBtnStat })
    }
  }

  handlePrevEnd = () => {
    const { button } = this.state
    let newButton = button

    newButton[0] = 1
    newButton[1] = 2
    newButton[2] = 3
    this.setState({ page: 0, button: newButton, btnStat: 'left' })
  }

  handleNextEnd = (maxPage) => {
    const { button } = this.state
    let newButton = button

    newButton[0] = maxPage - 2
    newButton[1] = maxPage - 1
    newButton[2] = maxPage
    this.setState({ page: maxPage - 1, button: newButton, btnStat: 'right' })
  }

  handlePageNum(page, maxPage) {
    const { button, btnStat } = this.state
    let newButton = button
    let newBtnStat = btnStat

    if (page === 1) {
      newBtnStat = 'left'
      newButton[0] = 1
      newButton[1] = 2
      newButton[2] = 3
    } else if (page === (maxPage + 1)) {
      newBtnStat = 'right'
      newButton[0] = maxPage - 1
      newButton[1] = maxPage
      newButton[2] = maxPage + 1
    } else {
      newBtnStat = 'mid'
      newButton[0] = page - 1
      newButton[1] = page
      newButton[2] = page + 1
    }
    this.setState({ page: page - 1, button: newButton, btnStat: newBtnStat })
  }

  handleChangeGoPage = (maxPage, evt) => {
    let value = evt.target.value
    this.setState({ goPage: value, maxPage: maxPage })
  }

  handleKeyPress = (event) => {
    const { goPage, maxPage } = this.state
    if (event.key === 'Enter') {
      this.handlePageNum(Number(goPage), maxPage)
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

  headerIcon = (header, editColumn) => {
    let listHeader = []
    header && header.map((data, index) => {
      let listColumn = []
      if (editColumn[index] === undefined) { 
          data.columns.map((datax, index) => {
            let withIcon = <span className="text-light-gray">
              {datax.Header}
              {datax.sortable ?
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
                </svg> : null
              }
            </span> 

            let obj = {
              "Header": withIcon,
              "accessor": datax.accessor,
              'sortable': datax.sortable || false,
              'resizable': datax.resizable || false,  
              'style': datax.style || null,
              'className': datax.className || null,
              'headerClassName': datax.headerClassName || null, 
              'headerStyle': datax.headerStyle || null, 
              'width': datax.width || undefined, 
              // 'style': { textAlign: 'right' },
              'Cell': datax.Cell,
            }  
            listColumn = [...listColumn, obj]
          }) 

          let new_header = <span className="text-light-gray">
              {data.Header} 
            </span> 
          let obj = {
            "Header": new_header,    
            'columns': listColumn,
            "fixed": data.fixed || null,
            'headerClassName': data.headerClassName || null,
            'headerStyle': data.headerStyle || null,
            'width': data.width || undefined, 
          } 
          return listHeader = [...listHeader, obj] 
          
      } else {
        return listHeader = [...listHeader]
      }
    }) 
    return listHeader
  }

  render() {
    const { // data, columns
      page, button, btnStat, goPage, showModal, editColumn, editColumnTemp,columns
    } = this.state
    let { title, data, fields, onClick, pageSize = 50, height } = this.props
    const maxPage = Math.round(data.length / pageSize)
    const length = Math.round(data.length)
    const bottom = Math.round((page * pageSize) + 1)
    const top = ((bottom + pageSize) - 1) > length ? length : (bottom + pageSize) - 1
    const headerIcon = this.headerIcon(fields, editColumnTemp)   

    return (
      <React.Fragment> 
      <ReactTableFixedColumns
          columns={headerIcon}
          data={data}
          showPagination={false}
          page={page}
          defaultPageSize={pageSize}
          style={{ height }}
          minRows={10}
          // getTheadThProps={(state, rowInfo, column, instance)=>{
          //   console.log(instance)
          //   return {
          //     style: { cursor: !!onClick && 'pointer', textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' }
          //   }
          // }}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                !!onClick && onClick(rowInfo.original, state, column, e, instance)
              },
              style: { cursor: !!onClick && 'pointer', textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' }
            }
          }}
          {...this.props}
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
            <Button variant="primary" className="px-5" onClick={this.saveEdit.bind(this, editColumn)} >Save</Button>
          </Modal.Footer>
        </Modal>



        <Container fluid className="mt-2">
          <Row>
            <Col xs={12} sm={6} md={6} lg={3} xl={3} className="p-0">
              <div className="paging">
                <Button
                  variant="light" className="btn-paging p-0"
                  onClick={this.handlePrevEnd.bind(this)}
                >
                  <MdSkipPrevious />
                </Button>
                <Button
                  variant="light" className="btn-paging p-0"
                  onClick={this.handlePrev.bind(this, page, maxPage)}
                >
                  <GrFormPrevious />
                </Button>
                <Button
                  variant={btnStat === 'left' ? 'primary' : 'light'} className="btn-paging p-0"
                  onClick={this.handlePageNum.bind(this, button[0], maxPage)}
                >
                  {button[0]}
                </Button>
                <Button
                  variant={btnStat === 'mid' ? 'primary' : 'light'} className="btn-paging p-0"
                  onClick={this.handlePageNum.bind(this, button[1], maxPage)}
                >
                  {button[1]}
                </Button>
                <Button
                  variant={btnStat === 'right' ? 'primary' : 'light'} className="btn-paging p-0"
                  onClick={this.handlePageNum.bind(this, button[2], maxPage)}
                >
                  {button[2]}
                </Button>
                <Button
                  variant="light" className="btn-paging p-0"
                  onClick={this.handleNext.bind(this, page, maxPage)}
                >
                  <GrFormNext />
                </Button>
                <Button
                  variant="light" className="btn-paging p-0"
                  onClick={this.handleNextEnd.bind(this, maxPage)}
                >
                  <MdSkipNext />
                </Button>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} xl={3} className="col-go-page">
              <div className="go-page d-flex">
                <span className="p-2">Go to Page</span>
                <FormControl
                  placeholder=""
                  className="form-go-page"
                  value={goPage}
                  onChange={this.handleChangeGoPage.bind(this, maxPage)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                  type="number"
                />
                <Button variant="light" className="btn-go p-0 pl-3"> Go <GrFormNext /> </Button>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} xl={3} className="col-text-entries p-0">
              <span> Showing </span>
              <b> &nbsp; {`${bottom} to ${top} of ${length} `} </b>
              &nbsp; entries
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} xl={3} className="btn-export">
              {this.props.export}
            </Col>
          </Row>
        </Container>

      </React.Fragment>
    )
  }
}

export default StockMovementTable