import http from 'http'; 
import { ExpressDriver } from './express/Express';

const app = ExpressDriver.buildExpressDriver();
const server = http.createServer(app);

server.listen(3000);