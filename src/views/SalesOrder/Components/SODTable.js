import React, { Component } from 'react'
import mid from '../../../../src/assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import ok from '../../../assets/img/brand/ok.png'
import invalid from '../../../assets/img/brand/invalid.png'

class SODTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.head,

      // commented based task to do FE that only show 10 field default "10 fields show as default, put the rest on edit columns" 
      // bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch', 'Rotadate', 'Ref3', 'Ref4', 'Disposition', 'Pack ID'],
      bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch'],
      activearrow: mid,
      sortparameter: 'order_no',
      sort: true

    }
  }

  render() {
    console.log(this.props.head)
    return (
      <div>
        <table className="potable" width='100%'>
          <thead>
            <tr>
              {this.state.bodyheader.map(header =>
                <th height='50' key={header} id={header}>{header} </th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.head.map((data, i) =>
              <tr>
                <td height='40'><label style={{ marginLeft: '20px' }}>{i + 1}</label></td>
                <td height='40'>{data.product ? data.product : '-'}</td>
                <td height='40'>{data.product_description ? data.product_description : '-'}</td>
                <td height='40'>{data.qty ? data.qty : '-'}</td>
                <td height='40'>{data.qty_processed ? data.qty_processed : '-'}</td>
                <td height='40'>{data.weight ? data.weight : '-'}</td>
                <td height='40'>{data.wgt_processed ? data.wgt_processed : '-'}</td>
                <td height='40'> {data.completed ? <img style={{ width: '15px', height: '13px' }} src={data.completed == "Y" ? ok : invalid} /> : '-'}</td>
                <td height='40'>{data.qty_oos ? data.qty_oos : '-'}</td>
                <td height='40'>{data.batch ? data.batch : '-'}</td>
                {/* <td height='40'>{data.rota1 ? data.rota1 : '-'}</td>
                <td height='40'>{data.ref3 ? data.ref3 : '-'}</td>
                <td height='40'>{data.ref4 ? data.ref4 : '-'}</td>
                <td height='40'>{data.disposition ? data.disposition : '-'}</td>
                <td height='40'>{data.packid ? data.packid : '-'}</td> */}
              </tr>
            )}

          </tbody>
        </table>
      </div>
    )
  }
}

export default SODTable


