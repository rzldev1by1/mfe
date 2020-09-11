import React from 'react'
import { Modal } from 'react-bootstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import * as utility from './UmUtility'
import axios from 'axios'
import endpoint from '../../helpers/endpoints'
import NewUser from './tabs/NewUser'
import Review from './tabs/Review'
import _ from 'lodash'
import client from './Client';

const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement'];
// const webgroup = {
//   WAREHOUSE: 'Regular',
//   ADMIN: 'Admin'
// }
class UserManagementCreate extends React.PureComponent {
  state = {
    key: 'new',
    // data: { header: {}, lineDetail: [] },
    isAdmin: false,
    user: {
      name: '',
      userId: '',
      password: '',
      email: '',
      disabled: 'N',
      site: '',
      client: '',
      webGroup: utility.webgroup.WAREHOUSE
    },
    sites: [],
    client: [],
    moduleAccess: [],
    saveProgress: false,
    isEnableAllModule: false,
    isEnableAllSite: false,
    isEnableAllClient: false,
    // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }

  componentDidMount() {
    this.loadModuleAccess();
    this.loadSites();
    this.loadClients();
  }

  loadModuleAccess = async () => {
    const { data } = await axios.get(endpoint.userManagementModuleAccess)
    let menus = data.filter((item) => { return menuAvailable.indexOf(item.menuname.toLowerCase()) !== -1 })
      .map((item, index) => {
        let newItem = item;
        newItem.status = false;
        return newItem;
      });
    this.setState({ moduleAccess: menus });
  }

  loadSites = async () => {
    const { data } = await axios.get(endpoint.getSite);
    let sites = data.map((item, index) => {
      let newItem = item;
      newItem.status = false;
      return newItem;
    });
    this.setState({ sites: sites });
  }

  loadClients = async () => {
    const { data } = await axios.get(endpoint.getClient);
    let clients = data.map((item, index) => {
      let newItem = item;
      newItem.status = false;
      return newItem;
    });
    this.setState({ clients: clients });
  }

  onSiteEnableClick = (e, index) => {
    let sites = [...this.state.sites];
    let newSites = sites.map((item, idx) => {
      if (idx === index) {
        item.status = true;
      } else {
        item.status = false;
      }
      return item;
    });

    let isEnableAll = newSites.filter((item) => { return item.status === true }).length;
    let isEnableAllSite = (sites.length === isEnableAll) ? true : false;

    this.setState({ sites: newSites, isEnableAllSite: isEnableAllSite });
  }

  onSiteEnableAllClick = () => {
    let isEnableAllSite = this.state.isEnableAllSite;

    let sites = [...this.state.sites];
    var newArray = sites.map((item, index) => {
      item.status = !isEnableAllSite;
      return item;
    });

    this.setState({ sites: newArray, isEnableAllSite: !isEnableAllSite });
  }

  onModuleEnableClick = (e, index) => {
    let moduleAccess = [...this.state.moduleAccess];
    let newModules = moduleAccess.map((item, idx) => {
      if (idx === index) {
        item.status = !item.status;
      }
      return item;
    });

    let isEnableAll = newModules.filter((item) => { return item.status === true }).length;
    let isEnableAllModule = (moduleAccess.length === isEnableAll) ? true : false;

    this.setState({ moduleAccess: newModules, isEnableAllModule: isEnableAllModule });
  }

  onModuleEnableAllClick = () => {
    let newState = [...this.state.moduleAccess];
    let isEnableAllModule = this.state.isEnableAllModule;
    let newArray = newState.map((item, index) => {
      let newItem = item;
      newItem.status = !isEnableAllModule;
      return newItem;
    })

    this.setState({ moduleAccess: newArray, isEnableAllModule: !isEnableAllModule });
  }

  onClientEnableClick = (e, index) => {
    let clients = [...this.state.clients];
    let newClients = clients.map((item, idx) => {
      if (idx === index) {
        item.status = true;
      } else {
        item.status = false;
      }
      return item;
    });

    let isEnableAll = newClients.filter((item) => { return item.status === true }).length;
    let isEnableAllClient = (clients.length === isEnableAll) ? true : false;

    this.setState({ clients: newClients, isEnableAllClient: isEnableAllClient });
  }

  onClientEnableAllClick = () => {
    let isEnableAllClient = this.state.isEnableAllClient;
    let clients = [...this.state.clients];
    var newArray = clients.map((item, index) => {
      item.status = !isEnableAllClient;
      return item;
    });
    this.setState({ clients: newArray, isEnableAllClient: !isEnableAllClient });
  }

  onActiveTabChange = (e) => {
    console.log(e)
  }

  AllIsValid = () => {
    const { moduleAccess,sites,clients } = this.state;
    let user = { ...this.state.user };
    let isValid = false;
    let userMenu = moduleAccess.filter((item) => { return item.status === true; })

    if (user.webGroup === utility.webgroup.ADMIN)
      isValid = (user.name && user.email) ? true : false;
    else {
      
        let siteFiltered = sites.filter((item) => {return item.status === true;});
                
        let siteValue = ((siteFiltered.length === 1) || (siteFiltered.length === sites.length)) ? siteFiltered.map(item => item.site):null;
        
        let clientFiltered = clients.filter((item) => {return item.status === true;})
      
          let clientValue = ((clientFiltered.length === 1) || (clientFiltered.length === clients.length))? clientFiltered.map( item => item.code ):null;

      isValid = (user.name && user.email && (userMenu && userMenu.length) && siteValue && clientValue) ? true : false;
    }

    return isValid;
  }

  onSelectTab = (key) => {
    if (this.AllIsValid())
      this.setState({ key })
  }

  setData = (data) => {

    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review' })
    }
  }

