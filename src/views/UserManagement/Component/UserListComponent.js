import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'



class UserListComponent extends Component{
    constructor(props){
        super(props);
        this.state= {
             headers:this.headers(),
             data: this.rowData(),
             activearrow:mid,
             order:'desc',
             fieldOrder:'web_user'
        }
    }

    headers = () => {
        return ["column1","column2","column3", "column4"];
    }

    rowData = () => {

        const defaultData = [
            {column1:"value1",column2:"value2",column3:"value3",column4:"value4"},
            {column1:"value1",column2:"value2",column3:"value3",column4:"value4"},
            {column1:"value1",column2:"value2",column3:"value3",column4:"value4"},
            {column1:"value1",column2:"value2",column3:"value3",column4:"value4"}
        ]

        return defaultData;
    }

    componentDidMount(){
        const {headers, data} = this.props;
        if(headers){
            if(data){
                this.setState({headers:headers,data:data})
            }
        }
    }

    displayCellRow = (cellData) => {
        let result = 'norm';
        switch(cellData.toLowerCase()){
            case 'active':
                result = 'active';
                break;
            case 'user':
                result = 'users';
                break;
            case 'suspended':
                result = 'suspended';
                break;
            default:
                result = 'norm'
                break;
        }

        return result;
    }

    onRowClick = (e,id) => {
        const {match, history} = this.props.route;
        history.push(`${match.url}/${encodeURIComponent(id)}/detail`);
    }

    getSortingField = (param) => {
      let result = "";
      switch (param) {
        case "User":
            result = "user";
            break;
        case "User ID":
            result = "userId";
            break;
        case "User Level":
            result = "web_group";
            break;
        case "Client":
            result = "client";
            break;


        default:
          result="web_user"
          break;
      }
      return result;
    }

    onSortingCLick = (e) => {
        const {id} = e.currentTarget;
        const {order} = this.state;
        let fieldOrder = this.getSortingField(id);

        if(order === 'desc'){
          this.setState({order:'asc',fieldOrder:fieldOrder, activearrow:up});
        }else{
          this.setState({order:'desc',fieldOrder:fieldOrder, activearrow:down});
        }

    }

    sorting = (a,b,key,orderBy)=> {
      if(orderBy === "desc"){
        return this.sortingDescending(a,b,key);
      }else{
        return this.sortingAscending(a,b,key);
      }
    }

    sortingAscending = (a,b,key) => {
      return ((a[key] < b[key])?-1:((a[key] > b[key])?1:0));
    }

    sortingDescending = (a,b,key) => {
      return ((a[key] < b[key])? 1:((a[key] > b[key])?-1:0));
    }

    render(){
        const {activearrow,order,fieldOrder} = this.state;
        return(
                <div className="d-flex">
                    <div className="w-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        this.state.headers.map((element,index)=>{
                                        return <th key={index} className="headers">
                                        <div key={element} id={element} onClick={(e)=>{this.onSortingCLick(e);}} className="header-sort" >
                                            {element}
                                            {(element === '')?'': <img key={element} className="arrow" src={activearrow}/>}
                                        </div>


                                            </th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                   {
                                       this.props.data.slice(this.props.startIndex,this.props.lastIndex).sort((a,b)=> this.sorting(a,b,fieldOrder,order)).map((element,index)=>{

                                           return <tr key={index} onClick={(e)=>{ this.onRowClick(e,element.web_user);}}>
                                                    {
                                                       Object.keys(element).map((item,idx) => {
                                                          return (item !== 'email' && item !== 'web_user' && item !== 'company')?
                                                                  <td key={idx} className={(item === 'user')?'users':'norm'}>
                                                                   { (item === 'action')?
                                                                   <span className='next'></span>:
                                                                   <label className={((item === 'status')? ((element[item].toLowerCase() === 'active')?'active':'suspended'):'')}>{element[item]}</label> }
                                                                   </td>:null
                                                       })
                                                    }
                                           </tr>
                                       })
                                   }


                            </tbody>
                        </table>
                    </div>

                </div>
             )
    }
}

export default UserListComponent;
