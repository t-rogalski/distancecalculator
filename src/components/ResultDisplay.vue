<!-- Obsługa przycisku -->

<template>
  <div class="result">
    <button @click="toggleUnit">Przełącz na {{ unit === 'km' ? 'metry' : 'kilometry' }}</button>
    <div>
      Aktualna jednostka: <strong>{{ unit === 'km' ? 'kilometry' : 'metry' }}</strong>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['result', 'unit', 'toggleUnit']);
</script>
