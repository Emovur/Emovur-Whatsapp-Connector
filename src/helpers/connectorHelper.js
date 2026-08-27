import connectorModel from "../models/connectorModel.js";

const createNewConnector = async (orgId, connectorName) => {
    if (!orgId || !connectorName) {
        return { status: false, message: "connectorName are required" };
    }
    const cleanedConnectorName = connectorName.replace(/\s+/g, "").trim();
    const checker = await connectorChecker(orgId, cleanedConnectorName);
    if (!checker) {
        return { status: false, message: "Connector already exists" };
    }

    await createConnector(orgId, cleanedConnectorName);
    return { status: true, message: "Connector created successfully" };
}

const connectorChecker = async (orgId, connectorName) => {
    const connector = await connectorModel.findOne({
        orgId,
        connectorName
    }).lean();
    return !connector;
}

const createConnector = async (orgId, connectorName) => {
    return await connectorModel.create({
        orgId: orgId,
        connectorName: connectorName
    });
}

const getOrgConnectors = async (orgId) => {
    const connectors = await connectorModel.find({
        orgId: orgId,
    }).lean();

    return connectors.map(connector => ({
        connectorId: connector._id.toString(),
        connectorName: connector.connectorName,
        status: connector.status
    }));
}

const changeConnectorStatus = async (orgId, connectorId) => {
    const connector = await connectorModel.findOne({
        orgId,
        _id: connectorId
    });
    if (!connector) {
        return { status: false, message: "Connector not found" };
    }
    connector.status = !connector.status;
    await connector.save();
    return { status: true, message: "Connector status updated successfully" };
}

const getConnectorById = async (connectorId) => {
    const connector = await connectorModel.findOne({
        _id: connectorId
    }).lean();
    return connector;
}

export { createNewConnector, getOrgConnectors, changeConnectorStatus, getConnectorById };