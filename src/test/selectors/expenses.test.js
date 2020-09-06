import selectExpenses from '../../selectors/expenses'
import moment from 'moment'
import expenses from '../fixtures/expenses'


test('should filter expenses by date and text', () => { 
    const filter = {
        startDate: undefined,
        endDate: undefined,
        text: 'e',
        sortBy: 'date'
    }
    const action = selectExpenses(expenses, filter)
    expect(action).toEqual( [expenses[1], expenses[2]] )
})
test('should filter by start dates', () => {
    const filter = {
        startDate: moment(0),
        endDate: undefined,
        sortBy: 'date',
        text: ''
    }
    const action = selectExpenses(expenses, filter)
    expect(action).toEqual([expenses[1], expenses[0]])
})

//should filter by end date

test('should filter by end date', () => { 
    const filter = {
        endDate: moment(0).add(2, 'days'),
        startDate: undefined,
        sortBy: 'date',
        text: ''
    }
    const result = selectExpenses(expenses, filter)
    expect(result).toEqual( [expenses[0], expenses[2]] )
})

//should sort by date
test('should sort by date', () => { 
    const filter = {
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
        text: ''
    }
    const result = selectExpenses(expenses, filter)
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]])
})

//should sort by amount

test('should sort by amount', () => { 
    const filter = {
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
        text: ''
    }
    const result = selectExpenses(expenses, filter)
    expect(result).toEqual([expenses[0], expenses[1], expenses[2]])
})
