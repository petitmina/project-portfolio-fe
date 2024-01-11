import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import CurrencyFormat from "react-currency-format";

const OrderStatusCard = ({ orderItem }) => {
  return (
    <div>
      <Row>
        <Col xs={2}>
          <img
            src={orderItem.items[0]?.productId?.image}
            alt={orderItem.items[0]?.productId?.image}
            height={100}
          />
        </Col>
        <Col xs={8}>
          <div>
            <strong>주문번호: {orderItem.orderNum}</strong>
          </div>
          <div>{orderItem.createdAt.slice(1, 10)}</div>
          <div>{orderItem.items[0].productId.name}</div>
          <div>
            ₩{" "}
            {orderItem.items.length > 1 && `외 ${orderItem.items.length - 1}개`}
          </div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">
            <CurrencyFormat
              value={orderItem.totalPrice}
              displayType="text"
              thousandSeparator={true}
              prefix={"₩"}
            />
          </div>
          <Badge bg={badgeBg[orderItem.status]}>{orderItem.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
