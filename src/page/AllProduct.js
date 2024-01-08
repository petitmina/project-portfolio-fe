import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../actions/productAction";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query]);

  return (
    <Container>
      {productList.length > 0 ? (
        productList.map((item) => (
          <Row key={item._id}>
            <Col xs={12} sm={6} md={4} >
              <ProductCard item={item} />
            </Col>
          </Row>
        ))
      ) : (
        <div className="mt-5 display-center justify-content-center">
          <h2>등록된 상품이 없습니다</h2>
        </div>
      )}
    </Container>
  );
};

export default AllProduct;
