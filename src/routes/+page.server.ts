import { getNews } from "$lib/api/getNews";
import { getMovies } from "$lib/api/getMovies";
import type { PageServerLoad } from "./$types";

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
