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

    render(){
        return(
                <div>

                <Card className="border-account-info">
                    <CardBody className="account-info">
                        <div className="row">
                            { 
                                this.state.headers.map((element,index)=>{
                                return  <div className="col-3 headers" key={index}>
                                            <label>{element}</label>
                                        </div>

                                })                                    
                            }
                        </div>
                        
                        {
                            this.state.data.map((element,index)=>{
                                return <div className="row" key={index}>
                                        {
                                            Object.keys(element).map((item,idx) => {
                                                return <div className="col-3 users" key={idx}>
                                                            <label>{element[item]}</label>
                                                        </div> 
                                            })
                                        }
                                </div>
                            })
                            
                        }
                                   
                    </CardBody>
                </Card>

                         
                   
                    {/* <div className="d-flex flex-column">
                        <div className="d-flex">
                            { 
                                this.state.headers.map((element,index)=>{
                                return  <div className="p-3" key={index}>
                                            <label>{element}</label>
                                        </div>

                                })                                    
                            }
                        </div>
                        <div className="d-flex">
                            {
                                this.state.data.map((element,index)=>{
                                    return <div className="p-3" key={index}>
                                            {
                                                Object.keys(element).map((item,idx) => {
                                                    return <label>{element[item]}</label> 
                                                })
                                            }
                                    </div>
                                })
                                
                            }
                        </div>
                    </div> */}
                    
                   
                    {/* <table className="table">
                        <thead>
                            <tr>
                                { 
                                    this.state.headers.map((element,index)=>{
                                    return <th key={index} className='headers'>
                                            
                                                <label className="mt-1 mb-0">{element}</label>  
                                            
                                        </th>
                                    })                                    
                                }
                            </tr>
                        </thead>
                        <tbody>
                               {
                                   this.state.data.map((element,index)=>{
                                       return <tr key={index}>
                                                {
                                                   Object.keys(element).map((item,idx) => {
                                                       return <td key={idx} className={(item === 'user')?'users':'norm'}>
                                                            { (item === 'action')?<span className='next'></span>: <label className={((item === 'status')? ((element[item].toLowerCase() === 'active')?'active':'suspended'):'')}>{element[item]}</label> }
                                                       </td>
                                                   })
                                                }
                                       </tr>
                                   })
                               }
                            
                            
                        </tbody>
                    </table> */}
                </div>
             )
    }
}

export default UserListComponent;