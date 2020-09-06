import moment from 'moment'

const filter = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'date'
}

const altFilter = {
    text: 'bills',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
    sortBy: 'amount'
}

export { altFilter, filter }