import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
const queueMonitorRouter = express.Router();

//queues import 

// import subscribePhoneWebhookQueue from './../jobQueues/whatsapp/subscribePhoneWebhookQueue.js';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queue-monitor');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [
        // new BullAdapter(subscribePhoneWebhookQueue),
    ],
    serverAdapter: serverAdapter,
});

queueMonitorRouter.use("/", serverAdapter.getRouter());

export default queueMonitorRouter;