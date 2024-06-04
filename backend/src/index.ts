import express, { Application } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { insuranceRouter } from './routes/insuranceRoutes';
import { config } from './config';
import { coverageRouter } from './routes/coverageRoutes';
import { discountRouter } from './routes/discountRoutes';
import { seedData } from './seed';

const app = express();

mongoose
    .connect(config.mongo.url as string, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        startServer(app, config.server.port);
    })
    .catch((err) => {
        console.error('Database connection error', err);
    });

const startServer = (app: Application, port: Number) => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        seedData();
    });
};

app.use(json());
app.use('/api/insurance', insuranceRouter);
app.use('/api/coverages', coverageRouter);
app.use('/api/discounts', discountRouter);
