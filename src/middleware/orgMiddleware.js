import { ObjectId } from 'mongodb';
const orgMiddleware = (req, res, next) => {
    if (!req.header('x-user-id')) {
        return res.status(422).json({ message: "Invalid User Access" });
    }

    if (req.header('x-org-id') === null || req.header('x-org-id') === '' || req.header('x-org-id') === "undefined") {
        return res.status(422).json({ message: "Invalid User Access" });
    }

    if (!ObjectId.isValid(req.header('x-org-id'))) {
        return res.status(422).json({ message: "Invalid User Access" });
    }

    next();
}

export default orgMiddleware;