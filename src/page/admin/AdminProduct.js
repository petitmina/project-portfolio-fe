import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../../components/SearchBox";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  setSelectedProduct,
} from "../../reducer/productReducer";
import { useSearchParams } from "react-router-dom";
import NewItemModal from "./NewItemModal";
import AdminProductTable from "./AdminProductTable";
import ReactPaginate from 'react-paginate';


const AdminProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQeury] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

  const [mode, setMode] = useState("new");
  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

  useEffect(() => {
    //상품리스트 가져오기(url쿼리 맞춰서)
    dispatch(getProductList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    //검색어나 페이지가 바뀌면 Url 바꿔주기=> url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
  }, [searchQuery]);

  const deleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const openEditForm = (product) => {
    setMode("edit");
    dispatch(setSelectedProduct(product))
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  };

    const handlePageClick = ({selected}) => {
      setSearchQuery({...searchQuery, page: selected + 1 })
    };

  return (
    <div>
      <Container>
        <div>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            field="name"
          />
        </div>
        <Button className="mb-3" onClick={handleClickNewItem}>Add New Item</Button>

        <AdminProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditFrom={openEditForm}
        />
        {/* 페이지네이션 작성하기 */}
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

      <NewItemModal
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProduct;
