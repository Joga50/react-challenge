import React from "react";

function LocationsCard({ id, name, type, dimension, created, residents }) {
  const addToFavorites = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      logAlert();
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("favorites:", favorites);
    const isFavorite = favorites.find(
      (favorite) => favorite.id === id && favorite.type === "location"
    );
    if (isFavorite) {
      itemExists();
    } else {
      favorites.push({ type: "location", id });
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
  const currentUser = localStorage.getItem("currentUser");
  return (
    <div
      className="location-card  text-gray-800 font-medium"
      style={{ margin: "10px" }}
    >
      <h3>Name: {name}</h3>
      <p>Type: {type}</p>
      <p>Dimension: {dimension}</p>
      <p style={{ textAlign: "left", fontWeight: "bold" }}>Residents: </p>
      <ul
        className="bg-gradient-to-r from-blue-400 to-indigo-500 inline-block"
        style={{
          background: "linear-gradient(to right, #d7b8ff, #a695e7)",
          textAlign: "left",
          borderRadius: "1em",
          padding: "5px",
        }}
      >
        {residents?.map((resident, index) => (
          <li key={index}>{resident.name}</li>
        ))}
      </ul>
      <p>Number of residents: {residents.length}</p>
      <p>Createad at: {created}</p>
      <button onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
}

export default LocationsCard;
