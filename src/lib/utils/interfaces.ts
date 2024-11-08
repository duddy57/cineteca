export interface GeoLocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  state: string;
}


export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface News {
  title: string
  description: string
  snippet: string
  image_url: string
  source: string
  url: string
}

export interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  overview: string
  vote_average: number
  vote_count: number
  genres: string[]
}