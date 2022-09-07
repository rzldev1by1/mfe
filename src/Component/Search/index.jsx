import React, { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CContainer,
} from '@coreui/react';
import { Button, Modal } from 'react-bootstrap';
import endpoints from '../../helpers/endpoints';
import DatePicker from '../../shared/DatePicker';
import Dropdown from '../Dropdown';
import { getSummaryData, getDetailData, getDateRange } from '../../apiService';
import utils from '../../helpers/utils';
import {
  getSite,
  getClient,
  getStatus,
  getOrderType,
  getTask,
  siteCheck,
  clientCheck,
} from '../../apiService/dropdown';
import {
  changeValue,
  changeDropdown,
  setStyle,
  setStyleDesc,
  setColor,
  setDimensions,
  setSize,
  handleFullFillMarked,
  showFilter,
  resetFilter,
  saveFilterSearch,
  closeModalFilter,
  allModule,
} from './service';
import './index.scss';

const searchFilter = endpoints.env.REACT_APP_API_URL_SEARCH_FILTER;

const Search = ({
  titleFilter,
  module,
  filterHidden = [],
  placeholder = '',
  filterSite,
  filterClient,
  filterStatus,
  filterOrderType,
  filterTask,
  statusDataSH,
  onChangeGetTask = false,
  Export = false,
  filterStyle,
  filterStyleDesc,
  filterColor,
  filterDimensions,
  filterSize,
  inputTag,
  btnClear,
  btnFulfill,
  btnSearch,
  paginationSoDetail,
  props,
  spDetailTable,
  setExportTable,
}) => {
  let paramData
  let getDataFilter
  let setAllFilter
  Object.keys(allModule).forEach((allModuleKey) => {
    if (allModuleKey === module) {
      paramData = allModule[allModuleKey].paramType
      getDataFilter = allModule[allModuleKey].getFilterType
      setAllFilter = allModule[allModuleKey].filterType
    }
  });


  // params
  const dispatch = useDispatch();
  const dateTo = createRef(null);
  const allFilter = useSelector((state) => state[getDataFilter]);
  const darkMode = useSelector((state) => state.darkModeMLS);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const statusData = useSelector((state) => state.statusData);
  const orderTypeData = useSelector((state) => state.orderTypeData);
  const taskData = useSelector((state) => state.taskData);
  const styleData = useSelector((state) => state.styleData);
  const colorData = useSelector((state) => state.colorData);
  const styleDescData = useSelector((state) => state.styleDescData);
  const dimensionsData = useSelector((state) => state.dimensionsData);
  const sizeData = useSelector((state) => state.sizeData);
  const markedRow = useSelector((state) => state.markedRow);
  const user = useSelector((state) => state.user);
  const { company, client } = user;
  const [searchInput, setSearchInput] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getTaskParam, setGetTaskParam] = useState(false);
  const [showClearMod, setShowClearMod] = useState(false);
  const [showFulfillMod, setShowFulfillMod] = useState(false);
  const [defaultDate, setDefaultDate] = useState(null);
  const [changeFilter, setChangeFilter] = useState(true)
  const [validResetFilter, setValidResetFilter] = useState(true)
  const [columnFilter, setColumnFilter] = useState(filterHidden);
  const arrayFilterSearch = JSON.parse(localStorage.getItem(`filterHidden_${module}`));
  const [triggerColumn, setTriggerColumn] = useState(false);
  const [dropdownValue, setDropdownValue] = useState();

  const newDropdownValue = { ...dropdownValue };

  const search = async (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: paramData, data: [] });
      await getSummaryData({
        e,
        siteVal: allFilter?.site?.value,
        clientVal: allFilter?.client?.value,
        orderType: allFilter?.orderType,
        task: allFilter?.task,
        status: allFilter?.status,
        typeDate: allFilter?.typeDate,
        fromDate: allFilter?.fromDate,
        toDate: allFilter?.toDate,
        vendorOrderNo: allFilter?.vendorOrderNo,
        customerOrderRef: allFilter?.customerOrderRef,
        searchInput,
        columnFilter,
        dispatch,
        module,
        user,
      });
      if (setExportTable) {
        setExportTable(false);
      }
    }
  };
  const handleFulfill = () => {
    getDetailData({ dispatch, props, active: paginationSoDetail?.active, module, fulfill: true });
  };

  const handleClear = () => {
    let newArray = [...spDetailTable];
    newArray = newArray.map((data) => {
      data.edit_qty = '';
      data.edit_carton = '';
      data.isInvalidOrderCarton = false;
      data.isInvalidOrderQty = false;
      data.isMarked = false;
      return data;
    });

    dispatch({ type: 'GET_SP_DETAIL_TABLE', data: newArray });
    setShowClearMod(false);
  };

  const fulfillMarkedMod = () => {
    spDetailTable.forEach((data) => {
      const isMarkeds = data.isMarked;
      if (isMarkeds && data.edit_qty !== '' && data.edit_carton !== '') {
        setShowFulfillMod(true);
      } else {
        handleFullFillMarked({ dispatch, spDetailTable, setShowFulfillMod, markedRow });
      }
    });
  };

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getStatus({ dispatch });
    getDateRange({ setDefaultDate });
    if (client) {
      getOrderType({ dispatch, company, client, module });
    }
  }, []);

  useEffect(() => {
    columnFilter.forEach(element => {
      const filterHidden = columnFilter.filter(fil => { return fil.hiddenFilter === element.hiddenFilter && element.hiddenFilter === true })
      if (filterHidden.length !== 0) {
        if (element.hiddenFilter) setValidResetFilter(false)
      }
    })
  })

  useEffect(() => {
    setGetTaskParam({ site: allFilter?.site, client: allFilter?.client });
  }, [allFilter?.site, allFilter?.client]);

  useEffect(() => {
    const newAllFilter = { ...allFilter };
    if (module === 'purchaseOrder' || module === 'salesOrder') {
      if (newAllFilter.status === '') {
        newAllFilter.status = { value: 'open', label: 'All Open' };
        dispatch({ type: setAllFilter, data: newAllFilter });
      }
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SEARCH_FILTER',
      data: {
        siteVal: allFilter?.site?.value,
        clientVal: allFilter?.client?.value,
        orderType: allFilter?.orderType,
        task: allFilter?.task,
        status: allFilter?.status,
      },
    });
  }, [
    allFilter?.site?.value,
    allFilter?.client?.value,
    allFilter?.orderType,
    allFilter?.task,
    allFilter?.status,
  ]);

  useEffect(() => {
    if (Export === true) {
      let valueSite
      let valueClient

      if (user.site) valueSite = user?.site
      else if (allFilter?.site) valueSite = allFilter.site.value
      else valueSite = ''

      if (user.client) valueClient = user?.client
      else if (allFilter?.client) valueClient = allFilter.client.value
      else valueClient = ''


      getSummaryData({
        siteVal: valueSite,
        clientVal: valueClient,
        orderType: allFilter?.orderType,
        task: allFilter?.task,
        status: allFilter?.status,
        typeDate: allFilter?.typeDate,
        fromDate: allFilter?.fromDate,
        toDate: allFilter?.toDate,
        vendorOrderNo: allFilter?.vendorOrderNo,
        customerOrderRef: allFilter?.customerOrderRef,
        dispatch,
        searchInput,
        columnFilter,
        module,
        Export,
        user,
      });
    }
  }, [Export]);

  const contentSearch = () => {
    return (
      <form>
        <CRow className="mx-0">
          {inputTag ? (
            <CCol lg={module === 'UserManagement' ? 11 : 3} className="pl-0 mobile-input">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white">
                    <i className="iconU-search" />
                  </span>
                </div>
                <input
                  id="searchInput"
                  type="text"
                  className="form-control border-left-0 input-height"
                  placeholder={placeholder}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => search(e)}
                  style={{ height: '100%' }}
                />
              </div>
            </CCol>
          ) : (
            ''
          )}

          {module === 'UserManagement' ? (
            <CCol lg={1} className="pr-0">
              <button
                type="button"
                className="btn btn-search mobile-search  btn-primary float-right"
                onClick={() =>
                  getSummaryData({
                    siteVal: user.site ? user.site : allFilter.site?.value,
                    clientVal: user.client ? user.client : allFilter.client?.value,
                    orderType: allFilter.orderType,
                    task: allFilter.task,
                    status: allFilter.status,
                    dispatch,
                    searchInput,
                    columnFilter,
                    module,
                    user,
                  }) && dispatch({ type: paramData, data: [] })}
              >
                SEARCH
              </button>
            </CCol>
          ) : (
            <CCol lg={!inputTag ? 12 : 9} className="px-0">
              <CRow className="mx-0">
                <CCol sm={4} lg={2} className="px-0">
                  <div className={`${filterSite === true ? null : ' d-none'}`}>
                    {user?.site ? (
                      <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                    ) : (
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Site"
                        options={siteData}
                        onChangeDropdown={(selected) =>
                          changeValue({
                            selected, setAllFilter, allFilter, dispatch, onChangeGetTask, getTask, getTaskParam, columns: 'site',
                          })}
                        selectedValue={allFilter?.site}
                      />
                    )}
                  </div>
                </CCol>
                <CCol sm={4} lg={2} className="px-3">
                  <div className={`${user?.site ? ' pr-3' : ''} ${filterClient === true ? null : ' d-none'}`}>
                    {user?.client ? (
                      <input value={clientCheck(clientData, user.client)} className="form-control sh-input" readOnly />
                    ) : (
                      <Dropdown
                        show
                        placeholder="Client"
                        options={clientData}
                        onChangeDropdown={(selected) =>
                          changeValue({
                            selected, setAllFilter, allFilter, dispatch, onChangeGetTask, getTask, getTaskParam, columns: 'client',
                          })}
                        selectedValue={allFilter?.client}
                      />
                    )}
                  </div>
                </CCol>
                <CCol sm={4} lg={2} className="px-0 ">
                  <div className={`${filterStatus === true ? null : ' d-none'}`}>
                    <Dropdown
                      className="px-0"
                      show
                      placeholder="Status"
                      options={statusDataSH || statusData}
                      onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'status' })}
                      selectedValue={allFilter.status}
                    />
                  </div>
                </CCol>
                <CCol sm={4} lg={2} className="">
                  <div className={`${filterOrderType === true ? null : ' d-none'}`}>
                    <Dropdown
                      className="px-0"
                      show
                      placeholder="Order Type"
                      options={orderTypeData}
                      onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'orderType' })}
                      selectedValue={allFilter.orderType}
                    />
                  </div>
                </CCol>
                <CCol sm={4} lg={2} className=" px-0">
                  <div className={`${filterTask === true ? null : ' d-none'}`}>
                    <Dropdown
                      className="px-0"
                      show
                      placeholder="Task"
                      options={taskData}
                      onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'task' })}
                      selectedValue={allFilter.task}
                    />
                  </div>
                </CCol>
                <CCol sm={4} lg={2} className={`pl-0 pr-3 ${filterStyle === true ? null : ' d-none'}`}>
                  <Dropdown
                    className="px-0"
                    show
                    placeholder="Style"
                    options={styleData}
                    onChangeDropdown={(selected) => setStyle({ selected, dispatch, dropdownValue, setDropdownValue })}
                    selectedValue={allFilter.style}
                  />
                </CCol>
                <CCol
                  sm={4}
                  lg={2}
                  className={`pl-0 pr-3 ${filterStyleDesc === true ? null : ' d-none'}`}
                >
                  <Dropdown
                    className="px-0"
                    show
                    placeholder="Style Desc."
                    options={styleDescData}
                    onChangeDropdown={(selected) => setStyleDesc({ selected, dispatch, dropdownValue, setDropdownValue })}
                    selectedValue={newDropdownValue.styleDesc}
                  />
                </CCol>
                <CCol sm={4} lg={2} className={`pl-0 pr-3 ${filterColor === true ? null : ' d-none'}`}>
                  <Dropdown
                    className="px-0"
                    show
                    placeholder="Style Color"
                    options={colorData}
                    onChangeDropdown={(selected) => setColor({ selected, dispatch, dropdownValue, setDropdownValue })}
                    selectedValue={newDropdownValue.color}
                  />
                </CCol>
                <CCol
                  sm={4}
                  lg={2}
                  className={`pl-0 pr-3 ${filterDimensions === true ? null : ' d-none'}`}
                >
                  <Dropdown
                    className={`px-0 `}
                    show
                    placeholder="Dimensions"
                    options={dimensionsData}
                    onChangeDropdown={(selected) => setDimensions({ selected, dispatch, dropdownValue, setDropdownValue })}
                    selectedValue={newDropdownValue.dimensions}
                  />
                </CCol>
                <CCol sm={4} lg={2} className={`px-0 ${filterSize === true ? null : ' d-none'}`}>
                  <Dropdown
                    className="px-0"
                    show
                    placeholder="Size"
                    options={sizeData}
                    onChangeDropdown={(selected) => setSize({ selected, dispatch, dropdownValue, setDropdownValue })}
                    selectedValue={newDropdownValue.size}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0 d-flex justify-content-end">
                  {btnClear ? (
                    <CDropdown className="btn-group btn-clear">
                      <CDropdownToggle color="primary">CLEAR</CDropdownToggle>
                      <CDropdownMenu className="mt-2 shadow-none border">
                        <CDropdownItem onClick={() => setShowClearMod(true)}>CLEAR ALL</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          onClick={() => handleFullFillMarked({ dispatch, spDetailTable, markedRow, clearMarked: true })}
                        >
                          CLEAR MARKED
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  ) : (
                    ''
                  )}
                  {btnFulfill ? (
                    <CDropdown className="btn-group mx-3 btn-fulfill">
                      <CDropdownToggle color="primary">FULFILL</CDropdownToggle>
                      <CDropdownMenu className="mt-2 shadow-none border">
                        <CDropdownItem onClick={() => handleFulfill()}>FULFILL ALL</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem onClick={() => fulfillMarkedMod()}>FULFILL MARKED</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  ) : (
                    ''
                  )}
                  {btnSearch ? (
                    <button
                      type="button"
                      className="btn btn-search mobile-search btn-primary float-right"
                      onClick={() => {
                        getSummaryData({
                          siteVal: user.site ? user.site : allFilter.site?.value,
                          clientVal: user.client ? user.client : allFilter.client?.value,
                          orderType: allFilter.orderType,
                          task: allFilter.task,
                          status: allFilter.status,
                          columnFilter,
                          dispatch,
                          searchInput,
                          module,
                          user,
                        });
                        dispatch({ type: paramData, data: [] });
                        setExportTable(false);
                      }}
                    >
                      SEARCH
                    </button>
                  ) : (
                    ''
                  )}
                </CCol>
              </CRow>

              <Modal show={showClearMod} size="lg" centered className="p-3 modal-confirmation">
                <Modal.Body className="p-3">
                  <div
                    className="text-right px-0"
                    style={{ fontSize: '14px' }}
                    onClick={() => setShowClearMod(!showClearMod)}
                    aria-hidden="true"
                  >
                    <i className="iconU-close pointer" />
                  </div>
                  <div className="d-flex justify-content-between">
                    <img src="" alt="logo" style={{ width: '25%', height: '25%' }} />
                    <div className="pl-3">
                      <p className="mb-0" style={{ color: '#D6D8DA' }}>
                        Are you sure?
                      </p>
                      <p>To clear all &apos;Edit Qty&apos; and &apos;Edit Carton&apos; fields.</p>
                    </div>
                  </div>
                  <CCol className="px-0 pb-0 pt-3 d-flex justify-content-end">
                    <Button variant="primary" style={{ padding: '0rem 1.08rem' }} onClick={() => handleClear()}>
                      CLEAR
                    </Button>
                  </CCol>
                </Modal.Body>
              </Modal>
              <Modal show={showFulfillMod} size="lg" centered className="p-3 modal-confirmation">
                <Modal.Body className="p-3">
                  <div
                    className="text-right px-0"
                    style={{ fontSize: '14px' }}
                    onClick={() => setShowFulfillMod(!showFulfillMod)}
                    aria-hidden="true"
                  >
                    <i className="iconU-close pointer" />
                  </div>
                  <div className="d-flex justify-content-between">
                    <img src="" alt="logo" style={{ width: '25%', height: '25%' }} />
                    <div className="pl-3">
                      <p>System will override data previously entered.</p>
                    </div>
                  </div>
                  <CCol className="px-0 pb-0 pt-3 d-flex justify-content-end">
                    <Button
                      variant="primary"
                      style={{ padding: '0rem 1.08rem' }}
                      onClick={() => handleFullFillMarked({ dispatch, spDetailTable, markedRow, setShowFulfillMod })}
                    >
                      DONE
                    </Button>
                  </CCol>
                </Modal.Body>
              </Modal>
            </CCol>
          )}
        </CRow>
      </form>
    );
  };

  const contentSearchFilter = () => {
    return (
      <form>
        <CRow className="mx-0">
          {inputTag ? (
            <CCol lg={11} className="px-0 mobile-input">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white">
                    <i className="iconU-search" />
                  </span>
                </div>
                <input
                  id="searchInput"
                  type="text"
                  className="form-control border-left-0 ml-0 input-height"
                  placeholder={placeholder}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => search(e)}
                  style={{ height: '100%' }}
                />
              </div>
            </CCol>
          ) : (
            ''
          )}
          <CCol lg={1} className="d-flex justify-content-lg-end pr-0">
            <Button
              type="button"
              className="btn-search icon-search-filter mobile-search"
              onClick={() => {
                let valueSite
                let valueClient
                if (user.site) valueSite = user?.site
                else if (allFilter?.site) valueSite = allFilter.site.value
                else valueSite = ''

                if (user.client) valueClient = user?.client
                else if (allFilter?.client) valueClient = allFilter.client.value
                else valueClient = ''
                getSummaryData({
                  siteVal: valueSite,
                  clientVal: valueClient,
                  orderType: allFilter?.orderType,
                  task: allFilter?.task,
                  status: allFilter?.status,
                  typeDate: allFilter?.typeDate,
                  fromDate: allFilter?.fromDate,
                  toDate: allFilter?.toDate,
                  vendorOrderNo: allFilter?.vendorOrderNo,
                  customerOrderRef: allFilter?.customerOrderRef,
                  columnFilter,
                  dispatch,
                  searchInput,
                  module,
                  user,
                });
                dispatch({ type: paramData, data: [] });
                setExportTable(false);
              }}
            >
              <i className="ri-search-line" />
            </Button>
            {module === 'UserManagement' ? (
              ''
            ) : (
              <Button
                type="button"
                onClick={() => { setShowModal(!showModal) }}
                className="btn-search icon-search-filter mobile-search ml-2"
              >
                <i className="ri-filter-line" />
              </Button>
            )}
          </CCol>
          <CCol lg={12} className="px-0">
            <CRow>
              <CCol lg={11}>
                <CRow className="mx-0">
                  {arrayFilterSearch?.map((dataHidden) => {
                    const dateFilter = [
                      'dateReceived',
                      'deliveryDate',
                      'dateReleased',
                      'dateReleased',
                      'dateCompleted',
                      'orderDate',
                    ];
                    return (
                      <>
                        {
                          dataHidden.accessor === 'site' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={`px-0 mr-3 pt-3 ${filterSite === true ? null : ' d-none'}`}
                            >
                              {user?.site ? (
                                <input
                                  value={siteCheck(siteData, user.site)}
                                  className="form-control sh-input"
                                  readOnly
                                />
                              ) : (
                                <Dropdown
                                  show
                                  placeholder={dataHidden.name}
                                  options={siteData}
                                  onChangeDropdown={(selected) => changeValue({ selected, setAllFilter, allFilter, dispatch, onChangeGetTask, getTask, getTaskParam, columns: 'site', })}
                                  selectedValue={allFilter?.site}
                                />
                              )}
                            </CCol>
                          )
                        }

                        {
                          dataHidden.accessor === 'client' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={`px-0 mr-3 pt-3 ${filterClient === true ? null : ' d-none'}`}
                            >
                              {user?.client ? (
                                <input
                                  value={clientCheck(clientData, user.client)}
                                  className="form-control sh-input"
                                  readOnly
                                />
                              ) : (
                                <Dropdown
                                  show
                                  placeholder={dataHidden.name}
                                  options={clientData}
                                  onChangeDropdown={(selected) =>
                                    changeValue({
                                      selected, setAllFilter, allFilter, dispatch, onChangeGetTask, getTask, getTaskParam, columns: 'client',
                                    })}
                                  selectedValue={allFilter?.client}
                                />
                              )}
                            </CCol>
                          )
                        }

                        {
                          dataHidden.accessor === 'status' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={`px-0 mr-3 pt-3 ${filterStatus === true ? null : ' d-none'}`}
                            >
                              <Dropdown
                                // show
                                options={statusDataSH || statusData}
                                selectedValue={allFilter?.status}
                                onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'status' })}
                                placeholder={dataHidden.name}
                              />
                            </CCol>
                          )
                        }

                        {
                          dataHidden.accessor === 'orderType' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={`px-0 mr-3 pt-3 ${filterOrderType === true ? null : ' d-none'}`}
                            >
                              <Dropdown
                                show
                                placeholder={dataHidden.name}
                                options={orderTypeData}
                                onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'orderType' })}
                                selectedValue={allFilter?.orderType}
                              />
                            </CCol>
                          )
                        }

                        {
                          dataHidden.accessor === 'task' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={`px-0 mr-3 pt-3 ${filterTask === true ? null : ' d-none'}`}
                            >
                              <Dropdown
                                show
                                placeholder={dataHidden.name}
                                options={taskData}
                                onChangeDropdown={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dropName: 'task' })}
                                selectedValue={allFilter?.task}
                              />
                            </CCol>
                          )
                        }

                        {
                          dataHidden.accessor === 'customerpono' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={` px-0 mr-3 pt-3 ${filterTask === true ? null : ' d-none'}`}
                            >
                              <input
                                id="searchInput"
                                type="text"
                                className="form-control input-height"
                                placeholder={dataHidden.name}
                                value={allFilter?.customerOrderRef}
                                onChange={(e) => { dispatch({ type: setAllFilter, data: { ...allFilter, customerOrderRef: e.target.value } }); }}
                                style={{ height: '100%' }}
                              />
                            </CCol>
                          )
                        }
                        {
                          dataHidden.accessor === 'vendororderno' && dataHidden.hiddenFilter === true &&
                          (
                            <CCol
                              sm={4}
                              lg={2}
                              className={` px-0 mr-3 pt-3 ${filterTask === true ? null : ' d-none'}`}
                            >
                              <input
                                id="searchInput"
                                type="text"
                                className="form-control input-height"
                                value={allFilter?.vendorOrderNo}
                                placeholder={dataHidden.name}
                                onChange={(e) => { dispatch({ type: setAllFilter, data: { ...allFilter, vendorOrderNo: e.target.value } }); }}
                                style={{ height: '100%' }}
                              />
                            </CCol>
                          )
                        }

                        {
                          dateFilter.includes(dataHidden.accessor) && dataHidden.hiddenFilter === true &&
                          (
                            <>
                              <CCol lg={7}>
                                <div className="d-flex">
                                  <div className="colDateText d-flex text-light-gray align-items-center pt-3 pr-3">
                                    {dataHidden.name}
                                  </div>
                                  <div className="colDateText d-flex text-light-gray align-items-center pt-3"> From</div>
                                  <CCol lg={4} sm={10} className="colDate pt-3">
                                    <DatePicker
                                      arrowStyle
                                      getDate={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dataHidden, dropName: 'fromDate' })}
                                      placeHolder="Select Date"
                                      onChange={() => { dateTo.current.openDatePicker(); }}
                                      classNameInput="form-control"
                                      onOpen={(e) => { if (e) dateTo.current.openDatePicker(); }}
                                      fromMonth={defaultDate?.minDate}
                                      toMonth={defaultDate?.maxDate}
                                      selectedDates={allFilter?.fromDate}
                                      messageRequired
                                      messageParam={{
                                        column: 'validDates',
                                        columnText: 'Date From',
                                        fieldName: 'fromDate',
                                        style: 'position-absolute',
                                      }}
                                    />
                                  </CCol>
                                  <div className="colDateText d-flex text-light-gray align-items-center pt-3"> To</div>
                                  <CCol lg={4} sm={10} className="colDate pt-3">
                                    <DatePicker
                                      ref={dateTo}
                                      arrowStyle
                                      firstValue={allFilter?.firstValue}
                                      onOpen={() => dateTo.current.openDatePicker('from')}
                                      classNameInput="form-control"
                                      getDate={(selected) => changeDropdown({ selected, dispatch, setAllFilter, allFilter, dataHidden, dropName: 'toDate' })}
                                      placeHolder="Select Date"
                                      fromMonth={defaultDate?.minDate}
                                      toMonth={defaultDate?.maxDate}
                                      selectedDates={allFilter?.toDate}
                                      messageRequired
                                      messageParam={{
                                        column: 'validDates',
                                        columnText: 'Date To',
                                        fieldName: 'toDate',
                                        style: 'position-absolute',
                                        checkDateTo:
                                          allFilter?.fromDate &&
                                          allFilter?.fromDate > allFilter?.toDate,
                                      }}
                                    />
                                  </CCol>
                                </div>
                              </CCol>
                            </>
                          )
                        }
                      </>
                    );
                  })}
                </CRow>
              </CCol>
              <CCol lg={1} />
            </CRow>
          </CCol>
        </CRow>
      </form>
    );
  };

  return (
    <>
      <CCard className="mb-3" style={{ borderRadius: '0.25rem' }}>
        <CCardBody className="p-3" style={{ borderRadius: '0.25rem' }}>
          {searchFilter === 'true' ? contentSearchFilter() : contentSearch()}
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
          <CRow className='px-2'>
            {columnFilter && columnFilter.map((item) => {
              return (
                <CCol lg={3} className="px-2 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      showFilter({ item, columnFilter, setValidResetFilter, setColumnFilter, allFilter });
                      setTriggerColumn(!triggerColumn)
                      setChangeFilter(false)
                    }}
                    className={`btn-edit-filter pl-2 ver-center-item w-100 ${item.hiddenFilter ? 'btn-outline-primary' : 'btn-light-gray'}`}
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
                  resetFilter({ module, filterHidden, dispatch, setShowModal, columnFilter, setColumnFilter, dropdownValue, setDropdownValue, setAllFilter, allFilter });
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
