export interface Position {
  /**
   * Latitude in decimal degrees
   */
  lat: number;
  /**
   * Longitude in decimal degrees
   */
  lng: number;
  /**
   * Altitude in meters
   */
  alt?: number;
  /**
   * Timestamp
   */
  timestamp: number;
}
