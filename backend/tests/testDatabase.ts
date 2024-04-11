/**
 * THIS TEST IS MEANT TO BE RUN MANUALLY ON EC2 INSTANCE
*/

import dotenv from 'dotenv';
import {Client} from 'pg';
import fs from 'fs';
dotenv.config();

const client = new Client({
    host: process.env.POSTGRESQL_DB_HOST,
    user: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    port: process.env.POSTGRESQL_DB_PORT ? parseInt(process.env.POSTGRESQL_DB_PORT) : 5432,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('us-east-2-bundle.pem').toString(),
    },
});

export default client;

// postgres aws db
const activate_db = async () => {
    console.log("Connecting to Database ...");
    try {
      await client.connect();
      console.log("Database connected");
      return client;
    } catch (err: any) {
      console.error('Database connection error', err.stack);
    } 
}

async function main() {
    try {
        const client = await activate_db();
        // You can now use 'client' here
    } catch (error) {
        console.error('Error activating database', error);
    }
}

main();