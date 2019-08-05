const https = require('https');
const express = require('express');
const socketIO = require('socket.io');
//const mongoose = require('mongoose');
//const keys = require('./config/keys');
require('./models/Message');

/*const PORT = process.env.PORT || 5000;
mongoose.connect(keys.mongoURI);*/

const PORT = process.env.PORT || 443
const app = express();
const server = https.createServer(app);

const io = socketIO(server);
io.on('connection', socket => {
  console.log('client connected on websocket');
});

server.listen(PORT, () => {
  console.log('server started and listening on port ' + PORT);
});