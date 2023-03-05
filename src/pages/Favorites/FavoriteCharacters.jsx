import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

function FavoriteCharacters() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesStored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesStored);
  }, []);

  // Remove from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (item) => !(item.id === id && item.type === "character")
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveClick = (id) => {
    removeFromFavorites(id);
  };
  // --

  const favoriteCharactersIds = React.useMemo(
    () =>
      favorites
        .filter((favorite) => favorite.type === "character")
        .map((favChar) => favChar.id),
    [favorites]
  );

  let favoriteCharactersQuery = gql`
      query {
        charactersByIds(ids: [${favoriteCharactersIds.join(",")}]) {
          id
          name
          status
          species
          gender
          origin {
            name
          }
          location {
            name
          }
          image
        }
      }
    `;

  console.log(favoriteCharactersIds);

  const { data, error, loading } = useQuery(favoriteCharactersQuery);
  const charactersData = data?.charactersByIds;
  if (loading) return <p>Loading...</p>;
  if (error) return <p></p>;

  return (
    <div>
      {charactersData.map((favChar) => (
        <div
          className="character-card text-gray-800 font-medium"
          style={{ margin: "10px" }}
          key={favChar.id}
        >
          <img
            src={favChar.image}
            alt={favChar.name}
            style={{ height: "200px", width: "200px" }}
          />

          <h3>Name: {favChar.name}</h3>
          <p>Species: {favChar.species}</p>
          <p>Status: {favChar.status}</p>
          <p>Gender: {favChar.gender}</p>
          <p>Origin: {favChar.origin.name}</p>

          <p>Current location: {favChar.location.name}</p>
          <h2>id: {favChar.id}</h2>
          <button onClick={() => handleRemoveClick(favChar.id)}>
            Remove from favorites
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteCharacters;
