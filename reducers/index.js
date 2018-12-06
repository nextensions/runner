import { combineReducers } from 'redux'
import formReducer from './formReducer'

export default combineReducers({
  data: formReducer
})

export const initialState = {
  data: {}
}
