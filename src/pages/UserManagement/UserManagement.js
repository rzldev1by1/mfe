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
import moment from 'moment'
import './UserManagement.css'

const columns = [
    { accessor: 'userid', Header: 'User ID', width:220, sortable: true },
    { accessor: 'name', Header: 'User Name', width:320, sortable: true },
    { accessor: 'site', Header: 'Site', width:150, sortable: true },
    { accessor: 'client', Header: 'Client', width:180, sortable: true },
    { accessor: 'last_access', Header: 'Last Accessed', width:250, sortable: true },
    { accessor: 'disabled', Header: 'Status', width:220, sortable: true },
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
        const height = (window.innerHeight - 116) * 0.70;
        this.setState({ dimension: { width: window.innerWidth, height } });
    }


    loadPersonalLogin = () => {
        let userInfo = utility.readFromLocalStorage("persist:root");
        let user = JSON.parse(userInfo.user)
        this.setState({ loginInfo: user });
    }

    searchHandler = async (e) => {
        const { search, pagination } = this.state;
        let urls = [];
        urls.push(`searchParam=${search ? search : ''}`);
        urls.push(`page=${pagination.active || 1}`)

        const { data } = await axios.get(`${endpoint.userManagementListUser}?${urls.join('&')}`)
        let result = data.data.data.map((item, index) => {
            let newItem = item;
            newItem.site = (item.site && item.site !== '')? item.site:'All';           
            newItem.client = (item.client && item.client !== '')? item.client:'All';           
            newItem.last_access = (item.last_access)? moment(item.last_access).format('DD/MM/YYYY hh:mm:ss'):'';
            newItem.disabled = (item.disabled === 'Y') ? [<label className="um-suspended">{'Suspended'}</label>] : [<label className="um-active">{'Active'}</label>];
            return newItem;
        })
        // console.log(result);
        this.setState({
            data: result, pagination: {
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
            <div className="um-summary">
                <HeaderTitle
                    breadcrumb={[{ to: '', label: 'User Management', active: true }]}
                    button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">CREATE USER</CButton>}
                />
                <CCard className="bg-transparent border-white">
                    <CCardBody >
                        <CRow>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-header">
                                Your Account
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-header">
                                User Id
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-header">
                                Client
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-header">
                                Site
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-value">
                                {loginInfo.email}
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-value">
                                {loginInfo.userId}
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-value">
                                {`${loginInfo.client && loginInfo.client !== ''?loginInfo.client:'All'}`}
                            </CCol>
                            <CCol lg="3" md="3" sm="2" className="user-login-info-value">                                
                                {`${loginInfo.site && loginInfo.site !== ''?loginInfo.site:'All'}`}
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardBody className="px-4 py-2 bg-white">
                        <CRow className="row">
                            <CCol xl={11} lg={10} md={10} sm={12} className="px-1">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control border-left-0" placeholder="Enter User ID or Username" onChange={e => this.setState({ search: e.target.value })} />
                                </div>                                
                            </CCol>
                            <CCol xl={1} lg={2} md={2} sm={12}>
                                <CRow>
                                    <CCol sm={8} lg={12} md={12} className="px-1">
                                        <button className="btn btn-block btn-primary float-right" onClick={this.searchHandler}>SEARCH</button>
                                    </CCol>                                    
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                <UMCustomTable
                    title="User Management"
                    height={dimension.height}
                    fields={fields} data={data} onClick={this.showDetails}
                />
                <CustomPagination data={data}
                    pagination={pagination}
                    goto={(active => { this.setState({ pagination: { ...pagination, active } }, () => this.searchHandler()) })}
                    export={<button className="btn btn-primary float-right px-4 btn-export">EXPORT <IoIosArrowDown /></button>} />
                <CreateUM show={modalShow} toggle={this.toggle} afterSuccess={this.searchHandler} />
            </div>
        )
    }


}

export default UserManagemen;