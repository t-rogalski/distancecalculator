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
  L.popup()
    .setLatLng([lat, lon])
    .setContent(`<div style="font-size: 1.5rem;"><strong>${getDistanceText()}</strong></div>`)
    .openOn(map);
}

//Pinezki, linia
onMounted(() => {
  map = L.map('map').setView([props.lat1, props.lon1], 6);

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

  //Środek do wyświetlania okienka
  const midPoint = line.getCenter();

  showLinePopup(midPoint.lat, midPoint.lng);

  //Wyświetla odległość przez kliknięcie
  line.on('click', function (e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style="font-size: 1.5rem;"><strong>Odległość: ${
          props.unit === 'km' ? props.distanceKm.toFixed(3) + ' km' : (props.distanceKm * 1000).toFixed(2) + ' m'
        }</strong></div>`
      )
      .openOn(map);
  });
  setTimeout(() => {
    map.invalidateSize();
  }, 500);
});

// Aktualizuj popup gdy zmieni się jednostka lub współrzędne
watch(
  () => [props.lat1, props.lon1, props.lat2, props.lon2, props.unit],
  ([newLat1, newLon1, newLat2, newLon2]) => {
    if (markerA && markerB && map) {
      markerA.setLatLng([newLat1, newLon1]);
      markerB.setLatLng([newLat2, newLon2]);
      map.setView([newLat1, newLon1], 5);

      // Usuń starą linię jeśli istnieje
      if (line) {
        map.removeLayer(line);
      }
      // Narysuj nową linię
      line = L.polyline(
        [
          [newLat1, newLon1],
          [newLat2, newLon2],
        ],
        { color: 'red', weight: 4 }
      ).addTo(map);

      // Dodaj obsługę kliknięcia na nowej linii
      line.on('click', function (e) {
        L.popup().setLatLng(e.latlng).setContent(getDistanceText()).openOn(map);
      });

      const midPoint = line.getCenter();
      showLinePopup(midPoint.lat, midPoint.lng);
    }
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }
);
</script>
