import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import axios from 'axios'
import HeaderTitle from 'shared/container/TheHeader'
import { IoIosArrowDown } from 'react-icons/io'
import endpoint from '../../helpers/endpoints'
import UMCustomTable from './UserManagementTable'
import CreateUM from './UserManagementCreate'
import * as utility from './UmUtility'
import './UserManagement.css'

const columns = [
    { accessor: 'userid', Header: 'User ID', sortable: true },
    { accessor: 'name', Header: 'User Name', sortable: true },
    { accessor: 'site', Header: 'Site', sortable: true },
    { accessor: 'client', Header: 'Client', sortable: true },
    { accessor: 'last_access', Header: 'Last Accessed', sortable: true },
    { accessor: 'disabled', Header: 'Status', sortable: true },
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
            modalShow:false
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
        const height = (window.innerHeight - 116) * 0.55;
        this.setState({ dimension: { width: window.innerWidth, height } });
    }


    loadPersonalLogin = () => {
        let userInfo = utility.readFromLocalStorage("user");
        this.setState({ loginInfo: userInfo });
    }

    searchHandler = async (e) => {
        const { search, pagination } = this.state;
        let urls = [];
        urls.push(`searchParam=${search ? search : ''}`);
        urls.push(`page=${pagination.active || 1}`)

        const { data } = await axios.get(`${endpoint.userManagementListUser}?${urls.join('&')}`)
        this.setState({
            data: data.data.data, pagination: {
                active: pagination.active || data.data.current_page,
                show: data.data.per_page,
                total: data.data.total
            }
        });

    }

    toggle = () => {
        this.setState((state) => ({modalShow:!state.modalShow}));
    }


    render() {

        const { loginInfo, data, fields, pagination, dimension, modalShow } = this.state;

        return (
            <div>
                <HeaderTitle
                    breadcrumb={[{ to: '', label: 'User Management', active: true }]}
                    button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">CREATE USER</CButton>}
                />
                <CCard className="bg-transparent border-white">
                    <CCardBody >
                        <CRow>
                            <CCol sm="2" className="user-login-info-header">
                                Your Account
                            </CCol>
                            <CCol sm="2" className="user-login-info-header">
                                User Id
                            </CCol>
                            <CCol sm="2" className="user-login-info-header">
                                Client
                            </CCol>
                            <CCol sm="2" className="user-login-info-header">
                                Site
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="2" className="user-login-info-value">
                                {loginInfo.email}
                            </CCol>
                            <CCol sm="2" className="user-login-info-value">
                                {loginInfo.userId}
                            </CCol>
                            <CCol sm="2" className="user-login-info-value">
                                {loginInfo.client}
                            </CCol>
                            <CCol sm="2" className="user-login-info-value">
                                {loginInfo.site}
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardBody className="px-4 py-2 bg-white">
                        <CRow className="row">
                            <CCol lg={11} className="px-1">
                                {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control border-left-0" placeholder="Enter User ID or Username" onChange={e => this.setState({ search: e.target.value })} />
                                </div> */}
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control border-left-0" placeholder="Enter User ID or Username" onChange={e => this.setState({ search: e.target.value })} />
                                </div>
                            </CCol>
                            <CCol lg={1}>
                                <CRow>
                                    <CCol sm={8} lg={12} md={12} className="px-1">
                                        <button className="btn btn-block btn-primary float-right" onClick={this.searchHandler}>SEARCH</button>                                        
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                <UMCustomTable title="User Management" height={dimension.height} fields={fields} data={data} onClick={() => { }} />
                <CustomPagination data={data} pagination={pagination} goto={(active => { this.setState({ pagination: { ...pagination, active } }, () => this.searchHandler()) })} export={this.props.export}/>
                <CreateUM show={modalShow} toggle={this.toggle} />
            </div>
        )
    }


}

export default UserManagemen;