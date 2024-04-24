import client from './db.config';
import {Client} from 'pg';

// postgres aws db
const activate_db: Client | undefined = async () => {
    console.log("Connecting to Database ...");

    try {
      await client.connect();
      console.log("Database connected");
      return client;
    } catch (err: any) {
      console.error('Database connection error\n', err.stack);
      return undefined;
    } 
}

export default activate_db;