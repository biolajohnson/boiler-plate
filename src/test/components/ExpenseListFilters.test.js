import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { altFilter, filter } from "../fixtures/filter";
import { DateRangePicker } from "react-dates";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setEndDate = jest.fn();
  setStartDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filter}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setTextFilter={setTextFilter}
    />
  );
});

test("should render Expense list filters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
test("should render Expense list filters with alt correctly", () => {
  wrapper.setProps({
    filter: altFilter,
  });
  expect(wrapper).toMatchSnapshot();
});
test("should handle text change", () => {
  const value = "Rent";
  wrapper.find("input").simulate("change", {
    target: { value },
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
test("should sort by date", () => {
  const value = "date";
  wrapper.setProps({
    filter: altFilter,
  });
  wrapper.find("select").simulate("change", {
    target: { value },
  });
  expect(sortByDate).toHaveBeenCalledWith();
});
test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: { value },
  });
  expect(sortByAmount).toHaveBeenCalledWith();
});
test("should handle date chnages", () => {
  const startDate = moment(0).add(4, "years");
  const endDate = moment(0).add(8, "years");
  wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
  const calenderFocus = "endDate";
  wrapper.find(DateRangePicker).prop("onFocusChange")(calenderFocus);
  expect(wrapper.state("calenderFocused")).toBe(calenderFocus);
});
