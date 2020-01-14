import React, { Component } from 'react';
import './StyleSheet/StockMovementFilter.css';

class StockMovementFilter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: ''
      }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group row mb-0">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
                                <Row className="align-items-center mb-0">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
                                        <FormGroup>
                                            <InputGroup>
                                                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <Card className="form-group row rounded-175 filter-bar" style={{paddingLeft: '6px'}}>
                                                        
                                                        <div className="input-group p-2">
                                                            <div className="input-group-prepend bg-white col-9">
                                                                <Label htmlFor="select" className="filter_label">Display Period</Label>
                                                                <Col className="arrow-icon select-filter" xs={3}>
                                                                    <Input type="select" className="none-appearance" name="select" id="select" onChange={this.handlePeriod}>
                                                                        <option value="day">Daily</option>
                                                                        <option value="week">Weekly</option>
                                                                        <option value="month">Monthly</option>
                                                                    </Input>
                                                                </Col>
                                                                
                                                                <Label htmlFor="from" className="filter_label from-label">Date From</Label>
                                                                <Col className="arrow-icon select-filter">
                                                                    <Input className="none-appearance" name="from" id="from" onChange={this.handlePeriod} placeholder={(this.state.dateFrom && this.state.dateFromConfirm ? this.formatDate(this.state.dateFrom) : "Select From")} readOnly onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepickerFrom) : null}></Input>
                                                                </Col>
                                                                <Label htmlFor="to" className="filter_label to-label">To</Label>
                                                                <Col className="arrow-icon select-filter">
                                                                    <Input className="none-appearance" name="to" id="to" onChange={this.handlePeriod} placeholder={(this.state.dateTo && this.state.dateToConfirm ? this.formatDate(this.state.dateTo) : "Select To")} readOnly onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepickerTo) : null}></Input>
                                                                </Col>
                                                                {/* <ul className={"select-sm" + (this.state.date.from && this.state.date.to ? " date-info" : "")} id="date" onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepicker) : null}>
                                                                    <span className="select_label-sm select_label-placeholder-sm" id="datepicker1" ref="datepicker1" name="datepicker1">{from &&
                                                                                                                                                                                    to &&
                                                                                                                                                                                    `${this.formatDateDisplay(from)} -
                                                                                                                                                                                        ${this.formatDateDisplay(to)}`}{' '}</span>
                                                                    <input className="select_expand-sm" type="radio" name="asdas"/>
                                                                </ul> */}
                                                                
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

                                                                <Button type="submit" color="info" className="col-7 search-movement search-btn rounded-175" onClick={this.state.displayPeriod && this.state.dateFrom && this.state.dateTo ? this.triggerShowContent : null}>
                                                                    <strong>Search</strong>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        
                                                    </Card>
                                                        
                                                        {}
                                                </div>
                                            </InputGroup>
                                        </FormGroup>
                                    </div>
                                </Row>
                            </div>
                        </div>
                </div>
            </div>
        )
      }
  }
export default StockMovementFilter;
