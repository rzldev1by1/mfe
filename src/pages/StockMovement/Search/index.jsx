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
  });
  const [periodData, setPeriodData] = useState([
    { value: 'day', label: `Daily` },
    { value: 'week', label: `Weekly` },
    { value: 'month', label: `Monthly` },
  ]);

  const { company, client, site } = user;
  const { siteVal, clientVal, period, fromDate, toDate, productVal } = dropdownValue;

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getDateRange({ setDefaultDate });
  }, []);

  useEffect(() => {
    if (isSearch === true) {
      dispatch({ type: 'GET_SM_SUMMARY', data: undefined });
      getStockMovement({ dropdownValue, dispatch });
      setHeaderSummary({ dropdownValue, setHeader, setdateHeader });
      setIsSearch(false);
    }
  }, [isSearch]);

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
                  setdropdownValue({ ...newDropdownValue, period: selected });
                }}
                selectedValue={period}
                className=" z-99"
              />
            </CCol>
            <div className="colDateText d-flex text-light-gray align-items-center">Date From</div>
            <CCol lg={2} sm={10} className="colDate pr-3 pl-0">
              <DatePicker
                style={{ minWidth: '100%' }}
                arrowStyle={true}
                tabIndex="1"
                placeHolder="Select Date"
                getDate={(selected) => {
                  let newDropdownValue = dropdownValue;
                  setdropdownValue({ ...newDropdownValue, fromDate: selected });
                }}
                fromMonth={defaultDate?.minDate}
                toMonth={defaultDate?.maxDate}
                defaultValue={new Date(fromDate)}
              />
            </CCol>
            <div className="colDateText d-flex text-light-gray align-items-center">Date To</div>
            <CCol lg={2} sm={10} className="colDate pr-3 pl-0">
              <DatePicker
                style={{ minWidth: '100%' }}
                arrowStyle={true}
                tabIndex="1"
                placeHolder="Select Date"
                getDate={(selected) => {
                  let newDropdownValue = dropdownValue;
                  setdropdownValue({ ...newDropdownValue, toDate: selected });
                }}
                fromMonth={defaultDate?.minDate}
                toMonth={defaultDate?.maxDate}
                defaultValue={new Date(toDate)}
              />
            </CCol>

            <CCol lg={5} sm={12} className="pl-3 colOthers">
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
                        setdropdownValue({ ...newDropdownValue, clientVal: selected });
                      }}
                      selectedValue={clientVal}
                    />
                  )}
                </CCol>
                <CCol lg="6" sm="4" className="pl-0">
                  <DropdownAxios
                    name="product"
                    placeholder="Product"
                    options={isProduct}
                    selectedValue
                    className="width-100 z-99"
                    onChangeDropdown={(selected) => {
                      let newDropdownValue = dropdownValue;
                      setdropdownValue({ ...newDropdownValue, product: selected });
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
            <CCol lg="1" sm="12" className=" colBtn">
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
