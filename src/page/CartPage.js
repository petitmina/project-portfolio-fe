import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import OrderResult from '../components/OrderResult'

const CartPage = () => {
  return (
    <Container style={{marginTop: '10%'}}>
        <Row>
            <Col xs={12} md={7} style={{marginTop: '10px', textAlign: 'center', justifyContent:'center'}}>
                <div className="text-align-center">
                    <h2>카트가 비어있습니다.</h2>
                    <div>상품을 담아주세요!</div>
                </div>
            </Col>
            <Col xs={12} md={5}>
                <OrderResult />
            </Col>
            
        </Row>
    </Container>
  )
}

export default CartPage
