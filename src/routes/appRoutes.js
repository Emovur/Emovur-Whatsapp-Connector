import express from 'express';
import queueMonitorRouter from './queueMonitorRoutes.js';
import connectorRouter from './connectorRoutes.js';
import graphConnectorRouter from './graphConnectorRoutes.js';

const appRouter = express.Router();
appRouter.get("/", (req, res, next) => {
    return res.send("Server is Running");
});

appRouter.use("/connector", connectorRouter);
appRouter.use("/v20.0", graphConnectorRouter);

appRouter.use("/queue-monitor", queueMonitorRouter);
export default appRouter;