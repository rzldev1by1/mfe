import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import CustomTable from 'shared/table/CustomTable'
import { connect } from 'react-redux'
import axios from 'axios'
import HeaderTitle from 'shared/container/TheHeader'
// import UMCustomTable from 'shared/table/CustomTable'

import endpoint from '../../helpers/endpoints'
import UMCustomTable from './UserManagementTable'
import CreateUM from './UserManagementCreate'
import * as utility from './UmUtility'
import moment from 'moment'
import './UserManagement.css'
import { Link } from 'react-router-dom'

const columns = [
    { accessor: 'userid', Header: 'User ID', width: 160, sortable: true },
    { accessor: 'name', Header: 'Username', width: 210, sortable: true },
    { accessor: 'site', Header: 'Site', width: 130, sortable: true },
    { accessor: 'client', Header: 'Client', width: 130, sortable: true },
    { accessor: 'web_group', Header: 'User Level', width: 160, sortable: true },
    { accessor: 'last_access', Header: 'Last Accessed', width: 180, sortable: true },
    { accessor: 'disabled', Header: 'Status', width: 120, sortable: true },
]

class UserManagemen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            fields: columns,
            loginInfo: {},
            data: [],
            dimension: { width: 0, height: 0 },
            pagination: {},
            modalShow: false
        }
    }

    componentDidMount = () => {
        this.updateDimension();
        window.addEventListener('resize', this.updateDimension);
        this.searchHandler();
        this.loadPersonalLogin();

    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimension);
    }

    updateDimension = () => {
        // const height = (window.innerHeight * 0.50);
        const height = (window.innerHeight - 345);
        this.setState({ dimension: { width: window.innerWidth, height } });
    }


    loadPersonalLogin = () => {
        let userInfo = this.props.store;     
        this.setState({ loginInfo: userInfo.user });
    }

    searchHandler = async (e) => {
        const { search, pagination } = this.state;
        let urls = [];
        urls.push(`searchParam=${search ? search : ''}`);
        urls.push(`page=${pagination.active || 1}`)

        const { data } = await axios.get(`${endpoint.userManagementListUser}?${urls.join('&')}`)
        let result = data.data.data.map((item, index) => {
            let newItem = item;
            newItem.site = (item.site && item.site !== '') ? item.site : 'All';
            newItem.client = (item.client && item.client !== '') ? item.client : 'All';
            newItem.last_access = (item.last_access) ? moment(item.last_access).format('DD/MM/YYYY hh:mm:ss') : '';
            newItem.disabled = (item.disabled === 'Y') ? [<label className="um-suspended">{'Suspended'}</label>] : [<label className="um-active">{'Active'}</label>];
            return newItem;
        })
        this.setState({
            data: result, 
            pagination: {
                active: pagination.active || data.data.current_page,
                show: data.data.per_page,
                total: data.data.total
            }
        });

    }

    toggle = () => {
        this.setState((state) => ({ modalShow: !state.modalShow }));
    }

    showDetails = (item) => {
        const url = `/users-management/${item.web_user}/detail`;
        this.props.history.push(url)
    }


    render() {

        const { loginInfo, data, fields, pagination, dimension, modalShow } = this.state;
        
        return (
            <div className="um-summary pt-1">
                <HeaderTitle
                    breadcrumb={[{ to: '', label: 'User Management', active: true }]}
                    button={<CButton onClick={this.toggle} className="btn btn-primary btn-create float-right">CREATE USER</CButton>}
                />
                <CCard className="bg-transparent mb-3">
                    <CCardBody className="p-3 border-user-info" >
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
                                {loginInfo.userId}
                            </CCol>
                            <CCol sm={1} className="user-login-info-value">
                                <Link to={`/users-management/${loginInfo.webUser}/detail`} >{loginInfo.name}</Link>
                            </CCol>
                            <CCol sm={2} className="user-login-info-value pr-0">
                                {loginInfo.email}
                            </CCol>
                            <CCol sm={1} className="user-login-info-value pl-0">
                                {`${loginInfo.site && loginInfo.site !== '' ? loginInfo.site : 'All'}`}
                            </CCol>
                            <CCol sm={1} className="user-login-info-value">
                                {`${loginInfo.client && loginInfo.client !== '' ? loginInfo.client : 'All'}`}
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardBody className="p-3 bg-white">
                        <CRow className="mx-0">
                            <CCol xl={11} lg={10} md={10} sm={12} className="pl-0">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control pl-0 border-left-0" placeholder="Enter User ID or Username" onChange={e => this.setState({ search: e.target.value })} />
                                </div>
                            </CCol>
                            <CCol xl={1} lg={2} md={2} sm={12} className="pr-0">
                                <button className="btn btn-search btn-primary float-right w-100 px-3 py-3" onClick={this.searchHandler}>SEARCH</button>                                
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                <UMCustomTable
                    title="User Management"
                    height={dimension.height}
                    pagination={pagination}
                    fields={fields} 
                    data={data} 
                    onClick={this.showDetails}
                    dimension={dimension}
                    goto={(active) => {
                        this.setState({ pagination: { ...pagination, active } }, () => this.searchHandler())
                      }}
                    export={<button className="btn btn-primary float-right btn-export">
                        {/* <div className='export-export pr-3' /> */}
                         EXPORT</button>}
                />
                
                <CreateUM show={modalShow} toggle={this.toggle} afterSuccess={this.searchHandler} users={this.state.data} />
            </div>
        )
    }


}

const mapStateToProps = (store) => ({ store })
export default connect(mapStateToProps,null)(UserManagemen);