"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function initials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = session?.user;

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 shadow-lg backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🎬</span>
          <span className="font-semibold text-white">Rekumovies</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black"
          >
            Home
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 py-1 pl-1 pr-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold">
                  {initials(user?.name)}
                </span>
              )}
              <span className="hidden max-w-[9rem] truncate sm:inline">
                {user?.name ?? "Account"}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-md"
              >
                <div className="px-3 py-2">
                  {user ? (
                    <>
                      <p className="truncate text-sm font-medium text-white">{user.name}</p>
                      <p className="truncate text-xs text-zinc-400">{user.email}</p>
                    </>
                  ) : (
                    <p className="text-sm text-zinc-300">Discover without signing in</p>
                  )}
                </div>
                <div className="my-1 h-px bg-white/10" />
                {user ? (
                  <button
                    role="menuitem"
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="w-full rounded-lg border border-white/20 px-3 py-2 text-left text-sm text-white transition-all hover:border-transparent hover:bg-red-600/80"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    role="menuitem"
                    href="/signin"
                    className="block w-full rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold text-black"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
