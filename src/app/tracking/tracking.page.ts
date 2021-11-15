/// <reference types="@types/googlemaps" />

import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { User } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  onSnapshot,
  query,
  Unsubscribe,
  doc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { orderBy } from '@firebase/firestore';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit, OnDestroy {
  // Map related
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  polylines = [];
  oldLat: number;
  oldLong: number;

  // Firebase Data
  locations: any[];
  locationsCollection: CollectionReference<DocumentData>;

  // Misc
  isTracking = false;
  watchID: string;
  currentUser: User;
  unsubscribe: Unsubscribe;

  constructor(
    private afs: Firestore,
    private authService: AuthenticationService
  ) {
    this.init();
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.loadMap();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  // Perform an anonymous login and load data
  async init() {
    // Get current user
    this.currentUser = this.authService.getCurrentUser();
    // Get collection reference
    this.locationsCollection = collection(
      this.afs,
      `users/${this.currentUser.uid}/locations`
    );
    console.log('locationsCollection: ', this.locationsCollection);
    // Initialize snapshot listener for collection
    const q = query(this.locationsCollection, orderBy('timestamp'));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.locations = [];
      querySnapshot.forEach((document) => {
        const id = document.id;
        const data = document.data();
        this.locations.push({ id, ...data });
      });
      // Update Map marker on every change
      console.log('locations: ', this.locations);
      this.updateMap(this.locations);
    });
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
          this.addNewLocation(
            newLat,
            newLong,
            position.coords.altitude,
            position.timestamp
          );
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
  }

  // Save a new location to Firebase and center the map
  async addNewLocation(lat, lng, alt, timestamp) {
    const docRef = await addDoc(this.locationsCollection, {
      lat,
      lng,
      alt,
      timestamp,
    });
    console.log('Document written with ID: ', docRef.id);

    const position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(17);
  }

  // Delete a location from Firebase
  async deleteLocation(pos) {
    await deleteDoc(doc(this.locationsCollection, pos.id));
  }

  // Redraw all markers and the polylines on the map
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

    // Calculate path distance
    /*
    const pos1 = this.markers[0].getPosition() as google.maps.LatLng;
    const pos2 = this.markers[1].getPosition() as google.maps.LatLng;
    const dist = google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
    console.log('MarkerDistance: ', dist);
    */
    let distance = 0;
    let uphill = 0;
    let downhill = 0;
    if (locations.length > 1) {
      for (let i = 0; i < locations.length - 1; i++) {
        // Calculate distance between two coordinates
        const latLng1 = new google.maps.LatLng(
          locations[i].lat,
          locations[i].lng
        );
        const latLng2 = new google.maps.LatLng(
          locations[i + 1].lat,
          locations[i + 1].lng
        );
        distance += google.maps.geometry.spherical.computeDistanceBetween(
          latLng1,
          latLng2
        );
        // Calculate uphill/downhill between two coordinates
        if (locations[i].alt) {
          const altDiff = locations[i + 1].alt - locations[i].alt;
          if (altDiff >= 0) {
            uphill += altDiff;
          } else {
            downhill += altDiff;
          }
        }
      }
    }
    console.log(`distance:  ${distance.toFixed(2)} meters`);
    console.log(`uphill:  ${uphill.toFixed(2)} meters`);
    console.log(`downhill:  ${downhill.toFixed(2)} meters`);
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
