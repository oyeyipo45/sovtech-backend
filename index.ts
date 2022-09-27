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

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({
        resolvers,
        typeDefs,
      })
    ),
    dataSources: (): DataSources<swapiDataSources> => ({
      api: new ApiDataSource(config.baseUrl),
    }),
    cache: 'bounded',
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get('/', (_req, res) => res.send('Home'));

  app.listen({ port: config.port }, () => console.info(`Server running at http://localhost:${config.port}`));
};

main().catch((err) => console.error(err));

export default main;
