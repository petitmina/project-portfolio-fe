import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, field }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });
    }
  };
  return (
    <div className="search-box mb-5 mt-5">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder='제품명을 입력하세요'
        onKeyDown={onCheckEnter}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default SearchBox;
