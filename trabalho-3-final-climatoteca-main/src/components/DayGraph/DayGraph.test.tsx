import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DayGraph from '.';
import '@testing-library/jest-dom/vitest';
import { useWeather } from '../../contexts/WeatherContext';


vi.mock('react-chartjs-2', () => ({
  Line: ({ data }: any) => {
    return (
      <div data-testid="mock-line-chart">
        <div data-testid="dataset">{JSON.stringify(data.datasets)}</div>
        {data.labels.map((label: string) => (
          <div key={label} data-testid="label">{label}</div>
        ))}
      </div>
    );
  },
}));

vi.mock('../../contexts/WeatherContext', () => ({
  useWeather: vi.fn(),
}));

describe('daygraph', () => {
  test('verifica se o gráfico renderiza os últimos 5 dias em ordem cronológica correta e as médias certas', () => {
    // define o valor que o useWeather vai retornar (mock) para simular os dados históricos
    (useWeather as any).mockReturnValue({
      loading: false,
      error: null,
      historicalData: [
        { forecast: { forecastday: [{ date: '2025-07-12', day: { mintemp_c: 10, maxtemp_c: 20 } }] } },
        { forecast: { forecastday: [{ date: '2025-07-11', day: { mintemp_c: 12, maxtemp_c: 22 } }] } },
        { forecast: { forecastday: [{ date: '2025-07-10', day: { mintemp_c: 14, maxtemp_c: 24 } }] } },
        { forecast: { forecastday: [{ date: '2025-07-09', day: { mintemp_c: 16, maxtemp_c: 26 } }] } },
        { forecast: { forecastday: [{ date: '2025-07-08', day: { mintemp_c: 18, maxtemp_c: 28 } }] } },
      ],
    });

    render(<DayGraph />); 

    // espera as labels aparecerem no dom para garantir que o gráfico carregou
    return screen.findAllByTestId('label').then(labelElements => {
      const labels = labelElements.map(el => el.textContent); // pega o texto das labels
      const expectedLabels = ['ter., 8', 'qua., 9', 'qui., 10', 'sex., 11', 'sáb., 12']; // labels esperadas no gráfico
      expect(labels).toEqual(expectedLabels); // verifica se as labels estão corretas e na ordem certa

      // pega os datasets do gráfico mockado para verificar os dados das médias
      const datasets = JSON.parse(screen.getByTestId('dataset').textContent!);
      // procura o dataset que tenha 'média' no label
      const media = datasets.find((d: any) => d.label.includes('Média'));
      // verifica se os dados das médias estão corretos conforme esperado
      expect(media.data).toEqual([23, 21, 19, 17, 15]);
    });
  });

  
  test('verifica se o componente mostra um esqueleto enquanto carrega os dados', () => {
    // simula o estado de loading com loading=true e dados nulos
    (useWeather as any).mockReturnValue({
      loading: true,
      error: null,
      historicalData: null,
    });

    render(<DayGraph />); // renderiza o componente

    // procura um elemento com classe que contenha 'skeleton' para confirmar que o esqueleto aparece
    const skeleton = screen.getByText((_, el) =>
      el?.className.includes('skeleton') ?? false
    );
    expect(skeleton).toBeInTheDocument(); // verifica se o esqueleto está no dom
  });

  
  test('verifica se aparece mensagem caso não haja dados históricos', () => {
    // simula estado com erro e sem dados
    (useWeather as any).mockReturnValue({
      loading: false,
      error: 'erro ao carregar o gráfico',
      historicalData: null,
    });

    render(<DayGraph />); 
    // verifica se aparece a mensagem de erro no dom
    expect(screen.getByText(/ocorreu um erro/i)).toBeInTheDocument();
  });

  
  test('exibe mensagem se não houver dados históricos', () => {
    // simula estado com dados vazios
    (useWeather as any).mockReturnValue({
      loading: false,
      error: null,
      historicalData: [],
    });

    render(<DayGraph />); 
    expect(screen.getByText(/nenhum dado histórico disponível/i)).toBeInTheDocument();
  });
  
});