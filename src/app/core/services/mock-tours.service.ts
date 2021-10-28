import { Injectable } from '@angular/core';
import { TOURS } from '../mock-tours';
import { Tour } from '../tour';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockToursService {

  constructor() { }

  getTours(): Observable<Tour[]>{
    const tours = of(TOURS);
    return tours;
  }

}
