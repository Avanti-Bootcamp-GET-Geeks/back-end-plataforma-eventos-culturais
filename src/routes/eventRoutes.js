import { Router } from 'express';
import { EventCrontroller } from '../controllers/EventController.js';
import { Validation } from '../middleware/validationMiddleware.js';
import authorization from '../auth/authorization.js';
import pagination from '../middleware/paginationMiddleware.js';

const eventRoutes = Router();
const eventController = new EventCrontroller();
const validation = new Validation();

eventRoutes.get('/events', pagination, eventController.findAllEvents);
eventRoutes.get('/event/:id', validation.validateIdParameter, eventController.findEventById);
eventRoutes.post(
	'/event',
	authorization,
	validation.valitadeEventData,
	eventController.createEvent,
);
eventRoutes.put(
	'/event/:id',
	authorization,
	validation.validateIdParameter,
	validation.valitadeEventData,
	eventController.updateEvent,
);
eventRoutes.delete('/event/:id', authorization, validation.validateIdParameter, eventController.deleteEvent);

export { eventRoutes };
