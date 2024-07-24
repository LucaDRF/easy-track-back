import 'dotenv/config';

const credentials = {
  url: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const options = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

export default {
  ...credentials,
  ...options,
  options
};
