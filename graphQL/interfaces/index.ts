export interface Person {
  name: string;
  mass: string;
  gender: string;
  height: string;
  homeworld: string;
}


export interface PersonResponse {
  data: [Person];
}


export interface swapiDataSources {
  swapi: any;
}
