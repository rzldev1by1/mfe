import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import moment from 'moment'


class UserListComponent extends Component{
    constructor(props){
        super(props);
        this.state= {
             headers:this.headers(),
             data: this.rowData(),
             activearrow:mid,
             order:'asc',
             fieldOrder:'userId'
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

    setActiveSort = (element) =>{
      const {id} = element;
      let sort = id.split('-');

      if(sort[1] === 'asc'){
        let elDesc = document.getElementById(`${sort[0]}-desc`);

        if(elDesc.classList.contains('sort-desc-active')){
          elDesc.classList.remove('sort-desc-active');
        }

        if(element.classList.contains('sort-asc-active')){
          element.classList.remove('sort-asc-active');
        }

          element.classList.add('sort-asc-active');

      }else{

        let elAsc = document.getElementById(`${sort[0]}-asc`);

        if(elAsc.classList.contains('sort-asc-active')){
          elAsc.classList.remove('sort-asc-active');
        }

        if(element.classList.contains('sort-desc-active')){
          element.classList.remove('sort-desc-active');
        }

        element.classList.add('sort-desc-active');

      }
    }

    clearSortingActive =()=>{
      const {headers} = this.state;
      headers.forEach((item, i) => {
        if(item !== ''){

          let elDesc = document.getElementById(`${item}-desc`);
          let elAsc = document.getElementById(`${item}-asc`);

          if(elDesc.classList.contains('sort-desc-active')){
            elDesc.classList.remove('sort-desc-active');
          }

          if(elAsc.classList.contains('sort-asc-active')){
            elAsc.classList.remove('sort-asc-active');
          }
        }
      });

    }

    onSortingCLick = (e) => {
        const {id} = e.currentTarget;
        let currentEl = e.currentTarget;
        let paramField = id.split('-');
        let sortBy = paramField[1];
        const {order} = this.state;
        let fieldOrder = this.getSortingField(paramField[0]);
        this.clearSortingActive();
        this.setActiveSort(currentEl)
        this.setState({order:sortBy,fieldOrder:fieldOrder});

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
                <div className="d-flex tablePage">
                    <div className="w-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        this.state.headers.map((element,index)=>{
                                        return <th key={index} className="headers p-0">
                                        <div key={element} className="header-sort" >
                                          <div className="d-inline-flex">
                                              <div className="d-flex flex-row">
                                                {element}
                                              </div>
                                              {
                                                <div className="d-flex flex-column">
                                                <span key={index} id={`${element}-desc`} onClick={(e)=>{this.onSortingCLick(e);}} className={'upArrow float-right'} style={{height:'10px',position:'relative',top:'-7px', marginLeft:'20px'}}></span>
                                                <span key={element} id={`${element}-asc`} onClick={(e)=>{this.onSortingCLick(e);}} className={'downArrow float-right'} style={{height:'10px',position:'relative',top:'-3px', marginLeft:'20px'}}></span>
                                                </div>
                                              }
                                          </div>
                                            {/*(element === '')?'': <img key={element} className="arrow" src={activearrow}/>**/}

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
                                                                  <td key={idx} className={'p-0 '+((item === 'user')?'users':'norm')}>
                                                                   {
                                                                     <label className={((item === 'status')? ((element[item].toLowerCase() === 'active')?'active':'suspended'):'')}>
                                                                      {(item === 'lastaccess')?moment(element[item]).format('DD/MM/YY hh:mm:ss'):element[item]}
                                                                     </label>
                                                                   }
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
