import { SECRET_NEWS_API_KEY, SECRET_TMDB_API_KEY } from "$env/static/private";

export const newsApiKey = SECRET_NEWS_API_KEY
export const newsUrl = 'https://api.thenewsapi.com/v1/news';

export const movieApiKey = SECRET_TMDB_API_KEY;
export const movieUrl = 'https://api.themoviedb.org/3';
