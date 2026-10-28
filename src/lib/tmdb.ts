const BASE = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_READ_TOKEN;

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
};

export type Genre = { id: number; name: string };
export type ListResponse<T> = { page: number; total_pages: number; results: T[] };

export type MovieDetail = Movie & {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
};

export type Video = {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
  official: boolean;
};

async function tmdb<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  if (!TOKEN) throw new Error("TMDB_READ_TOKEN is not set");

  const url = new URL(BASE + path);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + TOKEN,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`TMDB ${res.status} on ${path}`);
  return res.json();
}

export function getTrending() {
  return tmdb<ListResponse<Movie>>("/trending/movie/day");
}

export function getPopular(page = 1) {
  return tmdb<ListResponse<Movie>>("/movie/popular", { page });
}

export function searchMovies(query: string, page = 1) {
  return tmdb<ListResponse<Movie>>("/search/movie", { query, page });
}

export function discoverByGenre(genreId: number, page = 1) {
  return tmdb<ListResponse<Movie>>("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
}

export async function getGenres(): Promise<Genre[]> {
  const data = await tmdb<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

export function getMovie(id: number | string) {
  return tmdb<MovieDetail>(`/movie/${id}`);
}

export async function getTrailer(id: number | string): Promise<Video | null> {
  try {
    const data = await tmdb<{ results: Video[] }>(`/movie/${id}/videos`);
    return (
      data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) ?? null
    );
  } catch {
    return null;
  }
}
