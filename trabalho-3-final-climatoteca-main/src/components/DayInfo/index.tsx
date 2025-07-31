import { useEffect, useState } from 'react';
import { useWeather } from '../../contexts/WeatherContext';
import iconMap from '../../utils/iconMap';
import styles from './style.module.css';

const DayInfo = () => {

  // usa WeatherContext através do hook personalizado
  const { weatherData, processedForecast, loading, error } = useWeather();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Atualização de tempo a cada segundo
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

if (loading) return (
  <div className={`day-info card ${styles.dayInfo}`}>
    <div className={styles.head} style={{ marginBottom: '1.5rem' }}>
      <span className={`${styles.cityName} skeleton`} style={{ width: '50%', height: '3.5rem', marginBottom: '1rem' }} />
      <span className={`${styles.dateTime} skeleton`} style={{ width: '30%', height: '1.5rem' }} />
    </div>
    <div className={styles.climaPrincipal}>
      <div className={styles.temps}>
        <span className={`${styles.temperature} skeleton`} style={{ width: '10rem', height: '6rem', }} />
        <div className={styles.tempsDesc} style={{ marginBottom: '.4rem', marginTop: '1rem' }}>
          <div className={styles.minMaxTemps} style={{ marginBottom: '1rem' }}>
            <span className={`${styles.maxTemp} skeleton`} style={{ width: '80px', height: '2rem' }} />
            <span className={`${styles.minTemp} skeleton`} style={{ width: '80px', height: '2rem' }} />
          </div>
          <span className={`${styles.descricao} skeleton`} style={{ width: '80%', height: '1.5rem', display: 'block' }} />
        </div>
      </div>
      <span className={`${styles.weather_icon} skeleton`} style={{ borderRadius: '50%' }} />
    </div>
  </div>
);

  if (error) return  (
    <div className={`day-info card loading-error-card`}>
      <h3 className='loading'>Ocorreu um erro ao carregar o clima: {error}</h3>
    </div>
  );

  if (!weatherData || !processedForecast) return  (
    <div className={`day-info card loading-error-card`}>
      <h3 className='loading'>Nenhum dado de clima disponível</h3>
    </div>
  )

  const today = processedForecast[0];

  // pega o codigo do icone e busca o caminho no mapa
  const iconCode = weatherData.weather[0].icon;
  const iconPath = iconMap[iconCode].icon || 'src/assets/images/sol.png';
  const desc = iconMap[iconCode].description

  return (
    <div className={`day-info card ${styles.dayInfo}`}>
      <div className={styles.head}>
        <h2 className={styles.cityName}>{weatherData.name}</h2>
        <p className={styles.dateTime}>{currentDate} | {currentTime}</p>
      </div>
      <div className={styles.climaPrincipal}>
        <div className={styles.temps}>
          <p className={styles.temperature}>{Math.round(weatherData.main.temp)}°C</p>
          <p className={styles.tempsDesc}>
            <span className={styles.minMaxTemps}>
              <span className={styles.maxTemp}>Máx: {Math.round(today.maxTemp)}°</span>
              <span className={styles.minTemp}>Mín: {Math.round(today.minTemp)}°</span>
            </span>
            <span className={styles.descricao}>{desc}</span> 
          </p>
        </div>
        <img src={iconPath} alt="Ícone do clima" className={styles.weather_icon} />
      </div>
    </div>
  );
};

export default DayInfo;
