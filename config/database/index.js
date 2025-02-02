import knex from 'knex';
import config from '../environment/config.js';

const dbconnect = knex(config.knex);

export default dbconnect;
