import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TourService } from '../core/services/tour.service';
import { Tour } from '../core/tour';
import { TrackingTour } from '../core/tracking-tour';

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
  batteryStart: number;
  batteryEnd: number;
  batteryConsumption: number;
  positions: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private tourService: TourService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('trackingTour')) {
      const trackingTour = JSON.parse(
        this.route.snapshot.paramMap.get('trackingTour')
      );
      this.loadTrackingTour(trackingTour);
    }
  }

  loadTrackingTour(trackingTour: TrackingTour): void {
    this.startTime = trackingTour.startTime;
    this.endTime = trackingTour.endTime;
    this.distance = trackingTour.distance;
    this.altitudeUp = trackingTour.altitudeUp;
    this.altitudeDown = trackingTour.altitudeDown;
    this.positions = trackingTour.positions;
  }

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
   * calculates and sets battery consumption
   */
  setBatteryConsumption(): void {
    if (this.batteryStart != null && this.batteryEnd != null) {
      this.batteryConsumption = this.batteryStart - this.batteryEnd;
    } else {
      this.batteryConsumption = null;
    }
  }

  saveTour() {
    // Run functions to ensure duration and batteryConsumption are not undefined (for example when tracking data was loaded)
    this.calculateDuration();
    this.setBatteryConsumption();
    // Create tour object with necessary properties for firestore
    const tour: Tour = {
      name: this.name,
      date: this.date,
      duration: this.duration,
      distance: this.distance,
      altitudeUp: this.altitudeUp,
      altitudeDown: this.altitudeDown,
      batteryConsumption: this.batteryConsumption,
      positions: this.positions,
    };
    // Save tour on firestore
    this.tourService.addTour(tour).then(
      () => {
        this.showToast('Tour gespeichert');
        this.router.navigateByUrl('/overview-tours');
      },
      (err) => {
        this.showToast(
          'Ein Fehler ist aufgetreten. Tour konnte nicht gespeichert werden! :('
        );
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
