import { Application } from 'express';
import cors from 'cors';

function register(app: Application) {
    const allowedOrigins: Array<string> = [
        'http://localhost:3000',

    ];

    const corsOptions = {
        origin: allowedOrigins,
        credentials: true
    }

    app.use(cors(corsOptions));
}

export default {
    register
};