import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expenseData = {}
  expenses.forEach(({ description, id, amount, createdAt, note }) => {
    expenseData[id] = { description, amount, createdAt, note }
  })
  database.ref('expenses').set(expenseData).then(() => done())
})

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
//asynchronous test case --> add expense
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

//asynchronous test case --> add expense
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

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})
//asynchronous test case --> read / fetch expense
test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions()
    expect(action[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})
//asynchronous test case --> remove expense
test('should remove the expenses from firebase', (done) => {
  const store = createMockStore({})
  const id = expenses[2].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const action = store.getActions()
    expect(action[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done()
  })
})
//asynchronous test case --> update expense
test('should update the expenses from firebase', (done) => {
  const store = createMockStore({})
  const id = expenses[1].id
  const updates = {
    description: 'noName'
  }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const action = store.getActions()
    expect(action[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })
    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe('noName')
    done()
  })
})