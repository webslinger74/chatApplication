import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/user_reducer'
import {
  GET_GLOBAL_USER,
  SET_GLOBAL_USER,
  CLEAR_GLOBAL_USER
} from '../actions';

const initialState = []

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const setGlobalUser = (user) => {
    dispatch({type:SET_GLOBAL_USER, payload:user})
  }

  const getGlobalUser = () => {
    dispatch({type:GET_GLOBAL_USER});
  }

  const clearGlobalUser = () => {
    console.log(state, "before");
    dispatch({type:CLEAR_GLOBAL_USER});
    console.log(state, "after");
  }

  return (
    <UserContext.Provider value={{...state, clearGlobalUser, setGlobalUser, getGlobalUser}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
