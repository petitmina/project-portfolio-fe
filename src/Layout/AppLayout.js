import React, { useEffect } from 'react'
import MainNavbar from '../components/MainNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithToken } from '../reducer/userReducer';

const AppLayout = ({children}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <MainNavbar user={user}/>
      {children}
    </div>
  )
}

export default AppLayout
