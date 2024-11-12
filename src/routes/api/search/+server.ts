import { searchMovies } from '$lib/api/movies.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const query = url.searchParams.get('query') || ' ';
  try {
    const res = await searchMovies(query);
    return json(res);
  } catch (err) {
    console.error(err);
    return json({ error: 'Erro ao buscar filmes' }, { status: 500 });
  }

}