import { useState, useEffect, useRef } from "react";

import NavigationBar from "./components/navigation-bar/NavigationBar.js";
import SearchResults from "./components/search-results/SearchResults.js";
import PickedMovieWindow from "./components/picked-movie-window/PickedMovieWindow.js";

const key = "ab7333ba";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [pickedMovieIndex, setPickedMovieIndex] = useState(-1);

  const lastPageNumber = useRef(0);

  function handleSearchQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmitSearchQuery() {
    if (query.length < 2) return;

    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
      .then((results) => {
        console.log(results);
        return results.json();
      })
      .then((json) => {
        console.log(json.totalResults);
        if (json.Response === "False") return;
        lastPageNumber.current = Math.ceil(json.totalResults / 10);
        setMovies(json.Search);
        setCurrentPage(1);
      });
  }

  function handlePrevPageClick() {
    if (currentPage === 1) return;
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function handleNextPageClick() {
    if (currentPage === lastPageNumber) return;
    setCurrentPage((cp) => cp + 1);

    if (movies.length / 10 - 1 >= currentPage) return;
    fetch(
      `http://www.omdbapi.com/?apikey=${key}&s=${query}&page=${currentPage + 1}`
    )
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        if (json.Response === "False") return;
        console.log(json.Search);
        setMovies([...movies, ...json.Search]);
      });
  }

  function handlePickMovie(event) {
    const clickedMovie = event.target.closest(".movie");
    if (clickedMovie) {
      const clickedMovieIndex = movies.findIndex(
        (movie) => clickedMovie.id === movie.imdbID
      );

      setPickedMovieIndex(clickedMovieIndex);
      if (Object.keys(movies[clickedMovieIndex]).length === 5) {
        console.log("test");
        fetch(`http://www.omdbapi.com/?apikey=${key}&i=${clickedMovie.id}`)
          .then((response) => response.json())
          .then((json) => {
            const newMovies = movies.slice();
            newMovies[clickedMovieIndex] = json;
            setMovies(newMovies);
          });
      }
    }
  }

  function handleUnpickMovie() {
    setPickedMovieIndex(-1);
  }

  return (
    <>
      <NavigationBar
        query={query}
        onSearchQueryChange={handleSearchQueryChange}
        onSubmitSearchQuery={handleSubmitSearchQuery}
      />
      {/* <PickedMovieWindow
        movie={pickedMovieIndex !== -1 ? movies.at(pickedMovieIndex) : null}
        onClose={handleUnpickMovie}
      /> */}
      {pickedMovieIndex !== -1 && (
        <PickedMovieWindow
          movie={movies.at(pickedMovieIndex)}
          onClose={handleUnpickMovie}
        />
      )}
      <SearchResults
        isDisabled={pickedMovieIndex !== -1}
        query={query}
        movies={movies.slice((currentPage - 1) * 10, currentPage * 10)}
        page={currentPage}
        onPrevPageClick={currentPage !== null ? handlePrevPageClick : null}
        onNextPageClick={currentPage !== null ? handleNextPageClick : null}
        onMovieClick={pickedMovieIndex === -1 ? handlePickMovie : null}
      />
    </>
  );
}

export default App;
