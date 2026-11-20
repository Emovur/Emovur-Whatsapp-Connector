import express from 'express';
import multer from 'multer';
import { getRequestHandler, postRequestHandler, deleteRequestHandler, downloadwhatsappMedia, createwhatsappMediaHandle } from '../controllers/whatsappGraphController.js';
import graphConnectorMiddleware from '../middleware/graphConnectorMiddleware.js';
import { multerUpload } from '../utills/multerUpload.js';
const graphConnectorRouter = express.Router();

graphConnectorRouter.use(graphConnectorMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

graphConnectorRouter.get("/:phoneNumberId/media", downloadwhatsappMedia);
graphConnectorRouter.post("/:phoneNumberId/media_handle", multerUpload([{ name: "sample", maxCount: 1 }]), createwhatsappMediaHandle);

graphConnectorRouter.get("/*", getRequestHandler);
graphConnectorRouter.post("/*", upload.any(), postRequestHandler);
graphConnectorRouter.delete("/*", deleteRequestHandler);

export default graphConnectorRouter;