import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb';
import Search from '../../Component/Search';
import TableMaster from '../../Component/TableMaster';
import { getSummaryData, loadModuleAccess, loadClients, loadSites } from '../../apiService';
import { schemaColumn } from './services';
import Create from './Create';
import './index.scss';

const UserManagement = (props) => {
  const showDetails = (item) => {
    props.history.push(`/users-management/${item.web_user}/detail`);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const umSummaryData = useSelector((state) => state.umSummaryData);
  const paginationUm = useSelector((state) => state.paginationUm);
  const [showModal, setShowModal] = useState(false);
  const [Export, setExport] = useState(false);
  const module = 'UserManagement';

  const height = window.innerHeight - 340;
  const width = window.innerWidth;

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationUm?.active, module });
  }, [paginationUm?.active]);

  useEffect(() => {
    loadSites({ dispatch });
    loadClients({ dispatch });
    loadModuleAccess({ dispatch });
  }, []);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      getSummaryData({ dispatch, active: paginationUm?.active, Export, module });
    }
  }, [Export]);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      getSummaryData({ dispatch, active: paginationUm?.active, Export, module });
    }
  }, [Export]);

  return (
    <div className="userManagement">
      <Breadcrumb
        breadcrumb={[{ to: '/sales-order', label: 'User Management', active: true }]}
        button={
          <CButton onClick={() => setShowModal(true)} className="btn btn-primary btn-create float-right">
            CREATE USER
          </CButton>
        }
      />
      <CCard className="bg-transparent mb-0">
        <CCardBody className="p-3 border-user-info">
          <CRow>
            <CCol sm={1} className="user-login-info-header">
              User ID
            </CCol>
            <CCol sm={1} className="user-login-info-header">
              Name
            </CCol>
            <CCol sm={2} className="user-login-info-header pr-0">
              Email Address
            </CCol>
            <CCol sm={1} className="user-login-info-header pl-0">
              Site
            </CCol>
            <CCol sm={1} className="user-login-info-header">
              Client
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol sm={1} className="user-login-info-value">
              {user.userId}
            </CCol>
            <CCol sm={1} className="user-login-info-value">
              <Link to={`/users-management/${user.webUser}/detail`}>{user.userId}</Link>
            </CCol>
            <CCol sm={2} className="user-login-info-value pr-0">
              {user.email}
            </CCol>
            <CCol sm={1} className="user-login-info-value pl-0">
              {user.site ? user.site : 'All'}
            </CCol>
            <CCol sm={1} className="user-login-info-value">
              {user.client ? user.client : 'All'}
            </CCol>
          </CRow>
        </CCardBody>
        <Search module={module} placeholder="Enter User ID or Name" filter onChangeGetTask />
      </CCard>
      <TableMaster
        onClick={showDetails}
        schemaColumn={schemaColumn}
        data={umSummaryData}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module="User Management"
        noDataText
        pagination={paginationUm}
        goto={(e) => {
          dispatch({ type: 'PAGING_UM', data: { ...paginationUm, active: e } });
        }}
        exportData=""
        user={user}
        title="User Management Summary"
        filename="Microlistics_UserManagement."
        font="9"
        getExportData={async () => {
          setExport(true);
        }}
        editColumn="false"
      />
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default UserManagement;
