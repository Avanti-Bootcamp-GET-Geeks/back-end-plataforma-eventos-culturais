import { Router } from 'express';
import { RoleController } from '../controllers/RoleController.js';
import { Validation } from '../middleware/validationMiddleware.js';
import authorization from '../auth/authorization.js';
import validationAdminMiddleware from '../middleware/validationAdminMiddleware.js';

const roleRoutes = Router();
const roleController = new RoleController();
const validation = new Validation();

roleRoutes.get('/roles',  roleController.findAllRoles);
roleRoutes.get('/role/:id', validation.validateIdParameter, roleController.findRoleById);
roleRoutes.post('/role', authorization, validationAdminMiddleware, validation.valitadeRoleData, roleController.createRole);
roleRoutes.put(
	'/role/:id',
	authorization, validationAdminMiddleware,
	validation.validateIdParameter,
	validation.valitadeRoleData,
	roleController.updateRole,
);
roleRoutes.delete(
	'/role/:id',
	authorization,validationAdminMiddleware,
	validation.validateIdParameter,
	roleController.deleteRole,
);

export { roleRoutes };
