<!-- Obsługa przycisku -->

<template>
  <button @click="toggleUnit">Przełącz na {{ unit === 'km' ? 'metry' : 'kilometry' }}</button>
</template>

<script setup>
const props = defineProps(['result', 'unit', 'toggleUnit']);
</script>
