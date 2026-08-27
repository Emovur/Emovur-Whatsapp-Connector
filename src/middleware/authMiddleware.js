import axios from 'axios';
import { apiUrl } from './../helpers/urlHelper.js';
const userApiUrl = apiUrl('lms_user');

const authMiddleware = async (req, res, next) => {
    const checkerUrl = userApiUrl + "/user-structure";
    try {
        const { status, statusText, headers, config, request, data } = await axios({
            method: 'get',
            url: checkerUrl,
            headers: {
                "x-user-id": req.header('x-user-id'),
                "x-org-id": req.header('x-org-id'),
                "x-partner-id": req.header('x-partner-id'),
            }
        });
        if (status !== 200) {
            res.status(status).json({ data });
        } else {
            const user = data;
            req.body = { ...req.body, user: user };
            next();
        }

    } catch (error) {
        if (error.hasOwnProperty('response') && (typeof error.response.data != "undefined")) {
            res.status(error.response.status).json({ message: error.response.data.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }

}

export default authMiddleware;