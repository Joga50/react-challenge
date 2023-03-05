import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

function FavoriteLocations() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesStored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesStored);
  }, []);
  const favoriteLocationsIds = React.useMemo(
    () =>
      favorites
        .filter((favorite) => favorite.type === "location")
        .map((favLoc) => favLoc.id),
    [favorites]
  );

  let favoriteLocationsQuery = gql`
  query 
  { 
    locationsByIds(ids: [${
      favoriteLocationsIds.length ? favoriteLocationsIds.join(",") : ""
    }]) { 
      id 
      name 
      type 
      dimension 
      created 
      residents { 
        name 
      } 
    } 
  }`;

  console.log(favoriteLocationsIds);

  const { data, error, loading } = useQuery(favoriteLocationsQuery);
  const locationsData = data?.locationsByIds;
  if (loading)
    return <p className="text-2xl bg-purple-500 text-white p-4">Loading...</p>;
  if (error) return <p></p>;
  console.log(data, locationsData);

  return (
    <div>
      {locationsData.map((favLoc) => (
        <div
          className="location-card text-gray-800 font-medium"
          style={{ margin: "10px" }}
          key={favLoc.id}
        >
          <p> Name: {favLoc.name}</p>
          <p> Type: {favLoc.type}</p>
          <p> Dimension: {favLoc.dimension}</p>
          <p> Created: {favLoc.created}</p>
          <p> Residents: {favLoc.residents.map((resident) => resident.name)}</p>
          <p> id: {favLoc.id}</p>
          <button>Remove from favorites</button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteLocations;
