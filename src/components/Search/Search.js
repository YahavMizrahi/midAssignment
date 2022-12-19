import React from "react";

function Search({ searchByInput }) {
  return (
    <div>
      <label>Search: </label>
      <input type={"text"} onChange={(e) => searchByInput(e.target.value.toLowerCase())} />
    </div>
  );
}

export default Search;
