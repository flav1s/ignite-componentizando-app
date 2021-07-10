import React from "react";

import { Button } from "./Button";
import { useMovies } from "../hooks/useMovies";

const SideBar = () => {
  const { genres, selectedGenreId, selectGenreId } = useMovies();

  function handleClickButton(id: number) {
    selectGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
