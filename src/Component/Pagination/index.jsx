/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { CCard, CCardGroup, CPagination, CRow, CCol } from '@coreui/react';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import PopUpPages from 'Component/Modal/PopUpPages';
import { numberCheck, onChange, onActivePageChange, goToPage } from 'Component/Pagination/service';
import './Pagination.scss';

const Pagination = ({ pagination, data, goto, page, setPage, className }) => {
  const dispatch = useDispatch();

  let active = pagination?.active;
  let show = pagination?.show;
  let total = pagination?.total;
  total = pagination && pagination.total ? pagination.total : data?.length;
  const startIndex = (active - 1) * (total < show ? total : show);
  const endIndex = startIndex + (total < show ? total : show);
  const pages = Math.ceil(total / show);
  const tmp_startIndex = data?.length > 0 && startIndex < 1 ? 1 : startIndex;
  // pagination
  const x_total = pagination && pagination.total ? pagination.total : total;
  const x_last_page = (pagination && pagination.last_page) ? pagination.last_page : 1;
  const x_from = pagination && pagination.from ? pagination.from : tmp_startIndex;
  const x_to = pagination && pagination.to ? pagination.to : endIndex;
  return (
    <div>
      <CRow className=" pagination-custom">
        <CCol lg="7" className="px-0 margin-mr">
          <CCardGroup>
            <CCard className="col-lg-5 border-right px-0">
              <CPagination
                limit={3}
                activePage={active}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={(e) => onActivePageChange({ e, pagination, goto, dispatch })}
                firstButton={<BsChevronBarLeft />}
                previousButton={<BsChevronLeft />}
                nextButton={<BsChevronRight className="nextBtn" />}
                lastButton={<BsChevronBarRight className="nextBtn" />}
              />
            </CCard>
            <CCard className={`${className} col-lg-5`} style={{ maxWidth: '39.36667%' }}>
              <div className="page-2 d-flex justify-content-center align-items-center">
                <span className="text-muted-soft mr-3">Go to page</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  onChange={(e) => onChange({ e, page, setPage })}
                  min="1"
                  max={pages > 0 ? pages : 1}
                  onKeyPress={(e) => numberCheck(e)}
                  style={{ textAlign: 'center' }}
                />
                <span
                  className="text-muted-dark ml-3 pointer tes-haha"
                  onClick={() => goToPage({ goto, pagination, page, setPage, dispatch })}
                  onKeyPress
                  role="button"
                  tabIndex="0"
                >
                  {'Go >'}
                </span>
              </div>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol lg="3" className={`${className} mt-3 pl-4 showing px-0 showing-page`}>
          <span className="text-muted-s">
            {' Showing '}
            <b className="text-muted-dark">{`${x_from} to ${x_to} of ${x_total} `}</b>
            {' entries '}
          </span>
        </CCol>

        {/* Modal Pagination */}
        <PopUpPages 
          page={page} 
          setPage={setPage} 
          xLastPage={x_last_page}
        />
      </CRow>
    </div>
  );
};

export default Pagination;
