# Plataforma de Gerenciamento de Eventos Culturais

## ℹ️ Sobre

Este projeto consiste em uma aplicação back-end para gerenciamento de eventos culturais. A plataforma permite aos organizadores de eventos criar e listar eventos, e aos participantes explorar, pesquisar e filtrar eventos com base em categorias, locais e datas.

## Configurações necessárias

Antes de utilizar o projeto, certifique-se de seguir as seguintes etapas:

- **Ter o git instalado na máquina;**
- **Ter o Node instalado;**
- **Ter um banco de dados relacional instalado (De preferência o PostgreSQL)**
- **Ter um editor de código de sua preferência;**
- **Clonar o repositório por meio do comando abaixo;**
  `git clone https://github.com/Avanti-Bootcamp-GET-Geeks/back-end-plataforma-eventos-culturais.git`
- **Utilize uma ferramenta que possibilite realizar todos os tipos de requisições como o Postman, Insomnia.**

## ⚠️ Após clonar o repositório, execute os comandos abaixo:

- **Para baixar as dependências**: `npm install`;
- **Crie um arquivo com o nome** `.env` e insira nele o código que está no arquivo `.env.example`. Além disso, adicione a variável `ROLE_VISITANTE` e insira o ID do cargo em questão;
- **Esquemas do banco de dados**: execute o comando `npx prisma migrate dev` após a criação do banco e a configuração do mesmo no arquivo **.env**;
- **Execute o programa utilizando o comando** `npm start`

## Métodos aceitos

- **GET**: Para listagem de registro(s).
- **POST**: Para criação de novo(s) registro(s).
- **PUT**: Para atualização de registro(s) existente(s).
- **DELETE**: Para exclusão de registro(s).

## Estruturas de dados

As estruturas de dados necessárias para o funcionamento do sistema estão definidas no banco de dados PostgreSQL. Abaixo está um resumo das entidades principais:

- **Categorias**: Representa as categorias dos eventos.
- **Locais**: Descreve os locais onde os eventos ocorrerão.
- **Eventos**: Contém informações sobre os eventos, incluindo nome, descrição, datas e relacionamentos com categorias e locais.
- **Cargos**: Define os cargos dos usuários.
- **Usuários**: Armazena dados dos usuários, incluindo nome, email, telefone, senha e cargo.

Consulte a documentação do banco de dados para mais detalhes sobre a estrutura e relacionamentos entre as entidades.

## Endpoints

### Categorias

- **GET `/categories`**: Retorna todas as categorias de eventos.
- **POST `/category`**: Cria uma nova categoria.

- **GET `/category/:id`**: Retorna uma categoria específica pelo ID.
- **PUT `/category/:id`**: Atualiza uma categoria existente pelo ID.
- **DELETE `/category/:id`**: Exclui uma categoria pelo ID.

### Eventos

- **GET `/events`**: Retorna todos os eventos.
- **GET `/event/:id`**: Retorna um evento específico pelo ID.
- **POST `/event`**: Cria um novo evento.
- **PUT `/event/:id`**: Atualiza um evento existente pelo ID.
- **DELETE `/event/:id`**: Exclui um evento pelo ID.

### Locais

- **GET `/locals`**: Retorna todos os locais.
- **GET `/local/:id`**: Retorna um local específico pelo ID.
- **POST `/local`**: Cria um novo local.
- **PUT `/local/:id`**: Atualiza um local existente pelo ID.
- **DELETE `/local/:id`**: Exclui um local pelo ID.

### Autenticação

- **POST `/login`**: Realiza o login de um usuário.

### Cargos

- **GET `/roles`**: Retorna todos os cargos de usuário.
- **GET `/role/:id`**: Retorna um cargo específico pelo ID.
- **POST `/role`**: Cria um novo cargo.
- **PUT `/role/:id`**: Atualiza um cargo existente pelo ID.
- **DELETE `/role/:id`**: Exclui um cargo pelo ID.

### Usuários

- **GET `/users`**: Retorna todos os usuários.
- **GET `/user/:id`**: Retorna um usuário específico pelo ID.
- **POST `/user`**: Cria um novo usuário.
- **PUT `/user/:id`**: Atualiza um usuário existente pelo ID.
- **DELETE `/user/:id`**: Exclui um usuário pelo ID.

## Documentação Swagger

Você pode utilizar o Swagger para realizar as requisições por meio do endpoint http://localhost:3000/api-docs
