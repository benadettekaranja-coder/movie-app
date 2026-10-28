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
      className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-2.5 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_24px_55px_-28px_rgba(0,0,0,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="overflow-hidden rounded-xl bg-zinc-900/60 shadow-inner">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="aspect-[2/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center px-4 text-center text-xs text-zinc-400">
            No poster available
          </div>
        )}
      </div>
      <div className="px-1 pb-1 pt-3">
        <h2 className="truncate text-sm font-semibold tracking-tight text-white drop-shadow-sm" title={title}>
          {title}
        </h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-300">
          <span className="text-yellow-400" aria-hidden="true">★</span>
          <span className="text-white">{rating.toFixed(1)}</span>
          <span className="text-zinc-500">/ 10</span>
        </p>
      </div>
    </Link>
  );
}
