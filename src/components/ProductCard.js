import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showProduct =(id) => {
    navigate(`/product/${id}`);
  }

  return (
    <Card style={{ width: '18rem', marginTop: '10%', marginLeft: '10%' }}>
      <Card.Img variant="top" src={item?.image} />
      <Card.Body>
        <Card.Title style={{ textAlign:'center'}}>{item?.name}</Card.Title>
        <div className='d-flex justify-content-center'> 
            <Button variant="secondary" onClick={() =>showProduct(item._id)}>자세히보기</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
