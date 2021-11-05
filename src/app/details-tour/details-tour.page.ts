import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { MockToursService } from '../core/services/mock-tours.service';
import { Tour } from '../core/tour';

@Component({
  selector: 'app-details-tour',
  templateUrl: './details-tour.page.html',
  styleUrls: ['./details-tour.page.scss'],
})
export class DetailsTourPage implements OnInit {
  tour: Tour;
  duration: string;
  batteryConsumptionString: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mockToursService: MockToursService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tour = this.mockToursService.getTour(id);
      this.batteryConsumptionString = this.tour.batteryConsumption + ' %';
      this.duration = moment(this.tour.duration).toISOString();
    }
  }

  /**
   * pecentage symbol added to input value
   *
   * @param inputValue
   * @param property
   */
  setPercentageValue(inputValue: any): void {
    if (!isNaN(Number(inputValue)) && inputValue.length > 0) {
      this.batteryConsumptionString = Number(inputValue) + ' %';
    } else if (!isNaN(Number(inputValue)) && inputValue.length === 0) {
      this.batteryConsumptionString = undefined;
      this.tour.batteryConsumption = undefined;
    } else {
      this.batteryConsumptionString = undefined;
      this.tour.batteryConsumption = undefined;
      alert('InputValue is not a Number');
    }
  }

  deleteTour(): void {
    this.mockToursService.deleteTour(this.tour.id);
    this.showToast('Tour gelöscht');
    this.router.navigateByUrl('/overview-tours');
  }

  updateTour(): void {
    this.tour.duration = new Date(this.duration).getTime();
    this.mockToursService.updateTour(this.tour);
    this.showToast('Tour geändert');
    this.router.navigateByUrl('/overview-tours');
  }

  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
}
