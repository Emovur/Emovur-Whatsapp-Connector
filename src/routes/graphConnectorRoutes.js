import express from 'express';
import multer from 'multer';
import { getRequestHandler, postRequestHandler, deleteRequestHandler } from '../controllers/whatsappGraphController.js';
const graphConnectorRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

graphConnectorRouter.get("/*", getRequestHandler);
graphConnectorRouter.post("/*", upload.any(), postRequestHandler);
graphConnectorRouter.delete("/*", deleteRequestHandler);

export default graphConnectorRouter;