import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import '../styles/ProductDetail.style.css';
import CountButton from "../components/CountButton";


const ProductDetail = () => {


  return (
    <Container className="product-detail-container">
        {/* 하드코드 나중에 수정하기 */}
      <Row className="justify-content-center">
        <Col sm={6} className="text-center">
          <img
            src="https://img.danawa.com/prod_img/500000/682/595/img/12595682_1.jpg?_v=20201102153055"
            alt="기본안경"
            width={240}
            variant="left"
          />
        </Col>
        <Col sm={6} className=" mb-5">
          <div className="mb-1">기본 안경</div>
          <div className="mb-1">₩ 50,000</div>
          <div>가볍고 편안한 안경을 사용해보세요</div>

          <div className="mt-3">
            <CountButton />
            <div></div>
          </div>

          {/* 버튼을 누르면 제품과 qty보내기 */}
          <Button variant="secondary" className="add-button mt-3">
            장바구니에 추가 
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
