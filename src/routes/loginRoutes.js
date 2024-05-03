import { Router } from 'express';
import { LoginController } from '../controllers/LoginController.js';
import { Validation } from '../middleware/validationMiddleware.js';

const loginRoutes = Router();
const loginController = new LoginController();
const validation = new Validation();

loginRoutes.post('/login', validation.validateLoginData, loginController.sign);

export { loginRoutes };
