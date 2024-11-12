import { getPopular } from "$lib/api/movies";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
  try {

    const latestMovie = await getPopular();

    return {
      latestMovie
    }
  } catch (error) {
    console.error('Erro no load:', error);
    return { user: null, movies: [], news: [] };
  }
};
