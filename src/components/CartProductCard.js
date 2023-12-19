import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountButton from './CountButton';

const CartProductCard = () => {
  return (
    <div>
      <Row>
        <Col md={2} xs={12}>
            <img 
                src='https://img.danawa.com/prod_img/500000/682/595/img/12595682_1.jpg?_v=20201102153055'
                alt='기본안경'
                width={110}
            />
        </Col>
        <Col>
            <div>
                <h3>기본 안경</h3>
                <button>
                    <FontAwesomeIcon 
                        icon={faTrash}
                        width={24}
                        // onClick={}
                    />
                </button>
            </div>

            <div>
                <strong>₩ 50,000원</strong>
            </div>
            <div>Total: ₩ 50,000원</div>
            <div>
                <CountButton />
            </div>
            <div>
                수량: 1
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default CartProductCard
