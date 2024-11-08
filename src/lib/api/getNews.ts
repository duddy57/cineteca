import { SECRET_NEWS_API_KEY } from "$env/static/private";


const apiKey = SECRET_NEWS_API_KEY
const url = 'https://api.thenewsapi.com/v1/news';

export async function getNews() {
  try {
    console.log("Iniciando a busca de noticias");
    const res = await fetch(`${url}/all/?api_token=${apiKey}&search=movies&language=pt&limit=2`);
    console.log("Resposta da API:", res);
    const data = await res.json();
    console.log("Dados da API:", data);
    return data.data || [];
  } catch (error) {
    console.error("Erro ao buscar noticias: ", error);
  }
}