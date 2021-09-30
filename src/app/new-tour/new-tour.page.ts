import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.page.html',
  styleUrls: ['./new-tour.page.scss'],
})
export class NewTourPage implements OnInit {
  date: string = new Date().toISOString();
  startTime: string;
  endTime: string;
  duration: string;
  batteryStart: string;
  betteryEnd: string;

  constructor() {
   }

  calculateDuration(): void {
    const startDate: Date = new Date(this.startTime);
    const endDate: Date = new Date(this.endTime);
    const dateDifference: number = endDate.getTime() - startDate.getTime();
    console.log(dateDifference);
    //this.duration = dateDifference;
  }

  resetBatteryStart(inputValue: any): void {
    if(!isNaN(Number(inputValue))){
      this.batteryStart = Number(inputValue) + ' %';
      console.log('batteryStart: ', this.batteryStart);
    } else{
        console.log('InputValue is Not a Number');
        this.batteryStart = '';
    }
  }

  ngOnInit() {
  }

}
