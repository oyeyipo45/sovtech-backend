import { RESTDataSource } from 'apollo-datasource-rest';
import { PersonResponse, Person } from '../interfaces/index';

class ApiDataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  async request(): Promise<any> {
    return await this.get(`/people`);
  }

  selectedFields = (results: any): [Person] =>
    results.map(({ name, height, mass, gender, homeworld }: Person) => ({
      name,
      height,
      mass,
      gender,
      homeworld,
    }));

  async getAll(): Promise<PersonResponse> {
    const { results } = await this.request();

    const data: [Person] = this.selectedFields(results);
    return {
      data,
    };
  }

  async getPerson({ search }: any): Promise<PersonResponse> {
    const { results } = await this.get(`/people/?search=${search}`);

    const data: [Person] = this.selectedFields(results);

    return { data };
  }
}

export default ApiDataSource;
