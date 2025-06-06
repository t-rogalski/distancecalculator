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
});

let map, markerA, markerB, line;

onMounted(() => {
  map = L.map('map').setView([props.lat1, props.lon1], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  markerA = L.marker([props.lat1, props.lon1]).addTo(map).bindPopup('Punkt A').openPopup();
  markerB = L.marker([props.lat2, props.lon2]).addTo(map).bindPopup('Punkt B');

  line = L.polyline(
    [
      [props.lat1, props.lon1],
      [props.lat2, props.lon2],
    ],
    { color: 'red', weight: 4 }
  ).addTo(map);

  line.on('click', function (e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`Odległość: ${props.distanceKm.toFixed(3)} km`)
      .openOn(map);
  });
});

watch(
  () => [props.lat1, props.lon1, props.lat2, props.lon2],
  ([newLat1, newLon1, newLat2, newLon2]) => {
    if (markerA && markerB && map) {
      markerA.setLatLng([newLat1, newLon1]);
      markerB.setLatLng([newLat2, newLon2]);
      map.setView([newLat1, newLon1], 5);
    }
  }
);
</script>
