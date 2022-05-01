import axios from '../axios'
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [userID, setUserID] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [username, setUsername] = useState()
  const checkIfUserLoggedIn = async() => {
    try{
      const data = await axios.get('/api/auth/status', { withCredentials: true })
      
      setIsLoggedIn(data.isLoggedIn)
      setUserID(data.userID)
      return data
    } catch(err) {
      console.log(err.response.data)
    }
  }

  const login = async(email, password) => {
    try{
      const response = await axios.post('/api/auth/login', { email, password } ,{ withCredentials: true })
      setIsLoggedIn(response.data.status === "Success" ? true : false)
      setUserID(response.userID)
      return response
    } catch(err) {
      return err.response
    }
  }

  const signup = async(email, username, password) => {
    const { data } = await axios.post('/api/auth/signup', { email, password, username }, { withCredentials: true })
  }

  return(
    <AuthContext.Provider value={{
      isLoggedIn, login, signup, checkIfUserLoggedIn, userID
    }} >
      {children}
    </AuthContext.Provider>
  )

}