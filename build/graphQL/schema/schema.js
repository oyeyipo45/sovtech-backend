"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type Query {
    hello: String
  }

  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type PeopleResponse {
    data: [Person]
  }

  type Query {
    getPeople: PeopleResponse
  }
`;
exports.default = typeDefs;
