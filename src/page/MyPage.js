import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderStatusCard from '../components/OrderStatusCard'
import { orderActions } from '../actions/orderAction'

const MyPage = () => {
    const dispatch = useDispatch();
    const {orderList} = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(orderActions.getOrder());
    }, []);

    if(orderList?.length === 0){
        return (
            <Container className='no-order-box'> 
                <div>진행중인 주문이 없습니다</div>
            </Container>
        )
    }
  return (
    <Container>
        {orderList.map((item) => (
            <OrderStatusCard 
                orderItem={item}
                className='status-card-continer'
                key={item._id}
            />

        ))}
    </Container>
  )
}

export default MyPage
