require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const initRoutes = require('./services');
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors());
initRoutes(app);

server.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);