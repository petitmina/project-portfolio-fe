import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/adminProduct.styles.css";
import { COLOR, STATUS, CATEGORY } from "../../constants/product.constants";
import { productActions } from "../../actions/productAction";

const InitialFormData = {
  sku: "",
  name: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};

const NewItemModal = ({ mode, showDialog, setShowDialog }) => {
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState(
    mode === "new" ? { InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const [StockError, setStockError] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
    setFormData({ ...InitialFormData });
    setStock([]);
    setStockError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (stock.length === 0) return setStockError(true);

    const totalStock = stock.reduce((total, item) => {
      return { ...total, [item[0]]: parseInt(item[1]) };
    }, {});

    if (mode === "new") {
      dispatch(productActions.createProduct({ ...formData, stock: totalStock }));
      setShowDialog(false);
    } else {
      dispatch(
        productActions.editProduct({ ...formData, stock: totalStock }, selectedProduct._id)
      );
      setShowDialog(false);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addStock = (idx) => {
    setStock([...stock, []]);
  };

  const deleteStock = (idx) => {
    const newStock = stock.filter((item, index) => index !== idx);
    setStock(newStock);
  };

  const handleColorChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else {
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    setFormData({ ...formData, image: url });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit" ) {
        setFormData(selectedProduct);
        const stockArray = Object.keys(selectedProduct.stock).map((color) => [
          color,
          selectedProduct.stock[color],
        ]);
        setStock(stockArray)
      } else {
        setFormData({...InitialFormData});
        setStock([]);
      }
    }
  }, [showDialog, selectedProduct]);

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Make New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* 제품 등록 번호 */}
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter SKu"
              required
              value={formData.sku}
            />
          </Form.Group>
          {/* 제품명 */}
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
          {/* 제품 설명 */}
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Description"
              as="textarea"
              rows={3}
              required
              value={formData.description}
            />
          </Form.Group>
          {/* 재고수량 입력 */}
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label className="mr-1">Stock</Form.Label>
            <Button size="sm" onClick={addStock}>
              재고 추가하기
            </Button>
            <div className="mt-2">

              {stock.map((item, index) => (
                <Row key={index}>
                  <Col sm={4}>
                    <Form.Select
                      onChange={(event) =>
                        handleColorChange(event.target.value, index)
                      }
                      required
                      defaultValue={item[0] ? item[0].toLowerCase() : ""}
                    >
                      <option value="" disabled selected hidden>
                        색상을 고르시오
                      </option>
                      {COLOR.map((item, index) => (
                        <option
                          inValid={true}
                          value={item.toLowerCase()}
                          disabled={stock.some(
                            (color) => color[0] === item.toLowerCase()
                          )}
                          key={index}
                        >
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      onChange={(event) =>
                        handleStockChange(event.target.value, index)
                      }
                      type="number"
                      placeholder="재고 수량을 입력하세요"
                      value={item[1]}
                      required
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteStock(index)}
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </Form.Group>
          {/* 이미지 업로드  */}
          <Form.Group className="mb-3" controlId="Image" required>
            <Form.Label>Image</Form.Label>
            <CloudinaryUploadWidget uploadImage={uploadImage} />
            <img
              id="uploadedimage"
              src={formData.image}
              className="upload-image mt-2"
              alt="uploadedimage"
            />
          </Form.Group>

          <Row className="mb-3">
            {/* 가격정보 */}
            <Form.Group as={Col} controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={formData.price}
                required
                onChange={handleChange}
                type="number"
                placeholder="0"
              />
            </Form.Group>

            {/* 카테고리 정보 */}
            <Form.Group as={Col} controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={onHandleCategory}
                value={formData.category}
                required
              >
                {CATEGORY.map((item, idx) => (
                  <option key={idx} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* 제품 리스트 공개여부 */}
            <Form.Group as={Col} controlId="status">
              <Form.Select
                value={formData.status}
                onChange={handleChange}
                required
              >
                {STATUS.map((item, idx) => (
                  <option key={idx} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          {mode === "new" ? (
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="secondary" type="submit">
              Edit
            </Button>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default NewItemModal;
