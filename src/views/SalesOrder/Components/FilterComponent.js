import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'

const FilterComponent = () => {

  return (<Card className="mt-3">
      <CardBody>
      <div className='row'>
          <div className='col-xl-10 col-md-8 inputgroup'>
              <label className='iconU-search isearch'/>
              <input onChange={(e) => this.onchangesearch(e) } type='text' className='searchinput' placeholder='Enter a Order No or Description'/>
          </div>
          <div className="col-xl-2 col-md-4">
            <Button color="primary" className={'iconU-filter iconU-filters '}/>
            <Button color="primary" className='btnsearch float-right'><label className='font'>Search</label></Button>
          </div>

      </div>
      </CardBody>
  </Card>)
}

export default FilterComponent;
