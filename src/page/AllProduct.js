import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const AllProduct = () => {
  return (
    <Container>
        <Row md={3} sm={12}>
            <ProductCard />
        </Row>
    </Container>
  )
}

export default AllProduct
