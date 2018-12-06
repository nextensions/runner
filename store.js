import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

import rootReducer, { initialState } from './reducers'

// const middlewares = [thunkMiddleware, createLogger()]
const middlewares = [thunkMiddleware]

const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

export { initStore }
