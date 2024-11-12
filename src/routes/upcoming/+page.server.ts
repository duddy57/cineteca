import { getUpcoming } from "$lib/api/movies";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {

    const upcomingMovie = await getUpcoming();

    return {
      upcomingMovie
    }
  } catch (error) {
    console.error('Erro no load:', error);
    return { user: null, movies: [], news: [] };
  }
};