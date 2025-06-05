<template>
  <div class="result">
    <h2><strong>Odległość:</strong></h2>
    <p>{{ result.meters.toFixed(2) }} metrów</p>
    <p>{{ result.kilometers.toFixed(3) }} kilometrów</p>
  </div>
</template>

<script setup>
defineProps(['result']);
</script>
