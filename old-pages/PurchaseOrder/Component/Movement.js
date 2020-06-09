import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios';
import { endpoint, headers } from 'shared/ConfigEndpoint'
import moment from 'moment';
import mid from 'assets/img/brand/field-idle.png'
import down from 'assets/img/brand/field-bot.png'
import up from 'assets/img/brand/field-top.png'
// import DummyData from './Movement.json'
import Paging from 'shared/Paging'
import Export from 'shared/Export'
import ExportExcel from 'shared/ExportExcel'



class Movement extends Component {
    constructor(props) {
        super(props);
        this.hover = this.hover.bind(this);
        this._checkActiveHover = this._checkActiveHover.bind(this);
        this._checkActiveSorting = this._checkActiveSorting.bind(this);

        this.state = {
            data: [],
            startDate: moment().subtract(27, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            filterType: 'week',
            dateArray: [],
            dataArray: [],
            complete: false,
            pushTableComplete: false,

            activearrow: mid,
            activecolumnsort: null,
            sortparameter: null,
            siteSP: mid,
            clientSP: mid,
            productSP: mid,
            productNameSP: mid,
            uomSP: mid,
            sort: true,

            //pagination
            currentPage: 1,
            startIndex: 0,
            lastIndex: 0,
            displayPage: 1,
            totalRows: 0,
            maxPage: 0
        }
    }

    //testing  hover
    hover(e, stat, product) {
        if (stat === 'active') {
            this.setState({ hover_stat: product });
        } else {
            this.setState({ hover_stat: null });
        }
    }

    _checkActiveHover(product) {
        return (product === this.state.hover_stat) ? 'hover-active' : "";
    }

    componentDidMount() {
        this.getData()
        this.pushTable()
    }

    getData = async (start, end, period, site = "", client = "", product = "") => {
        try {
            this.props.isComplete(false)
            this.setState({ complete: false, activearrow: mid, sort: true })
            let dtStart = start ? start : this.state.startDate
            let dtEnd = end ? end : this.state.endDate
            let periods = period ? period : this.state.filterType
            const res = await axios.get(endpoint.stockMovement + '?startDate=' + dtStart + '&endDate=' + dtEnd + '&filterType=' + periods + '&client=' + client + '&site=' + site + '&product=' + product, {
                headers: headers
            })
            const result = res.data.data
            // const result = DummyData
            this.setPagination(res)
            this.setState({ data: result, complete: true, filterType: periods })
            // this.props.data(result)
            this.pushTable(dtStart, dtEnd, periods)
            this.props.isComplete(true)
            // this.potableref.current.setPagination(res)
        } catch (error) {
            console.log(error)
        }
    }

    pushTable = (start, end, period) => {
        let dateArray = []
        let stDate = start ? start : this.state.startDate
        let enDate = end ? end : this.state.endDate
        let periodd = period ? period : this.state.filterType
        let startDate = moment(stDate)
        let endDate = moment(enDate)
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
        this.setState({ dateArray: dateArray, pushTableComplete: true })

        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            let availableDate = []
            for (let x = 0; x < data[i].detail.length; x++) {
                availableDate.push(data[i].detail[x].date)
            }
            for (let y = 0; y < dateArray.length; y++) {
                if (!availableDate.includes(dateArray[y])) {
                    let dataFormat = {
                        'date': dateArray[y],
                        'sa_plus': '-',
                        'sa_minus': '-',
                        'recv_weight': '-',
                        'send_weight': '-'
                    }
                    data[i].detail.push(dataFormat)
                }
            }
            //console.log(availableDate);
        }
    }

