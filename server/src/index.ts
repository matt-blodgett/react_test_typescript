import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

if (!process.env.PORT) {
  console.error('No PORT environment variable');
  process.exit(1);
}
const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.get('/api/version', (request, response) => {
  response.json({ version: '0.1.0'});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
