import { getNews } from "$lib/api/getNews";
import { getMovies } from "$lib/api/getMovies";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  if (!user) {
    return { user: null, movies: [], news: [] };
  }


  const news = await getNews();
  const movies = await getMovies();
  return { user, movies, news };
};
