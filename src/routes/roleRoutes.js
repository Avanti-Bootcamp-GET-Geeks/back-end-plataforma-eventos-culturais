import { Router } from "express";
import { RoleController } from "../controllers/RoleController.js";
import { Validation } from "../middleware/validationMiddleware.js";

const roleRoutes = Router();
const roleController = new RoleController();
const validation = new Validation();

roleRoutes.get('/roles', roleController.findAllRoles);
roleRoutes.get('/role/:id', validation.validateIdParameter, roleController.findRoleById);
roleRoutes.post('/role', validation.valitadeRoleData, roleController.createRole);
roleRoutes.put('/role/:id', validation.validateIdParameter, validation.valitadeRoleData, roleController.updateRole);
roleRoutes.delete('/role/:id', validation.validateIdParameter, roleController.deleteRole);


export { roleRoutes };