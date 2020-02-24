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
        page = Math.floor(page)
       for(let i=1 ; i<= page ; i++)
       {
           if(i <=3)
           {
                this.setState(prevState => ({
                    data: [...prevState.data, i], dataTable:data
                }))
           }
               this.setState(prevState => ({
                totalPage: [...prevState.totalPage, i]
            }))
       }
    }

    goToPages = (e) => {
        let index = e
        let startIndex = index
        let endIndex = this.props.rows*startIndex
        startIndex = endIndex-this.props.rows
        if(index <= this.state.totalPage.length)
        {
            let pages = []
            for(let i=index ; i<= index+3 ; i++)
            {
                    if(pages.length <= 2 && i <= this.state.totalPage.length)
                    {
                        pages.push(i)
                    }           
            }
            this.setState({activePage:index, data:pages, startIndex:startIndex, endIndex:endIndex})
        }
        if(this.state.activePage <= this.state.totalPage.length)
        {
            this.setState({startIndex:startIndex, endIndex:endIndex})
            this.props.sliceValue(startIndex, endIndex)
        }
       
       
    }

    firstPage = () => {
                let page = []
                for(let i = 1; i<= 3; i++)
                {
                    if(page.length <=2)
                    {
                        page.push(i)
                    }
                }
                this.setState({data:page, activePage:1})
                this.goToPages(1)
    }

    prevPage = () => {
        if(this.state.activePage >1)
        {
            this.setState({activePage: this.state.activePage-1}, () => {
                let page = []
                for(let i = this.state.activePage-3; i<= this.state.activePage; i++)
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
        if(this.state.activePage <= this.state.totalPage[this.state.totalPage.length-1])
        {
                this.setState({activePage: this.state.activePage+1}, () => {                
                    if(this.state.activePage+2 <= this.state.totalPage.length)
                    {
                        let page = []
                        for(let i = this.state.activePage; i<= this.state.totalPage.length-1; i++)
                        {
                            if(page.length <=2)
                            {
                                page.push(i)
                            }
                        }
                        this.setState({data:page})
                    }
                    this.goToPages(this.state.activePage)
                })
        }
    }

    goToHandler = () => {
        let val = this.state.activePage
        if(this.state.activePage && this.state.activePage <= this.state.totalPage.length)
        {
            this.setState({activePage:val})
            this.goToPages(val)
        }
        else
        {
            alert('maximum pages '+ this.state.totalPage.length)    
            let el = document.getElementById('goToPage')
            el.value = null
            el.focus()
        }
    }
    render(){
        return(
            <div className='bdPagination'>
                <div className='paginationLine'>                    
                    <label onClick={() => this.firstPage()}>First</label>
                    <label onClick={() => this.prevPage()} className='iconU-leftArrow'/>
                    {
                       this.state.data.map(data => 
                            <button onClick={(e) => this.goToPages(data)} id={data} type="button" className={"btn btn-primary " + (this.state.activePage == data ? 'activePagess' : null )}>{data}</button>
                        )
                    }                  
                    <label onClick={() => this.nextPage()} className='iconU-rightArrow'/>
                    <label onClick={() => this.goToPages(this.state.totalPage[this.state.totalPage.length-1])}>Last</label>
                </div>

                <div className='paginationInputPage'>
                    <label id='labelPage'>Go to page</label>
                    <input onChange={(e) => this.setState({activePage:e.currentTarget.value})} id='goToPage' placeholder={this.state.totalPage.length} class="form-control"/>
                    <label onClick={() => this.goToHandler()} id='labelButton'>Go
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