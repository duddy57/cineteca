import { getMovies } from "$lib/api/movies";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {

    const movies = await getMovies();


    return {
      movies,
    };
  } catch (error) {
    console.error('Erro no load:', error);
    return {
      latest: [],
    };
  }
};