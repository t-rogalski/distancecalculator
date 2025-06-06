<template>
  <Navbar />
  <div class="container" :class="{ shifted }">
    <div class="formContainer">
      <GeoForm @calculated="handleCalculated" />
    </div>
    <div class="mapContainer">
      <MapDisplay
        v-if="showMap"
        :lat1="coords.lat1"
        :lon1="coords.lon1"
        :lat2="coords.lat2"
        :lon2="coords.lon2"
        :distanceKm="result.kilometers"
        :distanceM="result.meters"
        :unit="unit"
      />
      <ResultDisplay v-if="result" :result="result" :unit="unit" :toggleUnit="toggleUnit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeoForm from './components/GeoForm.vue';
import ResultDisplay from './components/ResultDisplay.vue';
import MapDisplay from './components/MapDisplay.vue';
import Navbar from './components/Navbar.vue';

const result = ref(null);
const coords = ref({ lat1: 0, lon1: 0, lat2: 0, lon2: 0 });
const showMap = ref(false);
const shifted = ref(false);
const unit = ref('km');

function handleCalculated(data) {
  result.value = data;
  coords.value = {
    lat1: data.lat1,
    lon1: data.lon1,
    lat2: data.lat2,
    lon2: data.lon2,
  };
  showMap.value = true;
  shifted.value = true;
}

function toggleUnit() {
  unit.value = unit.value === 'km' ? 'm' : 'km';
}
</script>
