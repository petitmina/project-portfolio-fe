import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../../components/SearchBox";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList, setSelectedOrder } from "../../reducer/orderReducer";
import OrderDetailDialog from "./OrderDetailDialog";
import OrderTable from "../../components/OrderTable";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    ordernum: query.get("ordernum"),
  });
  const [open, setOpen] = useState(false);
  const totalPageNum = useSelector((state) => state.order.totalPageNum);
  const tableHeader = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Oder Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    dispatch(getOrderList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    if (searchQuery.ordernum === "") {
      delete searchQuery.ordernum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <div>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="주문번호"
            field="ordernum"
          />
        </div>

        <OrderTable 
            header={tableHeader}
            data={orderList}
            openEditForm={openEditForm}
        />

        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Container>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;