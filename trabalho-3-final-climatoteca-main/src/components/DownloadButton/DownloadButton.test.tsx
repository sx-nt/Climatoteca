import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DownloadButton from '.';
import '@testing-library/jest-dom/vitest';

// substitui importações feitas desse endereço
vi.mock('../../contexts/WeatherContext', () => ({
  useWeather: () => ({
    // esse endereço exporta { processedForecast, weatherData, historicalData, loading, error } que serão substituido dessa forma cada:
    processedForecast: [{ minTemp: 10, maxTemp: 20, date: new Date(), icon: '01d' }],
    weatherData: { name: 'São Paulo', main: { temp: 25, feels_like: 24, humidity: 60 }, weather: [{ icon: '01d' }], wind: { speed: 3.5 }, },
    historicalData: [{
      forecast: {
        forecastday: [{ date: new Date().toISOString(), day: { mintemp_c: 10, maxtemp_c: 20 } }]
      }
    }],
    loading: false,
    error: false
  })
}));

// criamos uma função mock para substituir a função real que salvará o arquivo pdf
// essa função vai só registrar que foi chamada, sem fazer nada de verdade
const saveMock = vi.fn();

// substitui importações feitas desse endereço
vi.mock('html2pdf.js', () => {
  // esse endereço tem uma função 'default().from().set().save()' que serão substituido dessa forma cada:
  return { default: () => ({ from: () => ({ set: () => ({ save: saveMock, }), }), }), __esModule: true, };
});

describe('DownloadButton', () => {

  test('renderiza o botão de download', () => {
    // renderiza o componente GeoLocationButton na tela virtual do teste
    render(<DownloadButton />);
    // procura na tela virtual o botão que o usuário clicaria
    const button = screen.getByRole('button');
    // verifica se o botão foi renderizado corretamente na tela virtual
    expect(button).toBeInTheDocument();
  });

  test('chama a função de download ao clicar no botão', () => {
    // renderiza o componente GeoLocationButton na tela virtual do teste
    render(<DownloadButton />);
    // procura na tela virtual o botão que o usuário clicaria
    const button = screen.getByRole('button');
    // clica no botão
    button.click();
    // e logo em seguida checa para ver se a função mock 'saveMock()' foi chamada corretamente
    expect(saveMock).toHaveBeenCalled();
  });
});
