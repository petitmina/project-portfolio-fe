import React, { useEffect } from 'react'
import MainNavbar from '../components/MainNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions/userAction';

const AppLayout = ({children}) => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken())
  }, [])

  return (
    <div>
      
      <MainNavbar user={user}/>
      {children}
    </div>
  )
}

export default AppLayout
