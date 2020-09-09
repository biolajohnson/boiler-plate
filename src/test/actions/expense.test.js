import { addExpense, editExpense, removeExpense, startAddExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test("Should add an expense to the store", () => {
  const action = addExpense(expenses[1])
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[1]
  });
});
test("Should remove expenses from the store", () => {
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

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'computers',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const action = store.getActions()
    expect(action[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })
    return database.ref(`expenses/${action[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})


test('should add expense defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense(expenseDefaults)).then(() => {
    const action = store.getActions()
    expect(action[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    })
    return database.ref(`expenses/${action[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults)
    done()
  })
})

// test("Should expect default values from add expense", () => {
//   const expenseData = {
//     description: "",
//     amount: 0,
//     note: "",
//     createdAt: 0,
//   };
//   const action = addExpense(expenseData);
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       ...expenseData,
//       id: expect.any(String),
//     },
//   });
// });
