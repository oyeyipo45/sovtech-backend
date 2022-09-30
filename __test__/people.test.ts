import  mockPeople  from './data/people.json';
import  PeopleDataSource  from '../graphQL/datastores';
import  apolloClient from './server';
import  { getPeopleQuery }  from './data/people.query.js';

const peopleMock = jest.fn(async () => {
  return Promise.resolve(mockPeople);
});



describe('People test suite', () => {
  beforeAll(async () => {
    jest.spyOn(PeopleDataSource.prototype, 'request').mockImplementation(peopleMock);;
  });
  afterAll(async () => {
    jest.restoreAllMocks();
  });
  test('Should get people', async () => {
    const {
      statusCode,
      body: { data  },
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
      query: getPeopleQuery,
    });

    expect(statusCode).toBe(200);
    expect(Array.isArray(data?.getPeople?.data)).toBe(true);
    expect(data?.getPeople?.data).toHaveLength(5);
    expect(data?.getPeople).toHaveProperty('page');
    expect(data?.getPeople?.page.total).toBe(5);
  });
});
