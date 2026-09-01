"use client";

import { signIn } from "next-auth/react";

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Movie App</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-white text-black px-4 py-2 rounded hover:bg-zinc-200"
      >
        Sign in with Google
      </button>
    </header>
  );
}