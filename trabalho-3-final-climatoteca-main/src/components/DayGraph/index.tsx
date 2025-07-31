import { Line } from 'react-chartjs-2'; // importa o componente gráfico de linha do Chart.js para React
import { useWeather } from "../../contexts/WeatherContext"; 
import styles from "./style.module.css"; 
import type { ChartData, ChartOptions } from 'chart.js';

import { 
  Chart as ChartJS, 
  CategoryScale,      // escala para categorias (ex: dias)
  LinearScale,        // escala linear para valores numéricos
  PointElement,       // pontos do gráfico
  LineElement,        // linhas do gráfico
  Title,              // título do gráfico
  Tooltip,            // tooltip que aparece ao passar o mouse
  Legend,             // legenda do gráfico
} from 'chart.js';

// registra os componentes do Chart.js para serem usados no gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
  // é um tipo genérico que representa um componente funcional do React

const DayGraph: React.FC = () => {
  // acessa os dados pelo weatherContext
  const { historicalData, loading, error } = useWeather();


if (loading) return (
  <div className={`day-graph card ${styles['day-graph']}`}>
    <div className={styles.graphSkeleton}>
        <span className="skeleton" style={{ width: '100%', height: '200px' }} />
    </div>
  </div>
);

  if (error) return (
    <div className={`day-info card loading-error-card`}>
      <h3 className='loading'>Ocorreu um erro ao carregar o gráfico: {error}</h3>
    </div>
  );

  if (!historicalData || historicalData.length === 0) return (
    <div className={`day-info card loading-error-card`}>
      <h3 className='loading'>Nenhum dado histórico disponível</h3>
    </div>
  );

  
  // extrai os dados históricos dos últimos dias
  // cada item é uma resposta da API de clima que contém forecast.forecastday[0] com dados do dia
  // faz uma cópia do array e mapeia para pegar somente o objeto do dia
  // depois inverte para ficar em ordem cronológica (do mais antigo para o mais recente)
  const forecastDays = [...historicalData]
    .map(item => item.forecast.forecastday[0])
    .reverse().slice(0, 5) 


  // cria labels para o eixo X usando a data do dia formatada para "seg, 01"
  const labels = forecastDays.map(day => 
    new Date(`${day.date}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })
  );

  // extrai as temperaturas mínimas, máximas e calcula a média do dia
  const minTemps = forecastDays.map(day => day.day.mintemp_c);
  const maxTemps = forecastDays.map(day => day.day.maxtemp_c);
  const avgTemps = forecastDays.map(day => (day.day.mintemp_c + day.day.maxtemp_c) / 2);

  // define os dados para o gráfico
  // Cada dataset representa uma linha no gráfico, com configurações de cor, estilo e dados
  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Temperatura Média (°C)',
        data: avgTemps,
        borderColor: 'rgba(100, 35, 160, 1)',         
        backgroundColor: 'rgba(40, 13, 77, 0.2)',      
        borderWidth: 2,
        tension: 0.3,                                  
      },
      {
        label: 'Máxima (°C)',
        data: maxTemps,
        borderColor: 'rgba(255, 99, 239, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        borderDash: [5, 5],                           
        tension: 0.3,
      },
      {
        label: 'Mínima (°C)',
        data: minTemps,
        borderColor: 'rgba(154, 54, 235, 1)',
        backgroundColor: 'rgba(57, 11, 88, 0.2)',
        borderWidth: 2,
        borderDash: [5, 5],                           
        tension: 0.3,
      },
    ],
  };

  // configurações adicionais do gráfico (responsivo, legenda, título) 
  // a configuração options define o comportamento e a aparência do gráfico em si
  // essa parte não é estilizada via CSS tradicional pq é o controle do próprio componente gráfico
  const options: ChartOptions<'line'> = {
    responsive: true, // deixa o gráfico resposivo
    maintainAspectRatio: false, // permite que o gráfico se ajuste totalmente ao tamanho do contêiner
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Histórico de Temperaturas'
      },
    },
  };

  // renderiza o gráfico dentro de uma div com estilo CSS
  return (
    <div className={styles['day-graph'] + ' card'}>
      <Line data={data} options={options} />
    </div>
  );
};

export default DayGraph;