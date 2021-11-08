import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: User = null;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
  }

  async signUp( {email, password} ){
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log('result: ', credential);
    const uid =  credential.user.uid;
    // Speichere user in einer firebase-collection
    return this.db.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email
    });
  }

  signIn( {email, password} ){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }
}
