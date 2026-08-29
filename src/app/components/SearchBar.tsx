"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search movie.."
        className="border rounded px-3 py-2 w-full max-w-md"
      />
      <button type="submit" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
        search
      </button>
    </form>
  );
}