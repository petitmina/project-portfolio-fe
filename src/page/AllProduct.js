import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../actions/productAction";
import Dropdown from "react-bootstrap/Dropdown";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  console.log(productList, "fff");

  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("정렬하기");

  useEffect(() => {
    const sorted = [...productList];
    if (sortOption === "최신순") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "낮은 가격순") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "높은 가격순") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  }, [sortOption, productList]);

  const handleSortChange = (eventKey) => {
    setSortOption(eventKey);
  };

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query]);

  return (
    <Container>
      <Row className="mt-5">
        <div className="d-flex justify-content-end w-50px">
        <Dropdown onSelect={handleSortChange} >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
            {sortOption}
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center"> 
            <Dropdown.Item eventKey="최신순">최신순</Dropdown.Item>
            <Dropdown.Item eventKey="낮은 가격순">낮은 가격순</Dropdown.Item>
            <Dropdown.Item eventKey="높은 가격순">높은 가격순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
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

export default AllProduct;
