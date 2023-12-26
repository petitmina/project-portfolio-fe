import React from "react";
import { Modal, Table, Form, Col, Button } from "react-bootstrap";
import { selectedOrder } from "../../reducer/orderReducer";
import CurrencyFormat from "react-currency-format";

const OrderDetailDialog = ({ open, handleClose }) => {
  const ORDER_STATUS = ["preparing", "shipping", "delivered", "refund"];

  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>예약번호: {selectedOrder.orderNum}</p>
        <p>주문날짜: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>이메일: {selectedOrder.userId.email}</p>
        <p>
          주소: {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
        </p>
        <p>주문내역</p>
        <div>
          <Table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Unit Price</td>
                <td>Qty</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>
                      <CurrencyFormat
                        value={item.price}
                        displayType="text"
                        thousandSeparator={true}
                        prefix={"₩"}
                      />
                    </td>
                    <td>{item.qty}</td>
                    <td>
                      <CurrencyFormat
                        value={item.price * item.qty}
                        displayType="text"
                        thousandSeparator={true}
                        prefix={"₩"}
                      />
                    </td>
                  </tr>
                ))}
              <tr>
                <td>총계: </td>
                <td>
                  <CurrencyFormat
                    value={selectedOrder.totalPrice}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={"₩"}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div>
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <Button>저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
