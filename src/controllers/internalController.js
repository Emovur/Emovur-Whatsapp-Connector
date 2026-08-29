import { createNewConnector, getOrgConnectors } from "../helpers/connectorHelper.js";
import asyncHandler from "../utills/asyncHandler.js";

const setupOrgConnector = asyncHandler(async (req, res, next) => {
    const { orgId, connectorName } = req.body;
    const result = await createNewConnector(orgId, connectorName);
    if (!result.status) {
        return res.status(400).json({ message: result.message });
    }
    const connectors = await getOrgConnectors(orgId);
    return res.status(200).json({ message: result.message, connectors: connectors });
});

const getupOrgConnector = asyncHandler(async (req, res, next) => {
    const { orgId } = req.params;
    const connectors = await getOrgConnectors(orgId);
    if (connectors.length === 0) {
        return res.status(404).json({ message: "No connectors found for the given orgId" });
    }

    return res.status(200).json({ connector: connectors[0] });
});

export {
    setupOrgConnector,
    getupOrgConnector
};