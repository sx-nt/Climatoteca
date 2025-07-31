import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from ".";
import styles from './style.module.css';


// mock dos componentes dos botões porque eles tem seus testes individuais
vi.mock("../ThemeButton", () => ({
  default: () => <div data-testid="theme-button">botão tema</div>,
}));

vi.mock("../HistoryButton", () => ({
  default: () => <div data-testid="history-button">botão histórico</div>,
}));

vi.mock("../DownloadButton", () => ({
  default: () => <div data-testid="download-button">botão download</div>,
}));


describe("testes do sidebar", () => {
  test("renderiza os três botões principais", () => {
    render(<Sidebar />);

    // verifica se os três botões são renderizados
    expect(screen.getByTestId("theme-button")).toBeInTheDocument();
    expect(screen.getByTestId("history-button")).toBeInTheDocument();
    expect(screen.getByTestId("download-button")).toBeInTheDocument();
  });

  test("mostra as dicas (tooltips) pra cada botão", () => {
    render(<Sidebar />);

    // verifica se o 'label' dos botões aparecem
    expect(screen.getByText("Alterar Tema")).toBeInTheDocument();
    expect(screen.getByText("Histórico de cidades")).toBeInTheDocument();
    expect(screen.getByText("Exportar em PDF")).toBeInTheDocument();
  });

   test("tem a estrutura de classes correta", () => {
    const { container } = render(<Sidebar />);
    
    // pega o elemento principal pela classe
    const sidebar = container.querySelector('.sidebar.card');
    expect(sidebar).toBeInTheDocument();
    
    // verifica se tem o container dos botões
    const buttonsContainer = container.querySelector(`.${styles.buttonsContainer}`);
    expect(buttonsContainer).toBeInTheDocument();
  });
});