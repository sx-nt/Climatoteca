import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import WeekInfo from '.';
import '@testing-library/jest-dom/vitest';
import { LocationProvider } from '../../contexts/LocationContext';
import { useWeather } from '../../contexts/WeatherContext';

// mock do hook useWeather do contexto WeatherContext nos
// testes, useWeather retorna dados específicos para os testes
vi.mock('../../contexts/WeatherContext', async () => {
  // pegamos o módulo real para manter outras partes intactas
  const actual = await vi.importActual<typeof import('../../contexts/WeatherContext')>(
    '../../contexts/WeatherContext'
  );
  return {
    // copia o módulo real
    ...actual,
    // substitui apenas o hook por uma função mock  
    useWeather: vi.fn(),
  };
});

// define um tipo para o mock pra poder usar .mockReturnValue depois
const mockedUseWeather = useWeather as unknown as ReturnType<typeof vi.fn>;

describe('WeekInfo', () => {

  test('renderiza loading quando loading é true', () => {
    // define o mock do useWeather para retornar loading: true e sem erro
    mockedUseWeather.mockReturnValue({
      loading: true,
      error: null,
      processedForecast: []
    });

    // renderiza o componente dentro do provider
    render(
      <LocationProvider>
        <WeekInfo />
      </LocationProvider>
    );

    // busca na tela o elemento que tem o data-testid='skeleton', que representa o loading
    const skeleton = screen.getByTestId('skeleton')
    // verifica se esse elemento foi renderizado no documento
    expect(skeleton).toBeInTheDocument()
  });

  test('renderiza previsão do tempo quando carregamento termina', () => {
    // define o mock do useWeather para retornar loading: false e uma lista de previsões
    mockedUseWeather.mockReturnValue({
        loading: false,
        error: null,
        processedForecast: [
            { date: new Date('2025-07-11'), icon: '01d', maxTemp: 30, minTemp: 20 },
            { date: new Date('2025-07-12'), icon: '02d', maxTemp: 28, minTemp: 18 },
        ],
    });

    // renderiza o componente dentro do provider
    render(
      <LocationProvider>
        <WeekInfo />
      </LocationProvider>
    );

    // verifica se os dias da semana estão na tela
    const days = screen.getAllByTestId('day')
    expect(days).toHaveLength(2)

    // verifica se as temperaturas máxima e mínima de cada dia aparecem na tela
    const maxTemps = screen.getAllByTestId('max-temp')
    expect(maxTemps).toHaveLength(2)

    const minTemps = screen.getAllByTestId('min-temp')
    expect(minTemps).toHaveLength(2)

    // verifica se as imagens das previsões foram renderizadas
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