    pushData = () => {
        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            let availableDate = []
            for (let x = 0; x < data[i].detail.length; x++) {
                availableDate.push(data[i].detail[x].date)
            }
            for (let y = 0; y < this.state.dateArray.length; y++) {
                if (!availableDate.includes(this.state.dateArray[y])) {
                    let dataFormat = {
                        'date': this.state.dateArray[y],
                        'sa_plus': '-',
                        'sa_minus': '-',
                        'recv_weight': '-',
                        'send_weight': '-'
                    }
                    data[i].detail.push(dataFormat)
                }
            }
            //console.log(availableDate);
        }
    }

    sortData = () => {
        let data = this.state.data

        for (let i = 0; i < data.length; i++) {
            let detail = data[i].detail

            detail.sort((a, b) => {
                if (a['date'] !== null && b['date'] !== null) {
                    if (a['date'].toLowerCase() < b['date'].toLowerCase()) return -1
                    if (a['date'].toLowerCase() > b['date'].toLowerCase()) return 1
                    return 0
                }
            })

        }
    }

    formatDate = (date) => {
        let dates = moment(date).format('DD MMMM YYYY')
        if (this.state.complete) {
            if (this.state.filterType === 'day') {
                dates = moment(date).format('DD MMMM YYYY')
            }
            else if (this.state.filterType === 'week') {
                let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                dates = moment(date).format('DD MMMM YYYY')
                dates = dates + ' - ' + dates2
            }
            else if (this.state.filterType === 'month') {
                dates = moment(date).format('MMMM YYYY')
            }
        }
        return dates
    }


    arrowHandler = (e) => {
        let id = e.currentTarget.id
        console.log(id)
        this.setState({ activecolumnsort: id })
        if (this.state.activearrow === mid) {
            this.setState({ activearrow: up })
            this.sortby(id)
        }

        if (this.state.activearrow === up) {
            this.setState({ activearrow: down })
            this.sortby(id)
        }

        if (this.state.activearrow === down) {
            this.setState({ activearrow: up })
            this.sortby(id)
        }
    }

    _checkActiveSorting(header) {
        // console.log(header)
        if (header === this.state.activecolumnsort) {
            if (this.state.activearrow === mid) {
                return up;
            }

            if (this.state.activearrow === up) {
                return down;
            }

            if (this.state.activearrow === down) {
                return up;
            }
        } else {
            return mid;
        }
    }

    sortby = (id) => {
        if (id === 'site') {
            this.setState({ sort: !this.state.sort, sortparameter: 'site' }, () =>
                this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if (id === 'client') {
            this.setState({ sort: !this.state.sort, sortparameter: 'client' }, () =>
                this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if (id === 'product') {
            this.setState({ sort: !this.state.sort, sortparameter: 'product' }, () =>
                this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if (id === 'productName') {
            this.setState({ sort: !this.state.sort, sortparameter: 'product_name' }, () =>
                this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
        else if (id === 'uom') {
            this.setState({ sort: !this.state.sort, sortparameter: 'packdesc' }, () =>
                this.sorting(this.state.data, this.state.sortparameter, this.state.sort))
        }
    }

    sorting = (data, param, sort) => {
        data.sort((a, b) => {
            if (a[param] !== null && b[param] !== null) {
                if (sort === false) {
                    if (a[param].toLowerCase() < b[param].toLowerCase()) return -1
                    if (a[param].toLowerCase() > b[param].toLowerCase()) return 1
                    return 0
                }
                else if (sort === true) {
                    if (a[param].toLowerCase() < b[param].toLowerCase()) return 1
                    if (a[param].toLowerCase() > b[param].toLowerCase()) return -1
                    return 0
                }
            }
        })
        this.setState({ data })
    }

    setSliceValue = (startIndex, endIndex) => {
        this.setState({ startIndex: startIndex, endIndex: endIndex })
    }


    setPagination = (result) => {
        let self = this;
        let respondRes = result;
        let totalPage = 0;
        console.log(result.data)
        if (respondRes.length > self.state.displayPage) {
            totalPage = respondRes % self.state.displayPage;
            if (totalPage > 0 && totalPage < 50) {
                totalPage = parseInt(respondRes.length / self.state.displayPage) + 1;
            } else {
                totalPage = respondRes.length / self.state.displayPage;
            }
            self.setState({ maxPage: totalPage });
        } else {
            self.setState({ maxPage: 1 });
        }

        self.setState({ totalRows: Object.keys(result.data.data).length });
        self.numberEventClick(self.state.currentPage);
        self.changeLastIndex(self.state.currentPage);
    }

    changeStartIndex = (currentPage) => {
        this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage });
    }

    changeLastIndex = (currentPage) => {
        this.setState({ lastIndex: parseInt(currentPage) * this.state.displayPage });
    }

    numberEventClick = (currentPage) => {
        let page = parseInt(currentPage);
        this.setState({ currentPage: page });
        this.changeStartIndex(page);
        this.changeLastIndex(page);
    }

    nextPageClick = () => {
        if (this.state.currentPage < this.state.maxPage) {
            this.setState((prev) => {
                prev.currentPage++;
                this.changeStartIndex(prev.currentPage);
                this.changeLastIndex(prev.currentPage);
            });
        }
        return;
    }

    backPageClick = () => {
        if (this.state.currentPage > 1) {
            this.setState((prev) => {
                prev.currentPage--;
                this.changeStartIndex(prev.currentPage);
                this.changeLastIndex(prev.currentPage);
            });
        }
        return;
    }

    lastPageClick = () => {
        if (this.state.currentPage < this.state.maxPage) {
            let currentPage = parseInt(this.state.maxPage + 1);

            this.setState({ currentPage: currentPage });
            this.changeStartIndex(currentPage);
            this.changeLastIndex(currentPage);
        }
        return;
    }
    firstPageClick = () => {
        if (this.state.currentPage > 1) {
            let currentPage = 1;

            this.setState({ currentPage: currentPage });
            this.changeStartIndex(currentPage);
            this.changeLastIndex(currentPage);
        }
        return;
    }

    headersExport = () => {
        return (
            <div>
                <tr>
                    <th key="1" onClick={(e) => this.arrowHandler(e)} id='site' rowspan="2">Site </th>
                    <th key="2" onClick={(e) => this.arrowHandler(e)} id='client' rowspan="2">Client </th>
                    <th key="3" onClick={(e) => this.arrowHandler(e)} id='product' rowspan="2">Product </th>
                    <th key="4" onClick={(e) => this.arrowHandler(e)} id='productName' rowspan="2">Description</th>
                    <th key="5" onClick={(e) => this.arrowHandler(e)} id='uom' rowspan="2">UOM</th>
                    {/* <td>{this.productHeader()}</td> */}
                    {
                        this.state.dateArray.map(date => {
                            let dates = moment(date).format('DD MMMM YYYY')
                            if (this.state.complete) {
                                if (this.state.filterType == 'day') {
                                    dates = moment(date).format('DD MMMM YYYY')
                                }
                                else if (this.state.filterType == 'week') {
                                    let dates2 = moment(date).add('days', 6).format('DD MMMM YYYY')
                                    dates = moment(date).format('DD MMMM YYYY')
                                    dates = dates + ' - ' + dates2
                                }
                                else if (this.state.filterType == 'month') {
                                    dates = moment(date).format('MMMM YYYY')
                                }
                            }
                            return (
                                <div>
                                    <th colSpan="4" key="6" style={{ textAlign: "center" }}>{dates}</th>

                                </div>
                            )
                        }
                        )
                    }
                </tr>
                <tr>
                    {this.state.dateArray.map((date, idx) => {
                        return (
                            <div style={{ display: 'flex', borderBottom: '1px solid #d5d8da', color: '#3366FF' }}>
                                <th key="6" className='tet' xs='2'>SA+</th>
                                <th key="7" className='tet' xs='2'>SA-</th>
                                <th key="8" className='tet' xs='2'>Rec</th>
                                <th key="9" className='tet' xs='3'>Send</th>
                            </div>
                        )
                    })
                    }
                </tr>
            </div>

        )
    }

    ExportName = () => {
        let filename = ""
        let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let date1 = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            Seconds = date.getSeconds(),
            Minutes = date.getMinutes(),
            Hours = date.getHours();
        return filename = ("Stock_Movement." + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
    }

    ExportPDFName = () => {
        let name = ""
        return name = ("Stock Movement")
    }

    ExportHeader = () => {
        let header = ["Site", "Client", "Product", "Description", "UOM",]
        return header
    }

    ExportData = () => {
        let data = this.state.data.map(elt => [elt.site, elt.client, elt.product, elt.product_name, elt.packdesc, elt.detail.length]);
        return data
    }

    render() {
        if (this.state.pushTableComplete) {
            // this.pushData()
            this.sortData()
        }
        return (
            <div className={this.state.complete ? 'fades' : 'hidden'}>
                <Container className="themed-container conts" fluid={true}>
                    <div className="product-data">
                        <table>
                            <thead>
                                <tr height="72" className="border-bottom border-right text-center">
                                    <th onClick={this.arrowHandler} id='site'>Site <img className='sort-icon' src={this._checkActiveSorting('site')} alt="site" /></th>
                                    <th onClick={this.arrowHandler} id='client'>Client <img className='sort-icon' src={this._checkActiveSorting('client')} alt="client" /></th>
                                    <th onClick={this.arrowHandler} id='product'>Product <img className='sort-icon' src={this._checkActiveSorting('product')} alt="product" /></th>
                                    <th className="text-left" onClick={this.arrowHandler} id='productName'>Description <img className='sort-icon' src={this._checkActiveSorting('productName')} alt="productName" /></th>
                                    <th onClick={this.arrowHandler} id='uom'>UOM <img className='sort-icon' src={this._checkActiveSorting('uom')} alt="uom" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.slice(this.state.startIndex, this.state.endIndex).map((data, index) =>
                                    <tr key={index} height="50"
                                        className={this._checkActiveHover(data.product) + " border-bottom border-right text-center"}
                                        onMouseEnter={(e) => this.hover(e, 'active', data.product)}
                                        onMouseLeave={(e) => this.hover(e, 'deactive', data.product)}
                                    >
                                        <td>{data.site}</td>
                                        <td>{data.client}</td>
                                        <td>{data.product}</td>
                                        <td className="text-left">{data.product_name}</td>
                                        <td>{data.packdesc}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="movement-data">
                        <table>
                            <thead>
                                <tr height="72" className="border-bottom">
                                    {this.state.dateArray.map((date, index) =>
                                        <th key={index} className="movement-header text-center border-right">
                                            <table>
                                                <tr>
                                                    <th colSpan="4">{this.formatDate(date)}</th>
                                                </tr>
                                                <tr>
                                                    <th width="25%">SA+</th>
                                                    <th width="25%">SA-</th>
                                                    <th width="25%">Rec</th>
                                                    <th width="25%">Send</th>
                                                </tr>
                                            </table>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.slice(this.state.startIndex, this.state.endIndex).map((data, index) =>
                                    <tr key={index} height="50"
                                        className={this._checkActiveHover(data.product) + " border-bottom border-top"}
                                        onMouseEnter={(e) => this.hover(e, 'active', data.product)}
                                        onMouseLeave={(e) => this.hover(e, 'deactive', data.product)}
                                    >
                                        {data.detail.map(detail =>
                                            <td height='50' className="border-right">
                                                <table>
                                                    <tr>
                                                        <td width="25%">{detail.sa_plus ? detail.sa_plus : '-'}</td>
                                                        <td width="25%">{detail.sa_minus ? detail.sa_minus : '-'}</td>
                                                        <td width="25%">{detail.recv_weight ? detail.recv_weight : '-'}</td>
                                                        <td width="25%">{detail.send_weight ? detail.send_weight : '-'}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={(this.state.complete ? 'hidden' : 'spinner')} />
                </Container>

                <div className='fixed-bottom paginations'>
                    <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
                        backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                        totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                        currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                        startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                        isActive={this.state.isActive}
                        numberEventClick={this.numberEventClick} />
                    {((this.state.data.length > 0) ? <ExportExcel ExportName={this.ExportName} /> : null)}
                </div>
            </div>
        )
    }
}

export default Movement
