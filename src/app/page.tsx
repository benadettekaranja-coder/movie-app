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
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      <h1 className="text-2xl font-bold p-4 text-white">
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
      <div className="flex justify-center gap-3 p-6">
  <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
  >
    ← Previous
  </button>
  <span className="flex items-center text-white text-sm bg-zinc-800 px-4 py-2 rounded-lg">
    Page {page} of {totalPages}
  </span>
  <button
    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
    disabled={page === totalPages}
    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
  >
    Next →
  </button>
</div>
    </main>
  );
}