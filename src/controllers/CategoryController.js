import { prismaClient } from '../database/PrismaClient.js';

export class CategoryController {
	async findAllCategories(req, res) {
		try {
			const categories = await prismaClient.categorias.findMany();
			res.status(200).json(categories);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Erro ao buscar categorias.' });
		}
	}

	async findCategoryById(req, res) {
		const { id } = req.params;
		try {
			const category = await prismaClient.categorias.findUnique({
				where: { id },
			});
			if (!category) {
				return res.status(404).json({ error: 'Categoria não encontrada.' });
			}
			res.status(200).json(category);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Erro ao buscar categoria.' });
		}
	}

	async createCategory(req, res) {
		const { nome } = req.body;
		try {
			const category = await prismaClient.categorias.create({
				data: { nome },
			});
			res.status(201).json(category);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Erro ao criar categoria.' });
		}
	}

	async updateCategory(req, res) {
		const { id } = req.params;
		const { nome } = req.body;
		try {
			const category = await prismaClient.categorias.update({
				where: { id },
				data: { nome },
			});
			res.status(200).json(category);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Erro ao atualizar categoria.' });
		}
	}

	async deleteCategory(req, res) {
		const { id } = req.params;
		try {
			// Verifica se há eventos associados a esta categoria
			const eventos = await prismaClient.eventos.findMany({
				where: { categoria_id: id },
			});

			// Se houver eventos associados, retorna a mensagem de erro
			if (eventos.length > 0) {
				return res
					.status(400)
					.json({ error: 'Esta categoria está associada a eventos e não pode ser excluída.' });
			}

			// Se não houver eventos associados, exclui a categoria
			await prismaClient.categorias.delete({ where: { id } });

			return res.status(204).send();
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'Erro ao excluir categoria.' });
		}
	}
}
