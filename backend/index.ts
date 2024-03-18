import express from 'express';
import db from './db.config';
import dotenv from 'dotenv';
dotenv.config();

db.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
}); 

// process.exit();
// doc: https://expressjs.com/en/4x/api.html
const app: express.Application = express();
const port: number = 3000;

// postgres aws db
// db.sequelize.authenticate().then(() => {
//       console.log("Connected to the database!");
//     })
//     .catch((err: any) => {
//       console.log("Cannot connect to the database!", err);
//       process.exit();
//     });

// // sync
// db.sequelize.sync()

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