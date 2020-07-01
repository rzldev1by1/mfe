import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import axios from 'axios'
import HeaderTitle from 'shared/container/TheHeader'
import { IoIosArrowDown } from 'react-icons/io'

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
            fields: columns,
            data: [],
            dimension: { width: 0, height: 0 },
            pagination: {},
        }
    }

    componentDidMount = () => {
        this.updateDimension();
        window.addEventListener('resize', this.updateDimension);
        this.loadUser();
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimension);
    }

    updateDimension = () => {
        const height = (window.innerHeight * 0.50);
        this.setState({ dimension: { width: window.innerWidth, height } });
    }

    loadUser = async () => {
        const { data } = await axios.get("/web_user");
        //    console.log(data);
        this.setState({ data: data.data.data });
    }


    render() {

        const { data, fields, pagination, dimension } = this.state;

        return (
            <div>
                <HeaderTitle
                    breadcrumb={[{ to: '', label: 'User Management', active: true }]}
                    button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">Create New User</CButton>}
                />
                <CCard className="bg-transparent border-dark">
                    <CCardBody >
                        asdasdasd
                    </CCardBody>
                    <CCardBody className="px-4 py-2 bg-info">
                        <CRow className="row">
                            <CCol lg={10} className="px-1">
                                <div className="input-group my-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control border-left-0" placeholder="Enter User ID or Username" onChange={e => this.setState({ search: e.target.value })} />
                                </div>
                            </CCol>
                            <CCol lg={2}>
                                <CRow>
                                    <CCol sm={8} lg={10} md={12} className="px-1">
                                        <button className="btn btn-block btn-primary float-right" onClick={this.searchSalesOrder}>Search</button>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                <CustomTable title="User Management" height={dimension.height} fields={fields} data={data} onClick={() => { }} />
                <CustomPagination
                    data={data}
                    pagination={pagination}
                    goto={(active) => {
                        this.setState({ pagination: { ...pagination, active } }, () => this.searchSalesOrder())
                    }}
                    export={<CButton className="btn btn-primary float-right px-4 btn-export">Export <IoIosArrowDown /></CButton>}
                />
            </div>
        )
    }


}

export default UserManagemen;