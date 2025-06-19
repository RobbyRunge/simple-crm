import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';

const firebaseConfig = {
  projectId: "simple-crm-1a85d",
  appId: "1:431971282660:web:a68b04094dda55350686f1",
  storageBucket: "simple-crm-1a85d.firebasestorage.app",
  apiKey: "AIzaSyA89EzA43h5SRNrcQ81CC8QSDOZ3ekUXqA",
  authDomain: "simple-crm-1a85d.firebaseapp.com",
  messagingSenderId: "431971282660"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideNativeDateAdapter(),
  ]
};
