import React from "react";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../reducer/userReducer";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmedPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  // const [error, setError] = useState('')

  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmedPassword } = formData;

    if (password !== confirmedPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다");
      return;
    }
    setPasswordError("");
    setPasswordError(false);
    dispatch(registerUser({email, name, password}));
    console.log('lll',register)
  };


  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    
  };

  if(loading === true) {
    navigate('/login');
  }

  return (
    <>
      <Container className="register-form mt-5 w-25">
        <Form onSubmit={register}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmed Password</Form.Label>
            <Form.Control
              type="password"
              id="confirmedPassword"
              placeholder="비밀번호를 한 번더 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
          <br />
          <Button variant="secondary" type="submit">
            회원가입 하기
          </Button>
          {/* <div className="d-grid gap-1"></div> */}
        </Form>
      </Container>
    </>
  );
};

export default Register;
