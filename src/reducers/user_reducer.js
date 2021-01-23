import {
  CLEAR_GLOBAL_USER,
  GET_GLOBAL_USER, SET_GLOBAL_USER
} from '../actions'

const user_reducer = (state, action) => {
  if(action.type === GET_GLOBAL_USER) {
    return {...state}
  }
  if(action.type === SET_GLOBAL_USER) {
    console.log(action.type, action.payload, "the data passed to global in reducer");
    return {...state, user:action.payload}
  }
  if(action.type === CLEAR_GLOBAL_USER) {
    return {};
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default user_reducer
