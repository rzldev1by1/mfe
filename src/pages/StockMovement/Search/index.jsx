/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { setHeaderSummary } from './services';
import { getSite, getClient, getProduct, siteCheck, clientCheck } from 'apiService/dropdown';
import { getDateRange, getStockMovement } from 'apiService';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import moment from 'moment';
import DropdownAxios from 'Component/Dropdown/DropdownAxios';
import Input from 'Component/Input';
import './style.scss';

const Search = ({ setHeader, setdateHeader }) => {
  // params
  const dispatch = useDispatch();
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const user = useSelector((state) => state.user);

  const [isProduct, setIsProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const [defaultDate, setDefaultDate] = useState(null);
  const [dropdownValue, setdropdownValue] = useState({
    siteVal: '',
    clientVal: '',
    fromDate: moment().subtract(27, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    productVal: '',
    period: { value: 'week', label: `Weekly` },
    firstValue: false,
  });
  const [periodData, setPeriodData] = useState([
    { value: 'day', label: `Daily` },
    { value: 'week', label: `Weekly` },
    { value: 'month', label: `Monthly` },
  ]);

  const { company, client, site } = user;
  const { siteVal, clientVal, period, fromDate, toDate, productVal, firstValue } = dropdownValue;

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getDateRange({ setDefaultDate });
  }, []);

  useEffect(() => {
    console.log(isSearch, period, fromDate, toDate);
    if (isSearch === true) {
      if(period && dateFrom && dateTo ){
        dispatch({ type: 'GET_SM_SUMMARY', data: undefined });
        getStockMovement({ dropdownValue, dispatch });
        setHeaderSummary({ dropdownValue, setHeader, setdateHeader });
      }
    }
    setIsSearch(false);
  }, [isSearch]);

  //ref
  const dateFrom = React.createRef(null);
  const dateTo = React.createRef(null);

  return (
    <CCard className="mb-3 StockMovementFilter">
      <CCardBody className="p-3">
        <form onSubmit={() => setIsSearch(true)}>
          <CRow className="mx-0">
            <CCol lg={2} sm={12} className="colPeriod pr-3 pl-0">
              <Dropdown
                show
                placeholder="Display Period"
                options={periodData}
                onChangeDropdown={(selected) => {
                  let newDropdownValue = dropdownValue;
                  setdropdownValue({ ...newDropdownValue, period: selected, fromDate: null, toDate: null });
                  dateFrom.current.resetDateValue();
                  dateTo.current.resetDateValue();
                  if (selected) {
                    dateFrom.current.openDatePicker();
                  }
                }}
                selectedValue={period}
                className=" z-99"
              />
            </CCol>
            <div className="colDateText d-flex text-light-gray align-items-center">Date From</div>
            <CCol lg={2} sm={10} className="colDate pr-3 pl-0">
              {/* <DatePicker
                style={{ minWidth: '100%' }}
                arrowStyle={true}
                tabIndex="1"
                placeHolder="Select Date"
                getDate={(selected) => {
                  console.log(selected);
                  // let newDropdownValue = dropdownValue;
                  setdropdownValue({ fromDate: selected });
                  dateTo.current.openDatePicker();
                }}
                fromMonth={defaultDate?.minDate}
                toMonth={defaultDate?.maxDate}
                selectedDates={new Date(fromDate)}
                ref={dateFrom}
              /> */}
               <DatePicker
                  style={{ minWidth: '100%' }}
                  ref={dateFrom}
                  arrowStyle={true}
                  getDate={(e) => { 
                     let newDropdownValue = dropdownValue;
                     setdropdownValue({...newDropdownValue, fromDate: e, firstValue: false })
                  }}
                  defaultValue={new Date(fromDate)}
                  tabIndex="1"
                  placeHolder="Select Date"
                  onChange={(e) => { dateTo.current.openDatePicker('to') }}
                  fromMonth={defaultDate?.minDate}
                  toMonth={defaultDate?.maxDate}
                />
            </CCol>
            <div className="colDateText d-flex text-light-gray align-items-center">Date To</div>
            <CCol lg={2} sm={10} className="colDate pr-3 pl-0">
              {/* <DatePicker
                style={{ minWidth: '100%' }}
                arrowStyle={true}
                tabIndex="1"
                placeHolder="Select Date"
                getDate={(selected) => {
                  let newDropdownValue = dropdownValue;
                  setdropdownValue({ ...newDropdownValue, toDate: selected });
                }}
                firstDate={fromDate ? new Date(fromDate) : null}
                fromMonth={fromDate ? fromDate : defaultDate?.minDate}
                toMonth={defaultDate?.maxDate}
                selectedDates={toDate ? new Date(toDate) : null}
                ref={dateTo}
              /> */}
              <DatePicker
                  style={{ minWidth: '100%' }}
                  ref={dateTo}
                  arrowStyle={true}
                  firstDate={fromDate ? new Date(fromDate) : fromDate}
                  firstValue={firstValue}
                  onOpen={() => { dateTo.current.openDatePicker('from') }}
                  getDate={(e) => { 
                    let newDropdownValue = dropdownValue;
                    setdropdownValue({ ...newDropdownValue, toDate: e });
                  }}
                  defaultValue={new Date(toDate)}
                  tabIndex="1"
                  placeHolder="Select Date"
                  fromMonth={defaultDate?.minDate}
                  toMonth={defaultDate?.maxDate}
                />
            </CCol>

            <CCol style={{ flexGrow: 1 }} className="pl-0   colOthers">
              <CRow>
                <CCol lg="3" sm="4" className="pl-0">
                  {user?.site ? (
                    <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      show
                      placeholder="Site"
                      options={siteData}
                      onChangeDropdown={(selected) => {
                        let newDropdownValue = dropdownValue;
                        setdropdownValue({ ...newDropdownValue, siteVal: selected });
                      }}
                      selectedValue={siteVal}
                      className="z-99"
                    />
                  )}
                </CCol>
                <CCol lg="3" sm="4" className="pl-0">
                  {user?.client ? (
                    <input value={clientCheck(clientData, user.client)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      show
                      className="z-99"
                      placeholder="Client"
                      options={clientData}
                      onChangeDropdown={(selected) => {
                        let newDropdownValue = dropdownValue;
                        setdropdownValue({ ...newDropdownValue, clientVal: selected , productVal:[] });
                      }}
                      selectedValue={clientVal}
                    />
                  )}
                </CCol>
                <CCol sm="auto" style={{ flexGrow: 1 }} className="pl-0 pr-0">
                  <DropdownAxios
                    name="product"
                    placeholder="Product"
                    options={isProduct}
                    selectedValue={productVal}
                    className="width-100 z-99"
                    onChangeDropdown={(selected) => {
                      let newDropdownValue = dropdownValue;
                      setdropdownValue({ ...newDropdownValue, productVal: selected });
                    }}
                    isLoading={isLoading}
                    onInputChange={(val) => {
                      getProduct({ client: clientVal?.value || '', val, setIsProduct, setIsLoading });
                      setIsLoading(true);
                    }}
                    minChar={3}
                    style={{ width: '100%' }}
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol sm={12} lg={1} style={{ flexGrow: 1 }} className=" colBtn">
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
          <CRow className="mx-0">
            <CCol lg={2} sm={12} className="colPeriod pr-3 pl-0">
              <Input
                placeholder={'Period'}
                readOnly
                style={{ display: 'none' }}
                messageRequired={true}
                messageParam={{
                  messageShow: true,
                  value: period,
                }}
              />
            </CCol>
          </CRow>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default Search;
