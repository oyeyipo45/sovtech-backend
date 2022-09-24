import express from 'express';
import config from './config';
import { Server } from 'http';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const shutdown = async (serverApp: Server) => {
  console.info('kill signal accepted, shutting down');
  await serverApp.close();
  return process.exit();
};

const server = app.listen({ port: config.port }, () => console.info(`Server running at http://localhost:${config.port}`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});

export default app;