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
  <div className="flex justify-center">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="border rounded-l-full px-4 py-3 w-full max-w-md text-black placeholder-gray-400"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700"
    >
      Search
    </button>
  </div>
</form>
  );
}