import React, { useState } from "react";
import { Modal, Table, Form, Col, Button } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { ORDER_STATUS } from "../../constants/order.constants";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../actions/orderAction";

const OrderDetailDialog = ({ open, handleClose }) => {
    const selectedOrder = useSelector((state)=> state.order.selectedOrder);
    const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
    const dispatch = useDispatch();

    const handleStatusChange = (event) => {
      setOrderStatus(event.target.value);
    };

    const submitStatus = () => {
      dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
      handleClose();
    }

    if(!selectedOrder) {
      return <></>
    };

  return (
    <Modal show={open} onHide={handleClose}>
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
        <p>
          연락처:
          {`${
            selectedOrder.contact.firstName + selectedOrder.contact.lastName
          } ${selectedOrder.contact.contact}`}
        </p>
        <p>주문내역</p>
        <div className="overflow-x">
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
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
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
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
