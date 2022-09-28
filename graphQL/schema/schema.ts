import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Person {
    name: String
    mass: String
    gender: String
    height: String
    homeworld: String
  }

  input PageFilter {
    "Filter by page"
    page: Int
  }

  type Page {
    total: Int
    previous: String
    next: String
  }

  input PersonFilter {
    "Search by name"
    search: String
  }

  type PeopleResponse {
    data: [Person]
    page: Page
  }

  type Query {
    getPeople(filter: PageFilter): PeopleResponse
    getPerson(search: String): PeopleResponse
  }
`;

export default typeDefs;
