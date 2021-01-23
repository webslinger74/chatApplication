import {
    SET_CHANNEL
  } from '../actions'
  
  const channel_reducer = (state, action) => {
    if(action.type === SET_CHANNEL) {

      return {...state, channel:action.payload}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default channel_reducer
  