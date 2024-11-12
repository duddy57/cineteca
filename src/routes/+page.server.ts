import * as auth from '$lib/server/auth';
import { getMovies } from "$lib/api/movies";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from '@sveltejs/kit';
import { movieApiKey, movieUrl } from '$lib/api/utils';


export const load: PageServerLoad = async (event) => {
  try {
    const [movies] = await Promise.all([
      getMovies(),
    ]);

    const query = event.url.searchParams.get('query');

    if (!query) {
      return { movies: [] };
    }

    try {
      const response = await fetch(
        `${movieUrl}/search/movie?api_key=${movieApiKey}&query=${encodeURIComponent(query)}&language=pt-BR`
      );

      if (!response.ok) {
        throw error(response.status, 'Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data.results);
      return {
        user: event.locals.user || null,
        movies,
        movieSe: data.results
      };
    } catch (err) {
      console.error('Error fetching movies:', err);
      throw error(500, 'An error occurred while fetching movies');
    }
  } catch (error) {
    console.error('Erro no load:', error);
    return { user: null, movies: [], searchMovie: [] };
  }

}

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/auth');
  }
};