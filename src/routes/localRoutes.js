import { Router } from "express"
import { LocalController } from '../controllers/LocalController.js'


const localRoutes = Router()
const localController = new LocalController()


localRoutes.get('/locals', localController.findAllLocals);
localRoutes.get('/local/:id', localController.findLocalById)
localRoutes.post('/local', localController.createLocal)
localRoutes.put('/local/:id', localController.updateLocal)
localRoutes.delete('/local/:id', localController.deleteLocal)



export { localRoutes }