<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
  lat1: Number,
  lon1: Number,
  lat2: Number,
  lon2: Number,
  distanceKm: Number,
  distanceM: Number,
  unit: String,
});

let map, markerA, markerB, line;

function getDistanceText() {
  return props.unit === 'km'
    ? `Odległość: ${props.distanceKm.toFixed(3)} km`
    : `Odległość: ${(props.distanceKm * 1000).toFixed(2)} m`;
}

function showLinePopup(lat, lon) {
  L.popup().setLatLng([lat, lon]).setContent(getDistanceText()).openOn(map);
}

//Pinezki, linia
onMounted(() => {
  map = L.map('map').setView([props.lat1, props.lon1], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  markerA = L.marker([props.lat1, props.lon1]).addTo(map).bindPopup('Punkt A');
  markerB = L.marker([props.lat2, props.lon2]).addTo(map).bindPopup('Punkt B');

  line = L.polyline(
    [
      [props.lat1, props.lon1],
      [props.lat2, props.lon2],
    ],
    { color: 'red', weight: 4 }
  ).addTo(map);

  const midLat = (props.lat1 + props.lat2) / 2;
  const midLon = (props.lon1 + props.lon2) / 2;

  //Odległość wyświetlana na start
  showLinePopup(midLat, midLon);

  //Odległość na kliknięcie
  line.on('click', function (e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`Odległość: ${props.distanceKm.toFixed(3)} km`)
      .openOn(map);
  });
});

// Aktualizuj popup gdy zmieni się jednostka lub współrzędne
watch(
  () => [props.lat1, props.lon1, props.lat2, props.lon2, props.unit],
  ([newLat1, newLon1, newLat2, newLon2]) => {
    if (markerA && markerB && map) {
      markerA.setLatLng([newLat1, newLon1]);
      markerB.setLatLng([newLat2, newLon2]);
      map.setView([newLat1, newLon1], 5);
      const midLat = (newLat1 + newLat2) / 2;
      const midLon = (newLon1 + newLon2) / 2;
      showLinePopup(midLat, midLon);
    }
  }
);
</script>
