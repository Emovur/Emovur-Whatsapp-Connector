import express from 'express';
import cors from 'cors';
import momentTz from 'moment-timezone';
import { } from 'dotenv/config';
momentTz.tz.setDefault("Asia/Calcutta");

const app = express();
app.use(express.json());
const corsSetup = cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
});
app.use(corsSetup);
import dbConnection from './src/utills/dbConnection.js';
dbConnection();

import appRouter from './src/routes/appRoutes.js';

app.use(appRouter);



const PORT = process.env.APP_PORT || 5555;
app.listen(PORT, (error) => {
    console.log("app is running on port : " + PORT);
});