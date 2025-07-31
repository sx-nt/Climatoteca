// importa os hooks q vamos usar: createContext (pra criar o contexto),
// useState (pra guardar o valor da localização) e useContext (pra acessar o contexto depois)
import { createContext, useState, useContext } from 'react';

// importa o tipo/interface da localização (latitude e longitude provavelmente)
import type { LocationInterface } from '../interfaces/location';

// define a "forma" q o contexto vai ter: valor de localização (ou null)
// e uma função pra atualizar esse valor
interface LocationContextInterface {
  location: LocationInterface | null;
  setLocation: (location: LocationInterface) => void;
}

// aqui é criado o contexto de fato, com valor inicial undefined
// esse undefined serve pra gente saber depois se o hook tá sendo usado fora do provider
const LocationContext = createContext<LocationContextInterface | undefined>(
  undefined
);

// esse aqui é o componente q "fornece" o contexto pra todo o app (ou parte dele)
// é aqui q a gente guarda o valor da localização com useState
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  // aqui a gente cria um estado pra guardar a localização
  const [location, setLocation] = useState<LocationInterface | null>(null);

  // aqui a gente entrega o contexto com os valores pra quem tiver dentro do provider
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// esse hook customizado serve pra facilitar o uso do contexto depois
// ao invés de ter q fazer useContext(LocationContext) toda vez, a gente usa só useCoord()
// e ainda protege pra garantir q o contexto tá sendo usado no lugar certo
const useCoord = (): LocationContextInterface => {
  // aqui acessa o contexto
  const context = useContext(LocationContext);

  // se n tiver contexto, significa q o componente tá fora do provider
  // e a gente lança um erro pra avisar isso
  if (!context)
    throw new Error(
      'LocationContext deve ser usado dentro de um LocationProvider.'
    );

  // se tiver tudo certo, retorna o contexto com location e setLocation
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { LocationContext, LocationProvider, useCoord };
