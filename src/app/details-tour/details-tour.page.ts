import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { TourService } from '../core/services/tour.service';
import { Tour } from '../core/tour';

@Component({
  selector: 'app-details-tour',
  templateUrl: './details-tour.page.html',
  styleUrls: ['./details-tour.page.scss'],
})
export class DetailsTourPage implements OnInit, OnDestroy {
  tour: Tour = {
    id: null,
    name: null,
    date: null,
    duration: null,
    distance: null,
    altitudeUp: null,
    altitudeDown: null,
    batteryConsumption: null,
    positions: null,
  };
  duration: string;
  tourServiceSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tourServiceSubscription = this.tourService.getTour(id).subscribe((tour) => {
        this.tour = tour;
        // convert tour.duration from milliseconds to ISO 8601 datetime format for ion-datetime element
        this.duration = moment(this.tour.duration).toISOString();
      });
    }
  }

  ngOnDestroy() {
    this.tourServiceSubscription.unsubscribe();
  }

  deleteTour(): void {
    const id = this.tour.id;
    // call unsubscribe otherwise ionic/angular lifecycle throws errors on updating template!
    this.tourServiceSubscription.unsubscribe();
    this.tourService.deleteTour(id).then(
      () => {
        this.showToast('Tour gelöscht');
        console.log('Tour Deleted, ID: ', id);
        this.router.navigateByUrl('/overview-tours');
      },
      (err) => {
        console.log('ERROR: Tour Could Not Be Deleted');
        this.showToast('Ein Fehler ist aufgetreten. Tour konnte nicht gelöscht werden! :(');
      }
    );
  }

  updateTour(): void {
    const id = this.tour.id;
    // convert tour.duration from ISO 8601 datetime format to milliseconds
    this.tour.duration = new Date(this.duration).getTime();
    this.tourService.updateTour(this.tour).then(
      () => {
        this.showToast('Tour geändert');
        console.log('Tour Changes Saved, ID: ', id);
        this.router.navigateByUrl('/overview-tours');
      },
      (err) => {
        console.log('ERROR: Tour Changes Could Not Be Saved');
        this.showToast('Ein Fehler ist aufgetreten. Tour konnte nicht geändert werden! :(');
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
