import { z } from 'zod';
import { config } from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' });
} else {
    config();
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    DATABASE_URL: z.string(),
    DATABASE_SSL: z.enum(['true', 'false']).default('false'),  // Add DATABASE_SSL as optional
    PORT: z.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('Invalid environment variable!', _env.error.format());
    throw new Error('Invalid environment variables.');
}

export const env = _env.data;
