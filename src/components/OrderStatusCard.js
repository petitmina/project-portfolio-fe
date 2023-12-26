import React from "react";
import { Row, Col } from "react-bootstrap";

const OrderStatusCard = () => {
  return (
    <div>
      <Row>
        <Col xs={2}>
          <img
            src="https://hotsunglass.co.kr/web/product/small/202212/d1a2a1ffff24c2846d83cad3476a2f92.jpg"
            alt="기본안경"
            height={100}
          />
        </Col>
        <Col xs={8}>
          <div>
            <strong>주문번호: {}</strong>
          </div>
          <div>2023-12-31</div>
          <div>하금테</div>
          <div>₩ 50,000</div>
        </Col>
        <Col md={2}>
          <div>
            주문상태
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
