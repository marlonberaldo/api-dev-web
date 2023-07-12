import express, { Request, Response } from 'express';
import routes from './routes/routes';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

app.use(bodyParser.json())

app.use('/api', routes);

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
