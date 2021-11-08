import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TourService } from '../core/services/tour.service';
import { Tour } from '../core/tour';



@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.page.html',
  styleUrls: ['./new-tour.page.scss'],
})
export class NewTourPage implements OnInit {
  name: string;
  date: string = new Date().toISOString().slice(0, 10);
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  altitudeUp: number;
  altitudeDown: number;
  batteryStart: string;
  batteryEnd: string;
  batteryStartNumber: number;
  batteryEndNumber: number;
  batteryConsumption: string;
  batteryConsumptionNumber: number;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private tourService: TourService,
    ) {}

  ngOnInit() {}

  /**
   * calculate and set tour duration in milliseconds
   */
  calculateDuration(): void {
    if (this.startTime && this.endTime) {
      const startDate: Date = new Date(this.startTime);
      const endDate: Date = new Date(this.endTime);
      this.duration = endDate.getTime() - startDate.getTime();
    }
  }

  /**
   * pecentage symbol added to input value
   *
   * @param inputValue
   * @param property
   */
  setPercentageValue(inputValue: any, property: string): void {
    if (!isNaN(Number(inputValue)) && inputValue.length > 0) {
      this[property + 'Number'] = Number(inputValue);
      this[property] = Number(inputValue) + ' %';
    } else if (!isNaN(Number(inputValue)) && inputValue.length === 0) {
      this[property + 'Number'] = undefined;
      this[property] = undefined;
    } else {
      this[property + 'Number'] = undefined;
      this[property] = undefined;
      alert('InputValue is not a Number');
    }
  }

  /**
   * calculates and sets battery consumption
   */
  setBatteryConsumption(): void {
    if (this.batteryStartNumber && this.batteryEndNumber) {
      this.batteryConsumptionNumber =
        this.batteryStartNumber - this.batteryEndNumber;
      this.batteryConsumption = this.batteryConsumptionNumber + ' %';
    } else {
      this.batteryConsumptionNumber = null;
      this.batteryConsumption = null;
    }
  }

  saveTour() {
    const tour: any = {
      name: this.name,
      date: this.date,
      duration: this.duration,
      distance: this.distance,
      altitudeUp: this.altitudeUp,
      altitudeDown: this.altitudeDown,
      batteryConsumption: this.batteryConsumptionNumber,
    };
    this.tourService.addTour(tour).then(
      () => {
        this.showToast('Tour gespeichert');
        this.router.navigateByUrl('/overview-tours');
      },
      (err) => {
        this.showToast('Ein Fehler ist aufgetreten. Tour konnte nicht gespeichert werden! :(');
      }
    );
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
