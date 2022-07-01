const express = require('express');
// const cors = require('cors');

const Routes = require('./Routes');

// -------------------------------

class Server {

  constructor() {
    this.port = process.env.PORT;
    this.server = express();
    this.middlewares();
    this.routes = new Routes(this.server);
  }

  middlewares() {
    this.server.use(express.json());
    // this.server.use(cors());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Push API listening on port ${this.port}`);
      // Here we send the ready signal to PM2
      // configure "wait_ready: true" on ecosystem.config.js
      // process.send('ready');
    });
  }

  onExit() {
    // listen for the signal interruption (ctrl-c) or error
    // configure "kill_timeout : 3000" on ecosystem.config.js
    // and "listen_timeout: 10000"
    process.on('SIGINT', (err) => {
      console.log('exit server');
      process.exit(err ? 1 : 0);
    });
  }

}

module.exports = Server;

