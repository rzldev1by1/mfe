import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios';
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint'
import moment from 'moment';
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import DummyData from './Movement.json'


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

            //pagonation
            startIndex: 0,
            endIndex: 3,
            hover_stat: null,
            i: 1
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
            this.setState({ data: result, complete: true, filterType: periods })
            this.props.data(result)
            this.pushTable(dtStart, dtEnd, periods)
            this.props.isComplete(true)
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
        this.setState({ data: data })
    }

    setSliceValue = (startIndex, endIndex) => {
        this.setState({ startIndex: startIndex, endIndex: endIndex })
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
                                    <th onClick={this.arrowHandler} id='site'>Site <img className='arrowss' src={this._checkActiveSorting('site')} alt="site" /></th>
                                    <th onClick={this.arrowHandler} id='client'>Client <img className='arrowss' src={this._checkActiveSorting('client')} alt="client" /></th>
                                    <th onClick={this.arrowHandler} id='product'>Product <img className='arrowss' src={this._checkActiveSorting('product')} alt="product" /></th>
                                    <th className="text-left" onClick={this.arrowHandler} id='productName'>Description <img className='arrowss' src={this._checkActiveSorting('productName')} alt="productName" /></th>
                                    <th onClick={this.arrowHandler} id='uom'>UOM <img className='arrowss' src={this._checkActiveSorting('uom')} alt="uom" /></th>
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
            </div>
        )
    }
}

export default Movement
