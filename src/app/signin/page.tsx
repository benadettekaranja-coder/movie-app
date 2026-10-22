"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#27272a_0%,_#09090b_60%)] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <div className="text-5xl">🎬</div>
          <h1 className="mt-3 text-3xl font-bold text-white">Rekumovies</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to browse, search and discover films.
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-white px-5 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-sm font-bold text-[#4285F4]">
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-500">
          We use your name and email only to identify your session.
        </p>
      </div>
    </main>
  );
}
