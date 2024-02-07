import React, { useEffect, useState } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/ProductDetail.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { productActions } from "../actions/productAction";
import { cartActions } from "../actions/cartActions";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { user } = useSelector((state) => state.user);
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [colorError, setColorError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const addItemToCart = () => {
    if (color === "") {
      setColorError(true);
    }
    if (!user) navigate("/login");
    dispatch(cartActions.addToCart({ id, color, qty }));
    navigate("/cart");
    dispatch(cartActions.getCartList())
  };

  const handleQtyChange = (type) => {
    if (type === "plus") {
      setQty(qty + 1);
    } else {
      setQty(qty - 1);
    }
  };

  const selectColor = (value) => {
    if (color) setColorError(true);
    setColor(value);
  };

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  return (
    <Container className="product-detail-container">
      {selectedProduct ? (
        <Row>
          <Col sm={6}>
            <img src={selectedProduct.image} alt="image" className="w-100" />
          </Col>
          <Col sm={6}>
            <div className="detail-text">
              <div className="mb-1">{selectedProduct.name}</div>
              <div className="mb-1">
                {
                  <CurrencyFormat
                    value={selectedProduct.price}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={"₩"}
                  />
                }
              </div>
              <div>{selectedProduct.description}</div>

              <div className="mt-3">
                <Dropdown
                  className="size-drop-down"
                  variant={colorError ? "outline-danger" : "outline-dark"}
                  id="dropdown-basic"
                  align="start"
                  onSelect={(value) => selectColor(value)}
                >
                  <Dropdown.Toggle
                    className="color-drop-down"
                    variant={colorError ? "outline-danger" : "outline-dark"}
                    id="dropdown-basic"
                    align="start"
                  >
                    {color === "" ? "Color 선택" : color.toUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="color-drop-down">
                    {Object.keys(selectedProduct.stock).length > 0 &&
                      Object.keys(selectedProduct.stock).map((item) =>
                        selectedProduct.stock[item] > 0 ? (
                          <Dropdown.Item eventKey={item}>
                            {item.toUpperCase()}
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item eventKey={item} disabled={true}>
                            {item.toUpperCase()}
                          </Dropdown.Item>
                        )
                      )}
                  </Dropdown.Menu>
                </Dropdown>

                <div className="mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => handleQtyChange("minus")}
                  >
                    -
                  </Button>
                  <input
                    style={{
                      width: "30px",
                      margin: "3px",
                      border: "none",
                      textAlign: "center",
                    }}
                    type="number"
                    value={qty}
                    readOnly
                  />
                  <Button
                    variant="secondary"
                    onClick={() => handleQtyChange("plus")}
                  >
                    +
                  </Button>
                </div>

                <div>{colorError && "색상과 수량을 선택해주세요"}</div>

                {/* 버튼을 누르면 제품과 qty보내기 */}
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={addItemToCart}
                >
                  장바구니에 추가
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div className="mt-5 display-center justify-content-center">
          <h2>상품 정보를 불러오는 중입니다...</h2>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;
