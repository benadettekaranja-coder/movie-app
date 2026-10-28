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
          className="w-full rounded-l-full border border-r-0 border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="rounded-r-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Search
        </button>
      </div>
    </form>
  );
}
