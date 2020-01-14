import React, { Component } from 'react';
import './StyleSheet/StockMovementDatePicker.css';

class StockMovementDatePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: ''
      }
    }

    render() {
        return (
            <React.Fragment>
                <div className={(this.state.showDatepickerFrom ? (this.state.displayPeriod === "day" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-3" : "d-none") : "d-none") + " select-from"}>
                    <DayPicker
                        month={this.state.month}
                        fromMonth={fromMonth}
                        toMonth={toMonth}
                        selectedDays={this.state.dateFrom}
                        onDayClick={this.handleDateFromClick}
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={this.handleYearMonthChange}
                            no={Math.floor(Math.random() * 100000)}
                            />
                        )}
                        />
                        <Helmet>
                            <style>{`
                                .showDatepicker{
                                    transition: 1s;
                                }
                                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                                    position: static;
                                    background-color: #f0f8ff !important;
                                    color: #4a90e2;
                                }
                                .Selectable .DayPicker-Day {
                                    border-radius: 0 !important;
                                }
                                .Selectable .DayPicker-Day--start {
                                    border-top-left-radius: 50% !important;
                                    border-bottom-left-radius: 50% !important;
                                }
                                .Selectable .DayPicker-Day--end {
                                    border-top-right-radius: 50% !important;
                                    border-bottom-right-radius: 50% !important;
                                }
                                `}</style>
                        </Helmet>
                        <Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmDateFrom}>
                            <strong>Confirm</strong>
                        </Button>
                </div>
                <div className={(this.state.showDatepickerTo ? (this.state.displayPeriod === "day" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-6" : "d-none") : "d-none") + " select-to"}>
                    <DayPicker
                        month={this.state.month}
                        fromMonth={fromMonth}
                        toMonth={toMonth}
                        selectedDays={this.state.dateTo}
                        onDayClick={this.handleDateToClick}
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={this.handleYearMonthChange}
                            no={Math.floor(Math.random() * 100000)}
                            />
                        )}
                        />
                        <Helmet>
                            <style>{`
                                .showDatepicker{
                                    transition: 1s;
                                }
                                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                                    position: static;
                                    background-color: #f0f8ff !important;
                                    color: #4a90e2;
                                }
                                .Selectable .DayPicker-Day {
                                    border-radius: 0 !important;
                                }
                                .Selectable .DayPicker-Day--start {
                                    border-top-left-radius: 50% !important;
                                    border-bottom-left-radius: 50% !important;
                                }
                                .Selectable .DayPicker-Day--end {
                                    border-top-right-radius: 50% !important;
                                    border-bottom-right-radius: 50% !important;
                                }
                                `}</style>
                        </Helmet>
                        <Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmDateTo}>
                            <strong>Confirm</strong>
                        </Button>
                </div>
                    <DayPicker
                        className={(this.state.showDatepicker ? (this.state.displayPeriod === "week" ? "Selectable datepickerweekly-tab" : "d-none") : "d-none")}
                        numberOfMonths={1}
                        showWeekNumbers
                        showOutsideDays
                        selectedDays={selectedDays}
                        modifiers={modifiers}
                        onDayClick={this.handleDayChange}
                        onDayMouseEnter={this.handleDayEnter}
                        onDayMouseLeave={this.handleDayLeave}
                        onWeekClick={this.handleWeekClick}
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={this.handleYearMonthChange}
                            no={Math.floor(Math.random() * 100000)}
                            />
                        )}
                        />
                        <Helmet>
                            <style>{`
                                .SelectedWeekExample .DayPicker-Month {
                                    border-collapse: separate;
                                }
                                .SelectedWeekExample .DayPicker-WeekNumber {
                                    outline: none;
                                }
                                .SelectedWeekExample .DayPicker-Day {
                                    outline: none;
                                    border: 1px solid transparent;
                                }
                                .SelectedWeekExample .DayPicker-Day--hoverRange {
                                    background-color: #EFEFEF !important;
                                }

                                .SelectedWeekExample .DayPicker-Day--selectedRange {
                                    background-color: #fff7ba !important;
                                    border-top-color: #FFEB3B;
                                    border-bottom-color: #FFEB3B;
                                    border-left-color: #fff7ba;
                                    border-right-color: #fff7ba;
                                }

                                .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
                                    background-color: #FFEB3B !important;
                                    border-left: 1px solid #FFEB3B;
                                }

                                .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
                                    background-color: #FFEB3B !important;
                                    border-right: 1px solid #FFEB3B;
                                }

                                .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
                                    position: static;
                                }
                                .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
                                .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
                                    border-radius: 0 !important;
                                    color: black !important;
                                }
                                .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
                                    border-radius: 0 !important;
                                }
                            `}</style>
                        </Helmet>
            </React.Fragment>
        )
      }
  }
export default StockMovementDatePicker;
