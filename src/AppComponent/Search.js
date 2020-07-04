import React from 'react';
import { Button } from 'reactstrap';

const Search = (props) => {
    return (
        <div className="input-group searchSection">
            <div className="search-column" >
                <div className="input-group searchBox default-box-height">
                    <span className="input-group-text border-0 bg-transparent ml-2" style={{ padding: "0.4rem" }}>
                        <i className="iconU-search" />
                    </span>
                    <input type="text" style={{ fontFamily: "Helvetica Neue Regular", backgroundColor: "transparent" }} className="form-control searchInput border-0" id="searchInput" name="searchInput" placeholder={props.placeholder} onChange={(e) => props.getValue(e.target.value)} />
                </div>
            </div>
            <div className='search-column-right'>
                {props.additionalComponent}
                {/* <Button className={"filter default-box-height " + (props.showFilter ? " active" : "")} onClick={props.resetDropdown}>
                    <i className="iconU-filter" />
                </Button> */}
                <Button type="submit" className="default-box-height search" onClick={props.searchData} style={{ marginLeft: '15px' }}>
                    Search
                </Button>
            </div>
        </div>
    );
}

export default Search;
