import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'


class SalesOrder extends Component{
  constructor(props) {
      super(props);
      this.state = {
          listOrder:{
            headers:["Site","Client","Order No", "Customer", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],
            data:[
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1213","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1214","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1215","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1216","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},

            ],
          }
      }
  }



  componentDidMount(){

  }

  render(){
    return(<div>
        <div className="mt-3 pl-1" style={{fontSize:'1.75rem'}}>
            Sales Orders
        </div>
        <FilterComponent />
        <ListOrderComponent listOrder={this.state.listOrder}/>
    </div>)
  }
}

export default SalesOrder;
