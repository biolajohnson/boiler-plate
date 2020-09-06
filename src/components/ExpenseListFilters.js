import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'

export class ExpenseListFilters extends React.Component{
        state = {
            calenderFocused: null
        }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }
    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }))
    }
    onTextChange = (e) => { 
            this.props.setTextFilter(e.target.value)
    }
    onSortChange = (e) => {
        e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByAmount()
    }
    render(){
        return (
            <div>
                <input type="text"
                    value={this.props.filter.text}
                    onChange={this.onTextChange} />
              <select 
              value={this.props.filter.sortBy} 
              onChange={this.onSortChange}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
              <DateRangePicker
               startDate={this.props.filter.startDate} 
               endDate={this.props.filter.endDate}
               onDatesChange={this.onDatesChange}
               focusedInput={this.state.calenderFocused}
               onFocusChange={this.onFocusChange}
               numberOfMonths={1}
               isOutsideRange={() => false}
               startDateId={"expensify-start-date"}
               endDateId={"expensify-end-date"}
               showClearDates={true}
              />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        filters: state.filter
    }
}
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)