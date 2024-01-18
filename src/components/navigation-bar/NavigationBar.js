import "./style.css";

import SearchField from "../search-field/SearchField.js";

function NavigationBar({ query, onSearchQueryChange, onSubmitSearchQuery }) {
  return (
    <nav className="nav-bar">
      <SearchField
        query={query}
        onSearchQueryChange={onSearchQueryChange}
        onSubmitSearchQuery={onSubmitSearchQuery}
      />
    </nav>
  );
}

export default NavigationBar;
