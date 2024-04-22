import { Router } from "express";
import { EventCrontroller } from "../controllers/EventController.js";
import { Validation } from "../middleware/validationMiddleware.js";

const eventRoutes = Router();
const eventController = new EventCrontroller();
const validation = new Validation();

eventRoutes.get("/events", eventController.findAllEvents);
eventRoutes.get("/event/:id", validation.validateIdParameter, eventController.findEventById);
eventRoutes.post("/event", validation.valitadeEventData, eventController.createEvent);
eventRoutes.put("/event/:id", validation.validateIdParameter, validation.valitadeEventData, eventController.updateEvent);
eventRoutes.delete("/event/:id", validation.validateIdParameter, eventController.deleteEvent);


export { eventRoutes };