import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'

const ExpenseDashboardPage = () => (
    <div>
   Expense Dashboard!
   <ExpenseListFilters />
   <ExpenseList />
    </div>
)
export default ExpenseDashboardPage