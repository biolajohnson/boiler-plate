import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'



test('should set default state', () => {
    const action = expensesReducer(undefined, { type: '@@INIT' })
    expect(action).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})
test('should not remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '34'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})
test('should add expense to state', () => {
    const addedExpense = {
        description: 'shallow nests',
        amount: 100,
        createdAt: 0,
        id: '4',
        note: ''
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: addedExpense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, addedExpense])
})

test('should edit expense by id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note: 'For you'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1].note).toBe('For you')
})
test('should not edit expense by id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '56'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})
test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: expenses[1]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses[1])
})