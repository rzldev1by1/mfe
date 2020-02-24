import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'

const FilterComponent = () => {

  return (<Card className="mt-3">
      <CardBody>
      <div className='row'>
          <div className='col-xl-10 col-md-9 inputgroup'>
              <label className='iconU-search isearch'/>
              <input onChange={(e) => this.onchangesearch(e) } type='text' className='searchinput' placeholder='Enter a site, order no. or client'/>
          </div>
          <div className="col-xl-2 col-md-3">
            <div className="d-flex justify-content-between">
              <Button color="primary" className={'iconU-filter iconU-filters '}/>
              <button className='btn btn-primary'>Search</button>              
            </div>
          </div>

      </div>
      </CardBody>
  </Card>)
}

export default FilterComponent;
