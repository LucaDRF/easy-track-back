import express from 'express';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

import Database from './database/index.js';
import Routes from './routes/index.js';

class App {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);

    this.routes = new Routes();
    this.database = new Database();
  }

  async start() {
    this.httpServer.listen(process.env.PORT, this.setup.bind(this));

    process.on('SIGINT', this.gracefulStop());
  }

  async setup() {
    const router = this.routes.load();

    await this.database.setup();

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);

    console.log(`App started at ${process.env.PORT}`); // eslint-disable-line no-console
  }

  gracefulStop() {
    return () => {
      this.httpServer.close(async error => {
        await this.database.disconnect();

        return error ? process.exit(1) : process.exit(0);
      });
    };
  }
}

export default App;
