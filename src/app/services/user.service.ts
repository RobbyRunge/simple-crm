import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  getUsers(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const userCollection = collection(this.firestore, 'user');
      return collectionData(userCollection, { idField: 'id' });
    });
  }

  getUser(userId: string): Observable<any> {
    return runInInjectionContext(this.injector, () => {
      const userDocRef = doc(this.firestore, 'user', userId);
      return docData(userDocRef, { idField: 'id' });
    });
  }

  addUser(user: User): Promise<any> {
    return runInInjectionContext(this.injector, () => {
      const userCollection = collection(this.firestore, 'user');
      return addDoc(userCollection, user.toJSON());
    });
  }
}
