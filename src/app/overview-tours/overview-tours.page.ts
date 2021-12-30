import { Component, OnInit } from '@angular/core';
import { TourService } from '../core/services/tour.service';
import { Tour } from '../core/tour';
import { Observable } from 'rxjs';
import { ConfigService } from '../core/services/config.service';

@Component({
  selector: 'app-overview-tours',
  templateUrl: './overview-tours.page.html',
  styleUrls: ['./overview-tours.page.scss'],
})
export class OverviewToursPage implements OnInit {
  public tours: Observable<Tour[]>;

  constructor(private tourService: TourService, private configService: ConfigService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(): void {
    this.tours = this.tourService.getAllTours();
  }

}
