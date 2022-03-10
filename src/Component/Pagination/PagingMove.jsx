import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft } from 'react-icons/bs';
import PopUpPages from 'Component/Modal/PopUpPages';
import { numberCheck, onChange, goToPage, changePage } from 'Component/Pagination/service';
import './Pagination.scss';

const PagingMove = ({ startIndex, endIndex, total, activePage, setActivePage, show}) => {
  const [page, setPage] = useState({
    notifPaging: false,
    goPage: 1,
  });

  const pages = Math.ceil(total / show);

  const search = async (e) => {
      const newPage = {...page}
    if (e.key === 'Enter') {
        // setActivePage(e.target.value)
        if(e.target.value > pages){
            newPage.notifPaging = true
            setPage(newPage)
        }else{
           setActivePage(e.target.value)
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
          <div className={`page-item border-right-none ${activePage === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
             onClick={() => setActivePage(1)}
          >
            <BsChevronBarLeft className="icon-size-paging-double" />
          </div>
          <div className={`page-item paging-previous ${activePage === 1 ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
             onClick={() => setActivePage(activePage === 1 ? 1 : activePage - 1)}
          >
            <BsChevronLeft className="icon-size-paging" />
          </div>
          <div className={`d-flex align-items-center bg-paging-search pl-2 pr-2`}>
            <input
              id="paging-number"
              type="number"
              placeholder={activePage}
              className="number-pag rounded input-paging"
              onChange={(e) => onChange({ e, page, setPage })}
              onKeyDown={(e) => search(e)}
              min="1"
              max={pages > 0 ? pages : 1}
              onKeyPress={(e) => numberCheck(e)}
            />
            <span className="text-muted-soft ml-2">of</span>
            <span className="text-muted-soft ml-2">{isNaN(pages) ? 1 : pages}</span>
          </div>
          <div className={`page-item margin-none-left border-left-none ${activePage >= pages ? 'text-muted-soft' : ' text-muted-dark click-tab'}`}
            onClick={() => setActivePage(pages > activePage ? activePage+1 : pages)}
          >
            <BsChevronRight className=" icon-size-paging" />
          </div>
            <span className={`text-muted-s px-3 d-flex alig align-items-center`}>
              <b className="text-muted-soft mr-1" style={{ fontWeight: '400' }}>
                {`Showing`}
              </b>
              <b className="text-muted-dark mr-1">
                {`${isNaN(startIndex) ? 0 : startIndex} to ${isNaN(endIndex) ? 0 : endIndex} of ${total === undefined ? 0 : total}`}
              </b>
              <b className="text-muted-soft" style={{ fontWeight: '400' }}>
                {`entries`}
              </b>
            </span>
        </div>
      </form>
      <PopUpPages page={page} setPage={setPage} xLastPage={pages} />
    </div>
  );
};

export default PagingMove;
