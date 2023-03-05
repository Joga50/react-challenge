import React from "react";

function EpisodesCard({
  id,
  name,
  air_date,
  episode,
  characters,
  url,
  created,
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
      (favorite) => favorite.id === id && favorite.type === "episode"
    );
    if (isFavorite) {
      itemExists();
    } else {
      favorites.push({ type: "episode", id });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${name} added to favorites`);
    }
  };

  const logAlert = () => {
    alert("you have to be logged to add cards to favorites");
  };

  const itemExists = () => {
    alert("card already exist in you favorites folder");
  };

  return (
    <div
      className="episode-card  text-gray-800 font-medium"
      style={{ margin: "10px" }}
    >
      <h3>Name: {name}</h3>
      <p>Air date: {air_date}</p>
      <p>Episode: {episode}</p>
      <p>Created: {created}</p>
      <h2>id: {id}</h2>
      <button onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
}

export default EpisodesCard;
