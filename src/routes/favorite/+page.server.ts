import { getLatestMovies } from "$lib/api/getLatest";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
  try {

    const latestMovie = await getLatestMovies();

    return {
      latestMovie
    }
  } catch (error) {
    console.error('Erro no load:', error);
    return { user: null, movies: [], news: [] };
  }
};
