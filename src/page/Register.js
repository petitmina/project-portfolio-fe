import React from "react";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userActions } from "../actions/userAction";

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


  const signUp = (event) => {
    event.preventDefault();
    const { email, name, password, confirmedPassword } = formData;

    if (password !== confirmedPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다");
      return;
    }
    setPasswordError("");
    setPasswordError(false);
    dispatch(userActions.registerUser({email, name, password, level: "customer"}));
    navigate('/login')
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  
 
  return (
    <>
      <Container className="register-form mt-5 w-25">
        <Form onSubmit={signUp}>
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
          <Button variant="secondary" type="submit" >
            회원가입 하기
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
