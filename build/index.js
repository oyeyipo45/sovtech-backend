"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const config_1 = __importDefault(require("./config"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const graphql_middleware_1 = require("graphql-middleware");
const apollo_server_core_1 = require("apollo-server-core");
const resolver_1 = __importDefault(require("./graphQL/resolvers/resolver"));
const schema_2 = __importDefault(require("./graphQL/schema/schema"));
const index_1 = __importDefault(require("./graphQL/datastores/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: (0, graphql_middleware_1.applyMiddleware)((0, schema_1.makeExecutableSchema)({
            resolvers: resolver_1.default,
            typeDefs: schema_2.default,
        })),
        dataSources: () => ({
            api: new index_1.default(config_1.default.baseUrl),
        }),
        csrfPrevention: true,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.get('/', (_req, res) => res.send('dfhdhfdhfdkfdfdf'));
    app.listen({ port: config_1.default.port }, () => console.info(`Server running at http://localhost:${config_1.default.port}`));
});
main().catch((err) => console.error(err));
exports.default = main;
