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
  type Movie,
} from "@/lib/tmdb";

const MAX_PAGES = 500;

function MovieRail({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <section className="relative py-5 sm:py-7">
      <div className="mb-4 flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            Curated for you
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        </div>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 sm:gap-4 sm:px-6 lg:px-8">
        {movies.map((movie) => (
          <li key={movie.id} className="w-[42vw] max-w-[210px] shrink-0 snap-start sm:w-[190px]">
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

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
  const heading = query ? `Results for “${query}”` : activeGenre ? activeGenre.name : "Popular Movies";

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
      <Header />
      {isDefaultView && trending ? (
        <>
          <HeroCarousel movies={trending.results.slice(0, 6)} genres={genres} />
          <div className="relative z-20 -mt-8 rounded-t-[2rem] bg-[#090909] pb-10">
            <SearchBar initialQuery={query} />
            <GenreBar genres={genres} activeGenre={genreId} />
            <MovieRail title="Trending now" movies={trending.results.slice(0, 12)} />
            <MovieRail title="Popular on Reku" movies={list.results.slice(0, 12)} />
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-6xl pt-28">
          <SearchBar initialQuery={query} />
          <GenreBar genres={genres} activeGenre={genreId} />
          <h1 className="px-4 pb-2 pt-6 text-2xl font-bold">{heading}</h1>
          {list.results.length === 0 ? (
            <p className="px-4 py-16 text-center text-zinc-400">No movies found. Try a different search or genre.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {list.results.map((movie) => (
                <li key={movie.id}>
                  <MovieCard id={movie.id} title={movie.title} posterPath={movie.poster_path} rating={movie.vote_average} />
                </li>
              ))}
            </ul>
          )}
          <Pagination page={page} totalPages={totalPages} params={{ q: query || undefined, genre: genreId ? String(genreId) : undefined }} />
        </div>
      )}
    </main>
  );
}
