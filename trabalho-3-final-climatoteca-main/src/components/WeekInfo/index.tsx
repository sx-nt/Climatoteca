import styles from './style.module.css';
import iconMap from '../../utils/iconMap';
import { useWeather } from '../../contexts/WeatherContext';

const WeekInfo = () => {
  // usa WeatherContext através do hook personalizado
  const { processedForecast, loading, error } = useWeather();

  // carrega um "mock layout" enquanto a api estiver sendo chamada
  if (loading) return (
    <div data-testid='skeleton' className={`week-info card ${styles.weekInfo}`}>
      <div className={styles.forecast}>

        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.day}>
            <p className={`skeleton ${styles.dayName}`} style={{ width: '60%', height: '1.5rem' }} />
            <span className={`${styles.imgWrapper} skeleton`} style={{ borderRadius: '50%' }} />
            <p className={styles.temps} style={{ display: 'flex', gap: '0.5rem' }}>
              <span className={`skeleton ${styles.maxTemp}`} style={{ width: '2rem', height: '1.5rem' }} />
              <span className={`skeleton ${styles.minTemp}`} style={{ width: '2rem', height: '1.5rem' }} />
            </p>
          </div>
        ))}

      </div>
    </div>
  );

  if (error) return (
    <div className='week-info card loading-error-card'>
      <h3 className='loading'>Ocorreu um erro ao carregar o clima: {error}</h3>
    </div>
  );

  if (!processedForecast)  return  (
    <div className={'week-info card loading-error-card'}>
      <h3 className='loading'>Nenhum dado de clima disponível</h3>
    </div>
  )

  return (
    <div className={`week-info card ${styles.weekInfo}`}>
      <div className={styles.forecast}>
        {processedForecast.map((day, index) => (
          <div key={index} className={styles.day}>
            <p data-testid='day' className={styles.dayName}>
              {day.date
                .toLocaleDateString('pt-BR', { weekday: 'short' })
                .slice(0, -1)}
            </p>
            <div className={styles.imgWrapper}>
              <img
                src={iconMap[day.icon].icon || 'src/assets/images/sol.png'}
                alt="Weather icon"
                className={styles.img}
              />
            </div>
            <p className={styles.temps}>
              <span data-testid='max-temp' className={styles.maxTemp}>{Math.round(day.maxTemp)}°</span>
              <span data-testid='min-temp' className={styles.minTemp}>{Math.round(day.minTemp)}°</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekInfo;
