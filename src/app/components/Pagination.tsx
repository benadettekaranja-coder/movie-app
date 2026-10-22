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

  const button = "rounded-lg px-5 py-2 transition-colors";
  const enabled = "bg-blue-600 text-white hover:bg-blue-700";
  const disabled = "bg-zinc-800 text-zinc-500 pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Link
        href={hrefFor(page - 1)}
        aria-disabled={page === 1}
        className={`${button} ${page === 1 ? disabled : enabled}`}
      >
        ← Previous
      </Link>
      <span className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white">
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
