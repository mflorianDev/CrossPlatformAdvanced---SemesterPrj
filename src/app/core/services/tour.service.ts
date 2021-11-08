import { Injectable } from '@angular/core';
import { Tour } from '../tour';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class TourService {
  currentUser: User = null;
  private tours: Observable<Tour[]>;
  private tourCollection: AngularFirestoreCollection<Tour>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
    this.tourCollection = this.db.collection<Tour>('tours');
    this.tours = this.tourCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }

  getAllTours(): Observable<Tour[]> {
    return this.tours;
  }

  getTour(id: string): Observable<Tour> {
    return this.tourCollection
      .doc<Tour>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((tour) => {
          tour.id = id;
          return tour;
        })
      );
  }

  addTour(tour: Tour): Promise<DocumentReference> {
    return this.tourCollection.add(tour);
  }

  updateTour(tour: Tour): Promise<void> {
    const {id, ...tourNoId } = tour;
    return this.tourCollection
      .doc(tour.id)
      .update(tourNoId);
  }

  deleteTour(id: string): Promise<void> {
    return this.tourCollection.doc(id).delete();
  }
}
