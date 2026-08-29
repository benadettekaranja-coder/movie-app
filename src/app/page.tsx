import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <main>
      <Header />
      <h1>Popular Movies</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {movies.map(
          (movie: {
            id: number;
            title: string;
            poster_path: string;
            vote_average: number;
          }) => (
            <li key={movie.id}>
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            </li>
          )
        )}
      </ul>
    </main>
  );
}