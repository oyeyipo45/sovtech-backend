import supertest from 'supertest';
import { app, server } from '../server';

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer();

const apolloClient = async ({ ...params }) => {
  return await supertest(app).post('/graphql').set('Accept', 'application/json').send(params);
};

export default apolloClient;
