/**
 * THIS TEST IS MEANT TO BE RUN MANUALLY ON EC2 INSTANCE
*/

import {Client} from 'pg';
import fs from 'fs';

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
// postgres aws db
const activate_db = async () => {
    console.log("Connecting to Database ...");
    await client.connect();
    console.log("Database connected");
    return client;
};

async function main() {
    try {
        await activate_db();
        process.exit(0);
    } catch (error) {
        console.error('Error activating database', error);
        process.exit(1);
    }
}

main();