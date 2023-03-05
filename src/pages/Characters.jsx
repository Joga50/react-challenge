import React from "react";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "../components/CharacterCard";

export default function Characters() {
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  let charactersQuery = gql`query {
    characters(page: ${page}) {
      info {
        count
      }
      results {
        id
        name
        species
        status
        image
        gender
        location {
          name
        }
        origin {
          name
        }
   
      }
    }
  }`;
  const { data, loading, error } = useQuery(charactersQuery);

  const characters = React.useMemo(() => data?.characters?.results, [data]);

  console.log(characters, data);

  const totalOfRegisters = React.useMemo(
    () => data?.characters?.info?.count,
    [data]
  );

  if (loading)
    return (
      <p className="text-4xl font-bold text-white bg-gradient-to-r from-purple-800 to-purple-500 p-6 rounded-md shadow-lg m-5">
        Loading...
      </p>
    );
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="characters">
      <div
        style={{
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => {
            if (page > 1) {
              setPage((prevValue) => prevValue - 1);
            }
          }}
        >
          Previous Page
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (page < totalOfRegisters) {
              setPage((prevValue) => prevValue + 1);
            }
          }}
        >
          Next Page
        </button>
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-800 to-purple-500 p-6 rounded-md shadow-lg m-5">
          Characters
        </h1>
      </div>

      {characters.length > 0 && (
        <div className="characters-container grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard
              image={character.image}
              key={character.id}
              id={character.id}
              name={character.name}
              species={character.species}
              status={character.status}
              origin={character.origin.name}
              gender={character.gender}
              location={character.location.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
