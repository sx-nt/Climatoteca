*<p align="center"> Instituto Federal de Santa Catarina - Análise e Desenvolvimento de Sistemas - Programação Frontend II - 2025.1 </p>*

*<h1 align="center"> Projeto Final / Consulta de Dados Climáticos : Climatoteca </h1>*
*<p align="center"> Climatoteca é uma aplicação web para consulta e visualização de dados climáticos atuais e históricos de forma intuitiva e interativa. </p>* <br>

Professor: Adriano Lima  
Responsáveis: Júlia Manuela Turnes, Sofia Alves Toreti e Sant Semeghini
<br> 
<br>

## Como rodar o projeto localmente

1. Clone o repositório para sua máquina.

2. Crie um arquivo `.env` na raiz do projeto (fora da pasta `/src/`) com as seguintes variáveis de ambiente:

```env
VITE_OPEN_WEATHER_MAP_API_KEY=[sua chave da OpenWeatherMap API]
VITE_WEATHER_API_KEY=[sua chave da WeatherAPI]
```

> [!NOTE]
> As APIs utilizadas estão disponíveis ao fim do documento.

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Descrição da aplicação

Climatoteca é um app de clima que fornece:

* Clima atual com temperatura mínima, máxima e descrição do céu (ex: nublado, limpo, etc), acompanhado de ícone representativo.
* Gráfico com o histórico de temperaturas dos últimos 5 dias (temperatura mínima, máxima e média).
* Previsão do tempo para os próximos 5 dias.
* Informações adicionais como sensação térmica, vento, umidade e chance de chuva.
* **Funcionalidades extras como:**

  * Botão de geolocalização para buscar o clima atual da localização do usuário.
  * Alternância entre tema claro e escuro.
  * Histórico de pesquisas recentes.
  * Opção para exportar os dados em PDF.

---

## Estrutura do projeto

```
.
├── README.md
├── docs/                       # (tentativa) documentação do projeto
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   └── images/             # imagens e ícones do app
│   ├── components/
│   │   ├── DayGraph            # gráfico diário do clima
│   │   ├── DayInfo             # detalhes do clima do dia
│   │   ├── DownloadButton      # botão para exportar pdf
│   │   ├── GeolocationButton   # botão de geolocalização
│   │   ├── HistoryButton       # histórico de pesquisas
│   │   ├── Searchbar           # barra de pesquisa de local
│   │   ├── Sidebar             # navegação lateral
│   │   ├── Suggestions         # sugestões de autocomplete
│   │   ├── ThemeButton         # troca de tema
│   │   ├── WeatherCard         # cards com dados do clima (WeatherInfo)
│   │   ├── WeekInfo            # previsão semanal
│   │   └── WeatherInfo         # informações do ar e clima (WeatherCard)
│   ├── constants/              # constantes e apis
│   ├── contexts/               # contextos react (localização, clima)
│   ├── hooks/                  # hooks personalizados
│   ├── index.css
│   ├── interfaces/             # interfaces typescript
│   ├── main.tsx
│   ├── types/                  # tipos compartilhados
│   └── utils/                  # funções utilitárias
```

---

## Tecnologias utilizadas

* **React**
* **TypeScript**
* **Vite**
* **Chart.js** (gráficos)
* **React Chart.js 2**
* **HTML2PDF.js** (para exportação em PDF)
* **React Icons**
* **Testing Library** (para testes)

---

## Origem dos dados (APIs utilizadas)

* [OpenWeatherMap](https://openweathermap.org/api) – Para dados climáticos atuais e previsão.
* [WeatherAPI](https://www.weatherapi.com/) – Exclusivamente usada para os dados históricos de temperatura (gráfico).

---