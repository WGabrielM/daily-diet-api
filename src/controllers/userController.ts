import { Router } from 'express';
import { z } from 'zod';
import { knex } from '../database';
import { randomUUID } from 'crypto';

const router = Router();

// Middleware to log request details
router.use((req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
});

router.post('/', async (req, res) => {
    try {
        const createUserBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        });

        const { title, amount, type } = createUserBodySchema.parse(req.body);

        let sessionId = req.cookies.sessionId;
        if (!sessionId) {
            sessionId = randomUUID();
            res.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        });

        res.status(201).send("New Transaction Added");
    } catch (error) {
        const typedError = error as Error;
        res.status(400).send(`Error: ${typedError.message}`);
    }
});

export { router as userController };
