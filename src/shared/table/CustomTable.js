import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, FormControl, Container, Row, Col, Modal, Alert } from 'react-bootstrap'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { MdSkipNext, MdSkipPrevious, MdClose } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { FaRegEdit, FaPencilAlt } from 'react-icons/fa'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import './CustomTable.css'

class CustomTable extends React.Component {
    constructor() {
        super();
        this.state = {
            // data: this.props.data,
            // columns: this.props.columns,
            // pageSize: 10,
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

    editColumn = (header, index, length) => {
        const { editColumn } = this.state
        let max = (length - Object.keys(editColumn).length) > 5
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
        this.setState({
            editColumnTemp: editColumn,
            showModal: false
        })
    }

    headerIcon = (header, editColumn) => {
        let listHeader = []
        header && header.map((data, index) => {
            let name = data.Header
            if (editColumn[index] === undefined) {
                let icon = <span>
                    <Alert className="alert-text color-text-header">
                        {name}
                    </Alert>
                    {/* <svg class="bi bi-chevron-expand" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z" />
                    </svg> */}

                    <svg className="icon-header" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
                    </svg>
                </span>

                let obj = {
                    "Header": icon,
                    "accessor": data.accessor
                }
                return listHeader = [...listHeader, obj]
            } else {
                return listHeader = [...listHeader]
            }
        })

        let editBtn = <div className="edit-column" onClick={this.showModal.bind(this, true)}> <FaPencilAlt className="text-primary" /> </div>
        let obj = {
            'Header': editBtn,
            'accessor': 'editBtn',
            'sortable': false,
            'resizable': false,
            'width': 50,
            'style': {
                textAlign: 'center'
            }
        }
        listHeader = [...listHeader, obj]

        return listHeader
    }

    render() {
        const { // data, columns
            page, button, btnStat, goPage, showModal, editColumn, editColumnTemp
        } = this.state
        const { data, fields, pageSize } = this.props
        const maxPage = Math.round(data.length / pageSize)
        const length = Math.round(data.length)
        const bottom = Math.round((page * pageSize) + 1)
        const top = ((bottom + pageSize) - 1) > length ? length : (bottom + pageSize) - 1
        // header with icon
        const headerIcon = this.headerIcon(fields, editColumnTemp)
        console.log(fields)
        return (
            <div>
                <ReactTable
                    data={data}
                    showPagination={false}
                    page={page}
                    defaultPageSize={pageSize}
                    className="react-table"
                    style={{ border: 'none' }}
                    // style header text
                    getTheadThProps={() => {
                        return {
                            style: {
                                textAlign: 'left', boxShadow: 'none',
                                fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14,
                                whiteSpace: 'normal', alignSelf: 'center',
                                borderRight: '0px solid rgba(0,0,0,0.05)'
                            }
                        }
                    }}
                    // style header
                    getTheadProps={() => {
                        return {
                            style: {
                                padding: 0, backgroundColor: 'white', fontFamily: 'sans-serif',
                                borderStyle: 'solid', borderWidth: '0px 0px 2px', borderColor: '#efeff9de',
                                borderRadius: 0, fontSize: 14
                            }
                        }
                    }}
                    // style body
                    getTrProps={() => {
                        return {
                            style: {
                                padding: 0, backgroundColor: 'white', fontFamily: 'sans-serif',
                                borderStyle: 'solid', borderWidth: '0px 0px 1px', borderColor: '#efeff9de',
                                borderRadius: 0, fontSize: 14
                            }
                        }
                    }}
                    getTdProps={() => {
                        return {
                            style: {
                                padding: '9px 5px', borderRight: '0px solid rgba(0,0,0,0.02)'
                            }
                        }
                    }}
                    // header
                    columns={headerIcon}
                ></ReactTable>

                <Container fluid>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={3} xl={3} className="pd-0">
                            <div className="paging">
                                <Button
                                    variant="light" className="btn-paging pd-0"
                                    onClick={this.handlePrevEnd.bind(this)}
                                >
                                    <MdSkipPrevious />
                                </Button>
                                <Button
                                    variant="light" className="btn-paging pd-0"
                                    onClick={this.handlePrev.bind(this, page, maxPage)}
                                >
                                    <GrFormPrevious />
                                </Button>
                                <Button
                                    variant={btnStat === 'left' ? 'primary' : 'light'} className="btn-paging pd-0 text-14"
                                    onClick={this.handlePageNum.bind(this, button[0], maxPage)}
                                >
                                    {button[0]}
                                </Button>
                                <Button
                                    variant={btnStat === 'mid' ? 'primary' : 'light'} className="btn-paging pd-0 text-14"
                                    onClick={this.handlePageNum.bind(this, button[1], maxPage)}
                                >
                                    {button[1]}
                                </Button>
                                <Button
                                    variant={btnStat === 'right' ? 'primary' : 'light'} className="btn-paging pd-0 text14"
                                    onClick={this.handlePageNum.bind(this, button[2], maxPage)}
                                >
                                    {button[2]}
                                </Button>
                                <Button
                                    variant="light" className="btn-paging pd-0"
                                    onClick={this.handleNext.bind(this, page, maxPage)}
                                >
                                    <GrFormNext />
                                </Button>
                                <Button
                                    variant="light" className="btn-paging pd-0"
                                    onClick={this.handleNextEnd.bind(this, maxPage)}
                                >
                                    <MdSkipNext />
                                </Button>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3} xl={3} className="col-go-page">
                            <div className="go-page flex">
                                <Alert className="alert-text text-go-page">
                                    {'Go to Page'}
                                </Alert>
                                <FormControl
                                    placeholder=""
                                    className="form-go-page"
                                    value={goPage}
                                    onChange={this.handleChangeGoPage.bind(this, maxPage)}
                                    onKeyPress={this.handleKeyPress.bind(this)}
                                />
                                <Button variant="light" className="btn-go pd-0">
                                    {'Go'}<GrFormNext />
                                </Button>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3} xl={3} className="col-text-entries pd-0">
                            <Alert className="alert-text font text-15">
                                {'Showing'}
                            </Alert>
                            <Alert className="alert-text font text-15 bold">
                                {` ${bottom} to ${top} of ${length} `}
                            </Alert>
                            <Alert className="alert-text font text-15">
                                {'entries'}
                            </Alert>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3} xl={3} className="col-button pd-0">
                            <Button variant="primary" className="btn-export">
                                {'Export'}<IoIosArrowDown className="mr-l-10" />
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Modal
                    show={showModal} size='xl' centered
                    onHide={this.closeModal.bind(this, false, editColumnTemp)}
                >
                    <Modal.Header className="bg-blue">
                        <Container>
                            <Row>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} className="pd-0 grid">
                                    <div className="flex">
                                        <FaRegEdit color='white' size={25} />
                                        <div className="mod-title">
                                            <Alert className="alert-text font text-20 color-text-primary">
                                                {'Edit Column'}
                                            </Alert>
                                        </div>
                                    </div>
                                    <Alert className="alert-text font text-16 color-text-primary">
                                        {`Show and hide the column to your needs. Please select 5 to ${fields && fields.length} column to show.`}
                                    </Alert>
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} className="pd-0 close-modal">
                                    <Button onClick={this.closeModal.bind(this, false, editColumnTemp)}>
                                        <MdClose color='white' size={30} />
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Header>
                    <Modal.Body className="mod-body">
                        <Container>
                            <Row className="mod-body-title">
                                <Alert className="alert-text font text-20 text-primary">
                                    {'Purchase Order'}
                                </Alert>
                            </Row>

                            <Row xl={5} lg={4} md={3} sm={3} xs={2} className="mx-1">
                                {
                                    fields && fields.map((item, index) => {
                                        let visible = editColumn[index] === undefined
                                        return (
                                            <Col key={index} className="p-2">
                                                <Button variant="outline-primary" className="btn-edit-column"
                                                    style={{ backgroundColor: visible ? 'white' : '#efefef' }}
                                                    block onClick={this.editColumn.bind(this, item.Header, index, fields.length)}
                                                >
                                                    {visible ? <AiOutlineEye size={25} /> : <AiOutlineEyeInvisible size={25} />}
                                                    <b className="p-0"> {item.Header} </b>
                                                </Button>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="mod-footer">
                        <Button variant="primary" className="mod-btn-save"
                            onClick={this.saveEdit.bind(this, editColumn)}
                        >
                            {'Save'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default CustomTable