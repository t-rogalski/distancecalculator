<template>
  <div class="formWrapper">
    <form @submit.prevent="calculateDistance" :class="{ rolling: isRolling }">
      <div class="coords">
        <div class="input">
          <label>Punkt A</label>
          <input v-model.number="lat1" type="number" step="any" min="0" max="90" placeholder="Szerokość" required />
        </div>
        <div class="input">
          <input v-model.number="lon1" type="number" step="any" min="0" max="180" placeholder="Długość" required />
        </div>
      </div>
      <div class="coords">
        <div class="input">
          <label>Punkt B</label>
          <input v-model.number="lat2" type="number" step="any" min="0" max="90" placeholder="Szerokość" required />
        </div>
        <div class="input">
          <input v-model.number="lon2" type="number" step="any" min="0" max="180" placeholder="Długość" required />
        </div>
      </div>
      <button type="submit" @click="addRollingClass">Oblicz odległość</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const lat1 = ref('');
const lon1 = ref('');
const lat2 = ref('');
const lon2 = ref('');
const isRolling = ref(false);

const emit = defineEmits(['calculated']);
const calculateDistance = async () => {
  const res = await fetch('http://localhost:8000/distance.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat1: lat1.value, lon1: lon1.value, lat2: lat2.value, lon2: lon2.value }),
  });
  const data = await res.json();
  emit('calculated', data);
};

function addRollingClass() {
  isRolling.value = true;
}
</script>
