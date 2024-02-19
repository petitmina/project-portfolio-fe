import React from "react";

const Admin = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center border-none mt-5 p-5">
      <div className="mb-5" > 
        <button
          style={{
            border: "none",
            width: "200px",
            height: "100px",
            borderRadius: "10px",
            marginRight: "30px",
          }}
        >
          <a
            href="/admin/register"
            style={{ textDecoration: "none", color: "black" }}
          >
            관리자 회원가입하기
          </a>
        </button>
        <button
          style={{
            border: "none",
            width: "200px",
            height: "100px",
            borderRadius: "10px",
          }}
        >
          <a href="/login" style={{ textDecoration: "none", color: "black" }}>
            로그인 하기
          </a>
        </button>
      </div>

      <div>
      <button
          style={{
            border: "none",
            width: "200px",
            height: "100px",
            borderRadius: "10px",
            marginRight: "30px",
          }}
        >
          <a
            href="/admin/product"
            style={{ textDecoration: "none", color: "black" }}
          >
            제품 관리
          </a>
        </button>
        <button
          style={{
            border: "none",
            width: "200px",
            height: "100px",
            borderRadius: "10px",
          }}
        >
          <a href="/admin/order" style={{ textDecoration: "none", color: "black" }}>
            주문 관리
          </a>
        </button>
      </div>
    </div>
  );
};

export default Admin;
