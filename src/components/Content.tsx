import React from "react";

import { MovieCard } from "./MovieCard";
import { useMovies } from "../hooks/useMovies";

const Content = () => {
  const { getSelectedGenre, getMovies } = useMovies();
  const selectedGenre = getSelectedGenre();
  const movies = getMovies();

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Content;
