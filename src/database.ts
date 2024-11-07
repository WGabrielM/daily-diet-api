import setupKnex, { Knex } from 'knex';
import { env } from './env';

export const config: Knex.Config = {
    client: 'pg',  
    connection: {
        connectionString: env.DATABASE_URL, 
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
};

export const knex = setupKnex(config);
