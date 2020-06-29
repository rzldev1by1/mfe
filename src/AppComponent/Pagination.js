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
        this.setState({data:[],totalPage:[]})
       for(let i=1 ; i<= page ; i++)
       {                
                this.setState(prevState => ({
                    data: [...prevState.data, i], dataTable:data
                }))
               this.setState(prevState => ({
                totalPage: [...prevState.totalPage, i]
            }))
       }
       this.goToPages(1)
    }

    goToPages = (e) => {
     
        let index = e
        let startIndex = index
        let endIndex = this.props.rows*startIndex
        startIndex = endIndex-this.props.rows
        if(this.state.activePage <= this.state.totalPage.length)
        {
            this.setState({startIndex:startIndex, endIndex:endIndex,activePage:index})
            
        }
        this.props.sliceValue(startIndex, endIndex)
       
    }

    loadPages = (e) => {
        let index = e
        let startIndex = index
        let endIndex = this.props.rows*startIndex
        startIndex = endIndex-this.props.rows
            let pages = []
            for(let i=index ; i<= index+3 ; i++)
            {
                        pages.push(i)    
            }
            this.setState({activePage:index, data:pages, startIndex:startIndex, endIndex:endIndex})       
    }

    firstPage = () => {
                this.setState({activePage:1})
                this.goToPages(1)
    }

    prevPage = () => {
        if(this.state.activePage >1)
        {
            this.setState({activePage: this.state.activePage-1}, () => {
                this.goToPages(this.state.activePage)
            })

        }
    }

    nextPage = () => {
        if(this.state.activePage < this.state.totalPage.length)
        {
                this.setState({activePage: this.state.activePage+1}, () => { 
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
                    <label onClick={() => this.firstPage()} className={'iconU-firstPage ' + (this.state.activePage == 1 ? 'disabledArrows' : null)}/>
                    <label onClick={() => this.prevPage()}  className={'iconU-leftArrow ' + (this.state.activePage == 1 ? 'disabledArrows' : null)}/>
                    {
                       this.state.data.map(data => 
                            <button onClick={(e) => this.goToPages(data)} id={data} type="button" className={"btn btn-primary " + (this.state.activePage == data ? 'activePagess' : null )}>{data}</button>
                        )
                    }                  
                    <label onClick={() => this.nextPage()} className={'iconU-rightArrow ' + (this.state.activePage == this.state.totalPage.length ? 'disabledArrows' : null)} style={{ fontSize: "16px" }}/>
                    <label onClick={() => this.goToPages(this.state.totalPage[this.state.totalPage.length-1])} className={'iconU-lastPage ' + (this.state.activePage == this.state.totalPage.length ? 'disabledArrows' : null)}/>
                </div>

                <div className='paginationInputPage'>
                    <label id='labelPage'>Go to page</label>
                    <input onChange={(e) => this.setState({activePage:e.currentTarget.value})} id='goToPage' placeholder={this.state.totalPage.length} class="form-control"/>
                    <label id='labelButton'>
                    <label onClick={() => this.goToHandler()} id='labelButton'>Go</label>
                    <label className='iconU-rightArrow' style={{ fontSize: "16px" }}/>
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