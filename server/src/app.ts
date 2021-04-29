import express from 'express';
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import debug from 'debug';

import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';

dotenv.config();

if (!process.env.PORT) {
  console.error('Error: process.env.PORT not defined');
  process.exit(-1);
}

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = parseInt(process.env.PORT as string, 10);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000'
}

if (process.env.DEBUG) {
  process.on('unhandledRejection', function(reason) {
    debugLog('Unhandled Rejection:', reason);
    process.exit(-1);
  });
} else {
  loggerOptions.meta = false;
}

app.use(express.json());
app.use(expressWinston.logger(loggerOptions));
app.use(cors(corsOptions));
app.use(helmet());

routes.push(new UsersRoutes(app));

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send(`Server up and running!`)
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
