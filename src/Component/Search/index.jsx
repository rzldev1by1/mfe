/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react';
import { setSite, setClient, setOrderType, setTask, setStatus, setStyle, setStyleDesc, setColor, setDimensions, setSize, handleFullFillMarked } from './service';
import Dropdown from '../Dropdown';
import {
  getSite,
  getClient,
  getStatus,
  getOrderType,
  getTask,
  siteCheck,
  clientCheck,
} from '../../apiService/dropdown';
import { getSummaryData, getDetailData } from '../../apiService';
import './index.scss';

const Search = ({
  module,
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
  setFulfill,
  paginationSoDetail,
  props,
  spDetailTable
}) => {
  // params
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(null);
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
  const user = useSelector((state) => state.user);
  const { company, client } = user;
  const [getTaskParam, setGetTaskParam] = useState(false);
  const markedRow = useSelector((state) => state.markedRow)
  const [dropdownValue, setdropdownValue] = useState({
    site: '',
    client: '',
    status: '',
    orderType: '',
    task: '',
  });

  let paramType = '';
  let searchFilter = '';
  if (module === 'StockHolding') {
    paramType = 'GET_SH_SUMMARY';
  }
  if (module === 'purchaseOrder') {
    paramType = 'GET_PO_SUMMARY';
    searchFilter = 'SEARCH_FILTER';
  }
  if (module === 'salesOrder') {
    paramType = 'GET_SO_SUMMARY';
  }
  if (module === 'UserManagement') {
    paramType = 'GET_UM_SUMMARY';
  }

  const search = async (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: paramType, data: [] });
      await getSummaryData({
        e,
        siteVal: newDropdownValue.site?.value,
        clientVal: newDropdownValue.client?.value,
        orderType: newDropdownValue.orderType,
        task: newDropdownValue.task,
        status: newDropdownValue.status,
        searchInput,
        dispatch,
        module,
      });
    }
  };
  const searchForm = (e) => {
    e.preventDefault();
    getSummaryData({
      e,
      siteVal: user.site || newDropdownValue.site,
      clientVal: user.client || newDropdownValue.client,
      orderType: newDropdownValue.orderType,
      task: newDropdownValue.task,
      status: newDropdownValue.status,
      searchInput,
      dispatch,
      module,
    });
  };

  const handleFulfill = () => {
    getDetailData({dispatch, props, active: paginationSoDetail?.active, module, fulfill: true})
  }

  const handleClear = ({dispatch,spDetailTable}) => {
    let newArray = [...spDetailTable]
  newArray = newArray.map((data,idx) => {
      data.edit_qty = ''
      data.edit_carton = ''
      data.isInvalidOrderCarton = false
      data.isInvalidOrderQty = false
      data.isMarked = false
    return data
  });

  dispatch({type:'GET_SP_DETAIL_TABLE', data:newArray})
  }

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getStatus({ dispatch });
    getOrderType({ dispatch, company, client, module });
  }, []);
  const newDropdownValue = { ...dropdownValue };

  useEffect(() => {
    setGetTaskParam({ site: newDropdownValue.site, client: newDropdownValue.client });
  }, [newDropdownValue.site, newDropdownValue.client]);

  useEffect(() => {
    const newDropdownValue = { ...dropdownValue };
    if (module === 'purchaseOrder' || module === 'salesOrder') {
      if (newDropdownValue.status === '') {
        newDropdownValue.status = { value: 'open', label: 'All Open' };
        setdropdownValue(newDropdownValue);
      }
    }
  }, [newDropdownValue.status]);
  useEffect(() => {
    dispatch({
      type: 'SEARCH_FILTER',
      data: {
        siteVal: newDropdownValue.site?.value,
        clientVal: newDropdownValue.client?.value,
        orderType: newDropdownValue.orderType,
        task: newDropdownValue.task,
        status: newDropdownValue.status,
      },
    });
  }, [
    newDropdownValue.site?.value,
    newDropdownValue.client?.value,
    newDropdownValue.orderType,
    newDropdownValue.task,
    newDropdownValue.status,
  ]);

  useEffect(() => {
    if (Export === true) {
      getSummaryData({
        siteVal: user.site ||newDropdownValue.site?.value,
        clientVal: user.client || newDropdownValue.client?.value,
        orderType: newDropdownValue.orderType,
        task: newDropdownValue.task,
        status: newDropdownValue.status,
        dispatch,
        searchInput,
        module,
        Export,
      });
    }
  }, [Export]);
  
  return (
    <CCard className="mb-3">
      <CCardBody className="p-3" style={{borderRadius: '0.25rem'}}>
        <form onSubmit={searchForm}>
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
            ) : ''}
           
            {module === 'UserManagement' ? (
              <CCol lg={1} className="pr-0">
                <button
                  type="button"
                  className="btn btn-search mobile-search  btn-primary float-right"
                  onClick={() =>
                    getSummaryData({
                      siteVal: user.site || newDropdownValue.site?.value,
                      clientVal: user.client || newDropdownValue.client?.value,
                      orderType: newDropdownValue.orderType,
                      task: newDropdownValue.task,
                      status: newDropdownValue.status,
                      dispatch,
                      searchInput,
                      module,
                    }) && dispatch({ type: paramType, data: [] })}
                >
                  SEARCH
                </button>
              </CCol>
            ) : (
              <CCol lg={!inputTag ? 12 : 9} className="px-0">
                <CRow className="mx-0 justify-content-between">
                  <CRow className='col-lg-10'>
                    <CCol sm={4} lg={2} className={`mobile-site px-0 ${filterSite === true ? null : ' d-none'}`}>
                      {user?.site ? (
                        <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                      ) : (
                        <Dropdown
                          className="px-0"
                          show
                          placeholder="Site"
                          options={siteData}
                          onChangeDropdown={(selected) =>
                            setSite({
                              selected,
                              dispatch,
                              dropdownValue,
                              setdropdownValue,
                            })}
                          selectedValue={newDropdownValue.site}
                        />
                      )}
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-client px-3 ${user?.site ? ' pr-3' : ''} ${filterClient === true ? null : ' d-none'}`}>
                      {user?.client ? (
                        <input value={clientCheck(clientData, user.client)} className="form-control sh-input" readOnly />
                      ) : (
                        <Dropdown
                          show
                          placeholder="Client"
                          options={clientData}
                          onChangeDropdown={(selected) =>
                            setClient({
                              onChangeGetTask,
                              getTask,
                              getTaskParam,
                              selected,
                              dispatch,
                              dropdownValue,
                              setdropdownValue,
                            })}
                          selectedValue={newDropdownValue.client}
                        />
                      )}
                    </CCol>
                    <CCol sm={4} lg={2} className={`px-0 mobile-status ${filterStatus === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Status"
                        options={statusDataSH || statusData}
                        onChangeDropdown={(selected) =>
                          setStatus({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.status}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-type ${filterOrderType === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Order Type"
                        options={orderTypeData}
                        onChangeDropdown={(selected) =>
                          setOrderType({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.orderType}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-task px-0 ${filterTask === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Task"
                        options={taskData}
                        onChangeDropdown={(selected) => setTask({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.task}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-style pl-0 pr-3 ${filterStyle === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Style"
                        options={styleData}
                        onChangeDropdown={(selected) => setStyle({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.style}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-style-desc pl-0 pr-3 ${filterStyleDesc === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Style Desc."
                        options={styleDescData}
                        onChangeDropdown={(selected) => setStyleDesc({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.styleDesc}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-color pl-0 pr-3 ${filterColor === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Style Color"
                        options={colorData}
                        onChangeDropdown={(selected) => setColor({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.color}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-dimensions pl-0 pr-3 ${filterDimensions === true ? null : ' d-none'}`}>
                      <Dropdown
                        className={`px-0 `}
                        show
                        placeholder="Dimensions"
                        options={dimensionsData}
                        onChangeDropdown={(selected) => setDimensions({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.dimensions}
                      />
                    </CCol>
                    <CCol sm={4} lg={2} className={`mobile-size px-0 ${filterSize === true ? null : ' d-none'}`}>
                      <Dropdown
                        className="px-0"
                        show
                        placeholder="Size"
                        options={sizeData}
                        onChangeDropdown={(selected) => setSize({ selected, dispatch, dropdownValue, setdropdownValue })}
                        selectedValue={newDropdownValue.size}
                      />
                    </CCol>
                  </CRow>
                  <CRow className={`${btnSearch ? 'pr-3' : ''}`}>
                    <CCol sm={4} lg={2} className="px-0 d-flex">
                      {btnSearch ? (
                        <button
                          type="button"
                          className="btn btn-search mobile-search btn-primary float-right"
                          onClick={() =>
                          getSummaryData({
                            siteVal: user.site || newDropdownValue.site?.value,
                            clientVal: user.client || newDropdownValue.client?.value,
                            orderType: newDropdownValue.orderType,
                            task: newDropdownValue.task,
                            status: newDropdownValue.status,
                            dispatch,
                            searchInput,
                            module,
                          }) && dispatch({ type: paramType, data: [] })}
                        >
                          SEARCH
                        </button>
                        ) : ''}
                      
                      {btnClear ? (
                        <CDropdown className="btn-group mr-3 btn-clear">
                          <CDropdownToggle color="primary"> 
                            CLEAR
                          </CDropdownToggle>
                          <CDropdownMenu className="mt-2 shadow-none border">
                            <CDropdownItem onClick={() => handleClear({dispatch,spDetailTable})}>CLEAR ALL</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem onClick={() => handleFullFillMarked({dispatch, spDetailTable,markedRow, clearMarked:true})}>CLEAR MARKED</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        ) : ''}
                      {btnFulfill ? (
                        <CDropdown className="btn-group mr-3 btn-fulfill">
                          <CDropdownToggle color="primary"> 
                            FULFILL
                          </CDropdownToggle>
                          <CDropdownMenu className="mt-2 shadow-none border">
                            <CDropdownItem onClick={() => handleFulfill()}>FULFILL ALL</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem onClick={() => handleFullFillMarked({dispatch, spDetailTable,markedRow})}>FULFILL MARKED</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        ) : ''}
                    </CCol>
                  </CRow>
                </CRow>
              </CCol>
            )}
          </CRow>
        </form>
      </CCardBody>
    </CCard>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  filterSite: PropTypes.bool.isRequired,
  filterClient: PropTypes.bool.isRequired,
  filterStatus: PropTypes.bool.isRequired,
  filterOrderType: PropTypes.bool.isRequired,
  filterTask: PropTypes.bool.isRequired,
};

export default Search;
