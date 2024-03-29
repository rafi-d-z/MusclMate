import client from './db.config';

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

export default activate_db;