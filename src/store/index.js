import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index'

// async function reducers(state, action){
//     return 0
// }


let store = createStore(reducers, applyMiddleware(thunk))

export default store