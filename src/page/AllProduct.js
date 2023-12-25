import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../reducer/productReducer";
import { useSearchParams } from "react-router-dom";

const AllProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(getProductList({ name }));
  }, [query]);

  return (
    <Container>
      {productList.length > 0 ? (
        productList.map((item) => (
          <Row md={3} sm={12}>
            <ProductCard item={item} />
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
