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
      //bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch', 'Rotadate', 'Ref3', 'Ref4', 'Disposition', 'Pack ID'],
      // bodyheader: ['Line No', 'Product', 'Description', 'Qty', 'Qty Processed', 'Weight', 'Weight Processed', 'Completed', 'OOS', 'Batch'],
      tableheader: [
        { 
          id: "line",
          tableHeaderText: "Line No", 
          checkboxLabelText: "Line No", 
          isVisible: true,  
        },
        { 
          id: "product",
          tableHeaderText: "Product", 
          checkboxLabelText: "Product", 
          isVisible: true,  
        },
        { 
          id: "product_description",
          tableHeaderText: "Description", 
          checkboxLabelText: "Description", 
          isVisible: true,  
        },
        { 
          id: "qty",
          tableHeaderText: "Qty", 
          checkboxLabelText: "Qty", 
          isVisible: true,  
        },
        { 
          id: "qty_processed",
          tableHeaderText: "Qty Processed", 
          checkboxLabelText: "Qty Processed", 
          isVisible: true,  
        },
        { 
          id: "weight",
          tableHeaderText: "Weight", 
          checkboxLabelText: "Weight", 
          isVisible: true,  
        },
        { 
          id: "weight_processed",
          tableHeaderText: "Weight Processed", 
          checkboxLabelText: "Weight Processed", 
          isVisible: true,  
        },
        { 
          id: "completed",
          tableHeaderText: "Completed", 
          checkboxLabelText: "Completed", 
          isVisible: true,  
        },
        { 
          id: "oos",
          tableHeaderText: "OOS", 
          checkboxLabelText: "OOS", 
          isVisible: true,  
        },
        { 
          id: "batch",
          tableHeaderText: "Batch", 
          checkboxLabelText: "Batch", 
          isVisible: true,  
        },
        { 
          id: "ref2",
          tableHeaderText: "Rotadate", 
          checkboxLabelText: "Rotadate", 
          isVisible: true,  
        },
        { 
          id: "ref3",
          tableHeaderText: "Ref3", 
          checkboxLabelText: "Ref3", 
          isVisible: true,  
        },
        { 
          id: "ref4",
          tableHeaderText: "Ref4", 
          checkboxLabelText: "Ref4", 
          isVisible: true,  
        },
        { 
          id: "disposition",
          tableHeaderText: "Disposition", 
          checkboxLabelText: "Disposition", 
          isVisible: true,  
        },
        { 
          id: "pack_id",
          tableHeaderText: "Pack ID", 
          checkboxLabelText: "Pack ID", 
          isVisible: true,  
        },
      ],
      activearrow: mid,
      sortparameter: 'order_no',
      checkboxLabelText: 'order_no',
      sort: true

    }
  }

  componentDidMount(){
    this.props.getTableHeader(this.state.tableheader)
  }

  render() {
    return (
      <div>
        <table className="potable" width='100%'>
          <thead>
            <tr>
              {this.state.tableheader.map((data,idx) =>{
                if(data.isVisible){
                    return (
                      <th height='50' key={data.tableHeaderText} id={data.tableHeaderText}>{data.tableHeaderText} </th>
                    )
                } 
              })
              
              }
              
              <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
            </tr>
          </thead>
          <tbody>
            {this.props.head.map((data, i) =>
              <tr>
                {this.state.tableheader.map((column, columnIdx) => {
                  if(column.isVisible){ 
                      if(column.id === "line_no"){
                          return <td key={columnIdx}><label style={{ marginLeft: '20px' }}>{i + 1}</label></td>
                      }

                      if(column.id === "completed"){
                        return <td height='40'> {data.completed ? <img style={{ width: '15px', height: '13px' }} src={data.completed == "Y" ? ok : invalid} /> : '-'}</td>
                      }

                      return <td height='40'>{data[column.id] ? data[column.id] : '-'}</td>
                    }
                       
                  })
                }         
              </tr>
            )}

          </tbody>
        </table>
      </div>
    )
  }
}

export default SODTable


