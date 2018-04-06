import { INPUT_VALUE, INPUT_MEMBER } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case INPUT_VALUE:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          [action.name]: action.val,
        },
      }
    case INPUT_MEMBER: {
      if (action.index) {
        // const index = state.items.findIndex(x => x.id === action.index)
        return {
          ...state,
          members: [
            // ...state.items.slice(0, action.index),
            ...state.members,
            Object.assign({}, action.index, action.members),
            // ...state.items.slice(action.index + 1),
          ],
        }
      }

      return {
        ...state,
        members: [action.members],
      }
    }
    default:
      return state
  }
}
