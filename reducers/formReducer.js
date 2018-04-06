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
      const index = this.state.items.findIndex(x => x.id === action.index)
      return {
        ...state,
        members: [
          ...this.state.items.slice(0, index),
          Object.assign({}, this.state.items[index], action.members),
          ...this.state.items.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}
