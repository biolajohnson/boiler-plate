import moment from 'moment'

export default [{
    id: '1',
    description: 'Gum',
    amount: 15000,
    note: '',
    createdAt: 0
}, {
    id: '2',
    description: 'Peach juice',
    amount: 350,
    note: '',
    createdAt: moment(0).add(4, 'days').valueOf()
},{
    id: '3',
    description: 'Cream Soda',
    amount: 150,
    note: '',
    createdAt: moment(0).subtract(4, 'days').valueOf()
}]