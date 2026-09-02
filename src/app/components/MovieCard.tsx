export default function MovieCard({
  title,
  posterPath,
  rating,
}: {
  title: string;
  posterPath: string;
  rating: number;
}) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img
        src={posterUrl}
        alt={title}
        className="w-full aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h2 className="font-bold text-sm truncate">{title}</h2>
        <p className="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}/10</p>
      </div>
    </div>
  );
}