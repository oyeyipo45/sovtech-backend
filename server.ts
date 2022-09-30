import express, { Express } from 'express';

import 'reflect-metadata';
import config from './config';
import { ApolloServer } from 'apollo-server-express';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import resolvers from './graphQL/resolvers/resolver';
import typeDefs from './graphQL/schema/schema';
import ApiDataSource from './graphQL/datastores/index';
import { swapiDataSources } from './graphQL/interfaces';
import { GraphQLError } from 'graphql';
import bodyParser from 'body-parser';
import { Server } from 'http';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true /**or false */ }));

export const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: (): DataSources<swapiDataSources> => ({
    api: new ApiDataSource(config.baseUrl),
  }),
  cache: 'bounded',
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (err: GraphQLError) => {
    return {
      ...err,
      message: err.message,
      locations: err.locations,
      path: err.path,
      extensions: err.extensions.code,
    };
  },
});

export const shutdown = async (server: any) => {
  await server.close();
  return process.exit();
};

