import React, {Component} from 'react'
class Dropdown extends Component {
    constructor(props){
        super(props)

        this.state = {
            option:false,
            dropdownexpand:false,
            selected:this.props.data.menu,
            id:this.props.data.menu
        }
    }

    selectedhandler = (props) => {
        this.setState({selected:props.target.textContent})
        
        let id = this.state.id
        let value = props.target.textContent
        this.props.selectedHandler(id, value)        
    }

    dropdownexpandhandler = () => {
        this.setState({
            dropdownexpand: !this.state.dropdownexpand
        })
    }

    option = (data) => {
            return (
                <div>
                    <div className='option' onClick={(e) => this.selectedhandler(e)}><label className='optionchild'>{data}</label></div>
                </div>
            )
    }

    render(){
        return(
            <div style={{width:'80%'}}>
                <div className='dropdown' onClick={() => this.dropdownexpandhandler()}>
                    <label id='selected' className='selected'>{this.state.selected}</label> <label className='iconU-downArrow'/>   
                    {this.props.data.subMenu.map( data => 
                       this.state.dropdownexpand ? this.option(data) : null
                    )}
                </div>
            </div>
        )
    }
}

export default Dropdown