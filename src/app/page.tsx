import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreBar from "./components/GenreBar";
import HeroCarousel from "./components/HeroCarousel";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import {
  discoverByGenre,
  getGenres,
  getPopular,
  getTrending,
  searchMovies,
} from "@/lib/tmdb";

const MAX_PAGES = 500;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; genre?: string }>;
}) {
  const { q, page: pageParam, genre: genreParam } = await searchParams;

  const query = (q ?? "").trim();
  const genreId = genreParam ? Number(genreParam) : undefined;
  const page = Math.max(1, Number(pageParam ?? "1") || 1);

  const genres = await getGenres();

  const list = query
    ? await searchMovies(query, page)
    : genreId
      ? await discoverByGenre(genreId, page)
      : await getPopular(page);

  const isDefaultView = !query && !genreId && page === 1;
  const trending = isDefaultView ? await getTrending() : null;

  const totalPages = Math.min(Math.max(list.total_pages, 1), MAX_PAGES);
  const activeGenre = genres.find((genre) => genre.id === genreId);

  const heading = query
    ? `Results for “${query}”`
    : activeGenre
      ? activeGenre.name
      : "Popular Movies";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      {trending && (
        <HeroCarousel movies={trending.results.slice(0, 6)} genres={genres} />
      )}

      <SearchBar initialQuery={query} />
      <GenreBar genres={genres} activeGenre={genreId} />

      <div className="mx-auto max-w-6xl">
        <h2 className="px-4 pt-2 text-xl font-semibold">{heading}</h2>

        {list.results.length === 0 ? (
          <p className="px-4 py-16 text-center text-zinc-400">
            No movies found. Try a different search or genre.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {list.results.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                />
              </li>
            ))}
          </ul>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          params={{
            q: query || undefined,
            genre: genreId ? String(genreId) : undefined,
          }}
        />
      </div>
    </main>
  );
}
