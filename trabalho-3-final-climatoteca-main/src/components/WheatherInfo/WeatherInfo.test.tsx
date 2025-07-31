import { render, screen } from '@testing-library/react';
import WeatherInfo from '.';
import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi } from 'vitest';
import { useWeather } from '../../contexts/WeatherContext';


vi.mock('../../contexts/WeatherContext', () => ({
  useWeather: vi.fn(),
}));


describe('WeatherInfo', () => {
  test('renderiza weathercard com dados quando disponíveis', () => {
    // simula dados 
    (useWeather as any).mockReturnValue({
      loading: false,
      error: null,
      weatherData: {
        main: { feels_like: 23.6, humidity: 80 },
        wind: { speed: 3.5 },
      },
      processedForecast: [
        { pop: 0.42 }
      ]
    });

    render(<WeatherInfo />);

  // verifica se os textos esperados aparecem na tela com os valores arredondados/formatação certa 
    expect(screen.getByText('24°C')).toBeInTheDocument();

    expect(screen.getByText('Vento')).toBeInTheDocument();
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();

    expect(screen.getByText('Chance de Chuva')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();

    expect(screen.getByText('Umidade')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  test(' testa se o componente mostra skeletons enquanto está carregando os dados', () => {
    (useWeather as any).mockReturnValue({
      loading: true,
      error: null,
      weatherData: null,
      processedForecast: null
    });

    render(<WeatherInfo />);
    
    // espera encontrar quatro skeletons 
    const skeletons = screen.getAllByText((_, el) =>
      el?.className.includes('skeleton') ?? false
    );
    expect(skeletons.length).toBeGreaterThanOrEqual(4); // pode haver mais se cada card tem 3 skeletons
  });

  test(' testa se o componente mostra uma mensagem de erro quando o hook retorna erro', () => {
    (useWeather as any).mockReturnValue({
      loading: false,
      error: 'Erro ao carregar clima',
      weatherData: null,
      processedForecast: null
    });

    render(<WeatherInfo />);
    expect(screen.getByText(/Erro ao carregar clima/i)).toBeInTheDocument();
  });

  test('testa se o componente mostra aviso quando não há dados disponíveis e não está carregando nem com erro', () => {
    (useWeather as any).mockReturnValue({
      loading: false,
      error: null,
      weatherData: null,
      processedForecast: null
    });

    render(<WeatherInfo />);
    expect(screen.getByText(/Nenhum dado de clima disponível/i)).toBeInTheDocument();
  });
});