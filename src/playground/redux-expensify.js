import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

//Action generator
//ADD_EXPENSE
const addExpense = (
    { 
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
 } = {}
 ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        amount,
        note,
        createdAt
    }
})

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
})

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//Expense Reducer

const expensesDefaultState = []

const expensesReducer = (state = expensesDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.expense.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense
                }
            })
        default:
            return state
        
    }
}

//Filter Reducer

const filterDefaultState = {
    text: '',
    sortBy: 'date',
    createdAt: undefined,
    endedAt: undefined
}

const filterReducer = (state = filterDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
             return {
                ...state,
                 text: action.text
                }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
            case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}
//actual filtering  (get visible expenses)

const getVisibleExpense = (expenses, { text, sortBy, endDate, startDate }) => {
    return expenses.filter((expense) => {
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return endDateMatch && textMatch && startDateMatch
    }).sort((a, b) => {
        if(sortBy === 'date'){
          return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === 'amount'){
           return  a.amount < b.amount ? 1 : -1
        }
    })
}

//Store
//{  }

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filter: filterReducer
}))

//subscribe

store.subscribe(() => {
    const state = store.getState()
    const visibleExpense = getVisibleExpense(state.expenses, state.filter)
    console.log(visibleExpense)
 })

// store.subscribe(() => {
//     console.log(store.getState())
// })

//dispatch

const expenseOne = store.dispatch(addExpense({ description: 'payment', amount: 100, createdAt: 1 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Ps5', amount: 3000, createdAt: 40000 }))
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 9000 }))

 //store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

//store.dispatch(sortByAmount())
 //store.dispatch(sortByDate())
//store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

 // const demoState = {
//     expenses: [{
//         id: 'hjddujndndcn',
//         description: 'January rent',
//         amout: 324500,
//         note: 'Final house rent'
//     }],
//     filter: {
//         text: 'rent',
//         sortBy: 'date', // amount or date
//         createdAt: undefined,
//         endedAt: undefined
//     }
// }
