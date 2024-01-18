import "./style.css";

function SearchField({ query, onSearchQueryChange, onSubmitSearchQuery }) {
  return (
    <div className="search-field">
      <input
        className="search-field__input"
        placeholder="Search for the film..."
        onChange={onSearchQueryChange}
        value={query}
      />
      <button
        className="search-field__submit"
        type="submit"
        onClick={onSubmitSearchQuery}
      >
        Search
      </button>
    </div>
  );
}

export default SearchField;
