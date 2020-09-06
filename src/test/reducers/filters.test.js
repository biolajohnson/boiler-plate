import moment from 'moment'
import filterReducer from '../../reducers/filters'

test('should setup default filter values', () => { 
    const state = filterReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        text: ''
    })
})
test('should set sort by amount', () => { 
    const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' })
    expect(state.sortBy).toBe('amount')
})
test('should set sort by date', () => {
    const currentState = {
        startDate: undefined,
        endDate: undefined,
        text: '',
        sortBy: 'amount'
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filterReducer(currentState, action)
    expect(state.sortBy).toBe('date')
})

//should set text filter
test('should set text filter', () => { 
    const state = filterReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'rent' })
    expect(state.text).toBe('rent')
})
//should set start date
test('should set start date', () => { 
    const state = filterReducer(undefined, { type: 'SET_START_DATE', startDate: 23 })
    expect(state.startDate).toBe(23)
})
//should set end date
test('should set end date', () => { 
    const state = filterReducer(undefined, { type: 'SET_END_DATE', endDate: 23 })
    expect(state.endDate).toBe(23)
})