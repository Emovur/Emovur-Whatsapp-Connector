import { ObjectId } from 'mongodb';
const internalMiddleware = (req, res, next) => {
    const internalKey = internalMiddlewareKey();
    if (req.header('internal-key') && req.header('internal-key') === internalKey) {
        next();
    } else {
        res.status(422).json({ message: "Invalid User Access" });
    }
}

const internalMiddlewareKey = () => {
    const key = 'h.b1yFVrh,<xMM=<%HYJ3@yx&)>at^d@OquyM"LLCnYdy=BZ0/8sK<MwDK#zBGCn';
    return key.replaceAll(" ", "");
}

export default internalMiddleware;