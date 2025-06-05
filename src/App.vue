<template>
  <div style="display: flex">
    <div style="flex: 1">
      <GeoForm @calculated="handleCalculated" />
    </div>
    <div class="mapContainer" style="flex: 1">
      <MapDisplay v-if="showMap" :lat1="coords.lat1" :lon1="coords.lon1" :lat2="coords.lat2" :lon2="coords.lon2" />
      <ResultDisplay v-if="result" :result="result" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeoForm from './components/GeoForm.vue';
import ResultDisplay from './components/ResultDisplay.vue';
import MapDisplay from './components/MapDisplay.vue';

const result = ref(null);
const coords = ref({ lat1: 0, lon1: 0, lat2: 0, lon2: 0 });
const showMap = ref(false);

function handleCalculated(data) {
  result.value = data;
  coords.value = {
    lat1: data.lat1,
    lon1: data.lon1,
    lat2: data.lat2,
    lon2: data.lon2,
  };
  showMap.value = true;
}
</script>
