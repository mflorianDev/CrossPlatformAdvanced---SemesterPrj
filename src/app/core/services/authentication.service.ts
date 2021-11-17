import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth: Auth;

  constructor(private afs: Firestore) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      console.log('User Changed: ', user);
    });
  }

  async signUp({ email, password }) {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    // Speichere user in einer firebase-collection
    const userColRef = collection(this.afs, `users`);
    return setDoc(doc(this.afs, `users`, credential.user.uid), {
      uid: credential.user.uid,
      email: credential.user.email,
    });
  }

  signIn({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }
}
