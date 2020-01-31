import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

class UserListComponent extends Component{
    constructor(props){
        super(props);
        this.state= {
             headers:this.headers(),
             data: this.rowData()
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

    render(){



        return(
                <div className="d-flex">
                    <table className="table">
                        <thead>
                            <tr>
                                {
                                    this.state.headers.map((element,index)=>{
                                    return <th key={index} className='headers'>
                                            <div className='d-flex flex-row'>
                                                <label className="mt-1 mb-0">{element}</label>
                                               {
                                                   (element === '')?'': (<div className="d-flex flex-column ml-2">
                                                                                    <span className="upArrow" style={{height:'10px'}}></span>
                                                                                    <span className="downArrow" style={{height:'10px'}}></span>
                                                                                </div>)
                                               }


                                            </div>
                                        </th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                               {
                                   this.state.data.map((element,index)=>{
                                       return <tr key={index} onClick={(e)=>{ this.onRowClick(e,element.userid);}}>
                                                {
                                                   Object.keys(element).map((item,idx) => {
                                                      return (item !== 'email')?
                                                              <td key={idx} className={(item === 'user')?'users':'norm'}>
                                                               { (item === 'action')?
                                                               <span className='next'></span>:
                                                               <label className={((item === 'status')? ((element[item].toLowerCase() === 'active')?'active':'suspended'):'')}>{element[item]}</label> }
                                                               </td>:""
                                                   })
                                                }
                                       </tr>
                                   })
                               }


                        </tbody>
                    </table>
                </div>
             )
    }
}

export default UserListComponent;
