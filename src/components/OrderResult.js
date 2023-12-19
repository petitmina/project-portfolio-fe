import React from 'react'
import { useLocation } from 'react-router';
import Button from 'react-bootstrap/Button';

const OrderResult = () => {
    const location = useLocation();

  return (
    <div className='ml-2 text-center'>
      <h3>주문 내역</h3>
      <ul style={{ listStyle: 'none'}}>
        <li>
            <div style={{ }}>
                <div>아이템 이름</div>
                <div>₩ 50,000원</div>
            </div>
        </li>
      </ul>
      <div>
        <div>Total: </div>
        <div><strong>₩ 최종가격</strong></div>
        {location.pathname.includes("/cart") && (
        <Button
          variant="dark"
          className="payment-button"
        //   onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}
      </div>
    </div>
  )
}

export default OrderResult
