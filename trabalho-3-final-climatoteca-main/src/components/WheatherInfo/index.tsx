import { useWeather } from '../../contexts/WeatherContext';
import styles from './style.module.css';
import WeatherCard from '../WeatherCard';

// é um tipo genérico que representa um componente funcional do React
const WeatherInfo : React.FC= () => {
  
  // usa WeatherContext através do hook personalizado
  const { weatherData, processedForecast, loading, error } = useWeather();

  if (loading) return (
    <div className={`weather-info card ${styles.container}`}>
      <div className={styles.grid} style={{ width: '100%' }}>
        <WeatherCard loading={true}/>
        <WeatherCard loading={true}/>
        <WeatherCard loading={true}/>
        <WeatherCard loading={true}/>
      </div>
    </div>
  )

  if (error) return (
    <div className={`weather-info card loading-error-card`}>
      <p>Erro ao carregar clima: {error}</p>
    </div>
  )


  if (!weatherData || !processedForecast)  return  (
    <div className={`weather-info card loading-error-card`}>
      <h3 className='loading'>Nenhum dado de clima disponível</h3>
    </div>
  )

  return (
    <div className={`weather-info card ${styles.container}`}>
      <div className={styles.grid}>
        <WeatherCard
          title="Sensação Térmica"
          value={`${Math.round(weatherData.main.feels_like)}°C`}
          icon="src/assets/images/termometro.png"
        />

        <WeatherCard 
          title="Vento"
          value={`${weatherData.wind.speed.toFixed(1)} m/s`}
          icon="src/assets/images/vento.png"
        />

        <WeatherCard
          title="Chance de Chuva"
          value={`${Math.round((processedForecast[0]?.pop || 0) * 100)}%`}
          icon="src/assets/images/guarda-chuva.png"
        />

        <WeatherCard
          title="Umidade"
          value={`${weatherData.main.humidity}%`}
          icon="src/assets/images/umidade.png"
        />
      </div>
    </div>
  );
};

export default WeatherInfo;
