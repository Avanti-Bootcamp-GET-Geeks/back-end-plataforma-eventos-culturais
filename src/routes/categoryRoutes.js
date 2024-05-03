import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { Validation } from '../middleware/validationMiddleware.js';

const categoryRoutes = Router();
const categoryController = new CategoryController();
const validation = new Validation();

categoryRoutes.get('/categories', categoryController.findAllCategories);
categoryRoutes.post('/category', validation.validateCategoryData, categoryController.createCategory);

categoryRoutes.get('/category/:id', validation.validateIdParameter, categoryController.findCategoryById);
categoryRoutes.put('/category/:id', validation.validateIdParameter, validation.validateCategoryData, categoryController.updateCategory);
categoryRoutes.delete('/category/:id', validation.validateIdParameter, categoryController.deleteCategory);

export { categoryRoutes };
