import type { DailyForecastData, ForecastInterface, ProcessedForecastItem, } from '../interfaces/weather';

// função q agrupa os dados da previsão por dia
const groupForecastByDay = (forecast: ForecastInterface[]): Record<string, DailyForecastData> => {
  // usa o reduce pra transformar a lista de previsões num objeto onde cada chave é um dia (tipo "09/07/2025")
  return forecast.reduce(
    (acc, item) => {
      // converte o timestamp (em segundos) pra uma string de data no formato brasileiro
      const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR');

      // se ainda n tem esse dia no objeto, cria uma nova entrada
      if (!acc[date]) {
        acc[date] = {
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          icons: [item.weather[0].icon],
          date: item.dt,
        };
      } else {
        // se o dia já existe no objeto, atualiza as temperaturas mínima e máxima
        acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
        acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);

        // adiciona o novo ícone no array de ícones
        acc[date].icons.push(item.weather[0].icon);
      }

      // retorna o acumulador pra próxima iteração
      return acc;
    },
    {} as Record<string, DailyForecastData>
  ); // tipo inicial do objeto: um map com string como chave
};

// função q processa os dados agrupados e transforma em uma lista final q vai ser usada no app
const processDailyForecast = (
  dailyForecast: Record<string, DailyForecastData>
): ProcessedForecastItem[] => {
  // transforma o objeto em array usando Object.entries, e mapeia cada dia pra um novo formato
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(dailyForecast).map(([_, data]) => {
    // conta quantas vezes cada ícone aparece no dia
    const iconCounts = data.icons.reduce(
      (acc, icon) => {
        acc[icon] = (acc[icon] || 0) + 1; // se o ícone já existe, soma +1, senão começa com 1
        return acc;
      },
      {} as Record<string, number>
    ); // map onde chave é o ícone e valor é a contagem

    // pega o ícone que apareceu mais vezes (mais representativo pro dia)
    const mostFrequentIcon = Object.entries(iconCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    // retorna o dado processado no formato final
    return {
      date: new Date(data.date * 1000),
      minTemp: data.minTemp,
      maxTemp: data.maxTemp,
      icon: mostFrequentIcon,
    };
  });
};

// função principal q junta tudo: recebe os dados brutos e devolve os 5 dias de previsão processados
const processForecastData = (
  forecast: ForecastInterface[]
): ProcessedForecastItem[] => {
  // se a lista de previsões estiver vazia, retorna uma lista vazia
  if (!forecast.length) return [];

  // agrupa os dados por dia
  const dailyForecast = groupForecastByDay(forecast);
  // processa cada dia pra deixar no formato final
  const processed = processDailyForecast(dailyForecast);

  // retorna só os 5 primeiros dias
  return processed.slice(0, 5);
};

export default processForecastData;
