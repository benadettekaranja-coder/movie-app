"use client";

import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [searchQuery, page]);

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
      <div className="flex justify-center gap-4 p-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}