import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, describe } from "vitest";
import GeoLocationButton from ".";
import "@testing-library/jest-dom/vitest";

// substitui importações feitas desse endereço
vi.mock("../../contexts/LocationContext",
    // esse endereço exporta um 'useCoord' que será substituido por uma função mock
    () => ({ useCoord: () => ({ setLocation: vi.fn() }),
}));

describe("GeoLocationButton", () => {

  test("renderiza o botão de geolocalização", () => {
    // quando alguém usar navigator.geolocation.getCurrentPosition
    // (getGeoLocation()), esse mock será chamado no lugar
    vi.stubGlobal("navigator", {
        // vi.stubGlobal => serve para substituir funções globais
        // (neste caso a variavel navigator usada dentro de getGeoLocation())
        geolocation: {
        getCurrentPosition: vi.fn(), // mock vazio só pra não dar erro
        },
    });
    // renderiza o componente GeoLocationButton na tela virtual do teste
    render(<GeoLocationButton />);
    // procura na tela virtual o botão que o usuário clicaria
    const button = screen.getByRole("button");
    // verifica se o botão foi renderizado corretamente na tela virtual
    expect(button).toBeInTheDocument();
  });

    test("chama navigator.geolocation.getCurrentPosition ao clicar no botão", () => {
        // criamos uma função mock para substituir a função real do navegador
        // essa função vai só registrar que foi chamada, sem fazer nada de verdade
        const mockGetCurrentPosition = vi.fn();

        // quando alguém usar navigator.geolocation.getCurrentPosition
        // (getGeoLocation()), esse mock será chamado no lugar
        vi.stubGlobal("navigator", {
            // vi.stubGlobal => serve para substituir funções globais
            // (neste caso a variavel navigator usada dentro de getGeoLocation())
            geolocation: {
            getCurrentPosition: mockGetCurrentPosition,
            },
        });

        render(<GeoLocationButton />);
        const button = screen.getByRole("button");
        // simula o clique do usuário nesse botão
        fireEvent.click(button);

        // verifica se a função falsa mockGetCurrentPosition() foi chamada quando clicamos
        // no botão isso prova que o botão está chamando a função que pega a localização
        expect(mockGetCurrentPosition).toHaveBeenCalled();
    });
});
