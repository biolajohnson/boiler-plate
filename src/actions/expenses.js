
import database from '../firebase/firebase'

//ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});
// async dispatch (database)
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      amount = '',
      createdAt = 0,
      note = ''
    } = expenseData
    const expense = { description, amount, createdAt, note }
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
