import supertest from 'supertest';
import app from '../index';

const connectClient = async ({ ...params } = {}) => await supertest(app).post('/graphql').set('Accept', 'application/json').send(params);

export default connectClient;
