import React from "react";
import { useLocation } from "react-router";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";

const OrderResult = ({ cartList, totalPrice }) => {
  const location = useLocation();
  const navigate = useDispatch();

  // 하드코드 변경하기
  return (
    <div className="ml-2 text-center">
      <h3>주문 내역</h3>
      <ul style={{ listStyle: "none" }}>
        {cartList.length > 0 &&
          cartList.map((item) => {
            <li key={item._id}>
              <div className="display-flex space-between">
                <div>{item.productId.name}</div>
                <div>
                  {
                    <CurrencyFormat
                      value={item.productId.price * item.qty}
                      displayType="text"
                      thousandSeparator={true}
                      prefix={"₩"}
                    />
                  }
                </div>
              </div>
            </li>;
          })}
      </ul>
      <div>
        <div>Total:</div>
        <div>
          <strong>
            <CurrencyFormat
              value={totalPrice}
              displayType="text"
              thousandSeparator={true}
              prefix={"₩"}
            />
          </strong>
        </div>
        {location.pathname.includes("/cart") && (
          <Button
            variant="dark"
            className="payment-button"
              onClick={() => navigate("/payment")}
          >
            결제 계속하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderResult;
