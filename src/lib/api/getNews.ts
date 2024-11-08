import { PUBLIC_NEWS_API_KEY } from "$env/static/public";

const apiKey = PUBLIC_NEWS_API_KEY
const url = 'https://api.thenewsapi.com/v1/news';

export async function getNews() {
  try {
    const res = await fetch(`${url}/all/?api_token=${apiKey}&search=movies&language=pt&limit=2`);
    console.log(res);
    const data = await res.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}