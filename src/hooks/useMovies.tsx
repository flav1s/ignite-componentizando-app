import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GenreResponseProps,
  MovieProps,
  MoviesContextData,
} from "../components/interface";
import { api } from "../services/api";

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

const MoviesProvider: React.FC = ({ children }) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  const selectGenreId = (id: number) => setSelectedGenreId(id);
  const getMovies = () => movies;
  const getSelectedGenre = () => selectedGenre;

  const contextData: MoviesContextData = {
    genres,
    selectedGenreId,
    selectGenreId,
    getSelectedGenre,
    getMovies,
  };

  return (
    <MoviesContext.Provider value={contextData}>
      {children}
    </MoviesContext.Provider>
  );
};

const useMovies = (): MoviesContextData => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }

  return context;
};

export { MoviesProvider, useMovies };
