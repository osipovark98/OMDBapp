import { useEffect, useRef } from "react";

import "./style.css";

function PickedMovieWindow({ movie, onClose }) {
  const movieWindow = useRef(null);
  const clickNumber = useRef(0);

  const {
    Title: title,
    Poster: poster,
    Plot: synopsis,
    Runtime: duration,
    imdbRating,
    Country: country,
    Year: year,
    Director: director,
    BoxOffice: boxOffice,
    Genre: genre,
  } = movie;

  function handleDocumentClick(event) {
    console.log("click");
    const clickedElem = document.elementFromPoint(event.x, event.y);
    clickNumber.current++;
    if (!clickedElem.closest(".picked-movie") && clickNumber.current !== 1) {
      handleClose();
    }
  }

  function handleClose() {
    setTimeout(() => movieWindow.current.classList.remove("displayed"), 0);
    movieWindow.current.ontransitionend = () => onClose();
  }

  useEffect(() => {
    setTimeout(() => movieWindow.current.classList.add("displayed"), 0);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      console.log("unclick");
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className={`picked-movie`} ref={movieWindow}>
      <img
        className="picked-movie__poster"
        src={poster}
        alt={`poster of the ${title} movie`}
      />
      <div className="picked-movie__info">
        <header className="picked-movie__header">
          <h3 className="picked-movie__title">{title}</h3>
          <button
            className="picked-movie__btn picked-movie__btn--close"
            onClick={handleClose}
          >
            &#10006;
          </button>
        </header>
        <p className="picked-movie__synopsis">{synopsis}</p>
        <div className="picked-movie__stats-carousel">
          <ul className="picked-movie__stats-list">
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">⏳ Duration</p>
              <p className="picked-movie__stat-value">{duration}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">⭐ Rating</p>
              <p className="picked-movie__stat-value">{imdbRating}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">🌎 Country</p>
              <p className="picked-movie__stat-value">{country}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">📅 Year</p>
              <p className="picked-movie__stat-value">{year}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">🧑 Director</p>
              <p className="picked-movie__stat-value">{director}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">💰 Box Office</p>
              <p className="picked-movie__stat-value">{boxOffice}</p>
            </li>
            <li className="picked-movie__stat">
              <p className="pciked-movie__stat-name">🛸 Genre</p>
              <p className="picked-movie__stat-value">{genre}</p>
            </li>
          </ul>
        </div>
        <div className="picked-movie__user-rating">
          Add this movie to your list to rate it.
        </div>
        <div className="picked-movie__controls">
          <button className="picked-movie__btn picked-movie__btn--delete">
            Delete
          </button>
          <button className="picked-movie__btn picked-movie__btn--add">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickedMovieWindow;
