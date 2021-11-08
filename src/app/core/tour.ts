export interface Tour {
  id?: string;
  name: string;
  date: string;
  duration: number; //milliseconds
  distance: number; //km
  altitudeUp: number; //m
  altitudeDown: number; //m
  batteryConsumption: number; //percentage
}
