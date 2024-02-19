import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../../actions/userAction";

const AdminRegisterPage = () => {
  const [adminFormData, setAdminFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmedPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("");

  const adminRegister = (event) => {
    event.preventDefault();
    const { email, name, password, confirmedPassword } = adminFormData;

    if (password !== confirmedPassword) {
      setPasswordError("패스워드가 일치하지 않습니다");
      return;
    }
    setPasswordError("");
    setPasswordError(false);
    dispatch(
      userActions.registerUser({ email, name, password, level: "admin" }, navigate)
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setAdminFormData({ ...adminFormData, [id]: value });
  };

  return (
    <>
      <Container className="admin-form mt-5 w-25">
        <Form onSubmit={adminRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Admin Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Admin name</Form.Label>
            <Form.Control
              type="name"
              id="name"
              placeholder="이름을 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Admin Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Admin confirmedPassword</Form.Label>
            <Form.Control
              type="password"
              id="confirmedPassword"
              placeholder="비밀번호를 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
          <br />
          <Button variant="secondary" type="submit">
            관리자 회원가입 하기
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AdminRegisterPage;
