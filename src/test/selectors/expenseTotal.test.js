import selectExpensesTotal from "../../selectors/expenseTotal";
import expenses from "../fixtures/expenses";

test("should get zero if no expenses", () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test("should correctly add up a single expense", () => {
  const result = selectExpensesTotal([expenses[1]]);
  expect(result).toBe(350);
});

test("should correctly add up a multiple expense", () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(15500);
});
