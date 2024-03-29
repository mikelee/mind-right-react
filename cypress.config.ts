import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin, {
        projectId: 'mind-right-d74a0'
      });
    },
  },
});