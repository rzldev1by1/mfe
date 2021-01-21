/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { setSite, setClient, setOrderType, setTask, setStatus } from './service';
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
import { getSummaryData } from '../../apiService';

const Search = ({
  page,
  setPage,
  module,
  placeholder = '',
  filterSite,
  filterClient,
  filterStatus,
  filterOrderType,
  filterTask,
  statusDataSH,
  onChangeGetTask = false,
}) => {
  // params
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(null);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const statusData = useSelector((state) => state.statusData);
  const orderTypeData = useSelector((state) => state.orderTypeData);
  const taskData = useSelector((state) => state.taskData);
  const user = useSelector((state) => state.user);
  const { company, client } = user;
  const [getTaskParam, setGetTaskParam] = useState(false);

  const [dropdownValue, setdropdownValue] = useState({
    site: '',
    client: '',
    status: '',
    orderType: '',
    task: '',
  });

  const search = async (e) => {
    if (e.key === 'Enter')
      await getSummaryData({
        e,
        siteVal: newDropdownValue.site,
        clientVal: newDropdownValue.client,
        orderType: newDropdownValue.orderType,
        task: newDropdownValue.task,
        status: newDropdownValue.status,
        page,
        setPage,
        searchInput,
        dispatch,
        module,
      });
  };
  const searchForm = (e) => {
    e.preventDefault();
    getSummaryData({
      e,
      siteVal: newDropdownValue.site,
      clientVal: newDropdownValue.client,
      orderType: newDropdownValue.orderType,
      task: newDropdownValue.task,
      status: newDropdownValue.status,
      page,
      setPage,
      searchInput,
      dispatch,
      module,
    });
  };

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getStatus({ dispatch });
    getOrderType({ dispatch, company, client });
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

  return (
    <CCard className="mb-3">
      <CCardBody className="p-3">
        <form onSubmit={searchForm}>
          <CRow className="mx-0">
            <CCol lg={3} className="pr-3 pl-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white">
                    <i className="iconU-search" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0 input-height"
                  placeholder={placeholder}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => search(e)}
                  style={{ height: '100%' }}
                />
              </div>
            </CCol>
            <CCol lg={9} className="px-0">
              <CRow className="mx-0">
                <CCol sm={4} lg={2} className="px-0">
                  {user?.site ? (
                    <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      className={`px-0 ${filterSite === true ? null : ' d-none'}`}
                      show
                      placeholder="Site"
                      options={siteData}
                      onChangeDropdown={(selected) =>
                        setSite({
                          onChangeGetTask,
                          getTask,
                          getTaskParam,
                          selected,
                          dispatch,
                          dropdownValue,
                          setdropdownValue,
                        })
                      }
                      selectedValue={newDropdownValue.site}
                    />
                  )}
                </CCol>
                <CCol sm={4} lg={2} className={`px-3 ${user?.site ? ' pr-3' : ''}`}>
                  {user?.client ? (
                    <input value={clientCheck(clientData, user.client)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      className={` ${filterClient === true ? null : ' d-none'}`}
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
                        })
                      }
                      selectedValue={newDropdownValue.client}
                    />
                  )}
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Dropdown
                    className={`px-0 ${filterStatus === true ? null : ' d-none'}`}
                    show
                    placeholder="Status"
                    options={statusDataSH || statusData}
                    onChangeDropdown={(selected) => setStatus({ selected, dispatch, dropdownValue, setdropdownValue })}
                    selectedValue={newDropdownValue.status}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterOrderType === true ? null : ' d-none'}`}
                    show
                    placeholder="Order Type"
                    options={orderTypeData}
                    onChangeDropdown={(selected) =>
                      setOrderType({ selected, dispatch, dropdownValue, setdropdownValue })
                    }
                    selectedValue={newDropdownValue.orderType}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Dropdown
                    className={`px-0 ${filterTask === true ? null : ' d-none'}`}
                    show
                    placeholder="Task"
                    options={taskData}
                    onChangeDropdown={(selected) => setTask({ selected, dispatch, dropdownValue, setdropdownValue })}
                    selectedValue={newDropdownValue.task}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <button
                    type="button"
                    className="btn btn-search btn-primary float-right"
                    onClick={() =>
                      getSummaryData({
                        siteVal: newDropdownValue.site,
                        clientVal: newDropdownValue.client,
                        orderType: newDropdownValue.orderType,
                        task: newDropdownValue.task,
                        status: newDropdownValue.status,
                        dispatch,
                        page,
                        setPage,
                        searchInput,
                        module,
                      })
                    }
                  >
                    SEARCH
                  </button>
                </CCol>
              </CRow>
            </CCol>
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
