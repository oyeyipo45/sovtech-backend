export interface Person {
  name?: string;
  mass?: string;
  gender?: string;
  height?: string;
  homeworld?: string;
}

interface Page {
  total: number;
  next: string;
  previous: string;
}
export interface PersonResponse {
  data: [Person];
  page: Page;
}

export interface swapiDataSources {
  swapi: any;
}

export interface Result {
  filter : Page
}