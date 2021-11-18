import { Position } from './position';

export interface Tour {
  /**
   * Firestore auto-generated ID (if available)
   */
  id?: string;
  /**
   * Tour name
   */
  name: string;
  /**
   * Date as ISO 8601 datetime format
   */
  date: string;
  /**
   * Tour duration in milliseconds
   */
  duration: number;
  /**
   * Tour distance in kilometers
   */
  distance: number;
  /**
   * Tour altitude meters upward (if available)
   */
  altitudeUp?: number;
  /**
   * Tour altitude meters downward (if available)
   */
  altitudeDown?: number;
  /**
   * Battery consumption in percentage (if available)
   */
  batteryConsumption?: number;
  /**
   * Array of GPS position parameters (if available)
   */
  positions?: Position[];
}
