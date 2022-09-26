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

  type PeopleResponse {
    data: [Person]
  }

  type PersonOrPeopleResponse {
    data: [Person]
  }

  type Query {
    getPeople: PeopleResponse
    getPerson(search: String): PersonOrPeopleResponse
  }
`;

export default typeDefs;
