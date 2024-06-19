import * as dotenv from 'dotenv';
dotenv.config();

const DB_HOST: string = process.env.DB_HOST;
const DB_USERNAME: string = process.env.DB_USERNAME;
const DB_PASSWORD: string = process.env.DB_PASSWORD;
const DB_NAME: string = process.env.DB_NAME;
const DB_PORT: number = +process.env.DB_PORT;
const JWT_SECRET: string = process.env.JWT_SECRET;

export { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, JWT_SECRET };
