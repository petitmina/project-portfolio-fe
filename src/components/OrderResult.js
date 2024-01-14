import React from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import CurrencyFormat from "react-currency-format";

const OrderResult = ({ cartList, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartList.length > 0 &&
          cartList.map((item) => (
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
            </li>
          ))}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>
            {
              <CurrencyFormat
                value={totalPrice}
                displayType="text"
                thousandSeparator={true}
                prefix={"₩"}
              />
            }
          </strong>
        </div>
      </div>

      {cartList.length > 0 && location.pathname.includes("/cart") && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}
    </div>
  );
};

export default OrderResult;
