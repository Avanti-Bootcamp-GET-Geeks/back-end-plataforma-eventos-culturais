import { Router } from "express"
import { LocalController } from '../controllers/LocalController.js'
import { Validation } from '../middleware/validationMiddleware.js';
import authorization from '../auth/authorization.js';
import pagination from '../middleware/paginationMiddleware.js';

const localRoutes = Router();
const localController = new LocalController();
const validation = new Validation();

localRoutes.get('/locals', pagination, localController.findAllLocals);
localRoutes.get('/local/:id', validation.validateIdParameter, localController.findLocalById)
localRoutes.post('/local', authorization, validation.validateLocalData, localController.createLocal)
localRoutes.put('/local/:id', authorization, validation.validateIdParameter, validation.validateLocalData, localController.updateLocal)
localRoutes.delete('/local/:id', authorization, validation.validateIdParameter, localController.deleteLocal)

export { localRoutes }