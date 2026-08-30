import { ObjectId } from 'mongodb';
import { getConnectorById } from '../helpers/connectorHelper.js';
const graphConnectorMiddleware = async (req, res, next) => {
    const connectorId = req.header('connector-id');
    if (!connectorId || !ObjectId.isValid(connectorId)) {
        return res.status(422).json({ message: "Invalid Connector Access1" });
    }

    if (!req.header('connector-id')) {
        return res.status(422).json({ message: "Invalid Connector Access2" });
    }

    const connector = await getConnectorById(connectorId);
    if (!connector) {
        return res.status(422).json({ message: "Invalid Connector Access3" });
    }
    next();
}

export default graphConnectorMiddleware;