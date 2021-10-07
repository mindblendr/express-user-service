require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const initRoutes = require('./bin/router');
const port = process.env.PORT || 3001;
initRoutes(app);

server.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);