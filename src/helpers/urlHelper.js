import urlManager from "./../configs/urlManager.js";

const dbUrl = (type = null) => {
    const serverType = process.env.SERVER_TYPE;
    if (type === 'whatsapp') {
        return urlManager.whatsappDatabases[`mongodbUrl_${serverType}`];
    }
    return urlManager.databases[`mongodbUrl_${serverType}`];
}

const appUrl = () => {
    const serverType = process.env.SERVER_TYPE;
    return urlManager[`api_${serverType}_url`].app_url;
}

const internalApiKey = () => {
    return urlManager.internalApiKey;
}

const apiUrl = (type) => {
    const serverType = process.env.SERVER_TYPE;
    return urlManager[`api_${serverType}_url`][type];
}

const redisConfig = (type) => {
    const serverType = process.env.SERVER_TYPE;
    return urlManager.redis[`connectionUrl_${serverType}`];
}

const metaUrl = (version = '24.0') => {
    return "https://graph.facebook.com/v" + version + "/";
}

const facebookUrl = (version = '24.0') => {
    return "https://www.facebook.com/v" + version + "/";
}
const interaktDefaultUrl = (type = 0, version = '17.0') => {
    const urls = {
        0: "https://amped-express.interakt.ai/api/v" + version + "/",
        1: "https://api.interakt.ai/v1/organizations/tp-signup/"
    }
    return urls[type];

}

const interaktUrl = (version = '17.0') => {
    return "https://amped-express.interakt.ai/api/v" + version + "/";
}

export {
    dbUrl,
    appUrl,
    apiUrl,
    redisConfig,
    metaUrl,
    facebookUrl,
    interaktDefaultUrl,
    internalApiKey,
    interaktUrl
};