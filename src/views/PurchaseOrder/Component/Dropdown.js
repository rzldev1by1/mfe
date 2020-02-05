import React, {Component} from 'react'
class Dropdown extends Component {
    constructor(props){
        super(props)

        this.state = {
            text:null,
            value:null,
            expand:false,
            autoList:[]
        }
    }

    selectedName = (e) => {

        if(this.props.dataParam)
        {
            let value = Object.keys(this.props.dataParam[0])[0]
            let text  = Object.keys(this.props.dataParam[0])[1]

            this.setState({
            value: this.props.dataParam.map((data) => {return data.name}).indexOf(e.target.textContent)}, 
            () => this.setState({expand:false,value:this.props.dataParam[this.state.value].code}, () => this.props.selectedName(this.state.value)))
        }
        


      }
  
      getName = (e) => {
        if(e.target.value)
        {
            
            var array = this.props.dataParam.map(data => {return data.name})
            this.setState({expand:true, autoList:
                array.filter(val => val.toLowerCase().includes(e.target.value))
            })
        }
        else
        {
            this.setState({autoList:[]})
            this.setState({expand:false})
            }
      }

    render(){
        return(
            <div style={{marginRight:10}}>
                <input placeholder='Client' className='form-control' onChange={(e) => this.getName(e)}/>
            <div className={'itemList ' + (this.state.expand ? null : 'hidden')}>
            {
                this.state.autoList.map(data => <div className='tes dropdown-item' onClick={(e) => this.selectedName(e)}>{data}</div>)
            } 
            </div>
            </div>
        )
    }
}

export default Dropdown