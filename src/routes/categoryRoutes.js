import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { Validation } from '../middleware/validationMiddleware.js';
import authorization from '../auth/authorization.js';
import pagination from '../middleware/paginationMiddleware.js';

const categoryRoutes = Router();
const categoryController = new CategoryController();
const validation = new Validation();

categoryRoutes.get('/categories', pagination, categoryController.findAllCategories);
categoryRoutes.post('/category', authorization, validation.validateCategoryData, categoryController.createCategory);

categoryRoutes.get('/category/:id', validation.validateIdParameter, categoryController.findCategoryById);
categoryRoutes.put('/category/:id', authorization, validation.validateIdParameter, validation.validateCategoryData, categoryController.updateCategory);
categoryRoutes.delete('/category/:id', authorization, validation.validateIdParameter, categoryController.deleteCategory);

export { categoryRoutes };
