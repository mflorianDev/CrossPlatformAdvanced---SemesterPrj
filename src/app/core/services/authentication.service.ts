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
import { DocumentReference, collection, CollectionReference, doc, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth: Auth;
  private userDocRef: DocumentReference;

  constructor(private afs: Firestore) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      console.log('User Changed: ', user.email);
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

  signIn({ email, password }): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
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
