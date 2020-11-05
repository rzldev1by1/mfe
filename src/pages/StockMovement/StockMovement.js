import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment';
import { CButton, CCard, CCardBody, CRow, CCol, } from '@coreui/react'
import Select from 'react-select'
import validations from './validations'
import { IoIosArrowDown } from 'react-icons/io'
import loading from "../../assets/icons/loading/LOADING-MLS-GRAY.gif"

import StockMovementTable from './StockMovementTable/StockMovementTable'
// import CustomPagination from './StockMovementPagination/StockMovementPagination'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import endpoints from 'helpers/endpoints'
import './StockMovement.scss'
import DatePicker from 'shared/DatePicker'
import './StockMovement.css'
import { isEmptyObject } from 'jquery';

const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'product', Header: 'Product', sortable: true },
  { accessor: 'product_name', Header: 'Description', sortable: true },
  { accessor: 'packdesc', Header: 'UOM', sortable: true }
]

const Required = ({ error, id }) => {
  return <span className="text-error text-danger position-absolute font-12">{error && error[id]}</span>
}
 
class StockMovement extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      site: '',
      client: '',
      status: '',
      product: '',
      productSm:'',
      productIsLoad: false,
      orderType: null,
      task: null,
      resources: [],
      fields: [],
      data: [],
      data_table: [],
      date_array: [],
      create: false,
      export_data: [],
      detail: {},
      pagination: {last_page: 1},
      dateArray: [],
      dimension: { width: 0, height: 0 },
      startDate: moment().subtract(27, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      filterType: {value: "week", label: "Weekly"},
      productData: [],
      filterData: [
        { 'value': 'day', 'label': 'Daily' },
        { 'value': 'week', 'label': 'Weekly' },
        { 'value': 'month', 'label': 'Monthly' }
      ],
      complete: false,
      periodSelected: { value: 1 ? 1 : null },
      error: {},
      dateFromText: null,
      dateFromShow: false,
      firstValue: true,
      dateToText: null,
      dateToShow: false, 
      minDate: null,
      maxDate: null,
      tableStatus: 'waiting' //table status waiting or noData
    }
  }

  componentDidMount = () => {
      let self = this;
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);
    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    //this.searchStockMovement() 
    this.load_data('week', '', '')
    this.getStockDate();
    document.getElementById("stockMovement").addEventListener('mousedown', (e) => {
        if(self.refs["dateFrom"] && self.refs["dateFrom"].state.showDatePicker){
            self.closeDatePicker("from", e)
        }

        if(self.refs["dateTo"] && self.refs["dateTo"].state.showDatePicker){
            self.closeDatePicker("to", e)
        }
    });
    document.getElementById("stockMovementBtn").addEventListener('mousedown', (e) => {
        if(self.refs["dateFrom"] && self.refs["dateFrom"].state.showDatePicker){
            self.closeDatePicker("from", e)
        }

        if(self.refs["dateTo"] && self.refs["dateTo"].state.showDatePicker){
            self.closeDatePicker("to", e)
        }
    });
    document.getElementById("theSidebar").addEventListener('mousedown', (e) => {
        if(self.refs["dateFrom"] && self.refs["dateFrom"].state.showDatePicker){
            self.closeDatePicker("from", e)
        }

        if(self.refs["dateTo"] && self.refs["dateTo"].state.showDatePicker){
            self.closeDatePicker("to", e)
        }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
    let self = this;
  }

  getStockDate = () => {
    axios.get(endpoints.stockDateRange)
      .then((res) => {
        this.setState({ minDate: res.data.data[0].min_date, maxDate: res.data.data[0].max_date })
      })
  }

  periodHandler = (val) => {
    this.setState({
      periodExpand: false,
      dateFromShow: true,
      filterType: val,
      startDate: null,
      endDate: null
    });
    if(!isEmptyObject(val)){
        this.openDatePicker('from')
    }
    this.refs["dateFrom"].resetDateValue();
    this.refs["dateTo"].resetDateValue();

  }

  openDatePicker = (type) => {
    if (type === 'from') {
      this.refs["dateFrom"].openDatePicker()
    } else if (type === "to") {
      this.refs["dateTo"].openDatePicker()
    }
  }

  closeDatePicker = (type, e) => {
    let self = this;
    if((e) && ((type === 'from') && (this.refs["dateFrom"].current && !this.refs["dateFrom"].current.contains(e.target)))){
        return this.refs["dateFrom"].closeDatePicker()
    }

    if((e) && ((type === 'to') && (this.refs["dateTo"].current && !this.refs["dateTo"].current.contains(e.target)))){
        return this.refs["dateTo"].closeDatePicker()
    }

    if (type === 'from') {
      this.refs["dateFrom"].closeDatePicker()
    } else if (type === "to") {
      this.refs["dateTo"].closeDatePicker()
    }
  }
  updateDimension = () => {
    const height = (window.innerHeight - 257)
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getSite = async () => {
    const { data } = await axios.get("/dropdown/getsite")
    const siteData = data.map(d => ({ value: d.site, label: `${d.site} : ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.props.dispatch({ type: 'SITE', data: siteData })
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get("/dropdown/getclient")
    const clientData = data.map(d => ({ value: d.code, label: `${d.code} : ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.props.dispatch({ type: 'CLIENT', data: clientData })
    this.setState({ clientData })
  }
  siteCheck = (siteVal) => {
    let l = null
    const {site} = this.props.store
    if(site)
    site.map(data => {
      if (data.value === siteVal) l = data.label
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    const {client} = this.props.store
    if(client)
    client.map(data => {
      if (data.value === clientVal) c = data.label
    })
    return c
  }
  getStatus = async () => {
    const statusData = [
      { value: "open", label: 'All Open' },
      { value: 'all', label: 'All Status' },
      { value: "unavailable", label: '0: Unavailable' },
      { value: "available", label: '1: Available' },
      { value: "released", label: '2: Released' },
      { value: "part_released", label: '3: Part Released' },
      { value: "completed", label: '4: Completed' },
    ];
    this.setState({ statusData })
  }

  getproduct = async (val) => {
    this.setState({ productdata: [], productIsLoad: true });
    const { data } = await axios.get(endpoints.getProduct + '?client=' + this.state.client.value + '&param=' + (val.toUpperCase()) ).then(res => {
        this.setState({ productIsLoad: false });
        return res
    })
    const productData = data.map((data, i) => ({ value: data.code, label: data.code + " : " + data.name , i }))
    const tmp = { value: 'all', label: 'All Product' }
    productData.splice(0, 0, tmp);
    this.setState({ productData });
  }

  getResources = async () => {
    const { user } = this.props.store
    if (user) {
      const { data } = await axios.get(`/getsorecources?company=${user.company}&client=${user.client}`)
      const { code, name } = data.orderType
      const orderTypeData = code.map((c, i) => ({ value: c, label: `${code[i]}: ${name[i]}` }))
      const orderType = { value: 'all', label: 'All' }
      orderTypeData.splice(0, 0, orderType)
      this.setState({ resources: data, orderTypeData })
    }
  }

  searchStockMovement = async () => { 
    this.setState({
      periodSelected: 1
    })
    const { periods, site, client, filterType, product, periodSelected, productSm } = this.state
    if(isEmptyObject(validations(this.state))){
        let header = Object.assign({}, this.state)
        this.load_data(filterType.value, site.value, client.value, productSm.value)
        this.setState({ error: delete header.error})
    }else{
        const error = validations(this.state)
        if (Object.keys(error).length) {
          return this.setState({ 
            periodSelected: '',
            error })
        }

    }
  }

  setHeader = async (periods) => {
    let header = [
      {
        Header: '',
        headerStyle: { backgroundColor: 'white', textAlign: 'left' },
        headerClassName: 'borderRight noBorderBottom ',
        "fixed": "left",
        columns: [{
          Header: 'Site',
          accessor: 'site',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left', paddingLeft: '15px' },
          headerClassName: 'borderBottom noPaddingTop',
          sortable: true,
          width: 70
        }, {
          Header: 'Client',
          accessor: 'client',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 90,
          className: 'wrap-text',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'Product',
          accessor: 'product',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 130,
          className: 'wrap-all',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'Description',
          accessor: 'product_name',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 200,
          className: 'word-warp',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'UOM',
          accessor: 'packdesc',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          className: 'borderRight',
          headerClassName: 'borderRight borderBottom noPaddingTop',
          width: 100
        },
        ]
      }
    ]

    this.state.dateArray.map((date, idx) => {
      let dates = moment(date).format('DD MMMM YYYY')
      if (periods === 'day') {
        dates = moment(date).format('DD MMMM YYYY')
      }
      else if (periods === 'week') {
        let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
        dates = moment(date).format('DD MMMM YYYY')
        dates = dates + ' - ' + dates2
      }
      else if (periods === 'month') {
        dates = moment(date).format('MMMM YYYY')
      }

      let tmp_header = {
        Header: dates,
        headerStyle: { backgroundColor: 'white' },
        headerClassName: 'borderRight dateHeader noBorderBottom ',
        columns: [
          {
            Header: 'SA+',
            accessor: 'sa_plus_' + date,
            className: 'text-right',
            headerClassName: 'borderBottom ',
            Cell: '-'
          },
          {
            Header: 'SA-',
            accessor: 'sa_minus_' + date,
            className: 'text-right',
            headerClassName: 'borderBottom',
            Cell: '-'
          },
          {
            Header: 'Rec',
            accessor: 'rec_' + date,
            Cell: '-',
            className: 'text-right',
            headerClassName: 'borderBottom',
          },
          {
            Header: 'Send',
            accessor: 'send_' + date,
            className: 'borderRight text-right',
            headerClassName: 'borderRight borderBottom',
            Cell: '-'
          }
        ]
      }
      header.push(tmp_header)
    })
    this.setState({ fields: header })
  }

  setData = async () => {
    let tmp_data = []
    let tmp_date = []
    const tmp_export = this.state.data
    console.log(this.state.data);
    console.log(tmp_export);
    this.state.data.map((datas, idx) => {
      let tmp_row = {
        'site': datas.site,
        'client': datas.client,
        'packdesc': datas.packdesc,
        'product': datas.product,
        'product_name': datas.product_name
      }

      let detail = datas.detail
      detail.map((details) => {
        let dates = details.date
        tmp_row['sa_plus_' + dates] = details.sa_plus
        tmp_row['sa_minus_' + dates] = details.sa_minus
        tmp_row['rec_' + dates] = details.recv_weight
        tmp_row['send_' + dates] = details.send_weight

        if (!tmp_date.includes(dates)) {
          tmp_date.push(dates)
        }
      })
      tmp_data.push(tmp_row)
      console.log(tmp_row);
    })
    tmp_date.sort(async function (a, b) {
      var dateA = new Date(a), dateB = new Date(b);
      return dateA - dateB;
    });
    let tmp_detail = []
    this.state.data.map((datax, idx) => {
      let details = datax.detail
      
      tmp_date.map((date, index) => {
        let tmp_x = null;
        for (let x = 0; x < details.length; x++) {
          console.log(date);
          console.log(details[x].date);
          console.log(details);
          let tmp = null
          if (moment(date) == moment(details[x].date)) {
            tmp = {
              'date': date,
              'sa_plus': details[x].sa_plus,
              'sa_minus': details[x].sa_minus,
              'recv_weight': details[x].recv_weight,
              'send_weight': details[x].send_weight
            }
          } else {
            tmp = {
              'date': date,
              'sa_plus': '-',
              'sa_minus': '-',
              'recv_weight': '-',
              'send_weight': '-'
            }
          }
          tmp_x = tmp
          break;
        }
        tmp_detail.push(tmp_x)
      });
      tmp_export[idx].detail = tmp_detail
    });


    this.setState({ data_table: tmp_data, date_array: tmp_date, export_data: tmp_export }, () => {
      console.log(tmp_date)
      console.log(tmp_data)
      console.log("-------------------------")
    })
  }

  load_data = async (periods, site = this.props.store?.user?.site, client = this.props.store?.user?.client, product = "") => {

    try {   
      this.setState({
        periodSelected: 1,
        data: [],
        tableStatus: 'waiting'
      })
      
      let paramUrl = []
      let dateArray = []
      let stDate = this.state.startDate
      let enDate = this.state.endDate
      let startDate = moment(stDate)
      let endDate = moment(enDate)
      let periodd = periods ? periods : this.state.filterType.value

      paramUrl.push('startDate=' + (stDate ? stDate : ''))
      paramUrl.push('endDate=' + (enDate ? enDate : ''))
      paramUrl.push('filterType=' + (periods ? periods : ''))
      paramUrl.push('client=' + (client ? client : ''))
      paramUrl.push('site=' + (site ? site : ''))
      paramUrl.push('product=' + (product ? product : ''))

      //set array date
      while (startDate <= endDate) {
        let newDate = startDate.format('YYYY-MM-DD')
        dateArray.push(newDate)

        if (periodd === 'day') {
          startDate.add('days', 1)
        }

        else if (periodd === 'week') {
          startDate.add('days', 7)
        }
        else if (periodd === 'month') {
          startDate.add(1, 'M')
        }
      }
      this.setState({ dateArray: dateArray, pushTableComplete: true }, function () {
        //set header
        this.setHeader(periods)
      })

      axios.get(endpoints.stockMovement + '?' + paramUrl.join('&')).then(res => {
        //get result 
        const result = res.data.data

          if(result.length < 1){
            this.setState({   tableStatus: 'noData'  })
          }

          this.setState({ data: result }, function(){ 
              this.setData()
          }) 
      })
      .catch(error => {
        console.log(error) 
      })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  submitSearch = (e) => {
    e.preventDefault();
    this.searchStockMovement();
  }


  render() {
    console.log(this.props.store)
    const {
      dimension, fields, data, site, client, status, orderType, create, task, error,
      siteData, clientData, statusData, orderTypeData, taskData, data_table, filterType,filterData,
      product, productData, productIsLoad, periodSelected, pagination,dateFromShow, minDate,maxDate, date_array,export_data,
      tableStatus,productSm
  } = this.state 
  //custom style react-select  
  return <div className="stockMovement">
    <HeaderTitle
      breadcrumb={[{ to: '', label: 'Stock Movement', active: true }]} 
    />
 
    <CCard style={{zIndex: '999'}} className="mb-3 StockMovementFilter">
      <CCardBody className="p-3 main-con">
        <form onSubmit={this.submitSearch}>
        <CRow > 
        {/* Filter content start */}

        <CCol lg={2} className="sm-col-14 px-0">
            <Select isClearable name="filterType" className="stockMovement" placeholder="Display Period"
              value={isEmptyObject(filterType) ? null : filterType} options={filterData} 
              onChange={(val, { action }) => this.periodHandler( action == "clear" ? {} : val )} 
              filterOption={
                  (option, inputVal) => {
                      return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                  }
              }
              styles={{
                  option: (provided, state) => ({
                    ...provided,
                    textAlign: 'left'
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                    display: !filterType || !filterType.value ? "flex" : "none"
                  })
              }}
            />
            <Required id="filterType" error={error} />
        </CCol>
        <div className="px-3 text-light-gray labelDateFrom d-flex align-items-center" >Date From</div>
        <CCol lg={2} className="sm-col-14 px-0 dateFrom" > 
                <DatePicker style={{ minWidth: '100%' }}
                  ref="dateFrom" arrowStyle={true}
                  getDate={(e) => { this.setState({ startDate: e, firstValue: false })}}
                  defaultValue={new Date(this.state.startDate)} tabIndex="1" placeHolder="Select Date"
                  onChange={(e) => {this.openDatePicker('to')}}
                  fromMonth={minDate} toMonth={maxDate}
                />
                  <Required id="startDate" error={error} />
        </CCol>
        <div className="px-3 text-light-gray labelDateTo d-flex align-items-center">To</div>
        <CCol lg={2} className="sm-col-14 px-0 dateTo" > 
                  <DatePicker style={{ minWidth: '100%', height:'50px' }}
                      ref="dateTo" arrowStyle={true}
                      firstDate = {this.state.startDate ? new Date(this.state.startDate) : this.state.startDate}
                      firstValue={this.state.firstValue}
                      onOpen={() => { this.closeDatePicker("from") }}
                      getDate={(e) => { this.setState({ endDate: e })}}
                      defaultValue={new Date(this.state.endDate)} tabIndex="1" placeHolder="Select Date"
                      fromMonth={minDate} toMonth={maxDate}
                  /> 
                  <Required id="endDate" error={error} />
        </CCol>
        <CCol lg={2} className="sm-col-12 pr-0 site" > 
        {
          this.props.store?.user?.site ? 
          < input name="site" type="text" value={this.siteCheck(this.props.store?.user?.site) || ''} className="form-control" placeholder="Site" maxLength="12" readOnly />
          :
          <Select isClearable name="site" placeholder="Site"
            value={site} options={siteData}
            filterOption={
                (option, inputVal) => {
                    return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                }
            }
            onChange={(val) => this.setState({ site: val })} 
            styles={{
                option: (provided, state) => ({
                  ...provided,
                  textAlign: 'left'
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  display: !site || !site.value ? "flex" : "none"
                })
            }}
          />
        }
      

        </CCol>
        <CCol lg={2} className="sm-col-12 pr-0 client" > 
        {
           this.props.store?.user?.client ? 
           < input name="client" type="text" value={this.clientCheck(this.props.store?.user?.client) || ''} className="form-control" placeholder="Client" maxLength="12" readOnly />
           :
           <Select isClearable name="client" placeholder="Client"
           value={client} options={clientData}
           onChange={(val) => this.setState({ client: val })} 
           filterOption={
               (option, inputVal) => {
                   return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
               }
           }
           styles={{
               option: (provided, state) => ({
                 ...provided,
                 textAlign: 'left'
               }),
               dropdownIndicator: (base, state) => ({
                 ...base,
                 transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                 display: !client || !client.value ? "flex" : "none"
               })
           }}
       />
        }
      
        </CCol>
        <CCol lg={2} className="sm-col-13 product" > {console.log(this.state.productSm)}
        <Select isClearable name="product" placeholder="Product"
            isClearable={true} 
            // value={productSm}
            isLoading={productIsLoad}
             options={product ? productData : []}
            menuIsOpen={product ? true : false}
            onInputChange={(val) => {this.setState({ product: val.length >= 3 ? val : null }, () => {
                if(val.length >= 3) { this.getproduct(val) }
            }) }}
            onChange={(val) => this.setState({ productSm: val })} 
            filterOption={
                (option, inputVal) => {
                    return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                }
            }
            styles={{
                option: (provided, state) => ({
                  ...provided,
                  textAlign: 'left'
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  display: !productSm || !productSm.value ? "flex" : "none"
                })
            }}
        />
        </CCol> 
        <CCol lg={2} className="sm-col-11 col-btn px-0">
            <button className="btn btn-block btn-primary float-right stockMovement btn-search" onClick={this.searchStockMovement} id="stockMovementBtn">SEARCH</button>
        </CCol>

        {/* Filter content End */} 
        </CRow>
        </form>
      </CCardBody>
    </CCard>


    <StockMovementTable
      title="Stock Movement"
      height={dimension.height}
      data={data_table} //data untuk react-table
      dataExport={export_data} //data untuk export
      date_array={date_array}
      filterType={filterType}
      fields={fields}
      tableStatus={tableStatus}
      onClick={this.showDetails}
      pagination={pagination}  
      export={<CButton className="btn btn-primary d-flex float-right px-3 align-items-center btn-export">
      <div className="export-export pr-3"/>
      EXPORT
    </CButton>} 
      pdf='false'
    /> 

      {/* <CustomPagination
      data={data}
      pagination={pagination}
      goto={(active) => {
        this.setState({ pagination: { ...pagination, active } }, () => this.searchStockMovement())
      }}
      export={<CButton className="btn btn-primary float-right btn-export">
      {/* <div className="export-export pr-3"/> 
      EXPORT
    </CButton>}
    /> */}

    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockMovement);