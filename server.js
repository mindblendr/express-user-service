require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const initRoutes = require('./services');
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());
initRoutes(app);

server.listen(port, async () => {
    console.log(`Listening on port ${port}!`);
});