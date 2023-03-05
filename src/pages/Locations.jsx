import React from "react";
import { useQuery, gql } from "@apollo/client";
import LocationsCard from "../components/LocationsCard";

export default function Location() {
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  let locationsQuery = gql`query {
    locations(page: ${page}) {
      info {
        count
      }
      results {
        id
        name
        type
        dimension
        created
        residents {
          name
        }
      
      
      }
    }
  }`;
  const { data, loading, error } = useQuery(locationsQuery);

  const locations = React.useMemo(() => data?.locations?.results, [data]);

  console.log(locations, data);

  const totalOfRegisters = React.useMemo(
    () => data?.locations?.info?.count,
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
    <div className="locations">
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
          Locations
        </h1>
      </div>

      {locations.length > 0 && (
        <div className="locations-container">
          {locations.map((location) => (
            <LocationsCard
              id={location.id}
              key={location.id}
              name={location.name}
              tpye={location.type}
              dimension={location.dimension}
              created={location.created}
              residents={location.residents}
            />
          ))}
        </div>
      )}
    </div>
  );
}
