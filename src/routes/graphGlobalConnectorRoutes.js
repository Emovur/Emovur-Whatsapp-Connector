import express from 'express';
import multer from 'multer';
import graphOrgMiddleware from '../middleware/graphOrgMiddleware.js';
import { getRequestHandler, postRequestHandler, deleteRequestHandler } from '../controllers/whatsappGraphController.js';
const graphGlobalConnectorRouter = express.Router();

graphGlobalConnectorRouter.use(graphOrgMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

graphGlobalConnectorRouter.get("/*", getRequestHandler);
graphGlobalConnectorRouter.post("/*", upload.any(), postRequestHandler);
graphGlobalConnectorRouter.delete("/*", deleteRequestHandler);

export default graphGlobalConnectorRouter;