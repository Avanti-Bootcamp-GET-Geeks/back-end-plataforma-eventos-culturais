import { prismaClient } from '../database/PrismaClient.js';

const findEventById = async (id) => await prismaClient.eventos.findUnique({ where: { id } });

export class EventCrontroller {
	async findAllEvents(req, res) {
		const { nome, categoria_id, local_id, data, limit, offset } = req.query;
		const currentDate = new Date().toISOString();

		try {
			let events = await prismaClient.eventos.findMany({
				take: limit, skip: offset,
				where: {
					// Transforma em lowercase e compara de forma insensível a maiúsculas
					...(nome && { nome: { contains: nome.toLowerCase(), mode: 'insensitive' } }),
					...(categoria_id && { categoria_id }),
					...(local_id && { local_id }),
					...(data && { data_inicio: data }), // filtra todos os eventos com a data informada
					...(nome ? {} : {
						OR: [
							{ 
								// Eventos que já começaram e ainda não terminaram (dataI <= current e data_fim >= currentDate)
								data_inicio: { lte: currentDate }, data_fim: { gte: currentDate } 
							},
							{ 
								// Eventos que ainda vão começar (dataI >= currentDate)
								data_inicio: { gte: currentDate } 
							}
						]
					})			
				},
				include: {
					local: true
				},
				orderBy: { data_inicio: 'asc' },
			});

			res.status(200).json(events);
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao listar eventos.' });
		}
	}


	async findAllEventsByUserId(req, res) {
		const {nome, encerrados, limit, offset} = req.query;
		const currentDate = new Date().toISOString();

		try {
			let where = {
				usuario_id: req.params.id,
				// Se 'nome' for fornecido, aplica o filtro insensível a maiúsculas e minúsculas
				...(nome ? 
					{ nome: { contains: nome.toLowerCase(), mode: 'insensitive' } } : 
					// Se 'nome' não for fornecido, aplica o filtro de data
					{
						OR: [
							// Eventos que já começaram e ainda não terminaram
							{ data_inicio: { lte: currentDate }, data_fim: { gte: currentDate } },
							// Eventos que ainda vão começar
							{ data_inicio: { gte: currentDate } }
						]
					}
				)
			};

			// Se o parâmetro 'encerrados' for verdadeiro, filtra por eventos já encerrados
			if (encerrados === 'true') {
				where = {
					usuario_id: req.params.id,
					data_fim: { lt: currentDate } // Eventos que já encerraram
				};
				// Aplica o filtro por nome, se fornecido
				if (nome) {
					where.nome = { contains: nome.toLowerCase(), mode: 'insensitive' };
				}
			}

			const events = await prismaClient.eventos.findMany({
				take: limit, skip: offset,
				where,
				include: {
					categoria: true, // Inclui os dados da categoria do evento
					local: true // Inclui os dados do local do evento
				},
				orderBy: { data_inicio: 'asc' }, // Ordena os resultados pela data de início em ordem crescente
			});
	
			res.status(200).json(events); // Retorna os eventos encontrados em formato JSON

		} catch (error) {
			console.log(error.message)
			return res.status(500).json({ error: 'Erro ao listar eventos por usuário' });
		}
	}


	async findEventById(req, res) {
		const { id } = req.params;
		try {
			const event = await prismaClient.eventos.findUnique({
				where: { id },
				include: {
					// Inclue as informações completas dos relacionamentos
					categoria: true,
					local: true,
				},
			});

			if (event !== null) {
				// Formata a exibição do evento
				const formattedEvent = {
					id: event.id,
					imagem: event.imagem,
					nome: event.nome,
					descricao: event.descricao,
					data_inicio: event.data_inicio,
					data_fim: event.data_fim,
					categoria: event.categoria,
					local: event.local,
					usuario_id: event.usuario_id,
					data_criacao: event.data_criacao,
				};
				return res.status(200).json(formattedEvent);
			}

			res.status(404).json({ message: 'Evento não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao buscar evento.' });
		}
	}

	async createEvent(req, res) {
		const { imagem, nome, data_inicio, data_fim, descricao, categoria_id, local_id, usuario_id } =
			req.body;

		try {
			const event = await prismaClient.eventos.create({
				data: {
					imagem,
					nome,
					data_inicio,
					data_fim,
					descricao,
					categoria_id,
					local_id,
					usuario_id,
				},
			});

			return res.status(201).json(event);
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao cadastrar evento.' });
		}
	}

	async updateEvent(req, res) {
		const { id } = req.params;
		const { imagem, nome, data_inicio, data_fim, descricao, categoria_id, local_id, usuario_id } =
			req.body;

		try {
			const eventFound = await findEventById(id);

			if (eventFound !== null) {
				const event = await prismaClient.eventos.update({
					where: {
						id,
					},
					data: {
						imagem,
						nome,
						data_inicio,
						data_fim,
						descricao,
						categoria_id,
						local_id,
						usuario_id,
					},
				});

				return res.status(200).json(event);
			}

			res.status(404).json({ message: 'Evento não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao atualizar evento.' });
		}
	}

	async deleteEvent(req, res) {
		const { id } = req.params;

		try {
			const eventFound = await findEventById(id);

			if (eventFound !== null) {
				await prismaClient.eventos.delete({
					where: { id },
				});

				return res.status(204).send();
			}

			res.status(404).json({ message: 'Evento não localizado!' });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao excluir eventos.' });
		}
	}
}
