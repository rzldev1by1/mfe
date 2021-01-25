import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../Component/Breadcrumb';
import Search from '../../Component/Search';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn } from './services';
import './index.scss';

const UserManagement = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const umSummaryData = useSelector((state) => state.umSummaryData);
    const paginationUm = useSelector((state) => state.paginationUm);
     const [Export, setExport] = useState(false);

    const height = window.innerHeight - 257;
    const width = window.innerWidth;

    const module = 'UserManagement'
    return(
      <div>
        <Breadcrumb
          breadcrumb={[{ to: '/sales-order', label: 'Sales Order', active: true }]}
          button={(
            <CButton className="btn btn-primary btn-create float-right">
              CREATE USER
            </CButton>
        )}
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
                <Link>
                  {user.userId}
                </Link>
              </CCol>
              <CCol sm={2} className="user-login-info-value pr-0">
                {user.email}
              </CCol>
              <CCol sm={1} className="user-login-info-value pl-0">
                {user.site ? user.site : '-'}
              </CCol>
              <CCol sm={1} className="user-login-info-value">
                {user.client ? user.client : '-'}
              </CCol>
            </CRow>
          </CCardBody>
          <Search
            module={module}
            placeholder="Enter User ID or Name"
            filter
            onChangeGetTask
          />
        </CCard>
        <TableMaster 
          schemaColumn={schemaColumn}
          data={umSummaryData}
          style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
          module="User Management"
          noDataText
          pagination={paginationUm}
          goto={(e) => {
            dispatch({type:'PAGING_SO', data:{ ...paginationUm, active: e}})
          }}
          exportData=''
          user={user}
          title="User Management Summary"
          filename="Microlistics_UserManagement."
          font="9"
          getExportData={async () => {
            setExport(true);
          }}
        />
      </div>
    )
}

export default UserManagement