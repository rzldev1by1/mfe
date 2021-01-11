/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
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
import { searchPurchaseOrder } from '../../apiService';

const Search = ({
  page,
  setPage,
  placeholder = '',
  filterSite,
  filterClient,
  filterStatus,
  filterOrderType,
  filterTask,
}) => {
  // params
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(null);
  const siteData = useSelector((state) => state.siteData);
  const siteVal = useSelector((state) => state.site);
  const clientVal = useSelector((state) => state.client);
  const clientData = useSelector((state) => state.clientData);
  const statusData = useSelector((state) => state.statusData);
  const status = useSelector((state) => state.status);
  const orderTypeData = useSelector((state) => state.orderTypeData);
  const orderType = useSelector((state) => state.orderType);
  const taskData = useSelector((state) => state.taskData);
  const task = useSelector((state) => state.task);
  const user = useSelector((state) => state.user);
  const { company, client, site } = user;

  const search = async (e) => {
    if (e.key === 'Enter')
      await searchPurchaseOrder({ e, siteVal, clientVal, orderType, task, status, page, setPage, searchInput, dispatch });
  };
  const searchForm = (e) => {
    e.preventDefault();
    searchPurchaseOrder({ e, siteVal, clientVal, orderType, task, status, page, setPage, searchInput, dispatch });
  };

  useEffect(() => {
    getSite({ dispatch });
    getClient({ dispatch });
    getStatus({ dispatch });
    getOrderType({ dispatch, company, client });
    getTask({ dispatch, client, site });
  }, []);

  useEffect(() => {
    if (status === undefined) {
      dispatch({ type: 'STATUS', data: { value: 'open', label: 'All Open' } });
    }
  }, [status]);

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
                <CCol sm={4} lg={2} className={`px-0 ${user?.site ? ' pr-3' : ''}`}>
                  {user?.site ? (
                    <input value={siteCheck(siteData, user.site)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      className={`px-0 ${filterSite === true ? null : ' d-none'}`}
                      show
                      placeholder="Site"
                      options={siteData}
                      onChangeDropdown={(selected) => setSite({ selected, dispatch })}
                      selectedValue={siteVal}
                    />
                  )}
                </CCol>
                <CCol sm={4} lg={2} className={`px-0 ${user?.site ? ' pr-3' : ''}`}>
                  {user?.client ? (
                    <input value={clientCheck(clientData, user.client)} className="form-control sh-input" readOnly />
                  ) : (
                    <Dropdown
                      className={`px-3 ${filterClient === true ? null : ' d-none'}`}
                      show
                      placeholder="Client"
                      options={clientData}
                      onChangeDropdown={(selected) => setClient({ selected, dispatch })}
                      selectedValue={clientVal}
                    />
                  )}
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Dropdown
                    className={`px-0 ${filterStatus === true ? null : ' d-none'}`}
                    show
                    placeholder="Status"
                    options={statusData}
                    onChangeDropdown={(selected) => setStatus({ selected, dispatch })}
                    selectedValue={status}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterOrderType === true ? null : ' d-none'}`}
                    show
                    placeholder="Order Type"
                    options={orderTypeData}
                    onChangeDropdown={(selected) => setOrderType({ selected, dispatch })}
                    selectedValue={orderType}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Dropdown
                    className={`px-0 ${filterTask === true ? null : ' d-none'}`}
                    show
                    placeholder="Task"
                    options={taskData}
                    onChangeDropdown={(selected) => setTask({ selected, dispatch })}
                    selectedValue={task}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <button
                    type="button"
                    className="btn btn-search btn-primary float-right"
                    onClick={() =>
                      searchPurchaseOrder({
                        siteVal,
                        clientVal,
                        orderType,
                        task,
                        status,
                        dispatch,
                        page,
                        setPage,
                        searchInput,
                      })}
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
