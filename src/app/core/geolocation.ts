import { Geolocation } from '@capacitor/geolocation';

// Test Geolocation Plugin
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates);
  };
