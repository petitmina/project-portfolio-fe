import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../../actions/productAction";
import SortButton from "../../components/SortButton";

const WomenProductPage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const category = query.get("category");

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    dispatch(productActions.getCategoryProductList({ category: '여성용' }));
  }, [query]);
  
  return (
    <Container>
      <Row className="mt-5">
        <SortButton sortedProducts={sortedProducts} setSortedProducts={setSortedProducts}/>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <Col sm={12} md={4} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="mt-5 display-center justify-content-center">
            <h2>등록된 상품이 없습니다</h2>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default WomenProductPage;
