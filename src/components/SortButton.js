import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const SortButton = ({ sortedProducts, setSortedProducts }) => {
  const [sortOption, setSortOption] = useState("정렬하기");
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    const sorted = [...productList];
    if (sortOption === "최신순") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "낮은 가격순") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "높은 가격순") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  }, [sortOption, productList]);

  const handleSortChange = (eventKey) => {
    setSortOption(eventKey);
  };

  return (
    <div>
      <div className="d-flex justify-content-end w-50px">
        <Dropdown onSelect={handleSortChange}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {sortOption}
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center">
            <Dropdown.Item eventKey="최신순">최신순</Dropdown.Item>
            <Dropdown.Item eventKey="낮은 가격순">낮은 가격순</Dropdown.Item>
            <Dropdown.Item eventKey="높은 가격순">높은 가격순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default SortButton;
