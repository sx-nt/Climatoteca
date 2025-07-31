interface WeatherDataInterface {
  main: { temp: number; feels_like: number; humidity: number; pressure: number; };
  wind: { speed: number; deg: number; gust?: number; };
  weather: { id: number; main: string; description: string; icon: string; }[];
  name: string;
  dt: number;
  current: CurrentWeather;
}

interface ForecastInterface {
  
  dt: number;
  main: {  temp_min: number;  temp_max: number };
  weather: {  icon: string;  description: string }[];
  dt_txt: string;
}

interface WeatherContextInterface {
  weatherData: WeatherDataInterface | null;
  forecast: ForecastInterface[];
  processedForecast: ProcessedForecastItem[];
  loading: boolean;
  error: string | null;
  historicalData: HistoricalResponse[] | null;
}

interface DailyForecastData {
  minTemp: number;
  maxTemp: number;
  icons: string[];
  date: number;
  pop?: number;
  clouds?: number;
}

interface ProcessedForecastItem {
  date: Date;
  minTemp: number;
  maxTemp: number;
  icon: string;
  pop?: number;
  clouds?: number;
}

interface CurrentWeather {
  feels_like: number;
  humidity: number;
  wind_speed: number;
  temp: number;
  wind: number
}
interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
  };
}

interface HistoricalResponse {
  forecast: {
    forecastday: ForecastDay[];
  };
}


export type {
  WeatherDataInterface, ForecastInterface, WeatherContextInterface, DailyForecastData, ProcessedForecastItem, CurrentWeather, HistoricalResponse
};