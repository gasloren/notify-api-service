const PushApp = require('../endpoints/PushApp');
const PushWeb = require('../endpoints/PushWeb');

// ---------------------------------------------

class Routes {

  constructor(server) {
    this.pushApp = new PushApp(server);
    this.pushWeb = new PushWeb(server);
  }

}

module.exports = Routes;
