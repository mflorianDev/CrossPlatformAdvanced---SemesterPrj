import { Component, OnInit } from '@angular/core';
import { TOURS } from '../core/mock-tours';

@Component({
  selector: 'app-overview-tours',
  templateUrl: './overview-tours.page.html',
  styleUrls: ['./overview-tours.page.scss'],
})
export class OverviewToursPage implements OnInit {
  tours = TOURS;

  constructor() { }

  ngOnInit() {
  }

}
