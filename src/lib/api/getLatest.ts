import { SECRET_TMDB_API_KEY } from "$env/static/private";


const apiKey = SECRET_TMDB_API_KEY;
const url = 'https://api.themoviedb.org/3';

export async function getLatestMovies() {

  const res = await fetch(`${url}/movie/popular?api_key=${apiKey}&language=pt-BR`);;
  const data = await res.json();
  console.log(data.results);
  return data.results;
}
