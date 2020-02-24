import React, {Component} from 'react'
import './Pagination.css'

export default class Pagination extends Component {
    constructor(props){
        super(props)

        this.state= {
            data:[],
            dataTable:[],
            startIndex:0,
            endIndex:3,
            activePage:1,
            totalPage:[],
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
               data: [...prevState.data, i], dataTable:data, totalPage: [...prevState.totalPage, i]
           }))
       }
    }

    goToPages = (e) => {
        let index = e
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
       this.setState({activePage:index, data:pages, startIndex:startIndex, endIndex:endIndex})
        this.props.sliceValue(startIndex, endIndex)
    }

    prevPage = () => {
        if(this.state.activePage >1)
        {
            this.setState({activePage: this.state.activePage-1}, () => {
                let page = []
                for(let i = this.state.activePage; i<= this.state.activePage+3; i++)
                {
                    if(page.length <=2)
                    {
                        page.push(i)
                    }
                }
                this.goToPages(this.state.activePage)
            })

        }
    }

    nextPage = () => {
        if(this.state.activePage <= this.state.data[2])
        {
            this.setState({activePage: this.state.activePage+1}, () => {
                let page = []
                for(let i = this.state.activePage; i<= this.state.totalPage.length; i++)
                {
                    if(page.length <=2)
                    {
                        page.push(i)
                    }
                }
                this.goToPages(this.state.activePage)
            })
        }
    }
    render(){
        return(
            <div className='bdPagination'>
                <div className='paginationLine'>                    
                    <label/>
                    <label onClick={() => this.prevPage()} className='iconU-leftArrow'/>
                    {
                       this.state.data.map(data => 
                            <button onClick={(e) => this.goToPages(data)} type="button" class="btn btn-primary">{data}</button>
                        )
                    }                  
                    <label onClick={() => this.nextPage()} className='iconU-rightArrow'/>
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
                <label> {this.state.startIndex+1} to {this.state.endIndex < this.state.dataTable.length ? this.state.endIndex : this.state.dataTable.length} of {this.state.dataTable.length} </label>
                    {' entries '} 
                </div>
            </div>
        )
    }
}