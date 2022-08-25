import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol, CContainer } from '@coreui/react';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { getSite, getClient, getProduct, siteCheck, clientCheck } from '../../../apiService/dropdown';
import { getDateRange, getStockMovement } from '../../../apiService';
import Dropdown from '../../../Component/Dropdown';
import DatePicker from '../../../shared/DatePicker';
import DropdownAxios from '../../../Component/Dropdown/DropdownAxios';
import Input from '../../../Component/Input';
import endpoints from '../../../helpers/endpoints';
import { setHeaderSummary, showFilter, resetFilter, saveFilterSearch, closeModalFilter } from './services';
import utils from '../../../helpers/utils';

import './style.scss';

const searchFilter = endpoints.env.REACT_APP_API_URL_SEARCH_FILTER;
const Search = ({ setHeader, setDateHeader, filterHidden = [], titleFilter, module }) => {
  // params
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const darkMode = useSelector((state) => state.darkModeMLS);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const user = useSelector((state) => state.user);

  const [isProduct, setIsProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const [defaultDate, setDefaultDate] = useState(null);
  const [columnFilter, setColumnFilter] = useState(filterHidden);
  const arrayFilterSearch = JSON.parse(localStorage.getItem(`filterHidden_${module}`));
  const [triggerColumn, setTriggerColumn] = useState(false);
  const [changeFilter, setChangeFilter] = useState(true)
  const [validResetFilter, setValidResetFilter] = useState(true)

  const [dropdownValue, setDropdownValue] = useState({
    siteVal: '',
    clientVal: '',
    fromDate: moment().subtract(27, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    productVal: '',
    period: { value: 'week', label: `Weekly` },
    firstValue: false,
  });
  const [periodData] = useState([
    { value: 'day', label: `Daily` },
    { value: 'week', label: `Weekly` },
    { value: 'month', label: `Monthly` },
  ]);

  const { siteVal, clientVal, period, fromDate, toDate, productVal, firstValue } = dropdownValue;

  // ref
  const dateFrom = React.createRef(null);
  const dateTo = React.createRef(null);

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getDateRange({ setDefaultDate });
  }, []);

  useEffect(() => {
    if (isSearch === true) {
      if (period && dateFrom && dateTo) {
        dispatch({ type: 'GET_ACTIVE_PAGE', data: 1 });
        dispatch({ type: 'GET_SM_SUMMARY', data: undefined });
        getStockMovement({ dropdownValue, dispatch, user });
        setHeaderSummary({ dropdownValue, setHeader, setDateHeader });
      }
    }
    if (fromDate && toDate && period) {
      setIsSearch(true);
    }
  }, [isSearch]);

  useEffect(() => {
    columnFilter.forEach(element => {
      const filterHidden = columnFilter.filter(fil => { return fil.hiddenFilter === element.hiddenFilter && element.hiddenFilter === true })
      if (filterHidden.length !== 0) {
        if (element.hiddenFilter) setValidResetFilter(false)
      }
    })
  })

  console.log(fromDate, toDate, period)
  const contentSearch = () => {
    return (
      <>
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
                    const newDropdownValue = dropdownValue;
                    setDropdownValue({ ...newDropdownValue, siteVal: selected });
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
                    const newDropdownValue = dropdownValue;
                    setDropdownValue({ ...newDropdownValue, clientVal: selected, productVal: [] });
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
                  const newDropdownValue = dropdownValue;
                  setDropdownValue({ ...newDropdownValue, productVal: selected });
                }}
                isLoading={isLoading}
                onInputChange={(val) => {
                  getProduct({
                    client: clientVal?.value || clientCheck(clientData, user.client) || '',
                    val,
                    setIsProduct,
                    setIsLoading,
                  });
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
              if (fromDate && toDate && period) {
                setIsSearch(true);
              }
            }}
          >
            SEARCH
          </button>
        </CCol>
      </>
    );
  };

  const contentSearchFilter = () => {
    return (
      <>
        <CCol style={{ flexGrow: 1 }} className="pl-0   colOthers">
          <CRow>
            {arrayFilterSearch?.map((item) => {
              return (
                <>
                  {item.accessor === 'site' && item.hiddenFilter === true ? (
                    <CCol lg={3} sm={4} className="pl-0">
                      {user?.site ? (
                        <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                      ) : (
                        <Dropdown
                          show
                          placeholder={item.name}
                          options={siteData}
                          onChangeDropdown={(selected) => {
                            const newDropdownValue = dropdownValue;
                            setDropdownValue({ ...newDropdownValue, siteVal: selected });
                          }}
                          selectedValue={siteVal}
                          className="z-99"
                        />
                      )}
                    </CCol>
                  ) : (
                    ''
                  )}

                  {item.accessor === 'client' && item.hiddenFilter === true ? (
                    <CCol lg={3} sm={4} className="pl-0">
                      {user?.client ? (
                        <input
                          value={clientCheck(clientData, user.client)}
                          className="form-control sh-input"
                          readOnly
                        />
                      ) : (
                        <Dropdown
                          show
                          className="z-99"
                          placeholder={item.name}
                          options={clientData}
                          onChangeDropdown={(selected) => {
                            const newDropdownValue = dropdownValue;
                            setDropdownValue({ ...newDropdownValue, clientVal: selected, productVal: [] });
                          }}
                          selectedValue={clientVal}
                        />
                      )}
                    </CCol>
                  ) : (
                    ''
                  )}

                  {item.accessor === 'product' && item.hiddenFilter === true ? (
                    <CCol sm="auto" style={{ flexGrow: 1 }} className="pl-0 pr-0">
                      <DropdownAxios
                        name="product"
                        placeholder={item.name}
                        options={isProduct}
                        selectedValue={productVal}
                        className="width-100 z-99"
                        onChangeDropdown={(selected) => {
                          const newDropdownValue = dropdownValue;
                          setDropdownValue({ ...newDropdownValue, productVal: selected });
                        }}
                        isLoading={isLoading}
                        onInputChange={(val) => {
                          getProduct({
                            client: clientVal?.value || clientCheck(clientData, user.client) || '',
                            val,
                            setIsProduct,
                            setIsLoading,
                          });
                          setIsLoading(true);
                        }}
                        minChar={3}
                        style={{ width: '100%' }}
                      />
                    </CCol>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
          </CRow>
        </CCol>
        <CCol sm={12} lg={1} style={{ flexGrow: 1 }} className=" colBtn">
          <Button
            type="button"
            className="btn-search icon-search-filter mobile-search"
            onClick={() => {
              if (fromDate && toDate && period) {
                setIsSearch(true);
              }
            }}
          >
            <i className="ri-search-line" />
          </Button>
          <Button
            type="button"
            onClick={() => setShowModal(!showModal)}
            className="btn-search icon-search-filter mobile-search ml-2"
          >
            <i className="ri-filter-line" />
          </Button>
        </CCol>
      </>
    );
  };

  return (
    <>
      <CCard className="mb-3 StockMovementFilter">
        <CCardBody className="p-3">
          <form
            autoComplete="on"
            onSubmit={() => {
              if (fromDate && toDate && period) {
                setIsSearch(true);
              }
            }}
          >
            <CRow className="mx-0">
              <CCol lg={2} sm={12} className="pl-0">
                <Dropdown
                  show
                  placeholder="Display Period"
                  options={periodData}
                  onChangeDropdown={(selected) => {
                    const newDropdownValue = dropdownValue;
                    setDropdownValue({ ...newDropdownValue, period: selected, fromDate: null, toDate: null });
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
              <CCol lg={2} sm={10} className="pl-0">
                <CRow>
                  <CCol lg={3} className="d-flex p-0 align-items-center">
                    <div className="d-flex text-light-gray align-items-center">Date From</div>
                  </CCol>
                  <CCol lg={9}>
                    <DatePicker
                      style={{ minWidth: '100%' }}
                      ref={dateFrom}
                      arrowStyle
                      getDate={(e) => {
                        const newDropdownValue = dropdownValue;
                        setDropdownValue({ ...newDropdownValue, fromDate: e, firstValue: false });
                      }}
                      defaultValue={new Date(fromDate)}
                      placeHolder="Select Date"
                      onChange={() => {
                        dateTo.current.openDatePicker();
                      }}
                      classNameInput="form-control"
                      onOpen={(e) => {
                        if (e) dateTo.current.openDatePicker();
                      }}
                      fromMonth={defaultDate?.minDate}
                      toMonth={defaultDate?.maxDate}
                      messageRequired
                      messageParam={{
                        column: 'validDates',
                        columnText: 'Date From',
                        fieldName: 'fromDate',
                        style: 'position-absolute',
                      }}
                    />
                  </CCol>
                </CRow>
              </CCol>
              <CCol lg={2} sm={10} className="pl-0">
                <CRow>
                  <CCol lg={3} className="d-flex p-0 align-items-center">
                    <div className="d-flex text-light-gray align-items-center">Date To</div>
                  </CCol>
                  <CCol lg={9}>
                    <DatePicker
                      style={{ minWidth: '100%' }}
                      ref={dateTo}
                      arrowStyle
                      firstValue={firstValue}
                      onOpen={() => {
                        dateTo.current.openDatePicker('from');
                      }}
                      classNameInput="form-control"
                      getDate={(e) => {
                        const newDropdownValue = dropdownValue;
                        setDropdownValue({ ...newDropdownValue, toDate: e });
                      }}
                      defaultValue={new Date(toDate)}
                      placeHolder="Select Date"
                      fromMonth={defaultDate?.minDate}
                      toMonth={defaultDate?.maxDate}
                      messageRequired
                      messageParam={{
                        column: 'validDates',
                        columnText: 'Date To',
                        fieldName: 'toDate',
                        style: 'position-absolute',
                        checkDateTo: fromDate && fromDate > toDate,
                      }}
                    />
                  </CCol>
                </CRow>
              </CCol>
              {searchFilter === 'true' ? contentSearchFilter() : contentSearch()}
            </CRow>
            <CRow className="mx-0">
              <CCol lg={2} sm={12} className="colPeriod pr-3 pl-0">
                <Input
                  placeholder="Period"
                  readOnly
                  style={{ display: 'none' }}
                  messageRequired
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
      <Modal show={showModal} size="xl" centered>
        <Modal.Header className={`${darkMode ? 'customDarkModes' : 'bg-primary'}`}>
          <CContainer className="px-0">
            <CCol className="mx-0 px-0">
              <Button
                onClick={() => { closeModalFilter({ setColumnFilter, module, setShowModal, setChangeFilter, showModal, setValidResetFilter, utils }) }}
                className={`${darkMode ? 'darkClose ' : ''} pr-0 pt-0 pb-4 no-hover float-right `}
              >
                <MdClose color="white" size={30} />
              </Button>
              <CCol xs={10} sm={10} md={10} lg={10} xl={10} className="pl-1">
                <div className="d-flex">
                  <FaRegEdit color="white" size={25} /> &nbsp;
                  <span className="font-20" style={{ color: '#A6BCFC' }}>
                    {titleFilter}
                  </span>
                  &nbsp;
                  <span className="font-20 text-white">Edit Filter</span>
                </div>
                <span style={{ marginLeft: '29px' }} className="text-white">
                  Please select filters to show.
                </span>
              </CCol>
            </CCol>
          </CContainer>
        </Modal.Header>
        <Modal.Body className={`${darkMode ? 'DarkModesEditRename ' : ' '} p-3`}>
          <CRow className="px-2">
            {columnFilter &&
              columnFilter.map((item) => {
                return (
                  <CCol key={item.accessor} lg={3} className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        showFilter({ item, columnFilter, setColumnFilter, setValidResetFilter, });
                        setTriggerColumn(!triggerColumn);
                        setChangeFilter(false)
                      }}
                      className={`btn-edit-filter pl-2 ver-center-item w-100 ${item.hiddenFilter ? 'btn-outline-primary' : 'btn-light-gray'
                        }`}
                    >
                      {item.hiddenFilter ? (
                        <i className="ri-eye-line font-20 mr-2 d-flex align-items-center" />
                      ) : (
                        <i className="ri-eye-off-line font-20 mr-2 d-flex align-items-center" />
                      )}
                      <b className="p-0 pl-1">{item.name}</b>
                    </button>
                  </CCol>
                );
              })}
            <CCol lg={12} className="px-2 justify-content-between d-flex pt-3">
              <Button
                variant="primary"
                disabled={validResetFilter}
                className={validResetFilter ? "btn-disabled" : ""}
                style={{ padding: '0rem 1.08rem' }}
                onClick={() => {
                  setValidResetFilter(true);
                  resetFilter({ module, filterHidden, dispatch, setShowModal, setColumnFilter, columnFilter, setDropdownValue, dropdownValue });
                }}
              >
                RESET FILTER FIELD
              </Button>
              <Button
                variant="primary"
                disabled={changeFilter}
                className={changeFilter ? "btn-disabled" : ""}
                onClick={() => {
                  saveFilterSearch({ module, dispatch, columnFilter });
                  setShowModal(!showModal);
                  setValidResetFilter(!validResetFilter);
                  setChangeFilter(!changeFilter);
                }}
                style={{ padding: '0rem 1.08rem' }}
              >
                SAVE
              </Button>
            </CCol>
          </CRow>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
