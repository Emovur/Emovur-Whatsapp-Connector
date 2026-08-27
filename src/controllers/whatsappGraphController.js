import asyncHandler from './../utills/asyncHandler.js';
import FormData from 'form-data';
import { getConnectorById } from '../helpers/connectorHelper.js';
import { graphDeleteRequestHandler, graphGetRequestHandler, graphPostRequestHandler } from '../helpers/graphRequestHandler.js';
import { getHeaderConfig, getOrgWhatsappSettings } from '../helpers/whatsappSettingHelper.js';

const getRequestHandler = asyncHandler(async (req, res, next) => {
    const urlsegment = req.params[0];
    const queryParams = req.query;
    const connectorId = req.headers['connector-id'];
    const connector = await getConnectorById(connectorId);
    const whatsappSettings = await getOrgWhatsappSettings(connector.orgId);
    const sendHeaders = await getHeaderConfig(whatsappSettings);
    const requestHeaders = {
        ...req.headers,
        ...sendHeaders
    };
    const response = await graphGetRequestHandler({
        url: urlsegment,
        headers: requestHeaders,
        params: queryParams
    });
    return res.header(response.headers).status(response.status).json(response.data);
});

const postRequestHandler = asyncHandler(async (req, res, next) => {
    const urlsegment = req.params[0];
    const queryParams = req.query;
    const { body: bodyData, headers: fileHeaders } = await fileRequestHandler(req.body, req.files);
    const connectorId = req.headers['connector-id'];
    const connector = await getConnectorById(connectorId);
    const whatsappSettings = await getOrgWhatsappSettings(connector.orgId);
    const sendHeaders = await getHeaderConfig(whatsappSettings);
    const requestHeaders = {
        ...req.headers,
        ...sendHeaders,
        ...fileHeaders
    };

    const response = await graphPostRequestHandler({
        url: urlsegment,
        headers: requestHeaders,
        params: queryParams,
        data: bodyData
    });
    return res.header(response.headers).status(response.status).json(response.data);
});

const deleteRequestHandler = asyncHandler(async (req, res, next) => {
    const urlsegment = req.params[0];
    const queryParams = req.query;
    const bodyData = req.body;
    const connectorId = req.headers['connector-id'];
    const connector = await getConnectorById(connectorId);
    const whatsappSettings = await getOrgWhatsappSettings(connector.orgId);
    const sendHeaders = await getHeaderConfig(whatsappSettings);
    const requestHeaders = {
        ...req.headers,
        ...sendHeaders
    };
    const response = await graphDeleteRequestHandler({
        url: urlsegment,
        headers: requestHeaders,
        params: queryParams,
        data: bodyData,
    });
    return res.header(response.headers).status(response.status).json(response.data);
});

const fileRequestHandler = async (requestBody, requestFiles) => {
    if (requestFiles && requestFiles.length > 0) {
        const form = new FormData();
        requestFiles.forEach(file => {
            form.append(file.fieldname, file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });
        });
        if (requestBody) {
            Object.keys(requestBody).forEach(key => {
                // If req.body contains objects, stringify them so FormData handles them cleanly
                const value = typeof requestBody[key] === 'object'
                    ? JSON.stringify(requestBody[key])
                    : requestBody[key];
                form.append(key, value);
            });
        }
        return {
            body: form,
            headers: form.getHeaders()
        };

    }

    return {
        body: requestBody,
        headers: {}
    }
}

export { getRequestHandler, postRequestHandler, deleteRequestHandler };