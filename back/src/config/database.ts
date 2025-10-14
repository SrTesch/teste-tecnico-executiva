import knex from 'knex';
import path from 'path';

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', '..', 'database.db'),
  },
  useNullAsDefault: true,
};

const database = knex(dbConfig);

export default database;