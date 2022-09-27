import { RESTDataSource } from 'apollo-datasource-rest';
import { PersonResponse, Person } from '../interfaces/index';

class ApiDataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  async request(url: any): Promise<any> {
    return await this.get(`/people/?${url.toString()}`);
  }

  selectedFields = (results: any): [Person] =>
    results.map(({ name, height, mass, gender, homeworld }: Person) => ({
      name,
      height,
      mass,
      gender,
      homeworld,
    }));

  async getAll({ filter }: any): Promise<PersonResponse> {
    const query = {
      page: filter?.page && filter?.page > 0 ? filter?.page : 1,
    };

    const filteredQuery = Object.entries(query).reduce((a: any, [k, v]: any) => (v == null ? a : ((a[k] = v), a)), {});

    const cleanQuery = new URLSearchParams(filteredQuery);

    const { count, next, previous, results } = await this.request(cleanQuery);

    const data: [Person] = this.selectedFields(results);
    return {
      data,
      page: {
        total: count,
        previous,
        next,
      },
    };
  }

  async getPerson({ search }: any): Promise<PersonResponse> {
    const { count, next, previous, results } = await this.get(`/people/?search=${search}`);

    const data: [Person] = results.map((person: Person) => person);

    return {
      data,
      page: {
        total: count,
        previous,
        next,
      },
    };
  } //  TODO : CLEAN SEARCH QUERY
}

export default ApiDataSource;
