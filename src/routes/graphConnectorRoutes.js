import express from 'express';
import multer from 'multer';
import { getRequestHandler, postRequestHandler, deleteRequestHandler } from '../controllers/whatsappGraphController.js';
import graphConnectorMiddleware from '../middleware/graphConnectorMiddleware.js';
const graphConnectorRouter = express.Router();

graphConnectorRouter.use(graphConnectorMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

graphConnectorRouter.get("/*", getRequestHandler);
graphConnectorRouter.post("/*", upload.any(), postRequestHandler);
graphConnectorRouter.delete("/*", deleteRequestHandler);

export default graphConnectorRouter;