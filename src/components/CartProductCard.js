import React from "react";
import { Row, Col } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountButton from "./CountButton";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { cartActions } from "../actions/cartActions";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = () => {
    dispatch(cartActions.updateQty());
  };

  const deleteCart = () => {
    dispatch(cartActions.deleteCartItem(item._id));
  };

  return (
    <div>
      <Row>
        <Col md={2} xs={12}>
          <img src={item.productId.image} alt="기본안경" width={110} />
        </Col>
        <Col md={10} xs={12}>
          <div className="d-flex space-between">
            <h3>{item.productId.name}</h3>
            <button>
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart(item._id)}
              />
            </button>
          </div>

          <div>
            <strong>
              <CurrencyFormat
                value={item.productId.price}
                displayType="text"
                thousandSeparator={true}
                prefix={"₩"}
              />
            </strong>
          </div>
          <div>
            Total:
            <CurrencyFormat
              value={item.productId.price * item.qty}
              displayType="text"
              thousandSeparator={true}
              prefix={"₩"}
            />
          </div>
          <div>
            <CountButton
            />
          </div>
          <div>수량: {item.qty}</div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
