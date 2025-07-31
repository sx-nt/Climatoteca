Análise e Desenvolvmento de Sistemas
Programação Frontend II
Prof. Adriano Lima, Prof
**Projeto Final:** Aplicativo de Consulta do Clima

# 1 Objetivo

O objetivo deste projeto é desenvolver uma aplicação frontend que permita ao usuário consultar informações meteorológicas em tempo real, utilizando uma API pública de clima. A aplicação deve exibir o clima atual e a previsão para os próximos dias, com foco em organização, tipagem estática e boas práticas de desenvolvimento.

# 2 Especificação do Projeto

## 2.1 Requisitos Funcionais

1.  - [x] ~~O sistema deve permitir buscar cidades pelo nome, com validação de erros.~~

> [!NOTE}
> Aparecem sugestões na tela conforme a api vai buscando pelo input do usuário, caso não apareça sugestões o input está errado.

2.  - [x] ~~O sistema deve exibir os dados do clima atual: temperatura, sensação térmica, umidade, vento, descrição e ícone.~~

3.  - [x] ~~O sistema deve apresentar a previsão do tempo para os próximos cinco dias.~~

4.  - [x] ~~O sistema deve manter um histórico das últimas cidades; ao selecionar uma dessas cidades, os dados do clima devem ser atualizados e exibidos.~~

5.  - [ ] O sistema deve possuir interface responsiva, adaptável a diferentes tamanhos de tela.

## 2.2 Requisitos Não Funcionais

1.  - [x] ~~O projeto deve ser implementado com React + TypeScript.~~

2.  - [x] ~~O código deve estar organizado em módulos e componentes reutilizáveis.~~

3.  - [x] ~~A aplicação deve ser executada via servidor local (vite, react-scripts ou similar).~~

4.  - [x] ~~O arquivo tsconfig.json deve estar configurado com tipagem estrita.~~

5.  - [x] ~~O código deve seguir boas práticas de clareza, legibilidade e organização (ver a seção sobre qualidade de código abaixo).~~

6.  - [ ] Cada componente deve ter pelo menos dois testes unitários

7.  O documento package.json deve conter os seguintes scripts:
    - - [x] ~~`dev`: para iniciar o servidor de desenvolvimento.~~
    - - [x] ~~`build`: para gerar a versão de produção.~~
    - - [x] ~~`test`: para executar os testes unitários.~~
    - - [x] ~~`lint`: para verificar a qualidade do código.~~
    - - [x] ~~`format`: para formatar o código.~~

8.  O projeto deve conter um README.md atualizado com:
    - - [ ] Nome dos responsáveis.
    - - [ ] Descrição da aplicação.
    - - [ ] Estrutura do projeto.
    - - [ ] Tecnologias utilizadas.
    - - [ ] Origem dos dados (API utilizada).
    - - [ ] Funcionalidades extras implementadas.

9.  - [x] ~~A aplicação deve utilizar uma API pública de clima (ver sugestões abaixo).~~

10. - [x] ~~A chave de acesso à API deve ser mantida em um arquivo de configuração e não deve ser exposta no código-fonte.~~

## 2.3 Funcionalidades Extras

1.  - [x] ~~Tema escuro/claro.~~

2.  - [x] ~~Detecção automática de localização.~~

3.  - [ ] Imagem de fundo dinâmica integrada com o clima atual.

> [!NOTE]
> Não feito por uma escolha estética do site.

4.  - ~~[x] Exportação da previsão em PDF.~~

5.  - [x] ~~Gráfico de temperatura dos últimos dias.~~

## 2.4 Qualidade do Código

1.  - [ ] Todas as variáveis, funções e componentes devem estar devidamente tipados.

2.  - [x] ~~Interfaces e tipos personalizados devem ser utilizados para representar os dados.~~

3.  - [x] ~~Variáveis, funções e componentes devem ter nomes claros, descritivos e padronizados.~~

