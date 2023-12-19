import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ProductCard = () => {
  return (
    <Card style={{ width: '18rem', marginTop: '10%', marginLeft: '10%'}}>
      <Card.Img variant="top" src="https://img.danawa.com/prod_img/500000/682/595/img/12595682_1.jpg?_v=20201102153055" />
      <Card.Body>
        <Card.Title style={{ textAlign:'center'}}>기본 안경</Card.Title>
        <div className='d-flex justify-content-center'> 
            {/* 상품 디테일 페이지 만들면 navigate 수정하기  */}
            <Button variant="secondary"><Link to='/'  style={{color: 'black', textDecoration: 'none'}}>자세히보기</Link></Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
