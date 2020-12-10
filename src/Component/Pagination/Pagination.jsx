import React from "react";
import { CCard, CCardGroup, CPagination, CRow, CCol } from "@coreui/react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronBarLeft,
  BsChevronBarRight,
} from "react-icons/bs";
import PopUpPages from 'Component/Modal/PopUpPages'
import { numberCheck, onChange } from 'Component/Pagination/service'
import "./Pagination.scss";
import logo_confirm from 'assets/img/LOGO5@2x.png'

class Pagination extends React.Component {
  state = {
  };

  onActivePageChange = (i) => {
    const { pagination } = this.state;
    const active = parseInt(i > 1 ? i : 1);
    if (this.props.goto) {
      this.props.goto(active);
    } else {
      this.setState({ pagination: { ...pagination, active } });
    }
  };

  goToPage = () => {
    let { page, setPage, data } = this.props;
    let newPage = { ...page }
    let { active, show, total, last_page, from, to } = newPage.pagination;

    if (newPage.PagingPage === 0 || newPage.PagingPage === null || newPage.PagingPage === '' || newPage.PagingPage === undefined) {
      return false;
    }

    if (newPage.PagingPage > last_page) {
      newPage.notifPaging = true
      // setPage(newPage)
    }

    if (this.props.goto) {
      this.props.goto(newPage.PagingPage);
    } else {
      newPage.pagination = { ...newPage.pagination, active: newPage.PagingPage }
      // setPage(newPage)
    }
  };

  render() {
    let { page, setPage, data } = this.props
    let newPage = { ...page }
    let { active, show, total, last_page, from, to } = newPage.pagination;

    total = newPage.pagination && total ? total : data;

    const startIndex = (active - 1) * (total < show ? total : show);
    const endIndex = startIndex + (total < show ? total : show);
    const pages = Math.ceil(total / show);
    const tmp_startIndex = (data > 0 && startIndex < 1) ? 1 : startIndex

    //pagination
    const x_total = (newPage.pagination && total) ? total : total;
    const x_last_page = (newPage.pagination && last_page) ? last_page : 1;
    const x_from = (newPage.pagination && from) ? from : tmp_startIndex;
    const x_to = (newPage.pagination && to) ? to : endIndex;
    return (
      // <CContainer fluid>
      <CRow className=" pagination-custom">
        <CCol lg="7" className="px-0 margin-mr">
          <CCardGroup >
            <CCard className="col-lg-6 border-right">
              <CPagination
                limit={3}
                activePage={active}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={this.onActivePageChange}
                firstButton={<BsChevronBarLeft />}
                previousButton={<BsChevronLeft />}
                nextButton={<BsChevronRight className="nextBtn" />}
                lastButton={<BsChevronBarRight className="nextBtn" />}
              />
            </CCard>
            <CCard className="col-lg-5" style={{ maxWidth: "39.36667%" }}>
              <div className="page-2 d-flex justify-content-center align-items-center">
                <span className="text-muted-soft mr-3">Go to page</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value=''
                  onChange={(e) => onChange({ page, setPage, e })}
                  // onChange={this.onChange}
                  min="1"
                  max={pages > 0 ? pages : 1}
                  onKeyPress={(e) => numberCheck(e)}
                  style={{ textAlign: 'center' }}
                />
                <span className="text-muted-dark ml-3 pointer" onClick={this.goToPage({ page, setPage, })}>
                  {"Go >"}
                </span>
              </div>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol lg="3" className="mt-3 showing" style={{ flex: '0 0 30%', maxWidth: '30%' }}>
          <span className="text-muted-s">
            {" Showing "}
            <b className="text-muted-dark"> {`${x_from} to ${x_to} of ${x_total} `} </b>
            {" entries "}
          </span>
        </CCol>

        {/* Modal Pagination */}
        <PopUpPages />

      </CRow>
      // </CContainer>

    );
  }
}
export default Pagination;
