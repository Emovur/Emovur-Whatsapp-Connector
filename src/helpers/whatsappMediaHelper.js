import { metaUrl } from "./urlHelper.js";
import fs from "fs";
import axios from "axios";
import { getOrgWhatsappSettings } from "./whatsappSettingHelper.js";

const uploadMediaFileToMeta = async (orgId, mediaFiles) => {
    const whatsappSettings = await getOrgWhatsappSettings(orgId);
    if (!whatsappSettings?.business?.wabaId) {
        return { status: 401, message: "Whatsapp Number Is Not Configured" };
    }

    const metaAppId = whatsappSettings.metaAppId;
    const sessionResponse = await startMediaUploadSession(metaAppId, whatsappSettings.accessToken, mediaFiles.sample);

    if (sessionResponse.status !== 200) {
        return { status: sessionResponse.status, message: sessionResponse.message };
    }

    const sessionId = sessionResponse.id;
    const uploadedMedia = await processMediaUploadFile(whatsappSettings.accessToken, sessionId, mediaFiles.sample);

    if (uploadedMedia.status !== 200) {
        return { status: uploadedMedia.status, message: uploadedMedia.message };
    }

    fs.rmSync(mediaFiles.sample.path, { force: true });

    return { status: 200, data: { h: uploadedMedia.h }, sessionId: sessionId };
}

const startMediaUploadSession = async (metaAppId, accessToken, fileMetaData) => {
    const requestUrl = metaUrl() + metaAppId + "/uploads";

    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'post',
            url: requestUrl,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            data: {
                file_length: fileMetaData.size,
                file_type: fileMetaData.mimetype,
                file_name: fileMetaData.originalname
            }
        });
        return {
            status: status,
            id: data.id,
        };
    } catch (error) {
        return {
            status: 422,
            message: error?.response?.data?.error?.message
        };
    }
}

const processMediaUploadFile = async (accessToken, sessionId, fileMetaData) => {
    const requestUrl = metaUrl() + sessionId;
    const fileContents = fs.readFileSync(fileMetaData.path);
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'post',
            url: requestUrl,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            data: {
                file: fileContents,
                file_type: fileMetaData.mimetype
            }
        });
        return {
            status: status,
            h: data.h,
        };
    } catch (error) {
        return {
            status: 422,
            message: error?.response?.data?.error?.message
        };
    }
}


export { uploadMediaFileToMeta };