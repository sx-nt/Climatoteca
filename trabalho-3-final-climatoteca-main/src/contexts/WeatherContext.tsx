import { createContext, useContext, useEffect, useState } from "react";
import { useCoord } from "./LocationContext";
import type {ForecastInterface, WeatherDataInterface, WeatherContextInterface, HistoricalResponse} from "../interfaces/weather";
import { VITE_OPEN_WEATHER_MAP_API_KEY as API_KEY, VITE_WEATHER_API_KEY } from '../constants/api';
import processForecastData from "../utils/ProcessForecast";

// cria contexto
const WeatherContext = createContext<WeatherContextInterface | undefined>(undefined);

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const coordContext = useCoord();
  const location = coordContext.location;

  const [weatherData, setWeatherData] = useState<WeatherDataInterface | null>(null);
  const [forecast, setForecast] = useState<ForecastInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalResponse[] | null>(null); // api nova para importar o historico 
 
  // função assíncrona que busca dados históricos de clima usando a WeatherAPI
  const fetchHistoricalData = async (latitude: number, longitude: number) => {
  try {
    // cria um objeto com a data atual
    const today = new Date();

    // cria um array com as datas dos últimos 5 dias
    const days = [...Array(5)].map((_, i) => {
      const d = new Date(today);            // clona a data atual
     d.setDate(today.getDate() - i - 1);    // subtrai 'i' dias da data atual 
      return d.toISOString().split('T')[0]; // converte para string e pega apenas a parte da data
    });

    // faz uma requisição paralela para cada data (n importa um por fez no caso do  weatherdata)
    const results = await Promise.all(
      days.map(async (date) => {
        const url = `https://api.weatherapi.com/v1/history.json?key=${VITE_WEATHER_API_KEY}&q=${latitude},${longitude}&dt=${date}&lang=pt`;
        // faz a requisição para a API -  await pausa a execução da função assíncrona até que a promessa seja resolvida
        const res = await fetch(url);
        // lança erro
        if (!res.ok) throw new Error(`Failed to search ${date}: ${res.statusText}`);
        // converte a resposta para JSON e retorna
        return res.json();
      })
    );

    //atualiza o estado com os dados históricos recebidos
    setHistoricalData(results);
  } catch (err) {
    // se der erro, exibe do console e zera as datas
    console.error(" Failed to search historicalData", err);
    setHistoricalData(null);
  }
};


  useEffect(() => {
    if (!location) return;
    const { latitude, longitude } = location;

    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Busca clima atual
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) throw new Error('Failed to fetch current weather');
        const currentData = await currentResponse.json();
        setWeatherData(currentData);

        // Busca previsão
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast');
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.list);

        // Busca histórico via WeatherAPI
        await fetchHistoricalData(latitude, longitude);

        setError(null);
      } catch (err: any) {
        setError(err.message);
        setWeatherData(null);
        setForecast([]);
        setHistoricalData(null);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [location]);

  const processedForecast = processForecastData(forecast);

  // Retorna o contexto incluindo o novo dado histórico
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecast,
        processedForecast,
        loading,
        error,
        historicalData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = (): WeatherContextInterface => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather deve ser usado dentro de um WeatherProvider');
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { WeatherContext, WeatherProvider, useWeather };
