import express from 'express';
import client from './db.config';
import dotenv from 'dotenv';
dotenv.config();

// postgres aws db
async function activate_db() {
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
activate_db();

// process.exit();
// doc: https://expressjs.com/en/4x/api.html
const app: express.Application = express();
const port: number = 3000;

app.get('/', (_req, _res) => {
	_res.send("TypeScript With Express");
});

app.get('/common_excerises', (_req, _res) => {
  _res.send("excercises");
})

app.get('/user_data', (_req, _res) => {
  _res.send("user's data");
})

// Server setup
app.listen(port, () => {
	console.log(`Server up at: http://localhost:${port}/`);
});

export { app };