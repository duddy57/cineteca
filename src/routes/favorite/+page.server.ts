import { getTopRated } from "$lib/api/movies";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
  try {

    const popular = await getTopRated();

    return {
      popular
    }
  } catch (error) {
    console.error('Erro no load:', error);
    return { popular: [] };
  }
};
