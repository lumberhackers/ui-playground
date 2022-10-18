<script setup lang="ts">
const props = defineProps({
  entry: Object,
});
</script>
<template>
  <input type="text" v-model="props.entry.title" />
</template>
