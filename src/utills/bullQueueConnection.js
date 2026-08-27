import BullQueue from 'bull';
import Redis from 'ioredis';
import { redisConfig } from './../helpers/urlHelper.js';

const REDIS_CONFIG = {
    ...redisConfig(),
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
};
const client = new Redis(REDIS_CONFIG);
const subscriber = new Redis(REDIS_CONFIG);

const clientOptions = {
    createClient: function (type) {
        switch (type) {
            case 'client':
                return client;
            case 'subscriber':
                return subscriber;
            default:
                return new Redis(REDIS_CONFIG);
        }
    }
};
const setupNewQueue = (queueName, options) => {
    return (new BullQueue(queueName, {
        connection: {
            enableOfflineQueue: false,
        },
        redis: REDIS_CONFIG,
        prefix: 'graph-connector',
        createClient: clientOptions,
        ...options
    }));
}

export default setupNewQueue;