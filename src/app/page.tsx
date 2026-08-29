"use client";

import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [searchQuery]);

  return (
    <main>
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      <h1 className="text-2xl font-bold p-4">
        {searchQuery ? "Search Results" : "Popular Movies"}
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {movies.map(
          (movie: {
            id: number;
            title: string;
            poster_path: string;
            vote_average: number;
          }) => (
            <li key={movie.id}>
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            </li>
          )
        )}
      </ul>
    </main>
  );
}