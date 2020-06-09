import React, {Component} from 'react'
import axios from 'axios'
import {endpoint, headers} from 'shared/ConfigEndpoint'
export default class DropdownSite extends Component {
    constructor(props){
        super(props)

        this.state = {
            sitedata:[],
            site:null,
            siteSelected:'Site',
            siteExpand:false,
        }
    }

    componentDidMount() {
        this.getsite()
      }

    getsite = () => {
        axios.get(endpoint.ddlsite, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ sitedata:result })
          })
          .catch(error => {
            
          })
      }

    //site
    selectedSite = (e) => {
      this.setState({siteSelected:e.target.textContent}, () =>{
          this.props.siteValue(this.state.site)
      })
      this.setState({site:e.target.id})
      this.setState({siteExpand: false})
    }

    expandSite = () => {
      this.setState({
        siteExpand: !this.state.siteExpand,     
      })
    }
    render(){        
        return(
            <div style={{display:'flex', width:'100%'}}> 
                <div class="dropdown dd"style={{width:'55%'}}>
                  <button onClick={() => this.expandSite()} type="button" className="btn dropdown-button dropdown-toggle po" data-toggle="dropdown">
                  {this.state.siteSelected}
                  </button>
                  <div class={"dropdown-menu " + (this.state.siteExpand ? "show" : null)}>
                  {
                      this.state.sitedata.map(
                          data => <div onClick={(e) => this.selectedSite(e)} class="dropdown-item" id={data.site}>{data.site}</div>
                      )
                  }
                  </div>
                </div>
            </div>
        )
    }

}