import React, {Component} from 'react'
import './Pagination.css'

export default class Pagination extends Component {
    constructor(props){
        super(props)

        this.state= {
            data:[],
            dataTable:[]
        }
    }

    getData = (data) => {
       let page = data.length / this.props.rows
        if(!Number.isInteger(page))
        {
            page = page+1
        }
       for(let i=1 ; i<= 3 ; i++)
       {
           this.setState(prevState => ({
               data: [...prevState.data, i], dataTable:data
           }))
       }
    }

    goToIndex = (e) => {
        let index = e.currentTarget.textContent
        let startIndex = index
        let endIndex = this.props.rows*startIndex
        startIndex = endIndex-this.props.rows
        
        let pages = []
        for(let i=index ; i<= index+3 ; i++)
       {
           if(pages.length <= 2)
           {
            pages.push(i)
           }
       }
       this.setState({data:pages})

        this.props.sliceValue(startIndex, endIndex)
    }
    render(){
        return(
            <div className='bdPagination'>
                <div className='paginationLine'>                    
                    <label/>
                    <label className='iconU-leftArrow'/>
                    {
                       this.state.data.map(data => 
                            <button onClick={(e) => this.goToIndex(e)} type="button" class="btn btn-primary">{data}</button>
                        )
                    }                  
                    <label className='iconU-rightArrow'/>
                    <label/>
                </div>

                <div className='paginationInputPage'>
                    <label id='labelPage'>Go to page</label>
                    <input class="form-control"/>
                    <label id='labelButton'>Go
                        <label className='iconU-rightArrows'/>
                    </label>
                </div>

                <div className='paginationResult'>
                    {'Showing '} 
                <label> 1 to 50 of {this.state.dataTable.length} </label>
                    {' entries '} 
                </div>
            </div>
        )
    }
}