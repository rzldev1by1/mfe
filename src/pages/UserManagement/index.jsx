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

  const [dimension, setDimension] = useState({
    height: window.innerHeight - 410,
    width: window.innerWidth,
  });
  const { width, height } = dimension;
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 410,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationUm?.active, module, user });
  }, []);

  useEffect(() => {
    loadSites({ dispatch });
    loadClients({ dispatch });
    loadModuleAccess({ dispatch });
  }, []);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      // getSummaryData({ dispatch, active: paginationUm?.active, Export, module });
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
            <CCol lg={1} className="col-3">
              <div className="user-login-info-header">User ID</div>
              <div className="user-login-info-value">{user.userId}</div>
            </CCol>
            <CCol lg={1} className="col-3 user-login-info-header">
              <div className="user-login-info-header">Name</div>
              <div className="user-login-info-value">
                <Link to={`/users-management/${user.webUser}/detail`}>{user.name}</Link>
              </div>
            </CCol>
            <CCol lg={2} className="col-4 user-login-info-header pr-0">
              <div className="user-login-info-header">Email Address</div>
              <div className="user-login-info-value">{user.email}</div>
            </CCol>
            <CCol lg={1} className="col-3 user-login-info-header">
              <div className="user-login-info-header">Site</div>
              <div className="user-login-info-value">{user.site ? user.site : 'All'}</div>
            </CCol>
            <CCol lg={1} className="col-3 user-login-info-header">
              <div className="user-login-info-header"> Client</div>
              <div className="user-login-info-value"> {user.client ? user.client : 'All'}</div>
            </CCol>
          </CRow>
        </CCardBody>
        <Search module={module} Export={Export} placeholder="Enter User ID or Name" filter onChangeGetTask btnSearch inputTag />
      </CCard>
      <TableMaster
        onClick={showDetails}
        schemaColumn={schemaColumn}
        data={umSummaryData}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module={module}
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
