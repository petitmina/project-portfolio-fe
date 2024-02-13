import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import CurrencyFormat from "react-currency-format";

const OrderStatusCard = ({ orderItem }) => {

  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={orderItem.items[0]?.productId?.image}
            alt={orderItem.items[0]?.productId?.image}
            height={100}
          />
        </Col>
        <Col xs={8} className="order-info text-center">
          <div className="mb-2">
            <strong>주문번호: {orderItem.orderNum}</strong>
          </div>
          <div className="text-12 mb-1">{orderItem.createdAt.slice(0, 10)}</div>

          <div className="mb-2">
            {orderItem.items[0].productId.name}
            {orderItem.items.length > 1 && `외 ${orderItem.items.length - 1}개`}
          </div>
          <div>
            <CurrencyFormat
              value={orderItem.totalPrice}
              displayType="text"
              thousandSeparator={true}
              prefix={"₩"}
            />
          </div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg={badgeBg[orderItem.status]}>{orderItem.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
