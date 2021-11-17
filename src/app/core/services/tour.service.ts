import { Injectable } from '@angular/core';
import { Tour } from '../tour';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../user';
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
  getDocs,
} from '@angular/fire/firestore';
import { TOURS } from '../mock-tours';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private currentUser: User = null;
  private tours: Observable<Tour[]>;
  private tourColRef: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
    private authService: AuthenticationService
  ) {
    // Get current user from AuthenticationService
    this.currentUser = this.authService.getCurrentUser();
    // Get tour collection reference for current user (userDocRef from AuthenticationService)
    this.tourColRef = collection(this.authService.getUserDocRef(), `/tours`);
    // Load mock-tours if collection is empty
    getDocs(this.tourColRef).then(
      (snapshot) => {
        //console.log(snapshot.empty);
        //console.log(snapshot.size);
        //console.log(snapshot.docs);
        if (snapshot.size === 0){
          TOURS.forEach(tour => this.addTour(tour));
        };
      }
    );
    // Load tours for current user from Firestore
    this.tours = collectionData(this.tourColRef, { idField: 'id' }) as Observable<Tour[]>;
  }

  getAllTours(): Observable<Tour[]> {
    return this.tours;
  }

  getTour(id: string): Observable<Tour> {
    const tourDocRef = doc(this.tourColRef, `/${id}`);
    return docData(tourDocRef, { idField: 'id' }) as Observable<Tour>;
  }

  addTour(tour: Tour): Promise<DocumentReference> {
    return addDoc(this.tourColRef, tour);
  }

  updateTour(tour: Tour): Promise<void> {
    const { id, ...tourNoId } = tour;
    const tourDocRef = doc(this.tourColRef, `/${id}`);
    return updateDoc(tourDocRef, { ...tourNoId } );
  }

  deleteTour(id: string): Promise<void> {
    const tourDocRef = doc(this.tourColRef, `/${id}`);
    return deleteDoc(tourDocRef);
  }
}
