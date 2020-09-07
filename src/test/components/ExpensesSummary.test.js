import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'


test('should render expenses summary for singular count', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={2345} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expenses summary for multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={34} expensesTotal={23457878773} />)
    expect(wrapper).toMatchSnapshot()
})