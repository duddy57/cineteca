import * as auth from '$lib/server/auth';
import { getNews } from "$lib/api/getNews";
import { getMovies } from "$lib/api/getMovies";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  try {
    const user = event.locals.user;
    console.log('User:', user);

    if (!user) {
      console.log('Usuário não autenticado');
      return { user: null, movies: [], news: [] };
    }

    console.log('Buscando notícias...');
    const news = await getNews();
    console.log('Notícias recebidas:', news);

    console.log('Buscando filmes...');
    const movies = await getMovies();
    console.log('Filmes recebidos:', movies);

    return { user, movies, news };
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