import { Injectable } from '@angular/core';
import { TOURS } from '../mock-tours';
import { Tour } from '../tour';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockToursService {
  private tours: Tour[];

  constructor() {
    this.getMockTours();
  }

  getTours(): Observable<Tour[]>{
    return of(this.tours);
  }

  addTour(newTour: Tour): void{
    this.tours.push(newTour);
  }

  private getMockTours(): void{
    this.tours = TOURS;
  }

}
