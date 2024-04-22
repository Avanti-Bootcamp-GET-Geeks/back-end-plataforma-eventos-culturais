import { Router } from "express";
import { EventCrontroller } from "../controllers/EventController.js"

const eventRoutes = Router();
const eventController = new EventCrontroller();

eventRoutes.get("/events", eventController.findAllEvents);
eventRoutes.get("/event/:id", eventController.findEventById);
eventRoutes.post("/event", eventController.createEvent);
eventRoutes.put("/event/:id", eventController.updateEvent);
eventRoutes.delete("/event/:id", eventController.deleteEvent);


export { eventRoutes };