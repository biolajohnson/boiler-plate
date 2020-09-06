import React from 'react'
import ExpenseForm from '../../components/ExpenseForm'
import moment from 'moment'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { SingleDatePicker } from 'react-dates'


test('should render expense form correctly', () => { 
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expense form with date correctly', () => { 
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form input', () => { 
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})
test('should set description on input change', () => { 
    const value = 'New Description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
})
test('should set note on input change', () => { 
    const value = 'New Note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').at(0).simulate('change', {
        target: {value}
    })
    expect(wrapper.state('notes')).toBe(value)
})
test('should set amount if valid input', () => { 
    const wrapper = shallow(<ExpenseForm />)
    const value = '12.22'
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if value is invalid', () => { 
    const wrapper = shallow(<ExpenseForm />)
    const value = '12.222'
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('')
})

//spies
test('should call onSubmit prop for valid submission', () => { 
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[2].description,
        createdAt: expenses[2].createdAt,
        amount: expenses[2].amount,
        note: expenses[2].notes
    })
})

test('should set new date on date change', () => { 
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find(SingleDatePicker).prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
}) 

test('should set calender focus on change', () => {
  
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused: false})
    expect(wrapper.state('calenderFocus')).toBe(false)
})