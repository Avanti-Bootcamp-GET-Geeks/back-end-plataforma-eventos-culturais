// Importações
import express from 'express';
//imports para documentação 
import swaggerUi from "swagger-ui-express"
import swaggerDocs  from "./swagger.json" assert { type: "json" }
import cors from 'cors'


// Arquivos de rotas
import { eventRoutes } from './src/routes/eventRoutes.js';
import { categoryRoutes } from './src/routes/categoryRoutes.js';
import { localRoutes } from './src/routes/localRoutes.js';
import { roleRoutes } from './src/routes/roleRoutes.js';
import { userRoutes } from './src/routes/userRoutes.js';
import { loginRoutes } from './src/routes/loginRoutes.js';

const app = express(); // Define que a aplicação usará o express
app.use(express.json()); // Seta middleware no express para reconhecimento/análise de JSON nas requisições HTTP

// Habilita o cors e seta uma lista de 'origens'
app.use(cors(
    {
        // Endereços que poderão acessar a API
        origin: [
            "localhost:3001",
            "localhost:3002",
			"http://localhost:5173"
        ],
        // Requisições permitidas
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))//Seta middleware para o acesso a documentação e o arquivo que contem a mesma

const PORT = 3000; // Porta onde a aplicação será executada

// Rotas
app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Olá! Seja bem vindo(a) à Plataforma de Gerenciamento de Eventos Culturais.',
	});
});

app.use(eventRoutes); // Rotas de eventos
app.use(categoryRoutes); // Rotas de categorias
app.use(localRoutes); // Rotas de locais
app.use(roleRoutes); // Rotas de cargos
app.use(userRoutes); // Rotas de usuários
app.use(loginRoutes); // Rotas de login

// Inicia servidor na porta especificada
app.listen(PORT, () => {
	console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
