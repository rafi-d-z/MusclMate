import client from './db.config';
import {Client} from 'pg';

// postgres aws db
const activate_db = async () => {
    console.log("Connecting to Database ...");

    try {
      await client.connect();
      console.log("Database connected");
      return client;
    } catch (err: any) {
      throw new Error('Database connection error\n', err.stack);
    } 
}

export default activate_db;