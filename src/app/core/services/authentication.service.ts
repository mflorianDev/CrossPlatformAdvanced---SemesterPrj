import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import {
  DocumentReference,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth: Auth;
  private userDocRef: DocumentReference;

  constructor(private afs: Firestore) {
  }

  init(): Promise<void> {
    return new Promise<void>(async (res) => {
      //TODO: delete next line
      console.log('AuthenticationService initializing ...');
      this.auth = getAuth();
      onAuthStateChanged(this.auth, await ((user) => {
        if (user) {
          console.log('User Changed: ', user.email);
          this.userDocRef = doc(this.afs, `users`, user.uid);
          //await new Promise<void>( ( res, rej) =>  res());
        } else {
          console.log('User Changed: no user signed in');
        }
      }));
      //TODO: delete next line
      console.log('AuthenticationService ready');
      res();
    });
  }

  async signUp({ email, password }): Promise<void> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    // Speichere user in einer firebase-collection
    this.userDocRef = doc(this.afs, `users`, credential.user.uid);
    return setDoc(this.userDocRef, {
      uid: credential.user.uid,
      email: credential.user.email,
    });
  }

  async signIn({ email, password }): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.userDocRef = doc(this.afs, `users`, credential.user.uid);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User {
    return this.auth.currentUser;
  }

  getUserDocRef(): DocumentReference {
    return this.userDocRef;
  }
}
