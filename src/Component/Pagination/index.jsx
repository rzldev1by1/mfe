/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { CCard, CCardGroup, CPagination, CRow, CCol } from "@coreui/react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronBarLeft,
  BsChevronBarRight,
} from "react-icons/bs";
import {useSelector, useDispatch} from 'react-redux'
import PopUpPages from 'Component/Modal/PopUpPages'
import { numberCheck, onChange } from 'Component/Pagination/service'
import "./Pagination.scss";

const onActivePageChange = ({i, pagination, goto, dispatch}) => {
  const active = parseInt(i > 1 ? i : 1);
  console.log(active)
  // if (goto) {
  //  goto(active);
  // } else {
  //   dispatch({type:'PAGING', data:{ ...pagination, active }})
  // }
};
const goToPage = (goto) => {
  console.log(goto)
  // const { pagination, page } = this.state;
  // const { data } = this.props;
  // if (page === 0 || page === null || page === '' || page === undefined) {
  //   return false;
  // }

  // if (page > pagination.last_page) {
  //   this.setState({ notifPaging: true })
  //   return 0
  // }

  // if (this.props.goto) {
  //   this.props.goto(page);
  // } else {
  //   this.setState({ pagination: { ...pagination, active: page } });
  // }
};


const Pagination = ({
    pagination,
    data,
    goto
}) => {
  const dispatch = useDispatch()

  let { active, show, total } = pagination;
  total = pagination && pagination.total ? pagination.total : data.length;
  const startIndex = (active - 1) * (total < show ? total : show);
  const endIndex = startIndex + (total < show ? total : show);
  const pages = Math.ceil(total / show);
  const tmp_startIndex = (data.length > 0 && startIndex < 1) ? 1 : startIndex
  // pagination
  const x_total = (pagination && pagination.total) ? pagination.total : total;
  // const x_last_page = (pagination && pagination.last_page) ? pagination.last_page : 1;
  const x_from = (pagination && pagination.from) ? pagination.from : tmp_startIndex;
  const x_to = (pagination && pagination.to) ? pagination.to : endIndex;
    return(
      <div>
        <CRow className=" pagination-custom">
          <CCol lg="7" className="px-0 margin-mr">
            <CCardGroup>
              <CCard className="col-lg-6 border-right">
                <CPagination
                  limit={3}
                  activePage={active}
                  pages={pages > 0 ? pages : 1}
                  onActivePageChange={onActivePageChange({pagination, goto, dispatch})}
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
                    value=''
                    className="form-control form-control-sm"
                    onChange={(e) => onChange(e)}
                  // onChange={this.onChange}
                    min="1"
                    max={pages > 0 ? pages : 1}
                    onKeyPress={(e) => numberCheck(e)}
                    style={{ textAlign: 'center' }}
                  />
                  <span
                    className="text-muted-dark ml-3 pointer" 
                    onClick={goToPage(goto)}
                    onKeyPress
                    role="button"
                    tabIndex="0"
                  >
                    {"Go >"}
                  </span>
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
          <CCol lg="3" className="mt-3 showing" style={{ flex: '0 0 30%', maxWidth: '30%' }}>
            <span className="text-muted-s">
              {" Showing "}
              <b className="text-muted-dark"> 
                {' '}
                {`${x_from} to ${x_to} of ${x_total} `}
                {' '}
              </b>
              {" entries "}
            </span>
          </CCol>

          {/* Modal Pagination */}
          <PopUpPages />

        </CRow>

      </div>
    )
}

export default Pagination;