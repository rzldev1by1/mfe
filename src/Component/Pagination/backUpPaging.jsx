/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { CPagination } from '@coreui/react';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPages from 'Component/Modal/PopUpPages';
import { numberCheck, onChange, onActivePageChange, goToPage } from 'Component/Pagination/service';
import './Pagination.scss';

const Pagination = ({ pagination, data, goto, isDisplay, module, props }) => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.searchFilter);
  const [page, setPage] = useState({
    notifPaging: false,
    goPage: 1,
  });
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
  const x_last_page = pagination && pagination.last_page ? pagination.last_page : 1;
  const x_from = pagination && pagination.from ? pagination.from : tmp_startIndex;
  const x_to = pagination && pagination.to ? pagination.to : endIndex;

  const search = async (e) => {
    if (e.key === 'Enter') {
      await goToPage({ goto, pagination, page, setPage, dispatch, module });
    }
  };
  const searchForm = (e) => {
    e.preventDefault();
    goToPage({ goto, pagination, page, setPage, dispatch, module });
  };
  return (
    <div>
      <form onSubmit={searchForm}>
        <div style={{ width: 'fit-content' }} className="d-flex">
          <CPagination
            limit={3}
            activePage={active}
            pages={pages > 0 ? pages : 1}
            onActivePageChange={(e) => onActivePageChange({ e, pagination, goto, dispatch, module, props, searchFilter })}
            firstButton={<BsChevronBarLeft />}
            previousButton={<BsChevronLeft />}
            nextButton={<BsChevronRight className="nextBtn" />}
            lastButton={<BsChevronBarRight className="nextBtn" />}
          />
          {isDisplay === false ? (
            ''
          ) : (
            <div className={`d-flex alig align-items-center bg-white px-3 rounded-right`}>
              <span className="text-muted-soft mr-3">Go to page</span>
              <input
                type="number"
                className="number-pag rounded"
                onChange={(e) => onChange({ e, page, setPage })}
                onKeyPress={(e) => search(e)}
                min="1"
                max={pages > 0 ? pages : 1}
                onKeyPress={(e) => numberCheck(e)}
                style={{ textAlign: 'center' }}
              />
              <span
                className="text-muted-dark ml-3 pointer outLineNone"
                onClick={() => goToPage({ goto, pagination, page, setPage, dispatch, module, props, searchFilter })}
                onKeyPress
                role="button"
                tabIndex="0"
              >
                {'Go >'}
              </span>
            </div>
          )}
          {isDisplay === false ? (
            ''
          ) : (
            <span className={`text-muted-s px-3 d-flex alig align-items-center`}>
              <b className="text-muted-dark">{`Showing ${isNaN(x_from) ? 0 : x_from} to ${isNaN(x_to) ? 0 : x_to} of ${
                x_total === undefined ? 0 : x_total
              } entries`}</b>
            </span>
          )}
        </div>
      </form>
      <PopUpPages page={page} setPage={setPage} xLastPage={x_last_page} />
    </div>
  );
};

export default Pagination;
