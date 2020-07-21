import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { CButton, CCard, CCardBody, CRow, CCol,} from '@coreui/react'
import Select from 'react-select'
import { FaPencilAlt } from 'react-icons/fa'
import endpoints from 'helpers/endpoints'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './StockHolding.css'


const columns = [
                    { 
                      accessor: 'site', 
                      Header: 'Site',
                      placeholder: 'Site', 
                      sortable: true 
                    },
                    { 
                      accessor: 'client', 
                      Header: 'Client', 
                      placeholder: 'Client', 
                      sortable: true },
                    { 
                      accessor: 'product', 
                      Header: 'Product', 
                      placeholder: 'Product', 
                      sortable: true, 
                      width: 90 
                    },
                    { 
                      accessor: 'product_name', 
                      Header: 'Description', 
                      placeholder: 'Description', 
                      sortable: true  
                    },
                    { 
                      accessor: 'disposition', 
                      Header: 'Disposition', 
                      placeholder: 'Disposition', 
                      sortable: true 
                    },
                    { 
                      accessor: 'packdesc_1', 
                      Header: 'UOM', 
                      placeholder: 'UOM', 
                      sortable: true 
                    },
                    { 
                      accessor: 'status', 
                      Header: 'Status', 
                      placeholder: 'Status', 
                      sortable: true,
                      width: 100 
                    },
                    { 
                      accessor: 'on_hand_qty', 
                      Header: 'Stock On Hand', 
                      placeholder: 'Stock on Hand', 
                      sortable: true,  
                      width: 140 },
                    { 
                      accessor: 'on_hand_wgy', 
                      Header: 'On Hand WGT', 
                      placeholder: 'On Hand WGT', 
                      sortable: true,  
                      width: 145  },
                    { 
                      accessor: 'expected_in_qty', 
                      Header: 'Expected In Qty', 
                      placeholder: 'Expected In Qty', 
                      sortable: true,  
                      width: 145  },
                    { 
                      accessor: 'expected_in_wgt', 
                      Header: 'Expected In Weight', 
                      placeholder: 'Expected In Weight', 
                      sortable: true,  
                      width: 170 
                    },
                    { 
                      accessor: 'expected_out_qty', 
                      Header: 'Expected Out Qty', 
                      placeholder: 'Expected Out Qty', 
                      sortable: true, 
                      width: 155  },
                    { 
                      accessor: 'prince',
                      Header: 'Price', 
                      placeholder: 'Price', 
                      sortable: true,},
                    { 
                      accessor: 'pallets', 
                      Header: 'Pallets', 
                      placeholder: 'Pallets aaa', 
                      sortable: true,
                    },
]
class StockHolding extends React.PureComponent {
  state = {
    search: '',
    site: null,
    client: null,
    status: null,
    orderType: null,
    task: null,
    resources: [],
    fields: columns,
    data: [],
    create: false,
    pagination: {},
    detail: {},
    dimension: { width: 0, height: 0 },
    products: [],
    columnsPayload: []
  }
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.searchStockHolding()
    this.headerStockHolding()

  }



  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }

  updateDimension = () => {
    const height = (window.innerHeight - 116) * 0.87
    this.setState({ dimension: { width: window.innerWidth, height } });
  }

  renameSubmit = async (e) => {
    const fields = this.state.fields;
    const changedField = e;
    const changedFieldAccessor = [];
    const changedFieldHeader = [];

    changedField.map((item, idx) => {
      changedFieldAccessor.push(item.accessor);
      changedFieldHeader.push(item.header);
    })

    fields.map((item, idx) => {
      changedFieldAccessor.map((data, idx) => {
        if(item.accessor == data){
          item.Header = changedFieldHeader[idx];
        }
      });
    });

    this.setState({ fields: fields });

    let payload = {};
    let payloadIndex = Object.keys(this.state.products);
    let defaultValues = Object.values(this.state.products);
    let fieldsAccessor = changedFieldAccessor;

    fieldsAccessor.map((data, idx) => {
        if(data.includes(" ")){
            let uppercaseAccessor = data.toUpperCase();
            let index = uppercaseAccessor.split(" ");
            fieldsAccessor[idx] = index.join("_")
        }else{
          fieldsAccessor[idx] = data.toUpperCase()
        }
    })

    payloadIndex.map((data, idx) => {
        if(data.includes(" ")){
            let uppercaseAccessor = data;
            let index = uppercaseAccessor.split(" ");
            payloadIndex[idx] = index.join("_")
        }
    })

    let newPayload = {};


    for (let i = 0; i < Object.keys(this.state.products).length; i++) {
        fieldsAccessor.map((data, idx) => {
            if(payloadIndex[i] == data){
                payload[payloadIndex[i]] = changedFieldHeader[idx];
                payloadIndex.splice(i, 1);
                defaultValues.splice(i, 1)
            }
        })
        
    }

    payloadIndex.map((data, idx) => {
        payload[data] = defaultValues[idx];
    })  

    this.setState({ columnsPayload: payload })

    const baseUrl = process.env.REACT_APP_API_URL;

    try{
        const { data } = await axios.post(baseUrl + "/putStockholdingColumn?client=ANTEC", payload)
        console.log(data);
    }catch(error){
        console.log(error)
    }
  }

  getSite = async () => {
    const { data } = await axios.get(endpoints.getSite)
    const siteData = data.map(d => ({ value: d.site, label: `${d.site}: ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get(endpoints.getClient)
    const clientData = data.map(d => ({ value: d.code, label: `${d.code}: ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.setState({ clientData })
  }
  getStatus = async () => {
    const status = { value: 'all', label: 'All Status' }
    const statusData = [
      status,
      { value: "Ok", label: 'Ok' },
      { value: "Shortage", label: 'Shortage' },
    ];
    this.setState({ statusData })
  }
  headerStockHolding = async () => {
    const url = `${endpoints.getStockHoldingHearder}?client=ANTEC`
    const { data } = await axios.get(url)
    let header = []
    let accessor = Object.keys(data.data[0]);
    accessor.map((data, idx) => {
        let lowerCase = data.toLowerCase();
        if(lowerCase.includes(" ")){
            let split = lowerCase.split(" ");
            let result = split.join("_");
            accessor[idx] = result
        }else{
            accessor[idx] = lowerCase
        }
        
    })
    Object.values(data.data[0]).map((data, idx) => { 
      let headerTable = {
        accessor: 'site', 
        Header: 'site', 
        placeholder: 'site' , 
        sortable: true 
      }
      let plach = this.state.fields
      plach.map((data, idx) => {
        let plachData = data.placeholder 
        console.log(plachData)
        headerTable.placeholder= plachData 
      })
      headerTable.Header= data 
      // headerTable.placeholder= plachData 
      headerTable.accessor= accessor[idx] 
      header.push(headerTable)
     
    })
    console.log(header)
    if (data.data.length) {
      this.setState({ 
          products: data.data[0],
          fields: header 
        })
    }
  }
  searchStockHolding  = async () => {
    let { search, site, client, status, pagination } = this.state
    let urls = []
    urls.push('searchParam=' + search ? search : '')
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('page=' + (pagination.active || 1))
    const { data } = await axios.get(`${endpoints.stockHoldingSummary}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data;
          modifiedData.map((item, idx) => {
            if((item["on_hand_qty"] + item["expected_in_qty"]) >= item["expected_out_qty"]){
              item['status'] = [<a className="status-ok">OK</a> ]
            }else{
              item['status'] =  [<a className="status-shortage">SHORTAGE</a> ]
            }
          } )
      this.setState({
        pagination: {
          active: pagination.active || data.data.current_page,
          show: data.data.per_page,
          total: data.data.total
        },
        data: modifiedData
      })
    } else {
      this.setState({ data: [] })
    }
    // this.setState({ data: DummyData })
  }

  showDetails = (item) => {
    const url = '/stock-holding' + item.product + '/' + item.client + '/' + item.site
    this.props.history.push(url)
  }

  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  render() {
    const {
      dimension, fields, data, pagination, site, client, status, siteData, clientData, statusData, 
    } = this.state
    return <div className="table-summary">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Stock Holding', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right d-none">
          <FaPencilAlt />
          </CButton>}
      />

      <CCard className="card-shadow">
        <CCardBody className="search-padding">
          <CRow className="row">
            <CCol lg={4} className="px-1">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control border-left-0 input-height " placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
              </div>
            </CCol>
            <CCol lg={7}>
              <CRow>
                <CCol sm={4} lg={3} className="px-1">
                  <Select name="site" placeholder="Site"
                    value={site} options={siteData}
                    onChange={(val) => this.setState({ site: val }, () => {

                    })}
                  />
                </CCol>
                <CCol sm={4} lg={3} className="px-1">
                  <Select name="client" placeholder="Client"
                    value={client} options={clientData}
                    onChange={(val) => this.setState({ client: val })}
                  />
                </CCol>
                <CCol sm={4} lg={3} className="px-1">
                  <Select name="status" placeholder="Status"
                    value={status} options={statusData}
                    onChange={(val) => this.setState({ status: val })}
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol lg={1} className="px-1">
                  <button className="btn btn-block btn-primary" onClick={this.searchStockHolding}>SEARCH</button>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CustomTable
        title="Stock Holding"
        height={dimension.height}
        data={data}
        fields={fields}
        pagination={pagination}
        onClick={this.showDetails}
        renameSubmit={this.renameSubmit}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchStockHolding ())
        }}
        export={<button className="btn btn-primary float-right px-4 btn-export"> EXPORT</button>}
      />
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockHolding);
