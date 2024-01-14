import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import OrderResult from "../components/OrderResult";
import PaymentCardForm from "../components/PaymentCardForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { orderActions } from "../actions/orderAction";
import '../styles/payment.style.css';

function PaymentPage() {
  const dispatch = useDispatch();

  const cc_expires_format = (string) => {
    return string
      .replace(
        /[^0-9]/g,
        "" // To allow only numbers
      )
      .replace(
        /^([2-9])$/g,
        "0$1" // To handle 3 > 03
      )
      .replace(
        /^(1{1})([3-9]{1})$/g,
        "0$1/$2" // 13 > 01/3
      )
      .replace(
        /^0{1,}/g,
        "0" // To handle 00 > 0
      )
      .replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
        "$1/$2" // To handle 113 > 11/3
      );
  };

  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const navigate = useNavigate();
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const { cartList, totalPrice } = useSelector((state) => state.cart);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip} = shipInfo;
    const data = {
        totalPrice,
        shipTo: {address, city, zip},
        contact: {firstName, lastName, contact },
        orderList: cartList.map((item) => {
          return {
            productId: item.productId._id,
            price: item.productId.price,
            qty: item.qty,
            color: item.color,
          }
        }),
    }
    dispatch(orderActions.createOrder(data, navigate));
  };

  const handleFormChange = (event) => {
    const {name, value} = event.target;
    setShipInfo({...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const {name, value } = event.target;
    if(name === 'expiry') {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue});
      return;
    }
    setCardValue({...cardValue, [name]: value})
  }

   const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name })
   }

   if(cartList.length === 0) {
    navigate('/cart');
   }

  //  if(!policy) {
  //   setPolicyError(true);
  //   return;
  // }
  return (
    <Container className="mt-5">
      <Row className="float: none m-auto">
        <Col lg={7}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>성</Form.Label>
                <Form.Control type="name" placeholder="성은 입력하세요" required name="lastName" onChange={handleFormChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>이름</Form.Label>
                <Form.Control type="name" placeholder="이름을 입력하세요" required name="firstName" onChange={handleFormChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>연락처</Form.Label>
              <Form.Control placeholder="010-xxxx-xxxx" required name="contact" onChange={handleFormChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>주소</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" required name="address" onChange={handleFormChange}/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control required name="city" onChange={handleFormChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control required name="zip" onChange={handleFormChange}/>
              </Form.Group>
            </Row>

            {/* 체크하지 않으면 제출이 안되게 만들기 */}
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="결제정보를 확인해 주세요" />
            </Form.Group>

            <div>
              <h2 className="payment-title">결제 정보</h2>
              <PaymentCardForm
                    cardValue={cardValue}
                    handleInputFocus={handleInputFocus}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
            </div>

            <Button variant="secondary" type="submit" className="payment-button mt-2">
              결제하기
            </Button>
          </Form>
        </Col>
        <Col lg={5} className="mb-3 text-center">
          <OrderResult cartList={cartList} totalPrice={totalPrice}/>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentPage;
