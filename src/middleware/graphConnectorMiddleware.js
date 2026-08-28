import { ObjectId } from 'mongodb';
import { getConnectorById } from '../helpers/connectorHelper.js';
const graphConnectorMiddleware = async (req, res, next) => {
    const connectorId = req.header('connector-id');
    if (!connectorId || !ObjectId.isValid(connectorId)) {
        return res.status(422).json({ message: "Invalid Connector Access" });
    }

    if (!req.header('connector-id')) {
        return res.status(422).json({ message: "Invalid Connector Access" });
    }

    const connector = await getConnectorById(connectorId);
    if (!connector) {
        return res.status(422).json({ message: "Invalid Connector Access" });
    }
    next();
}

export default graphConnectorMiddleware;