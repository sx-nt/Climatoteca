import { LocationProvider } from "../../contexts/LocationContext";
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, describe } from "vitest";
import Searchbar from ".";
import "@testing-library/jest-dom/vitest";

// função mock que será testada no segundo teste
const mockHandleFormSubmit = vi.fn((e) => e.preventDefault());

// substitui importações feitas desse endereço
vi.mock("../../hooks/searchHook", () => ({
  // esse endereço exporta um 'useSearch' que será substituido por funções mock
  useSearch: () => ({
    input: "",
    results: [],
    showFiveMostRecent: vi.fn(),
    onSelect: vi.fn(),
    onInputChange: vi.fn(),
    handleFormSubmit: mockHandleFormSubmit,
  }),
}));

describe("Searchbar", () => {

  test("renderiza o searchbar, input e o botão de pesquisa", () => {
    // quando alguém usar navigator.geolocation.getCurrentPosition
    // (getGeoLocation()), esse mock será chamado no lugar
    vi.stubGlobal("navigator", {
        // vi.stubGlobal => serve para substituir funções globais
        // (neste caso a variavel navigator usada dentro de getGeoLocation())
        geolocation: {
        getCurrentPosition: vi.fn(), // mock vazio só pra não dar erro
        },
    });
    
    // renderiza o componente GeoLocationButton na
    // tela virtual do teste junto do LocationProvider
    render(
      <LocationProvider>
          <Searchbar />
      </LocationProvider>
    );

    const searchbar = screen.getByTestId("searchbar");
    expect(searchbar).toBeInTheDocument();

    const input = searchbar.querySelector('input')
    expect(input).toBeInTheDocument();

    const button = searchbar.querySelector('button')
    expect(button).toBeInTheDocument();
  });

   test("submete o formulário ao clicar no botão de pesquisa", () => {

    // renderiza o componente GeoLocationButton na
    // tela virtual do teste junto do LocationProvider
    render(
      <LocationProvider>
          <Searchbar />
      </LocationProvider>
    );

    const searchbar = screen.getByTestId("searchbar");
    const button = searchbar.querySelector('button')
    
    fireEvent.click(button);
    expect(mockHandleFormSubmit).toHaveBeenCalled();
  });

});


