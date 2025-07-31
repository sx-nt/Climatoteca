import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HistoryButton from ".";

// mock do contexto de localizacao
vi.mock("../../contexts/LocationContext", () => ({
  useCoord: vi.fn(() => ({ setLocation: vi.fn() }))
}));

// mock dos icones
vi.mock('react-icons/tb', () => ({
  TbHistory: () => <div data-testid="history-icon">ícone</div>,
  TbX: () => <div data-testid="close-icon">ícone</div>
}));

// mock basico do dialog HTML5
beforeEach(() => {
  // limpa tudo antes de cada teste
  vi.clearAllMocks();
  
  // mock do localStorage
  global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn()
  } as any;

  // mock das funções do dialog
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("testes do history button", () => {
  test("mostra o botao de historico", () => {
    render(<HistoryButton />);
    expect(screen.getByTestId("history-icon")).toBeInTheDocument();
  });

  test("carrega o historico quando aberto", () => {
    // mocka que tem historico
    global.localStorage.getItem = vi.fn(() => 
      JSON.stringify([{ name: "São Paulo", state: "SP", country: "BR" }])
    );

    render(<HistoryButton />);
    
    // clica no botao (vai tentar abrir o dialog)
    fireEvent.click(screen.getByTestId("history-icon"));
    
    // verifica se carregou o historico (mesmo com dialog mockado)
    expect(global.localStorage.getItem).toHaveBeenCalledWith('climatoteca:hist');
  });

  test("mostra mensagem quando nao tem historico", () => {
    // mocka historico vazio
    global.localStorage.getItem = vi.fn(() => null);

    render(<HistoryButton />);
    
    // clica no botao
    fireEvent.click(screen.getByTestId("history-icon"));
    
    // verifica se tentou carregar o historico
    expect(global.localStorage.getItem).toHaveBeenCalled();
  });
});