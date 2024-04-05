import express from 'express';

const app: express.Application = express();
app.use(express.json()); 

app.get('/', (_req, _res) => {
    _res.status(200).send("Skibbidi Toilet");
});

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
