import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft } from 'react-icons/bs';
import PopUpPages from '../Modal/PopUpPages';
import { numberCheck, onChange } from './service';
import './Pagination.scss';

const PagingMove = ({ startIndex, endIndex, total, activePage, show}) => {
  const newActivePage = activePage ?? 1
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    notifPaging: false,
    goPage: 1,
  });
  const [valuePaging, setValuePaging] = useState('');

  const pages = Math.ceil(total / show);

  const search = async (e) => {
      const newPage = {...page}
    if (e.key === 'Enter') {
        setValuePaging('')
        if(e.target.value > pages){
            newPage.notifPaging = true
            setPage(newPage)
            document.getElementById('paging-number').blur();
            document.getElementById('paging-number').value = '';
        }else{
          dispatch({ type: 'GET_ACTIVE_PAGE', data: e.target.value });
          document.getElementById('paging-number').blur();
          document.getElementById('paging-number').value = '';
        }
    }
  };
  const searchForm = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={searchForm}>
        <div style={{ width: 'fit-content', height: '49px' }} className="d-flex">
          <div 
            className={`page-item border-right-none ${newActivePage === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
            onClick={() => dispatch({ type: 'GET_ACTIVE_PAGE', data: 1 })}
            aria-hidden="true"
          >
            <BsChevronBarLeft className="icon-size-paging-double" />
          </div>
          <div 
            className={`page-item paging-previous ${newActivePage === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
            onClick={() => dispatch({ type: 'GET_ACTIVE_PAGE', data:newActivePage === 1 ? 1 : newActivePage - 1 })}
            aria-hidden="true"
          >
            <BsChevronLeft className="icon-size-paging" />
          </div>
          <div className="d-flex align-items-center bg-paging-search pl-2 pr-2">
            <input
              id="paging-number"
              type="number"
              placeholder={newActivePage}
              value={valuePaging}
              className="number-pag rounded input-paging"
              onChange={(e) => {onChange({ e, page, setPage, setValuePaging })}}
              onKeyDown={(e) => search(e)}
              min="1"
              max={pages > 0 ? pages : 1}
              onKeyPress={(e) => numberCheck(e)}
            />
            <span className="text-muted-soft ml-2">of</span>
            <span className="text-muted-soft ml-2">{Number.isNaN(pages) ? 1 : pages}</span>
          </div>
          <div 
            className={`page-item margin-none-left border-left-none ${newActivePage >= pages ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
            onClick={() => {
              if(pages > newActivePage){
                dispatch({ type: 'GET_ACTIVE_PAGE', data: newActivePage+1 });
              }else{
                dispatch({ type: 'GET_ACTIVE_PAGE', data: pages });
              }
            }}
            aria-hidden="true"
          >
            <BsChevronRight className=" icon-size-paging" />
          </div>
          <span className="text-muted-s px-3 d-flex alig align-items-center">
            <b className="text-muted-soft mr-1" style={{ fontWeight: '400' }}>
              Showing
            </b>
            <b className="text-muted-dark mr-1">
              {`${Number.isNaN(startIndex) ? 0 : startIndex} to ${Number.isNaN(endIndex) ? 0 : endIndex} of ${total === undefined ? 0 : total}`}
            </b>
            <b className="text-muted-soft" style={{ fontWeight: '400' }}>
              entries
            </b>
          </span>
        </div>
      </form>
      <PopUpPages page={page} setPage={setPage} xLastPage={pages} />
    </div>
  );
};

export default PagingMove;
