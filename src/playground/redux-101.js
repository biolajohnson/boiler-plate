import { createStore } from 'redux'
// Action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({count} = {}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET',
    count: 0
})

//reducer
//1. never mutate the state or action directly
//2. pure functions!

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            } 
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return{
                count: action.count
            }
        case 'SET':
            return {
                count: action.count
            }
            default: 
            return state
    }

}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(setCount({ count: 2000 }))

store.dispatch(incrementCount({ incrementBy: 34 }))

store.dispatch(decrementCount({ decrementBy: 32 }))

store.dispatch(resetCount())