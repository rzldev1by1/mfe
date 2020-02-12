import React from 'react';
import { Button } from 'reactstrap';

const Search = (props) => {
    return (
        <div className="input-group searchSection">
            <div className="input-group searchBox">
                <span className="input-group-text border-0 bg-white ml-2">
                    {/* <i className="fa fa-search fa-2x iconSpace" /> */}
                    <i className="iconU-search" />
                </span>
                <input type="text" className="form-control searchInput" id="searchInput" name="searchInput" placeholder={props.placeholder} />
            </div>
            <Button className={"filter" + (props.showFilter ? " active" : "")} onClick={props.triggerShowFilter}>
                <i className="iconU-filter" />
            </Button>
            <Button type="submit" className="search" onClick={props.searchData}>
                <strong>Search</strong>
            </Button>
        </div>
    );
}

export default Search;