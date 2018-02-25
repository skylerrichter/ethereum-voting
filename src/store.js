import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'

export default createStore(
  rootReducer,
  applyMiddleware(
    ReduxThunk
  )
);