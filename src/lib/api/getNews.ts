import { SECRET_NEWS_API_KEY } from "$env/static/private";


const apiKey = SECRET_NEWS_API_KEY
const url = 'https://api.thenewsapi.com/v1/news';

export async function getNews() {
  try {
    const res = await fetch(`${url}/all/?api_token=${apiKey}&search=movies&language=pt&limit=2`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}