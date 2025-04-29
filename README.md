# mercado_bitcoin

Este é o backend do projeto de teste [Mercado Bitcoins]. Ele fornece as APIs e a lógica de servidor necessárias para rodar o sistema localmente.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:

* [Node.js](https://nodejs.org/) (última versão)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js) ou [Yarn](https://yarnpkg.com/)

## Instalação

1.  Clone este repositório:

    ```bash
    git clone [https://github.com/Carlosxell/mercado_bitcoin_backend.git](https://github.com/Carlosxell/mercado_bitcoin_backend.git)
    cd mercado_bitcoin_backend
    ```

2.  Instale as dependências:

    * Com npm:

        ```bash
        npm install
        ```

    * Com Yarn:

        ```bash
        yarn install
        ```

## Executando o Backend

1.  **Iniciar o Servidor:**

    * Com npm:

        ```bash
        npm start
        ```

    * Com Yarn:

        ```bash
        yarn start
        ```

    * Isso geralmente irá iniciar o servidor em `http://localhost:3000`

## Endpoints da API



* `GET /registration`:  Retorna o front-end no navegador.
* `POST /registration`: Endpoint de cadastro no qual o front-end faz a requisição
