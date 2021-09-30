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
  batteryEnd: string;

  constructor() {
   }

  calculateDuration(): void {
    const startDate: Date = new Date(this.startTime);
    const endDate: Date = new Date(this.endTime);
    const dateDifference: number = endDate.getTime() - startDate.getTime();
    console.log(dateDifference);
    //this.duration = dateDifference;
  }

  setPercentageValue(inputValue: any, property: string): void {
    if(!isNaN(Number(inputValue))){
      this[property] = Number(inputValue) + ' %';
      console.log(`${property}: `, this[property]);
    } else{
        console.log('InputValue is Not a Number');
        alert('InputValue is Not a Number');
        this[property] = '';
    }
  }

  ngOnInit() {
  }

}
