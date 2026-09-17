import { ObjectId } from 'mongodb';
import { getOrgWhatsappSettings } from '../helpers/whatsappSettingHelper.js';
const graphOrgMiddleware = async (req, res, next) => {
    const orgId = req.header('x-org-id');
    if (!orgId || !ObjectId.isValid(orgId)) {
        return res.status(422).json({ message: "Invalid Connector Access1" });
    }

    if (!orgId) {
        return res.status(422).json({ message: "Invalid Connector Access2" });
    }

    const whatsappSettings = await getOrgWhatsappSettings(orgId);

    if (!whatsappSettings) {
        return res.status(422).json({ message: "Invalid Connector Access3" });
    }

    if (!whatsappSettings?.business?.wabaId) {
        return res.status(422).json({ message: "Invalid Connector Access4" });
    }

    if (!whatsappSettings?.phone?.senderId) {
        return res.status(422).json({ message: "Invalid Connector Access5" });
    }

    next();
}

export default graphOrgMiddleware;