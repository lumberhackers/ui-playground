<script setup lang="ts">
import BeamWidget from "./BeamWidget.vue";
</script>

<template>
  <div class="page">
    <div class="modal-n">
      <BeamWidget />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #84ffa520;
}

.modal-n {
  padding: 1em;
  max-width: 800px;
  border-radius: 4px;
  background: white;
  box-shadow: 3px 3px 3px rgb(24, 24, 24);
}
</style>
