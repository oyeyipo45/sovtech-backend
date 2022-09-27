import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5003,
  baseUrl: process.env.BASE_URL || '',
};
