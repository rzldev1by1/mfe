import React from 'react'
import moment from 'moment'

const OrderLineReview = (props) => {
     const {
          number,
          productVal,
          product,
          qty,
          weight,
          uom,
          rotaDate,
          batch,
          ref3,
          ref4,
          dispositionVal,
          disposition,
          packId,
     } = props.parameters
     return (
          <div style={{ marginBottom: '1%' }}>
               <div className="line">
                    <table className=''>
                         <tr>
                              <td>
                                   <div id='orderline-header-number-id'>
                                        <input className="form-control put "
                                             id='rowNumber'
                                             readOnly
                                             value={number} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-product-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={productVal} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-description-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={product} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-qty-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={qty} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-weight-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={weight} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-uom-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={uom} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-rotadate-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={moment(rotaDate).format('DD/MM/YYYY')} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-batch-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={batch} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-ref3-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={ref3} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-ref4-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={ref4} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-disposition-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={disposition} />
                                   </div>
                              </td>

                              <td>
                                   <div id='orderline-header-rotadate-id'>
                                        <input className="form-control put "
                                             readOnly
                                             value={packId} />
                                   </div>
                              </td>
                         </tr>
                    </table>
               </div>
          </div>)
}

export default OrderLineReview