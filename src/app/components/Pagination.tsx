import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  params,
}: {
  page: number;
  totalPages: number;
  params: Record<string, string | undefined>;
}) {
  const hrefFor = (target: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `/?${query}` : "/";
  };

  const button =
    "rounded-lg border border-white/10 bg-white/10 px-5 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/20";
  const enabled = "text-white";
  const disabled = "pointer-events-none text-white/40 opacity-60";

  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Link
        href={hrefFor(page - 1)}
        aria-disabled={page === 1}
        className={`${button} ${page === 1 ? disabled : enabled}`}
      >
        ← Previous
      </Link>
      <span className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
        Page {page} of {totalPages}
      </span>
      <Link
        href={hrefFor(page + 1)}
        aria-disabled={page === totalPages}
        className={`${button} ${page === totalPages ? disabled : enabled}`}
      >
        Next →
      </Link>
    </div>
  );
}
