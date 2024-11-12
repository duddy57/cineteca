import { getLatest } from "$lib/api/movies";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {

    const latest = await getLatest();

    return {
      latest,
    };

  } catch (error) {
    console.error('Erro no load:', error);
    return {
      latest: [],
    };
  }
};