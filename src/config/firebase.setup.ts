import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import * as admin from 'firebase-admin';

let app: admin.app.App = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {} // Inject ConfigService

  async onApplicationBootstrap() {
    if (!app) {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('FIREBASE_PROJECT_ID'),
          privateKey: this.configService
            .get('FIREBASE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
        }),
      });
    }
  }

  setup() {
    return app;
  }
}
