import Link from "next/link";

export default function MovieCard({
  id,
  title,
  posterPath,
  rating,
}: {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
}) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <Link
      href={`/movie/${id}`}
      className="group block overflow-hidden rounded-lg bg-zinc-900/40 shadow-lg ring-1 ring-white/5 transition-all hover:ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center bg-zinc-800 px-2 text-center text-xs text-zinc-400">
          No poster available
        </div>
      )}
      <div className="p-3">
        <h2 className="truncate text-sm font-bold text-white">{title}</h2>
        <p className="text-sm text-yellow-400">⭐ {rating.toFixed(1)}/10</p>
      </div>
    </Link>
  );
}
