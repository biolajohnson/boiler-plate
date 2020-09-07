import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("Should add an expense to the store", () => {
  const action = addExpense({
    description: "Coffee",
    amount: 23000,
    createdAt: 9090,
    note: "",
  });
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "Coffee",
      amount: 23000,
      createdAt: 9090,
      note: "",
      id: expect.any(String),
    },
  });
});
test("Should remove expenses from teh store", () => {
  const action = removeExpense({ id: "hey" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "hey",
  });
});

test("Should edit expenses from the store", () => {
  const action = editExpense("hey", { description: "Cafe" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "hey",
    updates: {
      description: "Cafe",
    },
  });
});

test("Should expect default values from add expense", () => {
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});
