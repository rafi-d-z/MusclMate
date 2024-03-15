import express from 'express';
// doc: https://expressjs.com/en/4x/api.html
const app: express.Application = express();
const port: number = 3000;

app.get('/', (_req, _res) => {
	_res.send("TypeScript With Express");
});


// Server setup
app.listen(port, () => {
	console.log(`Server up at: http://localhost:${port}/`);
});
