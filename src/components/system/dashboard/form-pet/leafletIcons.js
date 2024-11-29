// src/utils/icons.js
import leaflet from 'leaflet';

// Define Dog Icon
export const dogIcon = leaflet.icon({
  iconUrl: 'images/dog-pin.png',
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Define Cat Icon
export const catIcon = leaflet.icon({
  iconUrl: 'images/pin-cat.png',
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Define User Location Icon
export const userLocationIcon = leaflet.icon({
  iconUrl: 'images/pin-loc.png',
  iconSize: [48, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
