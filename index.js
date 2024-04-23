// Importações
import express from 'express';

// Arquivos de rotas

const app = express(); // Define que a aplicação usará o express
app.use(express.json()); // Seta middleware no express para reconhecimento/análise de JSON nas requisições HTTP

const PORT = 3000; // Porta onde a aplicação será executada

// Rotas
app.get('/', (req, res) => {
	res
		.status(200)
		.json({
			message: 'Olá! Seja bem vindo(a) à Plataforma de Gerenciamento de Eventos Culturais.',
		});
});

// Inicia servidor na porta especificada
app.listen(PORT, () => {
	console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
