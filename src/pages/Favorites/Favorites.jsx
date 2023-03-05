import React, { useState } from "react";
import FavoriteCharacters from "./FavoriteCharacters";
import FavoriteEpisodes from "./FavoriteEpidosdes";
import FavoriteLocations from "./FavoriteLocations";

function Favorites() {
  const currentUser = localStorage.getItem("currentUser");
  const [filter, setFilter] = useState("");

  return (
    <div className="favorites">
      {currentUser ? (
        <div>
          <div className="favorites-container">
            <div>
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-800 to-purple-500 p-6 rounded-md shadow-lg m-5">
                Favorites
              </h1>
              <h1 className="text-1xl font-bold text-white bg-gradient-to-r from-purple-800 to-purple-500 p-6 rounded-md shadow-lg m-5">
                Please select a filter, if you want to check your favorite cards
                by category:{" "}
              </h1>

              <select
                className="bg-purple-500 text-white p-2 rounded-md text-sm m-5"
                style={{ height: "50px", width: "150px" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Show all</option>
                <option value="characters">Favorite characters</option>
                <option value="episodes">Favorite episodes</option>
                <option value="locations">Favorite locations</option>
              </select>
            </div>
            {filter === "" && (
              <>
                <FavoriteCharacters />

                <FavoriteEpisodes />
                <FavoriteLocations />
              </>
            )}
            {filter === "characters" && <FavoriteCharacters />}

            {filter === "episodes" && <FavoriteEpisodes />}
            {filter === "locations" && <FavoriteLocations />}
          </div>
        </div>
      ) : (
        <h2>Please log in or register to view your favorite cards</h2>
      )}
    </div>
  );
}

export default Favorites;
