import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
const FilterComponent = () => {

  return (<Card className="mt-3">
      <CardBody>
      <div className='rows'>
          <div className='xl-search col-md-8 inputgroups'>
              <label className='iconU-search search'/>
              <input type='text' className='searchinput' placeholder='Enter a Order No or Description'/>
          </div>
          <div className="xl col-md-4">
            <Button color="primary" className='iconU-filter iconU-filters '/>
            <Button color="primary" className='buttonsearch float-right'><label className='font'>Search</label></Button>
          </div>
      </div>
      </CardBody>
  </Card>)
}

export default FilterComponent;
