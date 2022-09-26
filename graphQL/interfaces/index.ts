// name: 'Anakin Skywalker',
//     height: '188',
//     mass: '84',
//     hair_color: 'blond',
//     skin_color: 'fair',
//     eye_color: 'blue',
//     birth_year: '41.9BBY',
//     gender: 'male',
//     homeworld: 'https://swapi.dev/api/planets/1/',
//     films: [
//       'https://swapi.dev/api/films/4/',
//       'https://swapi.dev/api/films/5/',
//       'https://swapi.dev/api/films/6/'
//     ],
//     species: [],
//     vehicles: [
//       'https://swapi.dev/api/vehicles/44/',
//       'https://swapi.dev/api/vehicles/46/'
//     ],
//     starships: [
//       'https://swapi.dev/api/starships/39/',
//       'https://swapi.dev/api/starships/59/',
//       'https://swapi.dev/api/starships/65/'
//     ],
//     created: '2014-12-10T16:20:44.310000Z',
//     edited: '2014-12-20T21:17:50.327000Z',
//     url: 'https://swapi.dev/api/people/11/'

export interface Person {
  name?: string;
  mass?: string;
  gender?: string;
  height?: string;
  homeworld?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  films?: string[];
  vehicles?: string[];
  starships?: string[];
  created?: string;
  edited?: string;
  url?: string;
}

export interface PersonResponse {
  data: [Person];
}

export interface swapiDataSources {
  swapi: any;
}
