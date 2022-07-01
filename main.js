const Server = require('./startup/Server');

// ----------------------------

const server = new Server();

setTimeout(() => server.listen(), 1000);

server.onExit();