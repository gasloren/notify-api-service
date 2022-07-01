const firebaseAdmin = require('firebase-admin');

const validApiKey = require('../validators/valid-api-key');
const validFcmToken = require('../validators/valid-fcm-token');
const validPayload = require('../validators/valid-payload');
const checkErrors = require('../validators/check-errors');

const serviceAccount = require('../service-account.json');

// ----------------------------------

class PushApp {

  constructor(server) {
    this.path = '/notify/push/app';
    this.server = server;
    this.firebase = firebaseAdmin;
    this.initialize();
    this.route();
  }

  initialize() {
    this.firebase.initializeApp({
      credential: this.firebase.credential.cert(serviceAccount),
      databaseURL: 'https://hookau-6e695.firebaseio.com'
    });
  }

  push(fcmToken, payload) {
    this.firebase.messaging().sendToDevice(
      [fcmToken], // ['token_1', 'token_2', ...]
      {
        notification: {
          title: payload.title || 'Notification',
          body: payload.label || 'Testing'
        }
      },
      {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: 'high',
      }
    );
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validApiKey,
        ...validFcmToken,
        ...validPayload,
        checkErrors
      ],
      (req, res) => {
        const { fcmToken, payload } = req.body;
        this.push(fcmToken, payload);
        res.status(200).json({ msg: 'FCM PUSH DONE' });
      }
    );
  }

}

module.exports = PushApp;