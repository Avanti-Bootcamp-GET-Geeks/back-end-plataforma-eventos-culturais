import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get('/categories', categoryController.findAllCategories);
categoryRoutes.post('/category', categoryController.createCategory);

categoryRoutes.get('/category/:id', categoryController.findCategoryById);
categoryRoutes.put('/category/:id', categoryController.updateCategory);
categoryRoutes.delete('/category/:id', categoryController.deleteCategory);

export { categoryRoutes };
