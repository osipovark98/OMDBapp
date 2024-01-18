import "./style.css";

function Movie({ info }) {
  const { Title: title, Year: year, Poster: poster, imdbID } = info;
  return (
    <li className="movie" id={imdbID}>
      <h3 className="movie__title">{title}</h3>
      <img className="movie__poster" src={poster} />
      <button className="movie__bookmark-button">+</button>
    </li>
  );
}

export default Movie;
