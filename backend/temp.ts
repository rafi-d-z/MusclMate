import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    host: process.env.POSTGRESQL_DB_HOST,
    user: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    port: process.env.POSTGRESQL_DB_PORT ? parseInt(process.env.POSTGRESQL_DB_PORT) : 5432,
    ssl: true
});

async function run() {
    console.log("Running ...")
    try {
        await client.connect();

        const res = await client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(res.rows[0].message); // Hello world!
    } catch (err: any) {
        console.error('Database connection error', err.stack);
    } finally {
        await client.end();
    }
}

run();