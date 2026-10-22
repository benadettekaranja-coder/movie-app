"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-6">
      <div className="mx-auto flex max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          className="w-full rounded-l-full border border-r-0 border-zinc-700 bg-zinc-900 px-5 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          className="rounded-r-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
