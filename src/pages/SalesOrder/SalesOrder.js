import React from 'react'
import { connect } from 'react-redux'
import {
  CBadge,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CRow,
  CCol,
} from '@coreui/react'
import Select from 'react-select'
import DataTable from 'shared/table/DataTable'
import States from './dummy/states'
import './SalesOrder.css'

const usersData = [
  { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
  { id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
  { id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  { id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  { id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending' },
  { id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  { id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active' },
  { id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  { id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  { id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending' },
  { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active' },
  { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  { id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', status: 'Pending' },
  { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active' },
  { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  { id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  { id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', status: 'Pending' },
  { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active' },
  { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  { id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending' },
  { id: 42, name: 'Ford Prefect', registered: '2001/05/25', role: 'Alien', status: 'Don\'t panic!' }
]

const fields = [
  { key: 'name', _style: { width: '40%' } },
  { key: 'role', _style: { width: '20%' } },
  { key: 'status', _style: { width: '20%' } },
  'registered',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
]

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
// '/#/sales-orders/' + data.client + '/' + data.site + '/' + data.orderno
class SalesOrder extends React.PureComponent {
  state = {
    site: null,
    client: null,
    status: null,
    orderType: null,
  }
  render() {
    const siteData = States
    const clientData = States
    const statusData = States
    const orderTypeData = States
    return <React.Fragment>
      <CCard className="bg-transparent mb-3">
        <CCardTitle className="text-info m-0">Sales Orders <button className="btn btn-primary float-right">Create</button></CCardTitle>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol md={3} className="px"><input type="text" className="form-control" placeholder="Search" /></CCol>
            <CCol md={2} className="px">
              <Select name="site" placeholder="Site"
                value={this.state.site} options={siteData}
                onChange={(val) => this.setState({ site: val })}
              />
            </CCol>
            <CCol md={2} className="px">
              <Select name="client" placeholder="Client"
                value={this.state.client} options={clientData}
                onChange={(val) => this.setState({ client: val })}
              />
            </CCol>
            <CCol md={2} className="px">
              <Select name="status" placeholder="Status"
                value={this.state.status} options={statusData}
                onChange={(val) => this.setState({ status: val })}
              />
            </CCol>
            <CCol md={2} className="px">
              <Select name="orderType" placeholder="Order Type"
                value={this.state.orderType} options={orderTypeData}
                onChange={(val) => this.setState({ orderType: val })}
              />
            </CCol>
            <CCol md={1}><button className="btn btn-outline-primary float-right">Search</button></CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <DataTable
        className="h-70 scroll-y"
        fields={fields}
        data={usersData}
        onClick={(item, index, col, e) => console.log(item, index, col, e)}
        customFields={{
          'status':
            (item) => (
              <td>
                <CBadge color={getBadge(item.status)}> {item.status} </CBadge>
              </td>
            ),
          'show_details':
            item => {
              return (
                <td className="py-2">
                  <CButton color="primary" variant="outline" shape="square" size="sm" > Show </CButton>
                </td>
              )
            },
        }}
      />
    </React.Fragment>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrder);