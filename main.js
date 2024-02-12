const express = require('express');
const cluster = require('cluster');
const routes = require('./routes/route');
const app = express();
require('dotenv').config();

const basePort = Number(process.env.port); // Base port for the application

if (cluster.isMaster) {
    const numWorkers = 3;

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    const loadBalancerApp = express();
    const loadBalancerServer = loadBalancerApp.listen(basePort, () => {
        console.log(`Load balancer listening on port ${basePort}`);
    });

} else {
    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    // Handle API routes
    app.use('/api', routes);

    const workerPort = basePort + cluster.worker.id;
    const workerServer = app.listen(workerPort, () => {
        console.log(`Worker ${cluster.worker.id} listening on port ${workerPort}`);
    });
}
