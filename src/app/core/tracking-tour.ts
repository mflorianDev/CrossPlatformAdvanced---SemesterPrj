import { Position } from './position';

export interface TrackingTour {
  /**
   * Date as ISO 8601 datetime format
   */
  startTime: string;
  /**
   * Date as ISO 8601 datetime format
   */
  endTime: string;
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
   * Array of GPS position parameters
   */
  positions: Position[];
}
