import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

function FavoriteEpisodes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesStored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesStored);
  }, []);
  const favoriteEpisodesIds = React.useMemo(
    () =>
      favorites
        .filter((favorite) => favorite.type === "episode")
        .map((favEp) => favEp.id),
    [favorites]
  );

  let favoriteEpisodesQuery = gql`
      query {
        episodesByIds(ids: [${favoriteEpisodesIds.join(",")}]) {
          id
          name
          air_date
          episode
          created
        }
      }
    `;

  console.log(favoriteEpisodesIds);

  const { data, error, loading } = useQuery(favoriteEpisodesQuery);
  const episodesData = data?.episodesByIds;
  if (loading) return <p>Loading...</p>;
  if (error) return <p></p>;

  console.log(data, episodesData);
  return (
    <div>
      {episodesData.map((favEp) => (
        <div
          className="episode-card text-gray-800 font-medium"
          style={{ margin: "10px" }}
          key={favEp.id}
        >
          <p>Name: {favEp.name}</p>
          <p>Air date: {favEp.air_date}</p>
          <p>Episode: {favEp.episode}</p>
          <p>id: {favEp.id}</p>
          <p>Created: {favEp.created}</p>
          <button>Remove from favorites</button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteEpisodes;
