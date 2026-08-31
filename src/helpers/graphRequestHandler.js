import axios from "axios";

const graphGetRequestHandler = async (requestConfig) => {
    const requestUrl = requestConfig.submitUrl + requestConfig.url;
    const requestHeaders = setupHeaders(requestConfig.headers ?? {});
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'get',
            url: requestUrl,
            headers: requestHeaders,
            params: requestConfig.params ?? {}
        });
        return {
            status: status,
            statusText: statusText,
            headers: headers,
            config: config,
            request: request,
            data: data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            statusText: error.response ? error.response.statusText : "Internal Server Error",
            headers: error.response ? error.response.headers : {},
            config: error.config ? error.config : {},
            request: error.request ? error.request : {},
            data: error.response ? error.response.data : {}
        }
    }
};

const graphPostRequestHandler = async (requestConfig) => {
    const requestUrl = requestConfig.submitUrl + requestConfig.url;
    const requestHeaders = setupHeaders(requestConfig.headers ?? {});
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'post',
            url: requestUrl,
            headers: requestHeaders,
            params: requestConfig.params ?? {},
            data: requestConfig.data ?? {},
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        return {
            status: status,
            statusText: statusText,
            headers: headers,
            config: config,
            request: request,
            data: data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            statusText: error.response ? error.response.statusText : "Internal Server Error",
            headers: error.response ? error.response.headers : {},
            config: error.config ? error.config : {},
            request: error.request ? error.request : {},
            data: error.response ? error.response.data : {}
        }
    }
};

const graphDeleteRequestHandler = async (requestConfig) => {
    const requestUrl = requestConfig.submitUrl + requestConfig.url;
    const requestHeaders = setupHeaders(requestConfig.headers ?? {});
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'delete',
            url: requestUrl,
            headers: requestHeaders,
            params: requestConfig.params ?? {},
            data: requestConfig.data ?? {}
        });
        return {
            status: status,
            statusText: statusText,
            headers: headers,
            config: config,
            request: request,
            data: data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            statusText: error.response ? error.response.statusText : "Internal Server Error",
            headers: error.response ? error.response.headers : {},
            config: error.config ? error.config : {},
            request: error.request ? error.request : {},
            data: error.response ? error.response.data : {}
        }
    }
};


const setupHeaders = (headers) => {
    // Create a shallow copy to avoid mutating the original headers object
    const updatedHeaders = { ...headers };

    // List of lowercase headers to remove
    const keysToRemove = [
        'user-agent',
        'accept',
        'postman-token',
        'host',
        'accept-encoding',
        'connection',
        'api-key',
        'connector-id',
        'content-length',
        'x-forwarded-for',
        'x-forwarded-host',
        'x-forwarded-prot',
        'x-forwarded-proto',
    ];

    // Safely delete each blacklisted header if it exists
    keysToRemove.forEach(key => delete updatedHeaders[key]);

    return updatedHeaders;
};

export { graphGetRequestHandler, graphPostRequestHandler, graphDeleteRequestHandler };