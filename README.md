# XML to JSON API

## Descrição

A **XML to JSON API** é uma aplicação em Node.js com TypeScript que recebe dados em formato XML através de uma rota HTTP, converte esses dados para JSON de forma organizada e retorna como resposta. A API foi desenvolvida seguindo os princípios **SOLID**, com uma arquitetura escalável adequada para microserviços.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
  - [Em Ambiente de Desenvolvimento](#em-ambiente-de-desenvolvimento)
  - [Em Ambiente de Produção](#em-ambiente-de-produção)
- [Docker](#docker)
  - [Construir a Imagem Docker](#construir-a-imagem-docker)
  - [Executar o Contêiner Docker](#executar-o-contêiner-docker)
  - [Usando Docker Compose](#usando-docker-compose)
  - [Deploy com Docker Swarm](#deploy-com-docker-swarm)
- [Endpoints](#endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

- Node.js (versão 20 ou superior)
- npm (versão 10 ou superior)
- Docker (versão 20 ou superior)
- Docker Compose (versão 1.29 ou superior)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/guilhermejansen/xml-to-json-api.git
cd xml-to-json-api
npm install
```

## Execução

### Em Ambiente de Desenvolvimento

Para executar a aplicação em ambiente de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Em Ambiente de Produção

Para compilar e executar a aplicação em ambiente de produção:

```bash
npm run build
npm start
```

## Docker

### Construir a Imagem Docker

Para construir a imagem Docker da aplicação:

```bash
docker build -t xml-to-json-api .
```

### Executar o Contêiner Docker

Para executar o contêiner Docker:

```bash
docker run -p 3000:3000 xml-to-json-api
```

A aplicação estará disponível em `http://localhost:3000`.

### Usando Docker Compose

Para construir e executar a aplicação usando Docker Compose:

```bash
docker-compose up --build
```

### Deploy com Docker Swarm

#### Inicializar o Swarm

Se você ainda não inicializou o Docker Swarm:

```bash
docker swarm init
```

#### Implantar a Stack

Para implantar a aplicação em um cluster Docker Swarm:

```bash
docker stack deploy -c docker-compose.yml xml-to-json-api
```

#### Verificar os Serviços

Para verificar se os serviços estão em execução:

```bash
docker stack services xml-to-json-api
```

## Endpoints

### `POST /api/xml/parse`

Recebe um XML no corpo da requisição e retorna o JSON convertido.

#### Requisição

- **URL**: `http://localhost:3000/api/xml/parse`
- **Método**: `POST`
- **Headers**:
  - `Content-Type: application/xml`
- **Body**: XML a ser convertido.

#### Exemplo com cURL

```bash
curl -X POST http://localhost:3000/api/xml/parse \
     -H 'Content-Type: application/xml' \
     -d '<listings><listing><name>Exemplo</name></listing></listings>'
```

#### Resposta

- **Status Code**: `200 OK`
- **Body**: JSON convertido.

```json
[
  {
    "destination_id": null,
    "name": "Exemplo",
    "description": "",
    "address": {},
    "latitude": null,
    "longitude": null,
    "types": []
  }
]
```

## Estrutura do Projeto

```
├── config
│   └── default.ts
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── controllers
│   │   └── xmlController.ts
│   ├── middlewares
│   │   └── errorHandler.ts
│   ├── routes
│   │   └── xmlRoutes.ts
│   ├── services
│   │   └── xmlService.ts
│   ├── utils
│   │   └── xmlParser.ts
│   └── models
│       └── index.ts
├── .env
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework web para Node.js.
- **xml2js**: Biblioteca para converter XML em JSON.
- **Docker**: Plataforma para construção e execução de aplicativos em contêineres.
- **Docker Compose**: Ferramenta para definir e executar aplicações Docker multi-contêiner.
- **Docker Swarm**: Sistema de orquestração nativo do Docker para gerenciar clusters.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.
