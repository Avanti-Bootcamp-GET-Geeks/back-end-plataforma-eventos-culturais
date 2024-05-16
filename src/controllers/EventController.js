import { prismaClient } from '../database/PrismaClient.js';

const findEventById = async (id) => await prismaClient.eventos.findUnique({ where: { id } });

export class EventCrontroller {
	async findAllEvents(req, res) {
		const { categoria_id, local_id, data, limit, offset } = req.query;

		try {
			let events = await prismaClient.eventos.findMany({
				take: limit, skip: offset,
				where: {
					...(categoria_id && { categoria_id }),
					...(local_id && { local_id }),
					...(data && { data_inicio: data }),
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
		try {
			res.status(200).json(await prismaClient.eventos.findMany({
				take: req.query.limit, skip: req.query.offset,
				where: { usuario_id: req.params.id },
				orderBy: { data_inicio: 'asc' },
			}));
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
