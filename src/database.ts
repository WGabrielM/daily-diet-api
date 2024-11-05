import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

export const config: Knex.Config = {
    client: 'pg',  // Use 'pg' for PostgreSQL
    connection: {
        connectionString: env.DATABASE_URL,  // Use connection string for PostgreSQL
    },
    migrations: {
        extension: 'ts',  // Migration file extension
        directory: './db/migrations',  // Directory for migrations
    }
};

export const knex = setupKnex(config);
