"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_#27272a_0%,_#09090b_58%,_#050506_100%)] p-6">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-[70%] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-zinc-950/75 p-8 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/[0.12] bg-white/[0.07] text-5xl shadow-[0_18px_45px_-18px_rgba(99,102,241,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <span className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]">🎬</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">Rekumovies</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Sign in to browse, search and discover films.
          </p>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-8 flex w-full min-h-13 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-[15px] font-semibold text-zinc-900 shadow-[0_8px_24px_-12px_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-zinc-50 hover:shadow-[0_12px_28px_-12px_rgba(255,255,255,0.55)] active:translate-y-0 active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <svg className="mr-3 h-[18px] w-[18px] shrink-0" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.716v2.255h2.909c1.702-1.567 2.684-3.875 2.684-6.612Z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.183l-2.909-2.255c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.039-3.714H.956v2.332A9 9 0 0 0 9 18Z" />
            <path fill="#FBBC05" d="M3.961 10.707A5.418 5.418 0 0 1 3.682 9c0-.593.102-1.17.279-1.707V4.961H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.039l3.005-2.332Z" />
            <path fill="#EA4335" d="M9 3.579c1.321 0 2.507.454 3.44 1.346l2.581-2.581C13.463.891 11.426 0 9 0A9 9 0 0 0 .956 4.961L3.961 7.293C4.672 5.164 6.656 3.579 9 3.579Z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-500">
          We use your name and email only to identify your session.
        </p>
      </div>
    </main>
  );
}
