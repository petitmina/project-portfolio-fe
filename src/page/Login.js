import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail } from "../reducer/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }= useSelector((state) => state.user);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginSubmit = (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    dispatch(loginWithEmail({email, password}));
  };

  const handleChangeLogin = (event) => {
    event.preventDefault();
    const {id, value} = event.target;
    setLoginData({ ...loginData, [id]: value});
  }

  if(user) {
    navigate('/')
  }

  return (
    <Container className="login-form mt-5 w-25">
      <Form onSubmit={loginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id='email'
            placeholder="이메일을 입력하세요"
            onChange={handleChangeLogin}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleChangeLogin}
            required
          />
        </Form.Group>
        <div className="display-space-between mt-4">
          <Button variant="secondary" type="submit">
            Login
          </Button>
          <div>
            회원이 아니신가요?
            <Link to="/register" className="text-decoration-none">
              회원가입 하기
            </Link>{" "}
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
