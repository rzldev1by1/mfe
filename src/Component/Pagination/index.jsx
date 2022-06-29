import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPages from '../Modal/PopUpPages';
import { numberCheck, onChange, goToPage, changePage } from './service';
import './Pagination.scss';

const Pagination = ({ pagination, data, goto, isDisplay, module, props }) => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.searchFilter);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState({
    notifPaging: false,
    goPage: 1,
  });
  const active = pagination?.active;
  const show = pagination?.show;
  let total = pagination?.total;
  total = pagination?.total ?? data?.length;
  const startIndex = (active - 1) * (total < show ? total : show);
  const endIndex = startIndex + (total < show ? total : show);
  const pages = Math.ceil(total / show);
  const tmpStartIndex = data?.length > 0 && startIndex < 1 ? 1 : startIndex;
  // pagination
  const xTotal = pagination?.total ? pagination.total : total;
  const xLastPage = pagination?.last_page ? pagination.last_page : 1;
  const xFrom = pagination?.from ? pagination.from : tmpStartIndex;
  const xTo = pagination?.to ? pagination.to : endIndex;

  const search = async (e) => {
    if (e.key === 'Enter') {
      document.getElementById('paging-number').blur();
      await goToPage({ goto, pagination, page, setPage, dispatch, module, searchFilter, user });
      document.getElementById('paging-number').value = '';
    }
  };
  const searchForm = (e) => {
    e.preventDefault();
    goToPage({ goto, pagination, page, setPage, dispatch, module, searchFilter, user });
  };
  return (
    <div>
      <form onSubmit={searchForm}>
        <div style={{ width: 'fit-content', height: '49px' }} className="d-flex">
          <div
            className={`page-item border-right-none ${
              pagination?.active === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() =>
              pagination?.active === 1 ? '' : changePage({ active: 1, dispatch, module, props, searchFilter, user })
            }
            aria-hidden="true"
          >
            <BsChevronBarLeft className="icon-size-paging-double" />
          </div>
          <div
            className={`page-item paging-previous ${
              pagination?.active === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() =>
              pagination?.active !== 1
                ? ''
                : changePage({ active: pagination?.active - 1, dispatch, module, props, searchFilter, user })
            }
            aria-hidden="true"
          >
            <BsChevronLeft className="icon-size-paging" />
          </div>
          <div className="d-flex align-items-center bg-paging-search pl-2 pr-2">
            <input
              id="paging-number"
              type="number"
              placeholder={pagination?.active}
              className="number-pag rounded input-paging"
              onChange={(e) => onChange({ e, page, setPage })}
              onKeyDown={(e) => search(e)}
              min="1"
              max={pages > 0 ? pages : 1}
              onKeyPress={(e) => numberCheck(e)}
            />
            <span className="text-muted-soft ml-2">of</span>
            <span className="text-muted-soft ml-2">{xLastPage}</span>
          </div>
          <div
            className={`page-item margin-none-left border-left-none ${
              pagination?.active >= xLastPage ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() => {
              if (pagination?.active < xLastPage) {
                changePage({ active: pagination?.active + 1, dispatch, module, props, searchFilter, user });
              }
            }}
            aria-hidden="true"
          >
            <BsChevronRight className=" icon-size-paging" />
          </div>
          {isDisplay !== false && (
            <span className="text-muted-s px-3 d-flex alig align-items-center">
              <b className="text-muted-soft mr-1" style={{ fontWeight: '400' }}>
                {' '}
                Showing
              </b>
              <b className="text-muted-dark mr-1">
                {`${Number.isNaN(xFrom) ? 0 : xFrom} to ${Number.isNaN(xTo) ? 0 : xTo} of ${
                  xTotal === undefined ? 0 : xTotal
                }`}
              </b>
              <b className="text-muted-soft" style={{ fontWeight: '400' }}>
                {' '}
                entries
              </b>
            </span>
          )}
        </div>
      </form>
      <PopUpPages page={page} setPage={setPage} xLastPage={xLastPage} />
    </div>
  );
};

export default Pagination;
