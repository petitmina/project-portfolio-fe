import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../../actions/productAction";

const SunglassProductPage = () => {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.product);
    const [query, setQuery] = useSearchParams();
    const category = query.get("category");
  
    useEffect(() => {
      dispatch(productActions.getCategoryProductList({ category: '선글라스' }));
    }, [query]);
  
  return (
    <Container>
      <Row className="mt-5">
        {/* 최신순, 가격낮은순, 가격높은순 구현하기 */}
        <div className="">최신순, 가격낮은순, 가격높은순</div>
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

export default SunglassProductPage;
