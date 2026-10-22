import Link from "next/link";
import type { Genre } from "@/lib/tmdb";

export default function GenreBar({
  genres,
  activeGenre,
}: {
  genres: Genre[];
  activeGenre?: number;
}) {
  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
      active
        ? "border-white bg-white font-semibold text-black"
        : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
    }`;

  return (
    <div className="relative mx-auto max-w-6xl">
      <nav className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-4">
        <Link href="/" className={chip(!activeGenre)}>
          All
        </Link>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/?genre=${genre.id}`}
            className={chip(activeGenre === genre.id)}
          >
            {genre.name}
          </Link>
        ))}
      </nav>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
}
