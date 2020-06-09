import React, { Component } from 'react'
import '../StockMovement.css'


export default class DropdownPeriod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            periodSelected: null,
            periodText: null,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escHandler, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escHandler, false);
    }

    escHandler = (e) => {
        if (e.keyCode === 27) {
            //Do whatever when esc is pressed            
            if (this.state.isShow) {
                document.removeEventListener('click', this.outsideHandler, false);
                this.setState((prev) => {
                    return { isShow: !prev.isShow }
                });
            }
        }
    }

    dropdownExpand = () => {

        // attach/remove event handler
        if (!this.state.isShow) {
            document.addEventListener('click', this.outsideHandler, false);
        }

        this.setState((prev) => {
            return { isShow: !prev.isShow }
        });

    }

    outsideHandler = (e) => {

        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        document.removeEventListener('click', this.outsideHandler, false);
        this.setState({ isShow: false })
    }


    periodHandler = (e) => {

        this.setState({
            periodSelected: e.target.id,
            periodText: e.target.textContent,
            isShow: false
        }, () => {
            this.props.periodHandler({ periodSelected: this.state.periodSelected, periodText: this.state.periodText });
        });
    }



    render() {
        return (
            <div className='dropdown' ref={node=> {this.node = node}} >
                <div className='displayButtonToggle'>
                    <button style={{ color: '#7c878c' }} onClick={() => this.dropdownExpand()} className='btn dropdown-button ddlMovement default-box-height' data-toggle='dropdown'>
                        {this.state.periodSelected ? this.state.periodText : 'Display Period'}
                    </button>
                    <div className='dropdown-toggle' />
                </div>
                <div className={'dropdown-menu ' + (this.state.isShow ? 'show' : null)}>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHandler(e)} className='dropdown-item' id='day'>Daily</div>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHandler(e)} className='dropdown-item' id='week'>Weekly</div>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHandler(e)} className='dropdown-item' id='month'>Monthly</div>
                </div>
            </div>
        );
    }
}
