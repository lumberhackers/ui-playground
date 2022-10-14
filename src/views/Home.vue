<script setup lang="ts">
import { routes } from "../routes";
</script>
<template>
  <ul>
    <li v-for="route in routes">
      <RouterLink :to="route.path">{{ route.path }}</RouterLink>
    </li>
  </ul>
</template>