4.  - [x] ~~Cada função deve ter apenas uma responsabilidade.~~

5.  - [ ] Deve-se evitar funções longas ou com blocos de lógica aninhada complexa (máximo dois níveis de aninhamento).

6.  - [x] ~~Os módulos devem ter responsabilidades bem definidas.~~

7.  - [ ] ~~Deve-se evitar repetição de código e promover a reutilização por meio de funções utilitárias.~~

8.  - [x] ~~Funções não utilizadas e mensagens de depuração devem ser removidas.~~

9.  - [x] ~~O tipo genérico any deve ser evitado.~~

## 2.5 Sugestões de APIs

- OpenWeatherMap (https://openweathermap.org/api)

> [!NOTE]
> OpenWeatherMap foi usado no projeto.

- WeatherAPI (https://www.weatherapi.com/)

- Open-meteo (https://open-meteo.com/)

- Weatherstack (https://weatherstack.com/)

- WeatherBit (https://www.weatherbit.io/api)

- Visual Crossing (https://www.visualcrossing.com/weather-api)

# 3 Entrega do Trabalho

## 3.1 Sobre a apresentação

1. A apresentação consistirá em uma demonstração da aplicação, seguida de perguntas sobre a implementação e os conceitos utilizados.
2. A apresentação é obrigatória: a não apresentação acarretará em nota zero para os responsáveis pelo trabalho.
3. A ausência de um dos membros do grupo acarretará em nota zero para o aluno ausente.

4. A apresentação será individualizada, ou seja, apenas os responsáveis pelo trabalho e o professor
   estarão presentes.

5. A nota da apresentação será divida em duas partes:
   - Demonstração da aplicação: onde o grupo deve explicar a implementação, as tecnologias utilizadas e a estrutura do código. Todos os membros do grupo devem participar da demonstração. A nota será comum para os membros do grupo e será composta pela média das notas de cada um dos membros, considerando a participação de cada um.

- Perguntas sobre a implementação: onde o professor fará perguntas sobre a implementação, os conceitos utilizados e as decisões de design. Cada membro do grupo deve estar preparado para responder às perguntas. A nota será individual.

6. A ordem das apresentações será definida por sorteio.

## 3.2 Outras definições

1. O trabalho deverá ser feito em grupo de dois ou três alunos, limitado a sete grupos na turma.

2. A contribuição de cada membro do grupo deve ficar clara nos commits do repositório.

3. Alunos que não comprovarem a sua participação no desenvolvimento do projeto receberão zero na pontuação referente às especificações do projeto.

4. O trabalho será avaliado com base no atendimento às especificações do projeto (60%) e na apresentação do trabalho (40%).

5. Violações de boas práticas e qualidade do código acarretarão em redução da nota.

6. A implementação de mais de uma funcionalidade extra adicionará 0,25 ponto extra para cada item, que não poderá ultrapassar a nota máxima do trabalho.

7. Apenas os alunos que não atingirem nota suficiente (≥ 6) poderão fazer nova entrega (recuperação);

8. Para a nota da recuperação serão consideradas as correções apontadas na avaliação do projeto e a implementação das novas funcionalidades a serem propostas.

9. A identificação de plágio acarretará em nota zero para todos os envolvidos.

> [!WARNING]
> Você deve ser o único(a) responsável por fazer a entrega para essa atividade. Todo o código ou texto deverá ser produzido exclusivamente por você, exceto trechos de códigos que possam ter sido fornecidos como parte do enunciado.
>
> Você pode discutir com outros estudantes com o intuito de esclarecer pontos, isso é até incentivado, porém você não poderá copiar trechos de códigos, textos ou soluções de qualquer fonte (e.g. colegas da mesma turma ou de turmas anteriores, repositórios de códigos na Internet ou soluções providas por serviços como Copilot e ChatGPT).

> [!NOTE]
>
> - **Entrega no repositório:** 13 de Julho;
> - **Apresentação:** 14 de Julho.
