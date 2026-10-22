"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Genre, Movie } from "@/lib/tmdb";

export default function HeroCarousel({
  movies,
  genres,
}: {
  movies: Movie[];
  genres: Genre[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || movies.length <= 1) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % movies.length),
      5000
    );
    return () => clearInterval(timer);
  }, [paused, movies.length]);

  if (movies.length === 0) return null;
  const movie = movies[index];
  const year = movie.release_date?.slice(0, 4);
  const genre = movie.genre_ids
    .map((id) => genres.find((item) => item.id === id)?.name)
    .find(Boolean);

  return (
    <section
      aria-label="Trending movies"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative h-[70vh] min-h-[420px] max-h-[640px] w-full overflow-hidden"
    >
      {movies.map((item, position) => (
        <div
          key={item.id}
          aria-hidden={position !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            position === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end gap-3 p-6 pb-16">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
          {movie.title}
        </h2>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-yellow-400">
            ★ {movie.vote_average.toFixed(1)}/10
          </span>
          {year && <span className="text-zinc-300">{year}</span>}
          {genre && (
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs text-white backdrop-blur-md">
              {genre}
            </span>
          )}
        </div>

        <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          {movie.overview}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <circle cx="10" cy="10" r="7.5" />
              <path d="M10 9v4.5M10 6.5h.01" strokeLinecap="round" />
            </svg>
            More info
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
        {movies.map((item, position) => (
          <button
            key={item.id}
            onClick={() => setIndex(position)}
            aria-label={`Show ${item.title}`}
            aria-current={position === index}
            className={`h-2 rounded-full transition-all ${
              position === index
                ? "w-6 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
