/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { getDateRange, getSummaryData } from 'apiService';
import DatePicker from 'shared/DatePicker';
import moment from 'moment';
import './style.scss';

const Search = ({ placeholder, module }) => {
  // params
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(null);
  const [isSearch, setIsSearch] = useState(true);
  const [defaultDate, setDefaultDate] = useState(null);

  const [dropdownValue, setdropdownValue] = useState({
    fromDate: moment().subtract(27, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    firstValue: false,
  });

  const newDropdownValue = { ...dropdownValue };

  // ref
  const dateFrom = React.createRef(null);
  const dateTo = React.createRef(null);

  useEffect(() => {
    getDateRange({ setDefaultDate });
  }, []);

  useEffect(() => {
    if (isSearch === true) {
      if(dateFrom && dateTo ){
        dispatch({ type: 'GET_SP_SUMMARY', data: undefined });
        getSummaryData({ 
          fromDate:newDropdownValue.fromDate,
          toDate: newDropdownValue.toDate,
          dispatch,
          searchInput,
          module
        });
      }
    }
    setIsSearch(false);
  }, [isSearch]);
  const search = async (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'GET_SP_SUMMARY', data: [] });
      await getSummaryData({
        e,
        searchInput,
        dispatch,
        module,
      });
    }
  };

  useEffect(() => {
    getDateRange({ setDefaultDate });
  }, []);

  return (
    <CCard className="SupplierManagementFilter mb-3">
      <CCardBody className="p-3">
        <form autoComplete='on' onSubmit={() => setIsSearch(true)}>
          <CRow lg={11} className="mx-0 justify-content-between">
            <CCol className="d-flex px-0">
              <CCol lg={4} className="pl-0 mobile-input">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text border-right-0 bg-white">
                      <i className="iconU-search" />
                    </span>
                  </div>
                  <input
                    id="searchInput"
                    autoComplete="off"
                    type="text"
                    className="form-control border-left-0 input-height"
                    placeholder={placeholder}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => search(e)}
                    style={{ height: '100%' }}
                  />
                </div>
              </CCol>
              <div className="colDateText d-flex text-light-gray align-items-center">Date From</div>
              <CCol lg={2} sm={10} className="colDate px-3 pl-0">
                <DatePicker
                  style={{ minWidth: '100%' }}
                  ref={dateFrom}
                  arrowStyle
                  getDate={(e) => { 
                        setdropdownValue({...newDropdownValue, fromDate:e, firstValue: false })
                    }}
                  defaultValue={new Date(newDropdownValue.fromDate)}
                  tabIndex="1"
                  placeHolder="Select Date"
                  onOpen={(e) => { dateTo.current.openDatePicker('to') }}
                  fromMonth={defaultDate?.minDate}
                  toMonth={defaultDate?.maxDate}
                  messageRequired
                  messageParam={{
                    column:'validDates',
                    columnText:'Date From',
                    fieldName:'fromDate',
                    style:'position-absolute',
                    }}
                />
              </CCol>
              <div className="colDateText d-flex text-light-gray align-items-center">Date To</div>
              <CCol lg={2} sm={10} className="colDate px-3 pl-0">
                <DatePicker
                  style={{ minWidth: '100%' }}
                  ref={dateTo}
                  arrowStyle
                  firstDate={newDropdownValue.fromDate ? new Date(newDropdownValue.fromDate) : newDropdownValue.fromDate}
                  firstValue={newDropdownValue.firstValue}
                  onOpen={() => { dateTo.current.openDatePicker('from') }}
                  getDate={(e) => { 
                        setdropdownValue({ ...newDropdownValue, toDate: e });
                    }}
                  defaultValue={new Date(newDropdownValue.toDate)}
                  tabIndex="1"
                  placeHolder="Select Date"
                  fromMonth={defaultDate?.minDate}
                  toMonth={defaultDate?.maxDate}
                  messageRequired
                  messageParam={{
                        column:'validDates',
                        columnText:'Date To',
                        fieldName:'toDate',
                        style:'position-absolute',
                        checkDateTo: newDropdownValue.fromDate &&  newDropdownValue.fromDate > newDropdownValue.toDate
                    }}
                />
              </CCol>
            </CCol>
            <CCol sm={12} lg={1} style={{ flexGrow: 1 }} className="px-0 colBtn">
              <button
                type="button"
                className="btn btn-search btn-primary float-right"
                onClick={() => {
                  setIsSearch(true);
                }}
              >
                SEARCH
              </button>
            </CCol>
          </CRow>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default Search;
