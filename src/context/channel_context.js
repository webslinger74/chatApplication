import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/channel_reducer';
import {
  SET_CHANNEL
} from '../actions';

const initialState = {channel:{id:1}}

const ChannelContext = React.createContext()

export const ChannelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const setChannel = (channel) => {
    dispatch({type:SET_CHANNEL, payload:channel})
  }

  return (
    <ChannelContext.Provider value={{...state, setChannel }}>{children}</ChannelContext.Provider>
  )
}
// make sure use
export const useChannelContext = () => {
  return useContext(ChannelContext)
}
