const TMDB_API_KEY = process.env.TMDB_API_KEY;
async function getPopularMovies() {
  const res =await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <main>
      <h1>Popular Movies</h1>
      <ul>
     {movies.map((movie: {id:number; title:string }) =>(
      <li key={movie.id}>{movie.title}</li>
     ))}
      </ul> 
    </main>
  );
}