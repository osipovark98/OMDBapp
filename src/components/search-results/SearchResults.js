import "./style.css";

import Movie from "../movie/Movie.js";

function SearchResults({
  isDisabled,
  movies,
  page,
  onPrevPageClick,
  onNextPageClick,
  onMovieClick,
}) {
  return (
    <div className={`search-results ${isDisabled ? "disabled" : ""}`}>
      <ul className="movie-list" onClick={isDisabled ? null : onMovieClick}>
        {movies.map((movie) => (
          <Movie key={movie.imdbID} info={movie} />
        ))}
      </ul>
      <div className="page-buttons">
        <button
          className="page-button page-button--prev"
          onClick={isDisabled ? null : onPrevPageClick}
        >
          &lt;
        </button>
        <span>{page}</span>
        <button
          className="page-button page-button--next"
          onClick={isDisabled ? null : onNextPageClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default SearchResults;
