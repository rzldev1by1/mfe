import React from 'react';
import { Button } from 'reactstrap';

const Search = (props) => {
    return ( 
        <div className="input-group searchSection">
            <div className=" search-column col-10 pl-0 " >
                <div className="input-group searchBox default-box-height">
                    <span className="input-group-text border-0 bg-transparent ml-2" style={{ padding:"0.4rem" }}>
                        {/* <i className="fa fa-search fa-2x iconSpace" /> */}
                        <i className="iconU-search" />
                    </span>
                    <input type="text" style={{ fontFamily: "Helvetica Neue Regular", backgroundColor:"transparent" }} className="form-control searchInput" id="searchInput" name="searchInput" placeholder={props.placeholder} onChange={(e) => props.getValue(e.target.value)} />
                </div>
            </div> 
            <div className="ml-0 search-column col-2" >  
            <div className="row">
                <div className="search-column col-sm-3 pl-0" >
                    <Button className={"filter default-box-height " + (props.showFilter ? " active" : "")} onClick={props.triggerShowFilter}>
                        <i className="iconU-filter" />
                    </Button>    
                </div> 
                <div className="search-column col-sm-9  pr-0">
                    <Button type="submit" className="default-box-height search" onClick={props.searchData}>
                        Search
                    </Button>
                </div>
            </div>    
                    
            </div>
            
        </div>
    );
}

export default Search;
