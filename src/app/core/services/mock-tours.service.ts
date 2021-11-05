import { Injectable } from '@angular/core';
import { TOURS } from '../mock-tours';
import { Tour } from '../tour';

@Injectable({
  providedIn: 'root',
})
export class MockToursService {
  private tours: Tour[];

  constructor() {
    this.getMockTours();
  }

  getAllTours(): Tour[] {
    return this.tours;
  }

  getTour(id: string): Tour{
    return this.tours.find(mockTour => mockTour.id === id);
  }

  addTour(newTour: any): void {
    let newID;
    do {
      newID = this.getID();
    } while (this.tours.some(mockTour => mockTour.id === newID));
    newTour.id = newID;
    this.tours.push(newTour);
  }

  updateTour(tour: Tour): void {
    const tourIndex = this.tours.findIndex(
      (mockTour) => mockTour.id === tour.id
    );
    if (tourIndex > -1) {
      this.tours[tourIndex] = tour;
    } else {
      console.log('Error on update: index of tour not found');
    }
  }

  deleteTour(tourID: string): void {
    const tourIndex = this.tours.findIndex(
      (mockTour) => mockTour.id === tourID
    );
    if (tourIndex > -1) {
      this.tours.splice(tourIndex, 1);
    } else {
      console.log('Error on delete: index of tour not found');
    }
  }

  private getMockTours(): void {
    this.tours = TOURS;
  }

  /**
   * create a random ID in base36 (numbers + letters) and return as string of 9 characters
   *
   * @returns ID
   */
  private getID(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