  onChangeName = (e) => {
    const { value } = e.target;
    let newText = value.substring(0, 2);
    let user = { ...this.state.user };

    let result = utility.generateUserID(value);
    user.name = value;
    user.userId = newText.toLowerCase() + result;
    user.password = result + newText.toLowerCase();
    this.setState({ user: user });

  }

  onChangeEmail = (e) => {
    const { value } = e.target;
    let user = { ...this.state.user };
    user.email = value;
    this.setState({ user: user });
  }


  onWebGroupSelect = (event) => {
    let user = { ...this.state.user };
    user.webGroup = event.target.checked ? utility.webgroup.ADMIN : utility.webgroup.WAREHOUSE;
    this.setState({ isAdmin: event.target.checked, user: user });
  }

  onSubmit = () => {
    this.setState({ saveProgress: true }, () => {
      this.submit();
    })
  }

  submit = async () => {
    const { user, moduleAccess, clients, sites } = this.state;
    let userInfo = { ...user };
    let userMenu = moduleAccess.filter((item) => { return item.status === true; })
      .map((item, index) => {
        return item.menuid;
      });
    let adminMenu = moduleAccess.map((item, index) => { return item.menuid; });

    let siteFiltered = sites.filter((item) => {return item.status === true;});
                
        let siteValue = ((siteFiltered.length === 1) || (siteFiltered.length === sites.length)) ? siteFiltered.map(item => item.site):null;
        
        let clientFiltered = clients.filter((item) => {return item.status === true;})
      
          let clientValue = ((clientFiltered.length === 1) || (clientFiltered.length === clients.length))? clientFiltered.map( item => item.code ):null;

    userInfo.userMenu = (user.webGroup === utility.webgroup.ADMIN) ? adminMenu : userMenu;
    userInfo.site = ((user.webGroup === utility.webgroup.ADMIN) ? null : siteValue.length == sites.length ? null : siteValue );
    userInfo.client = ((user.webGroup === utility.webgroup.ADMIN) ? null : clientValue.length == clients.length ? null : clientValue );

    const { status, data } = await axios.post(endpoint.userManagementCreate, userInfo);
    if (status === 200) {
      this.setState({ saveProgress: false }, () => {
        this.onHideModal();
        this.props.afterSuccess();
      });;
    }

  }

  onHideModal = () => {
    let user = {
      name: '',
      userId: '',
      password: '',
      email: '',
      disabled: 'N',
      site: '',
      client: '',
      webGroup: utility.webgroup.WAREHOUSE
    }
    this.setState({
      user: user, isAdmin: false, key: 'new', saveProgress: false,
      isEnableAllModule: false,
      isEnableAllSite: false,
      isEnableAllClient: false,
    }, () => {
      this.loadModuleAccess();
      this.loadSites();
      this.loadClients();
      this.props.toggle();
    })

  }


  render() {
    const { show, toggle, users } = this.props
    const { user, key, isAdmin, moduleAccess, sites, clients, saveProgress, isEnableAllClient, isEnableAllSite, isEnableAllModule } = this.state

    return <Modal show={show} onHide={() => this.onHideModal()} size="xl" className="um-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="pl-5 pr-3 pb-3 pt-3 mx-0">
          <Col xs={10} className="px-0">
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create User</span> <br />
            <span className="ml-7">Enter user details to create a New User</span>
          </Col>
          <Col xs={2} className="text-right px-0">
            <i className="iconU-close pointer" onClick={() => this.onHideModal()}></i>
          </Col>
        </Row>
        <Nav tabs className="px-7 mx-0">
          <NavItem className='mr-2'>
            <NavLink className={`d-flex align-items-center m-0 ${key === 'new' ? 'active' : null}`} onClick={() => this.onSelectTab('new')} style={{marginLeft:'0px !important'}}>
            <span className='number-number-1' /> User Detail                
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={`d-flex align-items-center  ${key === 'review' ? 'active' : null}`} onClick={() => this.onSelectTab('review')} style={{marginLeft:'0px !important'}}>
              <span className='number-number-2' /> Review
            </NavLink></NavItem>
        </Nav>
        <TabContent activeTab={key}>
          <TabPane tabId="new">
            <NewUser user={user} isAdmin={isAdmin} onWebGroupSelect={this.onWebGroupSelect}
              onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail}
              onModuleEnableClick={this.onModuleEnableClick} onSiteEnableClick={this.onSiteEnableClick}
              onClientEnableClick={this.onClientEnableClick}
              moduleAccess={moduleAccess} sites={sites} clients={clients} next={this.onSelectTab}
              isEnableAllClient={isEnableAllClient} isEnableAllSite={isEnableAllSite} isEnableAllModule={isEnableAllModule}
              onModuleEnableAllClick={this.onModuleEnableAllClick}
              onClientEnableAllClick={this.onClientEnableAllClick}
              onSiteEnableAllClick={this.onSiteEnableAllClick}
              users={users} />
          </TabPane>
          <TabPane tabId="review">
            <Review user={user} isAdmin={isAdmin}
              moduleAccess={moduleAccess}
              sites={sites}
              clients={clients}
              next={this.onSelectTab}
              submitProgress={saveProgress}
              submit={this.onSubmit} />
          </TabPane>
        </TabContent>

      </Modal.Body>
    </Modal>
  }
}
export default UserManagementCreate