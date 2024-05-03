import { prismaClient } from '../database/PrismaClient.js';

const findEventById = async (id) => await prismaClient.eventos.findUnique({ where: { id } });

export class EventCrontroller {
	async findAllEvents(req, res) {
		const { categoria_id, local_id, data } = req.query;

		try {
			let events = await prismaClient.eventos.findMany({
				where: {
					...(categoria_id && { categoria_id }),
					...(local_id && { local_id }),
					...(data && { data_inicio: data }),
				},
				orderBy: { data_inicio: 'asc' },
			});

			// Verifica se algum filtro foi aplicado e se há retorno
			const isFilteredSearch =
				categoria_id !== undefined || local_id !== undefined || data !== undefined;

			if (isFilteredSearch) return res.status(404).json({ message: 'Nenhum evento localizado!' });

			res.status(200).json(events);
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: 'Erro ao listar eventos.' });
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
					nome: event.nome,
					data: event.data,
					descricao: event.descricao,
					categoria: event.categoria,
					local: event.local,
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
