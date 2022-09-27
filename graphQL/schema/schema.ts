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

  type SelectedPerson {
    name: String
    mass: String
    gender: String
    height: String
    homeworld: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    films: [String]
    vehicles: [String]
    starships: [String]
    created: String
    edited: String
    url: String
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

  type PersonResponse {
    data: [SelectedPerson]
    page: Page
  }

  type Query {
    getPeople(filter: PageFilter): PeopleResponse
    getPerson(search: String): PersonResponse
  }
`;

export default typeDefs;
