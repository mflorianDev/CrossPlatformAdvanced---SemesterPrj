/// <reference types="@types/googlemaps" />

import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage {
  // Map related
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  polylines = [];
  oldLat: number;
  oldLong: number;

  // Misc
  isTracking = false;
  watchID: string;
  locations: any[];

  // Tour Data
  startTime: number;
  endTime: number;
  distance: number;
  altitudeUp: number;
  altitudeDown: number;

  constructor(
    private router: Router,
  ) {
    this.init();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  // Initialize settings
  init() {
    this.locations = [];
  }

  // Initialize a blank map
  async loadMap() {
    const currentPosition = await Geolocation.getCurrentPosition();
    const latLng = new google.maps.LatLng(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude
    );
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  // Use Capacitor to track our geolocation
  async startTracking() {
    this.isTracking = true;
    this.watchID = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        const newLat = position.coords.latitude;
        const newLong = position.coords.longitude;
        // watchPosition often fires twice, therefore check if position is a new position
        if (this.oldLat !== newLat && this.oldLong !== newLong) {
          const positionData = {
            lat: newLat,
            lng: newLong,
            alt: position.coords.altitude,
            timestamp: position.timestamp
          };
          this.addNewLocation(positionData);
          this.oldLat = newLat;
          this.oldLong = newLong;
        }
      }
    );
  }

  // Unsubscribe from the geolocation watch using the initial ID
  stopTracking() {
    Geolocation.clearWatch({ id: this.watchID }).then(() => {
      this.isTracking = false;
    });
    const tourData = {
      startTime: this.startTime,
      endTime: this.endTime,
      distance: this.distance / 1000,
      altitudeUp: this.altitudeUp,
      altitudeDown: this.altitudeDown,
      positions: this.locations,
    };
    this.router.navigate([
      '/new-tour',
      { trackingData: JSON.stringify(tourData) },
    ]);
  }

  // Save a new location to Firebase and center the map
  addNewLocation(position) {
    this.locations.push(position);
    console.log('Position added: ', position);
    const mapPosition = new google.maps.LatLng(position.lat, position.lng);
    this.map.setCenter(mapPosition);
    this.map.setZoom(17);
    this.updateMap(this.locations);
  }

  // Delete a location from Firebase
  deleteLocation(position) {
    const index = this.locations.find(item => item.timestamp === position.timestamp);
    this.locations.splice(index, 1);
    this.updateMap(this.locations);
  }

  // Redraw all markers and the polylines on the map. Recalculate tourData params.
  updateMap(locations) {
    // Remove all current marker
    this.markers.map((marker) => marker.setMap(null));
    this.markers = [];
    // Add marker for current position to the
    if (locations.length !== 0) {
      const latLng = new google.maps.LatLng(
        locations.at(-1).lat,
        locations.at(-1).lng
      );
      const marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
      });
      this.markers.push(marker);
    }
    // Add a polyline to the map
    this.polylines.map((line) => line.setMap(null));
    this.polylines = [];
    const markerPathCoordinates = locations.map((loc) => ({
      lat: loc.lat,
      lng: loc.lng,
    }));
    const polyline = new google.maps.Polyline({
      map: this.map,
      path: markerPathCoordinates,
      geodesic: true,
      strokeColor: '#1a73e8',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    this.polylines.push(polyline);

    // Set startTime and endTime
    if (locations[0]) {
      this.startTime = locations[0].timestamp;
    } else {
      this.startTime = null;
    }
    if (locations.at(-1)) {
      this.endTime = locations.at(-1).timestamp;
    } else {
      this.endTime = null;
    }
    // Calculate path distance, altitudeUp, altitudeDown
    this.distance = 0;
    this.altitudeUp = 0;
    this.altitudeDown = 0;
    if (locations.length > 1) {
      for (let i = 0; i < locations.length - 1; i++) {
        // Calculate distance in meters between two coordinates
        const latLng1 = new google.maps.LatLng(
          locations[i].lat,
          locations[i].lng
        );
        const latLng2 = new google.maps.LatLng(
          locations[i + 1].lat,
          locations[i + 1].lng
        );
        this.distance += google.maps.geometry.spherical.computeDistanceBetween(
          latLng1,
          latLng2
        );
        // Calculate uphill/downhill between two coordinates
        if (locations[i].alt) {
          const altDiff = locations[i + 1].alt - locations[i].alt;
          if (altDiff >= 0) {
            this.altitudeUp += altDiff;
          } else {
            this.altitudeDown += altDiff;
          }
        }
      }
    }
    /*
    console.log(`startTime:  ${this.startTime} timestamp`);
    console.log(`endTime:  ${this.endTime} timestamp`);
    console.log(`distance:  ${this.distance.toFixed(2)} meters`);
    console.log(`uphill:  ${this.altitudeUp.toFixed(2)} meters`);
    console.log(`downhill:  ${this.altitudeDown.toFixed(2)} meters`);
    */
  }


  /*
  setMarkerForAllLocations() {
    // Remove all current marker
    this.markers.map((marker) => marker.setMap(null));
    this.markers = [];
    // Add all markers to the map
    for (const loc of this.locations) {
      const latLng = new google.maps.LatLng(loc.lat, loc.lng);
      const marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
      });
      this.markers.push(marker);
    }
  }
  */
}
