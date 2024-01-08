import React from "react";
// import {Container, Nav, Navbar } from 'react-bootstrap';
// const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
import "../styles/MainNavbar.style.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../actions/userAction";

const MainNavbar = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
    // dispatch(cartLogout());
  };

  return (
    <div className="navbar-container">
      <div className="check-admin">
        <Link
          to="/admin"
          className="d-flex mt-1 mr-1 justify-content-end text-decoration-none variant-info"
        >
          Admin page
        </Link>
      </div>

      <div className="nav-first-line">
        <div className="nav-logo">
          <a href="/">
            <img
              src="https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-307.jpg"
              alt="안경로고"
            />
          </a>
        </div>
        <div className="nav-text">
          {user ? (
            <a href="/" onClick={handleLogout} className="text-item">
              로그아웃
            </a>
          ) : (
            <a href="/login" className="text-item">
              로그인
            </a>
          )}
          <a href="/register" className="text-item">
            회원가입
          </a>
          <a href="/cart" className="text-item">
            장바구니
          </a>
          <a href="/" className="text-item">
            My Page
          </a>
        </div>
      </div>

      <div className="nav-second-line">
        <a href="/" className="text-item1">
          여성용
        </a>
        <a href="/" className="text-item1">
          남성용
        </a>
        <a href="/" className="text-item1">
          선글라스
        </a>
      </div>
    </div>
  );
};

export default MainNavbar;
