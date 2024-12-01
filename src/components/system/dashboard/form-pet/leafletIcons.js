import leaflet from 'leaflet';

// Define Dog Icons
export const lostDogIcon = leaflet.icon({
  iconUrl: 'images/dog-pin.png', // Update with your specific image path
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const foundDogIcon = leaflet.icon({
  iconUrl: 'images/found-dog.png', // Update with your specific image path
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Define Cat Icons
export const lostCatIcon = leaflet.icon({
  iconUrl: 'images/pin-cat.png', // Update with your specific image path
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const foundCatIcon = leaflet.icon({
  iconUrl: 'images/found-cat.png', // Update with your specific image path
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Define User Location Icon
export const userLocationIcon = leaflet.icon({
  iconUrl: 'images/pin-loc.png',
  iconSize: [40, 45],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
