import React from 'react'
import {
  CButton,
  CBadge,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CTabs,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
class SalesOrderCreate extends React.PureComponent {
  onActiveTabChange = (e) => {
    console.log(e)
  }
  render() {
    const {show, toggle} = this.props
    return <CModal
      show={show}
      onClose={toggle}
      size="xl"
    >
      {/* <CModalHeader closeButton>Modal title</CModalHeader> */}
      <CModalBody>
        <CTabs activeTab="detail"
          onActiveTabChange={this.onActiveTabChange}
        >
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="detail">
                <CBadge color="primary">1</CBadge>Order & Product Details
            </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="review"> Review </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab="detail">
              {`1. ${lorem}`}
            </CTabPane>
            <CTabPane data-tab="review">
              {`2. ${lorem}`}
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Next <i className="fa fa-chevron-right "></i></CButton>
      </CModalFooter>
    </CModal>
  }
}
export default SalesOrderCreate