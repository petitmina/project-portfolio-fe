import React, { useEffect } from 'react'
import MainNavbar from '../components/MainNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions/userAction';
import { cartActions } from '../actions/cartActions';

const AppLayout = ({children}) => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  useEffect(() => {
    dispatch(cartActions.getCartQty());
  }, [user])

  return (
    <div>
      <MainNavbar user={user}/>
      {children}
    </div>
  )
}

export default AppLayout
