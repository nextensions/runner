import { INPUT_VALUE, KEEP_DATA, FETCH_DATA, INPUT_MEMBER } from '../constants'

export const inputChange = (title, name, val) => dispatch =>
  dispatch({
    type: INPUT_VALUE,
    title,
    name,
    val,
  })

export const inputChangeMember = (title, index, name, val) => dispatch =>
  dispatch({
    type: INPUT_MEMBER,
    title,
    index,
    name,
    val,
  })

export const keepData = params => ({
  type: KEEP_DATA,
  payload: {
    data: params,
  },
})

export const fetchData = () => ({
  type: FETCH_DATA,
})
