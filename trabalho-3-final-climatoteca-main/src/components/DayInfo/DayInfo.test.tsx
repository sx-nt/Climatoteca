import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DayInfo from ".";
import { useWeather } from '../../contexts/WeatherContext';


// criação de um mock (versão falsa do hook) que pega os dados do tempo --> evita ficar chamando a api no teste 
vi.mock('../../contexts/WeatherContext', () => ({
  useWeather: vi.fn()
}));

//dados fixos para testar os testes dos icones do tempo 
vi.mock('../../utils/iconMap', () => ({
  default: {
    "01d": {
      icon: "/imagens/sol.png",
      description: "Céu limpo"
    }
  }
}));

describe("Testes do Componente de Informações do Dia", () => {
  //data e hora fixa para os testes
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 5, 15, 12, 30)); 
  });

  // limpa o timer para manter teste isolado 
  afterEach(() => {
    vi.useRealTimers();
  });

  test("mostra o indicador de carregamento quando está buscando dados", () => {
    // testa o placeholder do carregamento da pagina 
    (useWeather as any).mockReturnValue({
      loading: true,
      error: null,
      weatherData: null,
      processedForecast: null
    });

    render(<DayInfo />);

    // verifica se existem elementos com a classe de skeleton (place holder do carregamento)
    const skeletonElements = document.querySelectorAll('.skeleton');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test("mostra a mensagem de erro quando a busca falha", () => {
    (useWeather as any).mockReturnValue({
      loading: false,
      error: "Erro ao buscar dados",
      weatherData: null,
      processedForecast: null
    });

    render(<DayInfo />);
    
    expect(screen.getByText(/Erro ao buscar dados/i)).toBeInTheDocument();
  });

  //mostra a carregação correta dos dados e a renderização da pagina
  test("mostra as informações do tempo quando os dados são carregados", () => {
    (useWeather as any).mockReturnValue({
      loading: false,
      error: null,
      weatherData: {
        name: "São Paulo",
        main: { temp: 25 },
        weather: [{ icon: "01d" }]
      },
      processedForecast: [{
        maxTemp: 28,
        minTemp: 22
      }]
    });

    render(<DayInfo />);
    
    // verifica se as informações carregadas condizem com as esperadas
    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("Máx: 28°")).toBeInTheDocument();
    expect(screen.getByText("Mín: 22°")).toBeInTheDocument();
  });
});