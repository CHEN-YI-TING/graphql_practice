import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const QUERY_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      age
      nationality
      id
    }
  }
`;
function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="username..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="age..."
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="nationality..."
        onChange={(e) => {
          setNationality(e.target.value.toUpperCase());
        }}
      />
      <button
        onClick={() => {
          createUser({
            variables: {
              input: { name, username, age: Number(age), nationality },
            },
          });
          refetch();
        }}
      >
        建立使用者
      </button>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
            </div>
          );
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div key={movie.name}>
              <h1>Name: {movie.name}</h1>
            </div>
          );
        })}

      <div>
        <input
          type="text"
          placeholder="Interstellar...."
          onChange={(e) => {
            setMovieSearched(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1>There was an error fetching the</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
