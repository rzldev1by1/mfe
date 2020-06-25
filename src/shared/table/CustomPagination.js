import React from 'react'
import {
  CCard,
  CCardGroup,
  CPagination,
  CRow,
  CCol,
} from '@coreui/react'
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs'
import './CustomPagination.css'

class CustomPagination extends React.Component {
  state = {
    pagination: { active: 1, show: 10, total: 0 },
    page: 1,
  }
  componentDidUpdate = (nextProps) => {
    let { pagination } = this.props
    if (pagination && nextProps.pagination !== pagination) {
      console.log('set pagination')
      this.setState({ pagination })
    }
  }
  onChange = (e) => {
    if (e.target.value) {
      this.setState({ page: parseInt(e.target.value) })
    }
  }
  onActivePageChange = (i) => {
    const { pagination } = this.state
    const active = parseInt(i > 1 ? i : 1)
    if (this.props.goto) {
      this.props.goto(active)
    } else {
      this.setState({ pagination: { ...pagination, active } })
    }
  }
  goToPage = () => {
    const { pagination, page } = this.state
    if (this.props.goto) {
      this.props.goto(page)
    } else {
      this.setState({ pagination: { ...pagination, active: page } })
    }
  }
  render() {
    let { active, show, total } = this.state.pagination
    let { data, pagination } = this.props
    total = pagination && pagination.total ? pagination.total : data.length
    const startIndex = (active - 1) * (total < show ? total : show)
    const endIndex = startIndex + (total < show ? total : show)
    const pages = parseInt(total / show)
    return (
      // <CContainer fluid>
      <CRow className="mt-4">
        <CCol lg="5">
          <CCardGroup>
            <CCard className="col-lg-7">
              <CPagination
                limit={3}
                activePage={active}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={this.onActivePageChange}
                firstButton={<BsChevronBarLeft />}
                previousButton={<BsChevronLeft />}
                nextButton={<BsChevronRight />}
                lastButton={<BsChevronBarRight />}
              />
            </CCard>
            <CCard className="col-lg-5">
              <div className="page-2 d-flex justify-content-center">
                <span className="text-muted mt-1 mr-3">Go to page</span>
                <input type="number" className="form-control form-control-sm" onChange={this.onChange} min="1" />
                <span className="text-muted mt-1 ml-3 pointer" onClick={this.goToPage}>{'Go >'}</span>
              </div>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol lg="3" className="mt-3">
          <span>Showing <b> &nbsp; {`${startIndex + 1} to ${endIndex} of ${total} `} </b> &nbsp; entries</span>
        </CCol>
        <CCol lg="4">
          {this.props.export}
        </CCol>
      </CRow>
      // </CContainer>
    )
  }
}
export default CustomPagination