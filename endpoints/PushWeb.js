const webpush = require('web-push');

const validApiKey = require('../validators/valid-api-key');
const validSubscription = require('../validators/valid-subscription');
const validPayload = require('../validators/valid-payload');
const checkErrors = require('../validators/check-errors');

// -----------------------------------------------

class PushWeb {

  constructor(server) {
    this.path = '/notify/push/web';
    this.server = server;
    this.webpush = webpush;
    this.initialize();
    this.route();
  }

  initialize() {
    this.webpush.setVapidDetails(
      'mailto:hookau.app@gmail.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }

  push(subscription, payload) {
    try {
      this.webpush.sendNotification(subscription, JSON.stringify(payload));
    } catch(error) {
      console.log(error);
    }
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validApiKey,
        ...validSubscription,
        ...validPayload,
        checkErrors
      ],
      (req, res) => {
        const { subscription, payload } = req.body;
        this.push(subscription, payload);
        res.status(200).json({ msd: 'WEB PUSH DONE' });
      }
    );
  }


}

module.exports = PushWeb;