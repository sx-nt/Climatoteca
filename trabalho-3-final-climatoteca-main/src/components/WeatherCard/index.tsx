import styles from './style.module.css';

interface WeatherCardProps {
  title?: string;
  value?: string;
  loading?: boolean | null | undefined
  icon?: string;
  
}

// React.FC é um tipo genérico do ts que ajuda a definir que uma função é um componente React que recebe props
const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, loading, icon }: WeatherCardProps) => {

  if (loading) return (
    <div className={styles.card}>
      <span className="skeleton" style={{ width: '80%', height: '1.5rem', marginBottom: '1rem' }} />
      <span className="skeleton" style={{ width: '40%', height: '4rem', marginBottom: '1rem' }} />
      <span className={`skeleton`} style={{ width: '3rem', height: '3rem', borderRadius: '50%' }} />
    </div>
  );

const className = icon?.includes('vento')? `${styles.icon} ${styles.wind}`: styles.icon;

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
      {icon && <img src={icon} alt={title} className={className} />}
    </div>
  )
}

export default WeatherCard;
