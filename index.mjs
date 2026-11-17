import Server from './src/server.mjs';
import 'dotenv/config';

const server = new Server();

server.run();
