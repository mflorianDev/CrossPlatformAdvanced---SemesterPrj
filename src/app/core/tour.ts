export interface Tour {
  id: number;
  name: string;
  date: Date;
  duration: number; //milliseconds
  distance: number; //km
  altitudeUp: number; //m
  altitudeDown: number; //m
  batteryStart: number; //percentage
  batteryEnd: number; //percentage
}
