import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { Validation } from "../middleware/validationMiddleware.js";

const userRoutes = Router();
const userController = new UserController();
const validation = new Validation();

userRoutes.get('/users', userController.findAllUsers);
userRoutes.get('/user/:id', validation.validateIdParameter, userController.findUserById);
userRoutes.post('/user', validation.valitadeUserData, userController.createUser);
userRoutes.put('/user/:id', validation.validateIdParameter, validation.valitadeUserData, userController.updateUser);
userRoutes.delete('/user/:id', validation.validateIdParameter, userController.deleteUser);

export { userRoutes };