import React, { useEffect, useState } from "react";

function CharacterCard({
  id,
  name,
  status,
  species,
  gender,
  origin,
  location,
  image,
  episode,
}) {
  const addToFavorites = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      logAlert();
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("favorites:", favorites);
    const isFavorite = favorites.find(
      (favorite) => favorite.id === id && favorite.type === "character"
    );
    if (isFavorite) {
      itemExists();
    } else {
      favorites.push({ type: "character", id });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${name} added to favorites`);
    }
  };

  const logAlert = () => {
    alert("You have to be logged to add cards to your favorites folder");
  };

  const itemExists = () => {
    alert("This card already exist in you favorites folder");
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesStored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesStored);
  }, []);

  const isFavorite = favorites.find(
    (favorite) => favorite.id === id && favorite.type === "character"
  );

  return (
    <div
      className="character-card text-gray-800 font-medium"
      style={{ margin: "10px" }}
    >
      <img src={image} alt={name} style={{ height: "200px", width: "200px" }} />
      <div>
        <h3>Name: {name}</h3>
        <p>Species: {species}</p>
        <p>Status: {status}</p>
        <p>Gender: {gender}</p>
        <p>Origin: {origin}</p>

        <p>Current Location: {location}</p>
        <h2>id: {id}</h2>
      </div>
      <button onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
}

export default CharacterCard;
