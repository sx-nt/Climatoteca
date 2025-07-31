'use client';
import { TbDownload } from 'react-icons/tb';
import styles from '../Sidebar/style.module.css';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import { useWeather } from '../../contexts/WeatherContext';
import iconMap from '../../utils/iconMap';
import type { ProcessedForecastItem } from '../../interfaces/weather';

const DownloadButton = () => {
  const { processedForecast, weatherData, historicalData, loading, error } = useWeather()
  const contentRef = useRef<HTMLDivElement>(null);

  if (loading || error) return (
      <button className={styles.button} disabled>
        <TbDownload className={styles.icon} />
      </button>
  )
  
  if (!processedForecast || ! weatherData || !historicalData) return
  
  const historicalForecasts = historicalData
    .map((item) => {
      const f = item.forecast.forecastday?.[0];
      if (!f) return null;

      return {
        date: new Date(f.date), 
        minTemp: f.day.mintemp_c,
        maxTemp: f.day.maxtemp_c,
        icon: '',
      };
    }).filter((item) => item !== null) .reverse() as ProcessedForecastItem[];

  const now = new Date()
  const date: string = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', })
  const time: string = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const handleDownload = (): void => {
    const element: HTMLDivElement | null = contentRef.current;
    if (!element) return; 

    const opt = {
      margin: 0.5,
      filename: `climatoteca-${weatherData.name.toLowerCase().replaceAll(' ', '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

   const forecastTable = (forecast: ProcessedForecastItem[]) => (
    <table border={1} cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr><th>Dia</th><th>Mínima</th><th>Máxima</th><th>Descrição</th></tr>
      </thead>
      <tbody>
        {forecast.map((day, index) => (
          <tr key={index}>
            <td>{new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0,-1)}</td>
            <td>{Math.round(day.minTemp)}°C</td>
            <td>{Math.round(day.maxTemp)}°C</td>
            <td>{iconMap[day.icon]?.description || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <button className={styles.button} onClick={handleDownload}>
        <TbDownload className={styles.icon} />
      </button>

      <div style={{ display: 'none' }}>
        <div ref={contentRef} style={{ padding: '20px', fontFamily: 'Arial' }}>
          <h2>Climatoteca</h2>
          <p><strong>Cidade: </strong>{weatherData.name}</p>
          <p><strong>Data: </strong>{date} | {time}</p>
          <p><strong>Temperatura Atual: </strong>{Math.round(weatherData.main.temp)}°C</p>
          <p><strong>Min/Max:</strong> {Math.round(processedForecast[0].minTemp)}°C / {Math.round(processedForecast[0].maxTemp)}°C</p>
          <p><strong>Descrição: </strong>{iconMap[weatherData.weather[0].icon]?.description || 'N/A'}</p>

          <h3>Informações Adicionais</h3>
          <ul>
            <li>Sensação Térmica: {Math.round(weatherData.main.feels_like)}°C</li>
            <li>Vento: {weatherData.wind.speed.toFixed(1)} m/s</li>
            <li>Chance de Chuva: {Math.round((processedForecast[0]?.pop || 0) * 100)}%</li>
            <li>Umidade: {weatherData.main.humidity}%</li>
          </ul>

          <h3>Próximos Dias</h3>
          {forecastTable(processedForecast)}
          <h3>Dias Anteriores</h3>
          {forecastTable(historicalForecasts)}
        </div>
      </div>
    </>
  );
};

export default DownloadButton;
