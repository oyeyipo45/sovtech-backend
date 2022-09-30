import mockPeople from './data/people.json';
import PeopleDataSource from '../graphQL/datastores';
import apolloClient from './server';
import { getPeopleQuery } from './data/people.query.js';
import { getPersonQuery } from './data/person.query.js';
import mockPerson from './data/person.json';

const peopleMock = jest.fn(async () => {
  return Promise.resolve(mockPeople);
});


const personDataMock = jest.fn(async () => {
  return Promise.resolve(mockPerson);
});


describe('People test suite', () => {
  beforeAll(async () => {
    jest.spyOn(PeopleDataSource.prototype, 'request').mockImplementation(peopleMock);

    jest.spyOn(PeopleDataSource.prototype, 'getPerson').mockImplementation(personDataMock as any);
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test('Should get people', async () => {
    const {
      statusCode,
      body: { data },
    } = await apolloClient({
      query: getPeopleQuery,
    });

    expect(statusCode).toBe(200);
    expect(Array.isArray(data?.getPeople?.data)).toBe(true);
    expect(data?.getPeople?.data).toHaveLength(5);
    expect(data?.getPeople).toHaveProperty('page');
    expect(data?.getPeople?.page.total).toBe(5);
  });

  test('Should get person with given name', async () => {
    const {
      statusCode,
      body: { data },
    } = await apolloClient({
      query: getPersonQuery,
    });

    expect(statusCode).toBe(200);
    expect(Array.isArray(data?.getPerson?.data)).toBe(true);
    expect(data.getPerson.data[0]).toHaveProperty('name');
    expect(data.getPerson.data[0].name).toBe('Owen Lars');
  });
});
