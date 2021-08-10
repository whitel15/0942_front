import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ search_what }) {
  const [search, setSearch] = useState(search_what);
  const onChange = e => {
    setSearch(e.target.value);
  };

  return (
    <div className="searchBar">
      <form id="search">
        <input
          onChange={onChange}
          value={search}
          type="text"
          placeholder="물품명을 검색해보세요"
        />
        <Link to={{ pathname: "/main", state: { search } }}>
          <input type="submit" value="Find" hidden />
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
