import mongoose from "mongoose";
const Schema = mongoose.Schema;

const connectorSchema = new Schema({
    connectorName: {
        type: String,
        index: true,
        required: true,
    },
    orgId: {
        type: String,
        index: true,
        required: true,
    },
    status: {
        type: Boolean,
        index: true,
        required: true,
        default: true,
    },
});

const connectorModel = mongoose.model("connector", connectorSchema);
export default connectorModel;