import { SECRET_TMDB_API_KEY } from "$env/static/private";


const apiKey = SECRET_TMDB_API_KEY;
const url = 'https://api.themoviedb.org/3';

export async function getMovies() {

  const res = await fetch(`${url}/movie/now_playing?api_key=${apiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}
