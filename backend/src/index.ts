import express, { Application } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { insuranceRouter } from './routes/insuranceRoutes';
import { config } from './config';
import { coverageRouter } from './routes/coverageRoutes';
import { discountRouter } from './routes/discountRoutes';
import { seedData } from './seed';
import SERVER_MESSAGE from './constants/serverMessages';

const app = express();

mongoose
    .connect(config.mongo.url as string, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log(SERVER_MESSAGE.MONGO_ATLAS_CONNECTED);
        startServer(app, config.server.port);
    })
    .catch((err) => {
        console.error(SERVER_MESSAGE.DB_CONNECTION_ERROR, err);
    });

const startServer = (app: Application, port: Number) => {
    app.listen(port, () => {
        console.log(`${SERVER_MESSAGE.SERVER_RUNNING_ON_PORT} ${port}`);
        seedData();
    });
};

app.use(json());
app.use('/api/insurance', insuranceRouter);
app.use('/api/coverages', coverageRouter);
app.use('/api/discounts', discountRouter);
