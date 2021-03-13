import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPages from 'Component/Modal/PopUpPages';
import { numberCheck, onChange, goToPage, changePage } from 'Component/Pagination/service';
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
      document.getElementById('paging-number').blur();
      await goToPage({ goto, pagination, page, setPage, dispatch, module, searchFilter });
      document.getElementById('paging-number').value = '';
    }
  };
  const searchForm = (e) => {
    e.preventDefault();
    goToPage({ goto, pagination, page, setPage, dispatch, module, searchFilter });
  };
  return (
    <div>
      <form onSubmit={searchForm}>
        <div style={{ width: 'fit-content', height: '49px' }} className="d-flex">
          <div
            className={`page-item border-right-none ${
              pagination?.active == 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() =>
              pagination?.active == 1 ? '' : changePage({ active: 1, dispatch, module, props, searchFilter })
            }
          >
            <BsChevronBarLeft className="icon-size-paging-double" />
          </div>
          <div
            className={`page-item paging-previous ${
              pagination?.active == 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() =>
              pagination?.active == 1
                ? ''
                : changePage({ active: pagination?.active - 1, dispatch, module, props, searchFilter })
            }
          >
            <BsChevronLeft className="icon-size-paging" />
          </div>
          <div className={`d-flex align-items-center bg-paging-search pl-2 pr-2`}>
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
            <span className="text-muted-soft ml-2">of {x_last_page}</span>
          </div>
          <div
            className={`page-item margin-none-left border-left-none ${
              pagination?.active >= x_last_page ? 'text-muted-soft' : ' text-muted-dark click-tab'
            }`}
            onClick={() => {
              if (pagination?.active < x_last_page) {
                changePage({ active: pagination?.active + 1, dispatch, module, props, searchFilter });
              }
            }}
          >
            <BsChevronRight className=" icon-size-paging" />
          </div>
          {isDisplay === false ? (
            ''
          ) : (
            <span className={`text-muted-s px-3 d-flex alig align-items-center`}>
              <b className="text-muted-soft mr-1" style={{ fontWeight: '400' }}>
                {' '}
                {`Showing`}
              </b>
              <b className="text-muted-dark mr-1">
                {`${isNaN(x_from) ? 0 : x_from} to ${isNaN(x_to) ? 0 : x_to} of ${x_total === undefined ? 0 : x_total}`}
              </b>
              <b className="text-muted-soft" style={{ fontWeight: '400' }}>
                {' '}
                {`entries`}
              </b>
            </span>
          )}
        </div>
      </form>
      <PopUpPages page={page} setPage={setPage} xLastPage={x_last_page} />
    </div>
  );
};

export default Pagination;
