import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import { getMovie, getTrailer } from "@/lib/tmdb";

function formatRuntime(minutes: number | null) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let movie;
  try {
    movie = await getMovie(id);
  } catch {
    notFound();
  }

  const trailer = await getTrailer(id);
  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="relative">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="h-[45vh] w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      <div className="mx-auto -mt-32 max-w-5xl px-4 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← Back to movies
        </Link>

        {trailer && (
          <div id="trailer" className="mb-8 overflow-hidden rounded-xl bg-black shadow-2xl scroll-mt-28">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-6 sm:flex-row">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-40 shrink-0 rounded-lg shadow-2xl sm:w-56"
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold sm:text-4xl">{movie.title}</h1>

            {movie.tagline && (
              <p className="mt-1 italic text-zinc-400">{movie.tagline}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-yellow-400">
                ★ {movie.vote_average.toFixed(1)}/10
              </span>
              {year && <span className="text-zinc-300">{year}</span>}
              {runtime && <span className="text-zinc-300">{runtime}</span>}
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs">
                {movie.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/?genre=${genre.id}`}
                  className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <p className="mt-5 max-w-2xl leading-relaxed text-zinc-300">
              {movie.overview || "No synopsis available."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                View on TMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
