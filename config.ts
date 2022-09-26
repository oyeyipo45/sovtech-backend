import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL || '',
};
