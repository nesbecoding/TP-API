
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// Core
import routes from './controllers/routes.mjs';

const Server = class Server {
    constructor() {
        this.app = express();

        this.config = {
            port: process.env.PORT || 3000
        };
    }

    middleware() {
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    routes() {
        new routes.Utilisateurs(this.app);

        this.app.use((req, res) => {
            res.status(404).json({
                code: 404,
                message: 'Not Found'
            });
        });
    }

    security() {
        this.app.use(helmet());
        this.app.disable('x-powered-by');
    }

    async run() {
        try {
            this.security();
            this.middleware();
            this.routes();

            this.app.listen(this.config.port, () => {
                console.log(`Server running on port ${this.config.port}`);
            });

        } catch (err) {
            console.error(`[ERROR] Server -> ${err}`);
        }
    }
};

export default Server;
