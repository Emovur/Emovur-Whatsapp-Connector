import axios from "axios";
import { apiUrl, interaktUrl, internalApiKey, metaUrl } from "./urlHelper.js";

const getOrgWhatsappSettings = async (orgId) => {
    const requestUrl = apiUrl('onboard_app') + "/internal/whatsapp/settings/" + orgId;
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'get',
            url: requestUrl,
            headers: {
                'Content-Type': 'application/json',
                'internal-key': internalApiKey()
            }
        });
        return data
    } catch (error) {
        console.log(error.response.data);
        //return error.response
    }
}

const getHeaderConfig = async (whatsappSettings) => {
    if (whatsappSettings.type === "interakt_cloud" || whatsappSettings.type === "interakt") {
        return await getInteraktCloudConfig(whatsappSettings);
    }

    return await getMetaCloudConfig(whatsappSettings);

}

const getInteraktCloudConfig = async (whatsappSettings) => {
    return {
        submitUrl: interaktUrl(),
        headers: {
            'x-access-token': whatsappSettings.sendToken,
            'x-waba-id': whatsappSettings.business.wabaId
        }
    };
}

const getMetaCloudConfig = async (whatsappSettings) => {
    return {
        submitUrl: metaUrl(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + whatsappSettings.accessToken
        }
    };
}

export { getOrgWhatsappSettings, getHeaderConfig };