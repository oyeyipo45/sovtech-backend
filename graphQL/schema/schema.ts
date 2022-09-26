import { gql } from 'apollo-server';

const typeDefs = gql`
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

export default typeDefs;
