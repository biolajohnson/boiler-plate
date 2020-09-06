import React from 'react';
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/style.scss'
import { addExpense, removeExpense, editExpense } from './actions/expenses'
import { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate } from './actions/filters'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

store.dispatch(addExpense({ description: 'Water bill', amount: 5000, createdAt: 500000}))
store.dispatch(addExpense({ description: 'Gas bill', amount: 1000, createdAt: 500000}))
const jsx = (
    <Provider store={store}>
    <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))