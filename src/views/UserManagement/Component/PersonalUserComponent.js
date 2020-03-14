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
                                this.props.headers.map((element,index)=>{
                                return  <div className="col-3 headers" key={index}>
                                            <label>{element}</label>
                                        </div>

                                })
                            }
                        </div>

                        {
                            this.props.data.map((element,index)=>{
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

                </div>
             )
    }
}

export default UserListComponent;
