import dotenv from 'dotenv';
dotenv.config();

const config = {
  knex: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 7 },
  },
  SECRET_KEY: process.env.SECRET_KEY,
  PORT: process.env.PORT,
  COOKIE_NAME: process.env.COOKIE_NAME
};


export default config;
