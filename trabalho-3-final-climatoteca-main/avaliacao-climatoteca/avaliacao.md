# Avaliação do Projeto Final

**Notas:**

- Júlia: 8,7
- Sant: 7,2
- Sofia: 8,7

## Requisitos Funcionais

- **RF1 O sistema deve permitir buscar cidades pelo nome, com validação de erros.**
  - Comentário: Atendido.

- **RF2 O sistema deve exibir os dados do clima atual: temperatura, sensação térmica, umidade, vento, descrição e ícone.**
  - Comentário: Atendido.

- **RF3 O sistema deve apresentar a previsão do tempo para os próximos cinco dias.**
  - Comentário: Atendido.

- **RF4 O sistema deve manter um histórico das últimas cidades; ao selecionar uma dessas cidades, os dados do clima devem ser atualizados e exibidos.**
  - Comentário: Atendido.

* **RF5 O sistema deve possuir interface responsiva, adaptável a diferentes tamanhos de tela.**
  - Comentário: Parcialmente atendido.
    - A partir de 769px de largura, a interface exige que se faça rolagem horizontal para exibir o conteúdo.

## Requisitos Não Funcionais

- **RNF1 O projeto deve ser implementado com React + TypeScript.**
  - Comentário: Atendido.

- **RNF2 O código deve estar organizado em módulos e componentes reutilizáveis.**
  - Comentário: Parcialmente atendido.
    - Foram implementados 4 componentes com papel de botão (`DownloadButton`, `GeolocationButton`, `HistoryButton` e `ThemeButton`), sem reutilização.
    - Os componentes `DownloadButton` e `HistoryButton` fazem mais do que implementar botões. `DownloadButton` ten uma `<div>` de informações e `HistoryButton` tem um `<dialog>`, que poderiam ser componentes separados.

- **RNF3 A aplicação deve ser executada via servidor local (vite, react-scripts ou similar).**
  - Comentário: Atendido.

- **RNF4 O arquivo tsconfig.json deve estar configurado com tipagem estrita.**
  - Comenatário: Não atendido.
    - Tipagem estrita desligada (`false`).

- **RNF5 O código deve seguir boas práticas de clareza, legibilidade e organização.**
  - Comentário: ver a seção sobre qualidade de código abaixo.

- **RNF6 Cada componente deve ter pelo menos dois testes unitários.**
  - Comentário: O componente `Suggestions` não foi testado.

- **RNF7 O documento package.json deve conter os seguintes scripts:**\
  (a) dev: para iniciar o servidor de desenvolvimento.\
  (b) build: para gerar a versão de produção.\
  (c) test: para executar os testes unitários.\
  (d) lint: para verificar a qualidade do código.\
  (e) format: para formatar o código.
  - Comentário: Atendido.

- **RNF8 O projeto deve conter um README.md atualizado com:**\
  (a) Nome dos responsáveis.\
  (b) Descrição da aplicação.\
  (c) Estrutura do projeto.\
  (d) Tecnologias utilizadas.\
  (e) Origem dos dados (API utilizada).\
  (f) Funcionalidades extras implementadas.
  - Comentário: Parcialmente atendido.
    - Não mencionou o uso de `Vitest`, `ESLint` e `Prettier`.

- **RNF9 A aplicação deve utilizar uma API pública de clima (ver sugestões abaixo)**
  - Comentário:

- **RNF10 A chave de acesso à API deve ser mantida em um arquivo de configuração e não deve ser exposta no código-fonte.**
  - Comentário:

## Funcionalidades Extras

Funcionalidades implementadas:

- FE1 Tema escuro/claro (obrigatória)
- FE2 Detecção automática de localização (parcialmente: a localização deve ser automática)
- FE4 Exportação da previsão em PDF
- FE5 Gráfico de temperatura dos últimos dias.

## Qualidade do Código

- **QA1 Todas as variáveis, funções e componentes devem estar devidamente tipados.**
  - Comentário: Atendido.

- **QA2 Interfaces e tipos personalizados devem ser utilizados para representar os dados.**
  - Comentário: Atendido.

- **QA3 Variáveis, funções e componentes devem ter nomes claros, descritivos e padronizados.**
  - Comentário: Atendido.

- **QA4 Cada função deve ter apenas uma responsabilidade.**
  - Comentário: Atendido.

- **QA5 Deve-se evitar funções longas ou com blocos de lógica aninhada complexa (máximo dois níveis de aninhamento).**
  - Comentário: Atendido.

- **QA6 Os módulos devem ter responsabilidades bem definidas.**
  - Comentário: Atendido.

- **QA7 Deve-se evitar repetição de código e promover a reutilização por meio de funções utilitárias.**
  - Comentário: Parcialmente atendido.
    - Duplicação da propriedade `background-color` no seletor `body` em `index.css`.
    - Duplicação do seletor `.maxTemp` em `index.css`.
    - Duplicação da propriedade `padding` no seletor `.suggestions li` em `styles.module.css`.

- **QA8 Funções não utilizadas e mensagens de depuração devem ser removidas.**
  - Comentário: Parcialmente atendido.
    - Uso de `console.error` em Button, `WeatherContext`, `searchHook` e `Storage`.

- **QA9 O tipo genérico any deve ser evitado.**
  - Comentário: Atendido.
