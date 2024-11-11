import * as auth from '$lib/server/auth';
import { getNews } from "$lib/api/getNews";
import { getMovies } from "$lib/api/getMovies";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { getLatestMovies } from '$lib/api/getLatest';


export const load: PageServerLoad = async (event) => {
  try {
    const [news, movies, latestMovies] = await Promise.all([
      getNews(),
      getMovies(),
      getLatestMovies()
    ]);


    return {
      user: event.locals.user || null,
      movies,
      news,
      latestMovies
    };
  } catch (error) {
    console.error('Erro no load:', error);
    return { user: null, movies: [], news: [] };
  }
};


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