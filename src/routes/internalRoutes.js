import express from 'express';
import internalMiddleware from './../middleware/internalMiddleware.js';
import {
    setupOrgConnector,
    getupOrgConnector
} from '../controllers/internalController.js';

const internalRoutes = express.Router();

internalRoutes.use(internalMiddleware);

internalRoutes.post("/whatsapp/connector", setupOrgConnector);
internalRoutes.get("/whatsapp/connector/:orgId", getupOrgConnector);

export default internalRoutes;