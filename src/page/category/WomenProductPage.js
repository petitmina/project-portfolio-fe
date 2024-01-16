import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../../actions/productAction";

const WomenProductPage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const category = query.get("category");

//   const [highPrice, setHighPrice] = useState(productList);
//   const [lowPrice, setlowPrice] = useState(productList);
  useEffect(() => {
    dispatch(productActions.getCategoryProductList({ category: '여성용' }));
  }, [query]);
  
  return (
    <Container>
      <Row className="mt-5">
        {/* 최신순, 가격낮은순, 가격높은순 구현하기 */}
        <div className="">
            {/* <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              정렬 선택하기
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item  onClick={() => {}}>최신순</Dropdown.Item>
              <Dropdown.Item  onClick={() => {
                  let lowList = [...lowPrice];
                  lowList.sort((a, b) => (a.price > b.price ? -1 : 1));
                }}>가격 낮은순</Dropdown.Item>
              <Dropdown.Item 
                onClick={() => {
                  let highList = [...highPrice];
                  highList.sort((a, b) => (a.price < b.price ? -1 : 1));
                }}
              >
                가격 높은순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        {productList.length > 0 ? (
          productList.map((item) => (
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
