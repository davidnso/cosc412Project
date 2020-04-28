import http from 'http'; 
import { ExpressDriver } from './express/Express';
import { MongoDriver } from './mongo/mongoDriver';

new MongoDriver();

const app = ExpressDriver.buildExpressDriver();
const server = http.createServer(app);

server.listen(3000);