import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeButton from ".";

// mock do localStorage e das classes de tema
const mockLocalStorage = {
  loadFromLocalStorage: vi.fn(),
  saveToLocalStorage: vi.fn()
};

// mock dos ícones pra não testar eles aqui
vi.mock('react-icons/tb', () => ({
  TbMoon: () => <div data-testid="moon-icon">lua</div>,
  TbSun: () => <div data-testid="sun-icon">sol</div>
}));

// mock da classe Storage
vi.mock('../../utils/Storage', () => ({
  default: vi.fn(() => mockLocalStorage)
}));

describe("testes do theme button", () => {
  beforeEach(() => {
    // limpa os mocks antes de cada teste
    vi.clearAllMocks();
    document.documentElement.className = '';
    document.documentElement.setAttribute('data-theme', '');
  });

  test("mostra o ícone da lua quando no tema claro", () => {
    mockLocalStorage.loadFromLocalStorage.mockReturnValue(['light']);
    render(<ThemeButton />);
    
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  test("mostra o ícone do sol quando no tema escuro", () => {
    mockLocalStorage.loadFromLocalStorage.mockReturnValue(['dark']);
    render(<ThemeButton />);
    
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  test("alterna entre temas quando clicado", () => {
    mockLocalStorage.loadFromLocalStorage.mockReturnValue(['light']);
    render(<ThemeButton />);
    
    // clica no botão
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // verifica se salvou o tema escuro
    expect(mockLocalStorage.saveToLocalStorage).toHaveBeenCalledWith(['dark']);
    
    // verifica se adicionou as classes no html
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test("aplica o tema salvo ao carregar", () => {
    mockLocalStorage.loadFromLocalStorage.mockReturnValue(['dark']);
    render(<ThemeButton />);
    
    // verifica se aplicou o tema escuro
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});