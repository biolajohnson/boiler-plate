import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

//create action generators
//ADD_EXPENSE
const addExpense = (
    { 
    description = '',
    amount = 0,
    note = '',
    createdAt = 0
} = {}) => (
    {
    type: 'ADD_EXPENSE',
    expense: {
        description,
        amount,
        id: uuid(),
        note,
        createdAt
    }
})
//REMOVE_EXPENSE
const removeExpense = ({ id } = {} ) => ({
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
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//SET_ START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})
//SET_TEXT_FILTER
const setTextFilter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
})

//expense reducer default state

const expenseReducerDefaultState = []
  
//create expense reducers
const expenseReducer = (state = expenseReducerDefaultState, action) => {
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
//filter reducer default state
const filterReducerDefaultState = {
    sortBy: 'date',
    createdAt: undefined,
    endedAt: undefined,
    text: ''
}

//create filter reducer 
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type){
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE': 
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE': 
            return {
                ...state,
                endDate: action.endDate
            }
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        default:
          return state
    }
}
//get visisble data
const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        return textMatch && endDateMatch && startDateMatch
    }).sort((a, b) => {
        if(sortBy === 'amount'){
           return a.amount < b.amount ? 1 : -1
        } else if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
    })
}

//create store

const store = createStore(combineReducers({
    expenses: expenseReducer,
    filter: filterReducer
}))


//subscription
store.subscribe(() => {
    const state = store.getState()
    const visibleExpense = getVisibleExpense(state.expenses, state.filter)
    console.log(visibleExpense)
})
//dispatch actions
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 3000, createdAt: 1000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 6000, createdAt: 45 }))
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 35600 }))

//store.dispatch(sortByAmount())
 //store.dispatch(sortByDate())
 store.dispatch(sortByAmount())
// store.dispatch(setEndDate(33456))
// store.dispatch(setStartDate(6789))
 //store.dispatch(setStartDate())
// store.dispatch((setTextFilter('rent')))



// const demoStore = {
//     expenses: [{
//         id: uuid,
//         amount: 0,
//         note: 'rent!',
//         description: 'final rent'
//     }],
//     filter: {
//         sortBy: date, // amount
//         createdAt: timeStamp,
//         endedAt: timeStanp,
//         text
//     }
// }