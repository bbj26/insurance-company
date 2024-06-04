import dotenv from 'dotenv';
import SERVER_MESSAGE from './constants/serverMessages';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

if (!MONGO_USERNAME || !MONGO_PASSWORD) {
    console.error(SERVER_MESSAGE.ENV_VARS_MISSING);
    console.error(SERVER_MESSAGE.ENV_VARS_MISSING_DETAILED);
    process.exit(1);
}

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@insurance-company-db.zz9lfs6.mongodb.net/insurance-company-db`;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
