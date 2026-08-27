import express from 'express';
import queueMonitorRouter from './queueMonitorRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';
import orgMiddleware from '../middleware/orgMiddleware.js';
import { newOrgConnector, getOrgConnector, changeOrgConnectorStatus } from '../controllers/connectorController.js';

const connectorRouter = express.Router();

connectorRouter.use(authMiddleware, orgMiddleware);

connectorRouter.get("/", getOrgConnector);
connectorRouter.get("/:connectorId/status", changeOrgConnectorStatus);
connectorRouter.post("/", newOrgConnector);

export default connectorRouter;