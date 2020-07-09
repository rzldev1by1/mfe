import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import * as utility from './UmUtility'
import axios from 'axios'
import endpoint from '../../helpers/endpoints'
import NewUser from './tabs/NewUser'
import Review from './tabs/Review'
import _ from 'lodash'

const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement'];

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
      site:'',
      client:'',
      webGroup: false
    },
    sites: [],
    client: [],
    moduleAccess: [],
    saveProgress:false
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

    this.setState({ sites: newSites }, () => console.log(this.state.moduleAccess));
  }

  onSiteEnableAllClick = () => {

  }

  onModuleEnableClick = (e, index) => {
    let moduleAccess = [...this.state.moduleAccess];
    let newModules = moduleAccess.map((item, idx) => {
      if (idx === index) {
        item.status = !item.status;
      }
      return item;
    });

    this.setState({ moduleAccess: newModules });
  }

  onModuleEnableAllClick = () => {

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

    this.setState({ clients: newClients });
  }

  onClientEnableAllClick = () => {

  }

  onActiveTabChange = (e) => {
    console.log(e)
  }

  onSelectTab = (key) => {
    // let { header, lineDetail } = this.state.data
    //   if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
    //     console.log('review disabled until form filled')
    //     return null
    //   }
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
    user.webGroup = event.target.checked;
    this.setState({ isAdmin: event.target.checked, user: user });
  }

  onSubmit = () => {
    this.setState({saveProgress:true},() => {
      this.submit();
    })
  }

  submit = async () => {
    const {user,moduleAccess,clients, sites} = this.state;
    let userInfo = {...user};
    let userMenu = moduleAccess.filter((item) => { return item.status === true; })
    .map((item,index) => { 
      return item.menuid;
    });
    let site = sites.find((item,index) => {
      return item.status === true;
    });
    let client = clients.find((item,index) => {
      return item.status === true;
    });

    userInfo.userMenu = userMenu;
    userInfo.site = site.site;
    userInfo.client = client.code;

    const { status, data } = await axios.post(endpoint.userManagementCreate, userInfo);
    if(status === 200){
      this.setState({saveProgress:false},() => { 
        this.props.toggle();
        this.props.afterSuccess();
      });;
    }

  }


  render() {
    const { show, toggle } = this.props
    const { user, isAdmin, moduleAccess, sites, clients,saveProgress } = this.state

    return <Modal show={show} onHide={() => toggle()} size="xl" className="sales-order-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="p-4">
          <Col xs={10}>
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create User</span> <br />
            <span className="pl-4">Enter user details to create a New User</span>
          </Col>
          <Col xs={2} className="text-right">
            <i className="iconU-close pointer" onClick={() => toggle()}></i>
          </Col>
        </Row>
        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={this.onSelectTab}>
          <Tab eventKey="new" title={`1. User Details`}>
            <NewUser user={user} isAdmin={isAdmin} onWebGroupSelect={this.onWebGroupSelect}
              onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail}
              onModuleEnableClick={this.onModuleEnableClick} onSiteEnableClick={this.onSiteEnableClick}
              onClientEnableClick={this.onClientEnableClick}
              moduleAccess={moduleAccess} sites={sites} clients={clients} next={this.onSelectTab}/>
          </Tab>
          <Tab eventKey="review" title={`2. Review`}>
            <Review user={user} isAdmin={isAdmin} 
            moduleAccess={moduleAccess} 
            sites={sites} 
            clients={clients} 
            next={this.onSelectTab}
            submitProgress={saveProgress}
            submit={this.onSubmit} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  }
}
export default UserManagementCreate