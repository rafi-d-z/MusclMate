import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
dotenv.config();

async function connectToDatabase() {
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

    try {
        await client.connect();
        console.log("Database connected");
        return client;
    } catch (err) {
        console.error('Database connection error\n', err.stack);
        return undefined;
    }
}

// Call the function
connectToDatabase().then(client => {
    if (client) {
        console.log("all good!!!")
    }else{
        console.log("not all good")
    }
});

try {
    await client.connect();
    console.log("Database connected");
    return client;
  } catch (err: any) {
    console.error('Database connection error\n', err.stack);
    return undefined;
  } 
