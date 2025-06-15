import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({ 
      projectId: "simple-crm-1a85d", 
      appId: "1:431971282660:web:a68b04094dda55350686f1", 
      storageBucket: "simple-crm-1a85d.firebasestorage.app", 
      apiKey: "AIzaSyA89EzA43h5SRNrcQ81CC8QSDOZ3ekUXqA", 
      authDomain: "simple-crm-1a85d.firebaseapp.com", 
      messagingSenderId: "431971282660" 
    })), provideDatabase(() => getDatabase()) // change to firebase?
  ]
}).catch((err) => console.error(err));
