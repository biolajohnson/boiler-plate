import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
//import 'react-dates/initialize'

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      notes: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calenderFocused: false,
      error: "",
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
      this.setState(() => ({ amount }));
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      //set error
      this.setState(() => ({ error: "Please insert values!" }));
    } else {
      //clear error
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Description"
            autoFocus
            type="text"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            placeholder="Amount"
            type="text"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calenderFocused}
            onFocusChange={this.onFocusChange}
            isOutsideRange={() => false}
            numberOfMonths={1}
          />
          <textarea
            placeholder="Add your notes here (optional)"
            value={this.state.note}
            onChange={this.onNotesChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
