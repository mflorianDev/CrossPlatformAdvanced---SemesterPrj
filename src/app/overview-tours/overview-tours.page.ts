import { Component, OnInit } from '@angular/core';
import { TOURS } from '../core/mock-tours';
import { MockToursService } from '../core/services/mock-tours.service';
import { Tour } from '../core/tour';

@Component({
  selector: 'app-overview-tours',
  templateUrl: './overview-tours.page.html',
  styleUrls: ['./overview-tours.page.scss'],
})
export class OverviewToursPage implements OnInit {
  tours: Tour[];

  constructor(private mockToursService: MockToursService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(): void{
    this.tours = this.mockToursService.getTours();
  }

}
