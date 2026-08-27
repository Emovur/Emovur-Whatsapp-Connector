import asyncHandler from './../utills/asyncHandler.js';
import { changeConnectorStatus, createNewConnector, getOrgConnectors } from '../helpers/connectorHelper.js';

const getOrgConnector = asyncHandler(async (req, res, next) => {
    const orgId = req.headers['x-org-id'];
    const connectors = await getOrgConnectors(orgId);
    return res.status(200).json({ connectors: connectors });
});

const newOrgConnector = asyncHandler(async (req, res, next) => {
    const orgId = req.headers['x-org-id'];
    const { connectorName } = req.body;
    const result = await createNewConnector(orgId, connectorName);
    if (!result.status) {
        return res.status(400).json({ message: result.message });
    }
    const connectors = await getOrgConnectors(orgId);
    return res.status(200).json({ message: result.message, connectors: connectors });
});

const changeOrgConnectorStatus = asyncHandler(async (req, res, next) => {
    const orgId = req.headers['x-org-id'];
    const { connectorId } = req.params;
    const result = await changeConnectorStatus(orgId, connectorId);
    if (!result.status) {
        return res.status(400).json({ message: result.message });
    }
    const connectors = await getOrgConnectors(orgId);
    return res.status(200).json({ message: result.message, connectors: connectors });
});

export { newOrgConnector, getOrgConnector, changeOrgConnectorStatus };