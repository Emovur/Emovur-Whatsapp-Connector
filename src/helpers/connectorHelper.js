import connectorModel from "../models/connectorModel.js";
import { appUrl } from "./urlHelper.js";
import { getOrgWhatsappSettings } from "./whatsappSettingHelper.js";

const createNewConnector = async (orgId, connectorName) => {
    if (!orgId || !connectorName) {
        return { status: false, message: "connectorName are required" };
    }

    const connectorList = await getOrgConnectors(orgId);
    if (connectorList.length >= 1) {
        return { status: false, message: "Only 1 connector is allowed" };
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
    const connectorConfig = await getConnectorConfig(orgId);
    return connectors.map(connector => ({
        connectorId: connector._id.toString(),
        connectorName: connector.connectorName,
        status: connector.status,
        config: { ...connectorConfig }
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

const getConnectorConfig = async (orgId) => {
    const whatsappSettings = await getOrgWhatsappSettings(orgId);
    return {
        wabaId: whatsappSettings?.business?.wabaId || null,
        phoneNumberId: whatsappSettings?.phone?.senderId || null,
        phoneNumber: whatsappSettings?.phone?.senderNumber || null,
        baseUrl: appUrl() + "/v20.0",
    };
};

export { createNewConnector, getOrgConnectors, changeConnectorStatus, getConnectorById };