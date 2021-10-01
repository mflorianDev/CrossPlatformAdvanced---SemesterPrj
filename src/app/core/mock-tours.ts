import { Tour } from './tour';

export const TOURS: Tour[] = [
  {
    id: 1,
    name: 'Suedtiroler Trail',
    date: new Date(),
    duration: 3612000,
    distance: 12.4,
    altitudeUp: 420,
    altitudeDown: 210,
    batteryStart: 98,
    batteryEnd: 68,
  },
  {
    id: 2,
    name: 'Rock&Roll Trail',
    date: new Date(),
    duration: 42000000,
    distance: 12.4,
    altitudeUp: 820,
    altitudeDown: 610,
    batteryStart: 95,
    batteryEnd: 35,
  },
  {
    id: 3,
    name: 'Anninger Trail',
    date: new Date(),
    duration: 27000000,
    distance: 12.5,
    altitudeUp: 460,
    altitudeDown: 580,
    batteryStart: 100,
    batteryEnd: 71,
  },
];
