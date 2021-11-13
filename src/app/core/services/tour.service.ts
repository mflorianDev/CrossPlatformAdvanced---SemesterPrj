import { Injectable } from '@angular/core';
import { Tour } from '../tour';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  docData,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  currentUser: User = null;
  private tours: Observable<Tour[]>;
  private tourCollection: CollectionReference<DocumentData>;

  constructor(private afs: Firestore, private afAuth: Auth) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('User Changed: ', user);
      this.currentUser = user;
    });
    this.tourCollection = collection(afs, 'tours');
    //TODO: umschreiben auf neues modulares firebase
    /*
    // load mock-tours if collection is empty
    this.tourCollection.ref.get().then(
      (snapshot) => {
        //console.log(snapshot.empty);
        //console.log(snapshot.size);
        //console.log(snapshot.docs);
        if (snapshot.size === 0){
          TOURS.forEach(tour => this.addTour(tour));
        };
      }
    );
    */
    this.tours = collectionData(this.tourCollection, {
      idField: 'id',
    }) as Observable<Tour[]>;
  }

  getAllTours(): Observable<Tour[]> {
    return this.tours;
  }

  getTour(id: string): Observable<Tour> {
    const tourDocRef = doc(this.afs, `tours/${id}`);
    return docData(tourDocRef, { idField: 'id' }) as Observable<Tour>;
  }

  addTour(tour: Tour): Promise<DocumentReference> {
    return addDoc(this.tourCollection, tour);
  }

  updateTour(tour: Tour): Promise<void> {
    const { id, ...tourNoId } = tour;
    const tourDocRef = doc(this.afs, `tours/${id}`);
    return updateDoc(tourDocRef, {tourNoId});
  }

  deleteTour(id: string): Promise<void> {
    const tourDocRef = doc(this.afs, `tours/${id}`);
    return deleteDoc(tourDocRef);
  }
}
