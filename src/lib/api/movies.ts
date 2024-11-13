import { movieApiKey, movieUrl } from "./utils";


// Da GET nos filmes em cartaz
export async function getMovies() {
  const res = await fetch(`${movieUrl}/movie/now_playing?api_key=${movieApiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}

// Da GET nos filme em lançamento
export async function getLatest() {
  const res = await fetch(`${movieUrl}/movie/latest?api_key=${movieApiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}

// Busca filmes usando o nome como parâmetro
export async function searchMovies(query: string) {
  if (!query) return []

  const res = await fetch(`${movieUrl}/search/movie?query=${encodeURIComponent(query)}&api_key=${movieApiKey}&language=pt-BR`);
  const data = await res.json();
  console.log('Dados da resposta:', data.results);
  return data.results;
}

// Da GET nos filmes populares
export async function getPopular() {
  const res = await fetch(`${movieUrl}/movie/popular?api_key=${movieApiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}

// Da GET nos filmes em mais votados
export async function getTopRated() {
  const res = await fetch(`${movieUrl}/movie/top_rated?api_key=${movieApiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}

// Da GET nos filmes em lançamento
export async function getUpcoming() {
  const res = await fetch(`${movieUrl}/movie/upcoming?api_key=${movieApiKey}&language=pt-BR`);;
  const data = await res.json();
  return data.results;
}
