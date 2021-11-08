import { Component, OnInit } from '@angular/core';
import { MockToursService } from '../core/services/mock-tours.service';
import { TourService } from '../core/services/tour.service';
import { TOURS } from '../core/mock-tours';
import { Tour } from '../core/tour';
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-overview-tours',
  templateUrl: './overview-tours.page.html',
  styleUrls: ['./overview-tours.page.scss'],
})
export class OverviewToursPage implements OnInit {
  public tours: Observable<Tour[]>;

  constructor(private mockToursService: MockToursService, private tourService: TourService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(): void {
    this.tours = this.tourService.getAllTours();
    /*
    const isToursEmpty = this.tours.pipe(isEmpty());
    isToursEmpty.subscribe(x => console.log(x));
    */
    //this.tours = this.mockToursService.getAllTours();
  }

}
