# Plataforma de Gerenciamento de Eventos Culturais 

## ℹ️ Sobre
Este projeto consiste em uma aplicação back-end para gerenciamento de eventos culturais. A plataforma permite aos organizadores de eventos criar e listar eventos, e aos participantes explorar, pesquisar e filtrar eventos com base em categorias, locais e datas.


## ⚠️ Após clonar o repositório, execute os comandos abaixo:

* **Para baixar as dependências**: `npm install`;
* **Crie um arquivo com o nome** `.env` e insira nele o código que está no arquivo `.env.example` - **digite a senha** do BD no local indicado e **crie um banco** (insira o nome do banco no local indicado);
* **Migrations** - só execute este comando após criação do banco e modelagem dos dados: `npx prisma migrate dev`;
* **Executa o programa em desenvolvimento**: `nodemon dev`;
