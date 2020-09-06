//Get visible expenses
import moment from 'moment'

export default (expenses, { text, sortBy, endDate, startDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt)
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
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