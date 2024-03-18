import dotenv from 'dotenv';
dotenv.config();

// export default {
//   HOST: process.env.POSTGRESQL_DB_HOST,
//   USER: process.env.POSTGRESQL_DB_USER,
//   PASSWORD: process.env.POSTGRESQL_DB_PASSWORD,
//   DB: process.env.POSTGRESQL_DB,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // added for self-signed certificates
//     }
//   }
// }; 
import { Pool } from 'pg';

const db = new Pool({
    host: process.env.POSTGRESQL_DB_HOST,
    user: process.env.POSTGRESQL_DB_USER,
    port: process.env.POSTGRESQL_DB_PORT ? parseInt(process.env.POSTGRESQL_DB_PORT) : 5432,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB,
});
const client = db.connect();
db.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});
export default db;