import { prismaClient } from '../database/PrismaClient.js';

export class CategoryController {
	async findAllCategogory(reques, response) {}

	async createCategory(request, response) {
		const { nome } = request.body;
		const category = await prismaClient.categorias.create({
			data: {
				nome: nome,
			},
		});
		response.status(201).json(category);
	}
}
