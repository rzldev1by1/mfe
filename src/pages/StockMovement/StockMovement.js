import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment';
import { CButton, CCard, CCardBody, CRow, CCol, } from '@coreui/react'
import Select from 'react-select'
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

const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'product', Header: 'Product', sortable: true },
  { accessor: 'product_name', Header: 'Description', sortable: true },
  { accessor: 'packdesc', Header: 'UOM', sortable: true }
]
 
class StockMovement extends React.PureComponent {
  state = {
    search: '',
    site: '',
    client: '',
    status: '',
    product: '',
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
    filterType: 'week',
    productData: [],
    filterData: [
      { 'value': 'day', 'label': 'Daily' },
      { 'value': 'week', 'label': 'Weekly' },
      { 'value': 'month', 'label': 'Monthly' }
    ],
    complete: false,
    periodSelected: 1,
    dateFromSelected: null,
    dateFromText: null,
    dateFromShow: false,

    dateToSelected: null,
    dateToText: null,
    dateToShow: false, 
    minDate: null,
    maxDate: null,
    tableStatus: 'waiting' //table status waiting or noData
  }
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    //this.searchStockMovement() 
    this.load_data('', '', 'week')
    this.getStockDate();
  }

  getStockDate = () => {
    axios.get(endpoints.stockDateRange)
    .then((res) => {
      this.setState({ minDate: res.data.data[0].min_date, maxDate: res.data.data[0].max_date})
    })
  }

  periodHandler = (val) => {
    // alert(any.periodSelected);
    this.setState({
      periodExpand: false,
      dateFromShow: true,
      filterType: val
    });
    this.openDatePicker('from')
  }

  openDatePicker = (type) => {
    if (type === 'from') {
      this.refs["dateFrom"].openDatePicker()
    } else if (type === "to") {
      this.refs["dateTo"].openDatePicker()
    }
  }

  closeDatePicker = (type) => {
    if (type === 'from') {
      this.refs["dateFrom"].closeDatePicker()
    } else if (type === "to") {
      this.refs["dateTo"].closeDatePicker()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
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
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get("/dropdown/getclient")
    const clientData = data.map(d => ({ value: d.code, label: `${d.code} : ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.setState({ clientData })
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

  getproduct = () => {
    let self = this; 
    let tmp_data = []
    self.setState({ productdata: tmp_data }) 

    axios.get(endpoints.getProduct + '?client=' + this.state.client.value )
    .then(res => {
        const data = res.data 
        const productdata = data.code.map((c, i) => ({ value: c, label: `${data.code[i]}: ${data.name[i]}` }))
        const tmp = { value: 'all', label: 'All Product' }
        productdata.splice(0, 0, tmp)
        this.setState({ productData: productdata })
        
    })
    .catch(error => {
        console.log(error);
    })
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
    const { periods, site, client, filterType, product, dateFromSelected, dateToSelected, periodSelected } = this.state
    if (filterType.value) {
      this.load_data(dateFromSelected, dateToSelected, filterType.value, site.value, client.value, product.value)
    } else {
      this.setState({
        periodSelected: ''
      })
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
        headerStyle: {backgroundColor: 'white' },
        headerClassName: 'borderRight dateHeader noBorderBottom ', 
        columns: [
          {
            Header: 'SA+',
            accessor: 'sa_plus_'+date,
            className: 'text-right',
            headerClassName: 'borderBottom ', 
            Cell: '-'
          },
          {
            Header: 'SA-',
            accessor: 'sa_minus_'+date,
            className: 'text-right',
            headerClassName: 'borderBottom', 
            Cell: '-'
          },
          {
            Header: 'Rec',
            accessor: 'rec_'+date,
            Cell: '-',
            className: 'text-right',
            headerClassName: 'borderBottom', 
          },
          {
            Header: 'Send',
            accessor: 'send_'+date,
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
        
        if(!tmp_date.includes(dates)){
          tmp_date.push(dates)
        }
      })
      tmp_data.push(tmp_row)
    })
    tmp_date.sort(async function(a, b) {
        var dateA = new Date(a), dateB = new Date(b);
        return dateA - dateB;
    });
  
      this.state.data.map((datax, idx) => { 
        let details = datax.detail 
        let tmp_detail = []
        tmp_date.map((date, index) => {
          let tmp_x = null;
          for (let x = 0; x < details.length; x++) { 
            let tmp = null
            if(date==details[x].date ){
              tmp = {
                'date':date,
                'sa_plus': details[x].sa_plus,
                'sa_minus': details[x].sa_minus,
                'recv_weight': details[x].recv_weight,
                'send_weight': details[x].send_weight
              } 
            }else{
              tmp = {
                'date':date,
                'sa_plus':  '-',
                'sa_minus':  '-',
                'recv_weight':  '-',
                'send_weight':  '-'
              } 
            } 
            tmp_x = tmp
            break;
          }
          tmp_detail.push(tmp_x)
        });
        tmp_export[idx].detail = tmp_detail
      });  


    this.setState({ data_table: tmp_data, date_array: tmp_date, export_data: tmp_export  }, () => {
      console.log(tmp_date)
      console.log("-------------------------")
    })
  }

  load_data = async (dtStart, dtEnd, periods, site = "", client = "", product = "") => {

    try {   
      this.setState({
        periodSelected: 1,
        data: [],
        tableStatus: 'waiting'
      })
      
      let paramUrl = []
      let dateArray = []
      let stDate = dtStart ? dtStart : this.state.startDate
      let enDate = dtEnd ? dtEnd : this.state.endDate
      let startDate = moment(stDate) 
      let endDate = moment(enDate)
      let periodd = periods ? periods : this.state.filterType

      paramUrl.push('startDate=' +(stDate ? stDate : ''))
      paramUrl.push('endDate=' + (enDate ? enDate : ''))
      paramUrl.push('filterType=' + (periods ? periods: '')) 
      paramUrl.push('client=' + (client ? client: '')) 
      paramUrl.push('site=' + (site ? site: '')) 
      paramUrl.push('product=' + (product ? product: ''))  

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
      this.setState({ dateArray: dateArray, pushTableComplete: true }, function (){
        //set header
        this.setHeader(periods)
      })

      axios.get(endpoints.stockMovement+'?'+paramUrl.join('&')).then(res => { 
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
    } catch (error) {
      console.log(error)
    }
 }

  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  render() {
    const {
      dimension, fields, data, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData, taskData, data_table, filterType,filterData,
      product, productData, periodSelected, pagination,dateFromShow, minDate,maxDate, date_array,export_data,
      tableStatus
  } = this.state 
  //custom style react-select  
  return <div className="stockMovement">
    <HeaderTitle
      breadcrumb={[{ to: '', label: 'Stock Movement', active: true }]} 
    />
 
    <CCard style={{zIndex: '999'}} className="mb-3 StockMovementFilter">
      <CCardBody className="px-0 py-3 main-con">
        <CRow className="flex-container-total-align"> 
        {/* Filter content start */}

        <CCol lg={2} className="sm-col-14 pr-0" >
            <Select name="filterType" className="stockMovement" placeholder="Display Period"
              value={filterType} options={filterData} 
              onChange={(val) => this.periodHandler( val )}  
              styles={{
                dropdownIndicator: (base, state) => ({
                  ...base, 
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                })
              }}
            />
        </CCol>
        <CCol lg={2} className="sm-col-7 text-right pr-0 text-light-gray labelDateFrom" > Date From </CCol>
        <CCol lg={2} className="sm-col-14 pr-0 dateFrom" > 
                <DatePicker style={{ minWidth: '100%' }}
                  ref="dateFrom" arrowStyle={true}
                  getDate={(e) => { this.setState({ dateFromSelected: e })}}
                  defaultValue={this.state.dateFromSelected} tabIndex="1" placeHolder="Select Date"
                  onChange={(e) => {this.openDatePicker('to')}}
                  fromMonth={minDate} toMonth={maxDate}
                />
        </CCol>
        <CCol lg={2} className="sm-col-3 text-right pl-0 pr-0 text-light-gray labelDateTo" > To </CCol>
        <CCol lg={2} className="sm-col-14 pr-0 dateTo" > 
                  <DatePicker style={{ minWidth: '100%', height:'50px' }}
                      ref="dateTo" arrowStyle={true}
                      firstDate = {this.state.dateFromSelected}
                      onOpen={() => { this.closeDatePicker("from") }}
                      getDate={(e) => { this.setState({ dateToSelected: e })}}
                      defaultValue={this.state.dateToSelected} tabIndex="1" placeHolder="Select Date"
                      fromMonth={minDate} toMonth={maxDate}
                  /> 
        </CCol>
        <CCol lg={2} className="sm-col-12 pr-0 site" > 
        <Select name="site" placeholder="Site"
            value={site} options={siteData}
            onChange={(val) => this.setState({ site: val })} 
            styles={{
            dropdownIndicator: (base, state) => ({
                ...base, 
                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
            })
            }}
        />

        </CCol>
        <CCol lg={2} className="sm-col-12 pr-0 client" > 
        <Select name="client" placeholder="Client"
            value={client} options={clientData}
            onChange={(val) => this.setState({ client: val }, () => this.getproduct())} 
            styles={{
            dropdownIndicator: (base, state) => ({
                ...base, 
                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
            })
            }}
        />
        </CCol>
        <CCol lg={2} className="sm-col-13 product" > 
        <Select name="product" placeholder="Product" 
            value={product} options={productData}
            menuIsOpen={this.state.product.length >= 3 ? true : false}
            onInputChange={(val) => this.setState({ product: val })}
            onChange={(val) => this.setState({ product: val })} 
            styles={{
            dropdownIndicator: (base, state) => ({
                ...base, 
                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
            })
            }}
        />
        </CCol> 
        <CCol lg={2} className="sm-col-11 col-btn pl-0" >
            <button className="btn btn-block btn-primary float-right stockMovement btn-search" onClick={this.searchStockMovement}>SEARCH</button>
        </CCol>

        {/* Filter content End */} 
        </CRow>
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